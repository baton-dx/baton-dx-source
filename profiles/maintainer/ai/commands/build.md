---
name: build
description: Run full build pipeline for the baton-dx monorepo
---

# Build Pipeline

Run the full build pipeline in order:

1. `bun run typecheck` — TypeScript strict check across all packages
2. `bun run build` — Build all packages with tsdown

Report any errors with file paths and line numbers. If typecheck fails, do not proceed to build.
