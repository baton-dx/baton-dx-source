---
name: quality
description: Run all quality checks for the baton-dx monorepo
---

# Quality Checks

Run all quality checks in order. Stop at the first failure and report errors.

1. `bun run typecheck` — TypeScript strict check
2. `bun run lint` — Biome lint and format check
3. `bun run test` — Vitest test suite
4. `bun run dead-code` — Knip unused export check

Summarize results with pass/fail for each step. For failures, include error details with file paths and line numbers.
