---
name: verify
description: Pre-commit verification for the baton-dx monorepo. Use when the user wants to verify the codebase is ready to commit.
allowed-tools: Bash, Grep, Glob
---

## Pre-Commit Verification

Run pre-commit checks to ensure the codebase is ready to commit.

### Automated checks

1. `bun run typecheck` — TypeScript strict check
2. `bun run lint` — Biome lint
3. `bun run test` — Vitest tests

### Manual pattern checks

4. Check for `console.log` in library code (`packages/core/`, `packages/agent-paths/`)
5. Check for `export default` usage anywhere in `packages/`
6. Check for sync `fs` calls (`readFileSync`, `writeFileSync`, `existsSync`, `mkdirSync`)

Report a pass/fail summary for each check. If all pass, confirm safe to commit. If any fail, list specific files and issues to fix.
