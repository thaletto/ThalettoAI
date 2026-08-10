import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
export default defineConfig({ plugins: [nitro(), devtools(), tailwindcss(), netlify(), tanstackStart(), viteReact()], resolve: { tsconfigPaths: true } });