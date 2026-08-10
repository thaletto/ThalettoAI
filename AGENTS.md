# Kite

## Dev Commands
- `bun dev` - Vite dev server on port 3000
- `bun run build` - Vite production build
- `bun test` - Vitest run
- `bun lint` - Biome lint
- `bun format` - Biome format
- `bun check` - Biome check (lint + formatting)

## Tech Stack
- TanStack Start (not Next.js)
- Vite + TanStack Start plugin
- React 19
- shadcn/ui + TailwindCSS 4
- Biome for lint/format
- Netlify deployment via @netlify/vite-plugin-tanstack-start

## Path Aliases
- `#/*` and `@/*` map to `./src/*`

## Notes
- `src/routeTree.gen.ts` is auto-generated (skip lint: see biome.json)
- React Compiler (babel-plugin-react-compiler) is active
- Strict TypeScript with verbatimModuleSyntax

## Agent skills

### Issue tracker

Issues live in Linear; agents create and update them via the Linear API or web UI, referring to issues by their `KIT-123`-style IDs. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.