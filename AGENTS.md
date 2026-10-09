# Trambique Simulator — AI Agents

Read CONVENTIONS.md before any GitHub or git operation.

## Project
Incremental clicker game themed around corrupt Brazilian politics. TypeScript/React.

## Stack
TypeScript 6 · React 19 · Vite 8 · Tailwind CSS 4 · Vitest 5

## Commands
| Action | Command |
|--------|---------|
| Run    | `npm run dev` |
| Test   | `npm run test` |
| Build  | `npm run build` |
| Lint   | `npm run lint` |
| Preflight | `npm run test:run && npm run lint && npm run build` |

## Architecture
- `src/game/` — game logic, progression system, prestige mechanics
- `src/store/` — state management (zustand or context)
- `src/components/` — React UI components
- `src/hooks/` — custom React hooks
- `src/types/` — TypeScript type definitions
- `src/utils/` — utility functions

## Conventions
- Functional components only, no class components
- State management via Zustand or React Context
- All game logic in `src/game/` — pure functions, no React dependency
- Components in `src/components/` — UI only, delegate logic to hooks/store
- Types in `src/types/` — shared interfaces and types
- Tests co-located with source files (`.test.ts` / `.test.tsx`)

## Never
- Never use `any` type — use `unknown` and narrow
- Never put game logic inside React components
- Never skip tests for game mechanics (balance-critical)
- Never use `as` assertions without documented reason
- Never commit with failing tests or lint errors

## Agent Rules
- **Workflow Mandate:** You MUST use the bigpowers skills (e.g. `plan-work`, `develop-tdd`, `orchestrate-project`) to perform tasks. DO NOT write code directly in response to a user prompt like "build this feature".
- **Always Green:** Preflight and CI must be green before forward work.
- Read specs/ before writing code.
- All planning and specifications MUST be written to `specs/` before any code is generated.
- Write the minimum code that solves the stated problem. Nothing extra.
- Run tests after every change. Show evidence before declaring done.
- One clarifying question beats a wrong assumption baked into 200 lines.
- Use Portuguese variable/function names when they represent game domain concepts (votos, dinheiro, trambique).
- Preserve the satirical/humorous tone in UI text and game messages.