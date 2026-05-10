import { createFileRoute } from "@tanstack/react-router";
import { agent } from "@/lib/agent";
import { minuteRateLimit, dailyRateLimit } from "@/lib/rate-limit";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { pipeJsonRender } from "@json-render/core";
import { useRequest } from "nitro/context";
import type { RequestLogger } from "evlog";

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const req = useRequest();
        const log = req.context!.log as RequestLogger;

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";

        const [minuteResult, dailyResult] = await Promise.all([
          minuteRateLimit.limit(ip),
          dailyRateLimit.limit(ip),
        ]);

        log.set({ ip, minuteResult, dailyResult });

        if (!minuteResult.success || !dailyResult.success) {
          const isMinuteLimit = !minuteResult.success;
          log.set({ status: 429, message: "Rate limit exceeded" });
          return new Response(
            JSON.stringify({
              error: "Rate limit exceeded",
              message: isMinuteLimit
                ? "Too many requests. Please wait a moment before trying again."
                : "Daily limit reached. Please try again tomorrow.",
            }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        const body = await request.json();
        const uiMessages: UIMessage[] = body.messages;

        if (
          !uiMessages ||
          !Array.isArray(uiMessages) ||
          uiMessages.length === 0
        ) {
          return new Response(
            JSON.stringify({ error: "messages array is required" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        const modelMessages = await convertToModelMessages(uiMessages);
        const result = await agent.stream({ messages: modelMessages });

        const stream = createUIMessageStream({
          execute: async ({ writer }) => {
            writer.merge(pipeJsonRender(result.toUIMessageStream()));
          },
        });

        log.set({
          message: "message generated",
        });
            
        return createUIMessageStreamResponse({ stream });
      },
    },
  },
});
