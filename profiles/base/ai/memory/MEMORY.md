## Baton DX

Baton is a CLI package manager for Developer Experience & AI configuration. It manages skills, rules, agents, and memory files as versioned, composable profiles for 14 AI coding tools.

CLI aliases: `baton`, `baton-dx`, `btx`

### Quick Reference

- **Source** — distribution unit (Git repo or npm package) containing profiles
- **Profile** — self-contained bundle of AI tool configs, placed via `baton sync`
- **Config types** — skills (SKILL.md directories), rules (.md files), agents (.md with frontmatter), memory (MEMORY.md), mcp (YAML files in ai/mcp/), commands (.md files in ai/commands/)
- **Scopes** — `project` (placed in project dir) or `global` (placed in home dir)
- **Merge strategies** — concat (default, appends content), replace (last profile wins)

### Key Files

| File | Purpose |
| --------------------- | --------------------------------- |
| `baton.yaml` | Project manifest (`baton init`) |
| `baton.profile.yaml` | Profile manifest (inside profile) |
| `baton.source.yaml` | Source manifest (at repo root) |
| `baton.lock` | Lockfile — always commit this |
