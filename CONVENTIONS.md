# Conventions — Trambique Simulator

## § Always Green / Shift Left

A single broken gate left unattended compounds into ten broken gates downstream.
Fix at the first failure — not the fifth.

**Green definition:** Zero errors, zero warnings, all tests pass.

| Gate | Tool | When |
|------|------|------|
| Lint | `npm run lint` | Before every commit |
| Test | `npm run test:run` | Before every commit |
| Build | `npm run build` | Before every push |

## § Discovered Defects

When you find a bug during unrelated work:

1. **Is it quick-fixable?** (< 5 min, no design change) → fix it in a separate commit with prefix `fix:`
2. **Otherwise** → file it as `specs/bugs/BUG-<slug>.md` and keep going

Never ignore a reproducible failure with "pre-existing" or "out of scope".

## § Banned Dismissive Phrases

These phrases are forbidden in commit messages, PR descriptions, and agent output:

| Phrase | Why it's banned |
|--------|-----------------|
| "pre-existing" | Deflects responsibility from current work |
| "unrelated to my changes" | Ignores blast radius |
| "not introduced by my changes" | Same as above |
| "out of scope" | Scope is where you find it |

## § Code Style

- **TypeScript strict mode** — `strict: true` in tsconfig
- **No `any`** — use `unknown` and type guards
- **No `as` casts** — use `satisfies` or type guards
- **Functional patterns** — pure functions for game logic, hooks for React state
- **Immutability** — never mutate state directly, use spread or immer

## § File Organization

```
src/
├── components/     # React components (UI only)
│   ├── ui/         # Generic UI components (buttons, modals)
│   └── game/       # Game-specific components
├── game/           # Pure game logic (no React)
├── hooks/          # Custom React hooks
├── store/          # State management
├── types/          # TypeScript interfaces/types
├── utils/          # Utility functions
└── test/           # Test setup and helpers
```

## § Testing

- **Unit tests** for all game mechanics (balance-critical)
- **Component tests** for UI interactions
- **Test file naming:** `<name>.test.ts` or `<name>.test.tsx`
- **Co-located** with source files
- **Vitest** with `globals: true` — no imports needed for `describe/it/expect`

## § Git

- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- **No force push** on main
- **Squash merge** for feature branches

## § Game-Specific Conventions

- **Domain language:** Use Portuguese for game concepts (votos, dinheiro, trambique, propina)
- **UI language:** Portuguese (pt-BR) for all user-facing text
- **Number formatting:** Use compact notation for large numbers (1K, 1M, 1B, 1T, etc.)
- **Save system:** LocalStorage with versioned schema
- **Balance:** All progression values defined in `src/game/config.ts` — single source of truth

## § Defensive Code Categories

- **Timeout:** Game tick intervals must not block UI thread
- **Graceful degradation:** Game works without save data (fresh start)
- **Input validation:** All user inputs sanitized before game logic