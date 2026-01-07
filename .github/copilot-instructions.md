# MODA AI Studio – Copilot Instructions

MODA OS (v3.1) is a React 19 + TypeScript + Tailwind + Framer Motion workspace that treats the UI as a draggable grid of “sectors,” powered by Gemini/OpenAI. Use these notes to stay productive.

## Architecture & Navigation
- Spatial workspace in [components/Workspace.tsx](components/Workspace.tsx): `SECTION_MAP` drives coordinates; springs (`damping:45, stiffness:240`) animate camera; Cmd/Ctrl+K opens a command palette to jump sectors.
- URL ↔ section sync in [App.tsx](App.tsx): `PATH_TO_SECTION` ensures deep links (e.g., `/compiler` → `SectionId.MistBuilder`). Programmatic navigation redirects prompts to the compiler if needed.
- Node wrapper pattern: every sector is a `NodeWrapper` with large rounding, `singularity-grid` background, zoom controls, and drag-to-pan; interactive elements are exempt from drag hit-tests.

## AI & Data Flow
- Entry point: `handleSendMessage` in [App.tsx](App.tsx#L37-L125) guards duplicate sends, checks API key availability via `window.aistudio.hasSelectedApiKey()` or env, and opens the key picker when missing.
- Memories: fetch with `memoryService.fetchAll(10)` before calls; stored in localStorage (`MODA_MCP_MEMORIES`, capped at 100) via [services/persistenceService.ts](services/persistenceService.ts#L1-L120).
- Streaming: `getAIResponseStream(provider, history, input, memories, onChunk)` in [services/geminiService.ts](services/geminiService.ts#L1-L190); updates the last assistant message in place. Gemini default model `gemini-3-flash-preview`; OpenAI uses `gpt-4o` fetch streaming.
- System prompt and memory context are concatenated; code outputs must follow ES6 modules + Tailwind + responsive rules.
- API keys: read from `vaultService` (`MODA_EXTERNAL_SECRETS`) or env (`GEMINI_API_KEY`/`OPENAI_API_KEY`/`API_KEY`). Gemini override key `GEMINI_OVERRIDE` is supported. Missing keys throw `API_KEY_MISSING` → reopen picker.
- Extra capabilities: image (`gemini-2.5-flash-image`), video (`veo-3.1-fast-generate-preview` with polling), and live audio (`gemini-2.5-flash-native-audio-preview-12-2025`) helpers in the same service.

## UI Composition
- Smart compiler UI in [components/SmartCompiler.tsx](components/SmartCompiler.tsx): toggle providers (Gemini/OpenAI), two-pane view (Briefing/KERNEL log), streaming indicator, and locked send button during processing.
- Sections are standalone components under `/components`; they expect `messages`, `isProcessing`, `onSendMessage`, `nodes` props where applicable. Use `SectionId` enum (from `types.ts`) instead of strings.
- Navbar/Sidebar/PromptBar wire the workspace, status chip, and share/auth modals; prompt bar only shows on compiler step.

## Persistence & Auth
- Local-only persistence (no backend): `authService` returns mock user `Moda Root`; `MODA_USER_ID` defaults to `LOCAL_ARCHITECT` on first load.
- Key vault: `vaultService` stores per-provider secrets in localStorage; use it before falling back to env.

## Dev Workflow
- Scripts: `npm install`, `npm run dev` (Vite @ :5173), `npm run build`, `npm run preview`.
- Env: create `.env` or `.env.local` with `GEMINI_API_KEY`; optional `OPENAI_API_KEY`/`API_KEY`. Vite exposes env via `process.env.*`.
- Aliases: `@` → project root (see `tsconfig.json`/`vite.config.ts`).

## Conventions & Gotchas
- Always pass `onChunk` for streaming; do not await a whole response string for UI.
- When sending messages outside the compiler, navigation will auto-redirect to `/compiler` before streaming begins.
- Keep drag handlers off buttons/inputs by using `.interactive` wrappers; honor large rounded pods and `singularity-grid` aesthetic.
- Stay within the provided spring config for motion consistency; avoid introducing new motion primitives unless necessary.

Last updated: 2026-01-07.
