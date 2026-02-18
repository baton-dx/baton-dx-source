# baton-dx-source

Official Baton DX source repository. Provides AI tool configurations, skills, agents, rules, and memory files for 14 AI coding tools via composable profiles.

## Profiles

| Profile | Audience | Description |
| -------------- | -------- | ----------- |
| **maintainer** | Baton contributors | Monorepo architecture, adapter development, code quality, release workflows |
| **creator** | Source/profile authors | Profile authoring, merge strategies, tool transformations, publishing |
| **consumer** | Project developers | CLI usage, sync workflows, troubleshooting, team collaboration |
| *base* | (inherited) | Shared Baton knowledge — 14 tools, merge strategies, terminology |

All profiles extend `base` for shared Baton DX knowledge. The `base` profile is not meant to be installed directly.

## Usage

### For Baton Contributors (maintainer)

```bash
baton init --profile github:baton-dx/baton-dx-source/maintainer
baton sync
```

Includes 8 skills (add-adapter, add-ide-platform, review-code, find-dead-code, find-redundancy, create-pr, run-release, run-review), 2 agents, 3 rules, and full monorepo architecture context.

### For Source/Profile Authors (creator)

```bash
baton init --profile github:baton-dx/baton-dx-source/creator
baton sync
```

Includes 4 skills (create-source, create-profile, configure-tools, migrate-config), 2 agents (profile-builder, source-manager), and complete manifest schema reference.

### For Project Developers (consumer)

```bash
baton init --profile github:baton-dx/baton-dx-source/consumer
baton sync
```

Includes 3 skills (setup-project, troubleshoot-sync, update-profiles), 1 agent, and full CLI reference.

### Local Testing

```bash
baton init --profile file:///path/to/baton-dx-source/profiles/maintainer
baton sync --dry-run
```

### Composing Multiple Profiles

A developer who both creates profiles and uses them in projects can install both:

```yaml
# baton.yaml
profiles:
  - source: github:baton-dx/baton-dx-source/creator
  - source: github:baton-dx/baton-dx-source/consumer
```

## Architecture

```
profiles/base/        (weight: 0)  — shared knowledge, inherited by all
   ├── maintainer/    (weight: 10) — extends base
   ├── creator/       (weight: 10) — extends base
   └── consumer/      (weight: 10) — extends base
```

Base is applied first (weight 0), child profiles layer on top (weight 10). Memory files use `append` merge to accumulate context from both layers.

## AI Tools Coverage

All profiles target all 14 supported AI tools. Baton's adapter system transforms canonical configurations automatically:

| Canonical | Claude Code | Cursor | Windsurf | Antigravity | GitHub Copilot |
| --------- | ----------- | ------ | -------- | ----------- | -------------- |
| MEMORY.md | CLAUDE.md | AGENTS.md | AGENTS.md | GEMINI.md | copilot-instructions.md |
| rules/*.md | rules/*.md | rules/*.mdc | rules/*.md | rules/*.md | rules/*.md |

Plus: Codex CLI, OpenCode, Amp, Kiro, Zed, Cline, Roo, Junie, Trae.

## Structure

```
baton-dx-source/
├── baton.source.yaml          # Source manifest
├── README.md
└── profiles/
    ├── base/                  # Shared knowledge (4 files)
    ├── maintainer/            # Contributor profile (20 files)
    ├── creator/               # Author profile (13 files)
    └── consumer/              # User profile (10 files)
```

## Learn More

- [Baton DX](https://github.com/baton-dx/baton-dx)
- [Documentation](https://github.com/baton-dx/baton-dx/tree/main/docs)
- [Creating Profiles](https://github.com/baton-dx/baton-dx/blob/main/docs/04-creating-profiles.md)
- [Creating Sources](https://github.com/baton-dx/baton-dx/blob/main/docs/05-creating-sources.md)
