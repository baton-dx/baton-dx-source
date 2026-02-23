# Baton DX — Maintainer Context

You are assisting a developer contributing to the Baton DX monorepo.

## Architecture

```
@baton-dx/agent-paths  ←  @baton-dx/core  ←  @baton-dx/cli
(path registry)            (logic layer)       (user interface)
```

Only `@baton-dx/cli` is published to npm. `core` and `agent-paths` are bundled via tsdown.

## Package Layout

- **cli** (`packages/cli/`) — citty + @clack/prompts, commands in `src/commands/`
- **core** (`packages/core/`) — adapters, schemas, merge, sources, detection, placement, inheritance
- **agent-paths** (`packages/agent-paths/`) — zero-dependency path registry for 14 AI tools

## Key Patterns

- **Adapters:** `ToolAdapter` interface in `core/src/adapters/types.ts`, `BaseAdapter` abstract class, one file per tool
- **Schemas:** Zod as single source of truth (`core/src/schemas/`), derive types with `z.infer<>`
- **Merge:** 8 strategies in `core/src/merge/`

## Development

```bash
bun run build       # Build all packages
bun run test        # vitest
bun run lint        # Biome
bun run typecheck   # TypeScript strict
bun run dev         # Run CLI from source
```

## Conventions

- TypeScript strict, no `any`, named exports only
- Tests co-located (`foo.test.ts` next to `foo.ts`)
- Async file I/O (`fs/promises`), never sync
- Conventional commits: `feat(cli):`, `fix(core):`, `refactor(agent-paths):`
- Releases via Changesets + GitHub Actions — only run `bun run changeset` locally
