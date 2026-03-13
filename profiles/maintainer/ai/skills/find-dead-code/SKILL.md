---
name: find-dead-code
description: Find all unused code, exports, files, dependencies, and unreferenced resources in the Baton monorepo. Use when the user wants to clean up the codebase, find unused code, or reduce package size.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---

## Dead Code Finder

Systematically identify all unused and unreferenced code in this TypeScript CLI monorepo.

### Step 1: Run Knip (structural analysis)

```bash
bun run dead-code 2>&1
```

Parse the output and categorize findings into: unused files, unused exports, unused dependencies, unlisted dependencies.

### Step 2: Check what Knip misses

#### Unused Adapters
```bash
ls packages/core/src/adapters/*.ts
# Check if each adapter is registered in registry.ts
```

#### Unused CLI Commands
```bash
ls packages/cli/src/commands/*.ts
# Check if each command is registered in the CLI entry point
```

#### Unused Zod Schemas
```bash
grep -rn "export const.*Schema\|export const.*schema" packages/core/src/schemas/
# For each schema, verify it's imported somewhere
```

#### Unused Utility Functions
```bash
grep -rn "export " packages/*/src/utils/ 2>/dev/null
# Cross-reference with imports
```

#### Unused Agent Path Entries
```bash
grep -n "export\|register" packages/agent-paths/src/registry.ts
# Verify they're used by adapters or CLI
```

#### Orphaned Test Files
```bash
find packages/ -name "*.test.ts" 2>/dev/null
# For each, check if the corresponding source file exists
```

#### Commented-Out Code
```bash
grep -n "^[[:space:]]*//" packages/*/src/**/*.ts 2>/dev/null | head -30
```

### Step 3: Compile Report

#### Safe to Remove (no references anywhere)
- Unused files
- Unused exports
- Unused dependencies

#### Likely Dead (verify before removing)
- Adapters not registered in registry
- Schemas not used in validation
- Commands not wired into CLI

#### Needs Investigation
- Dynamic imports via `await import()`
- Conditional requires
- Exports consumed by external packages

### Step 4: Suggest Removal Order

1. Dependencies first (from individual `package.json` files)
2. Leaf files (no other file depends on them)
3. Intermediate files (after their dependents are removed)
4. Schema changes last (may affect downstream consumers)
