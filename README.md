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

## Quick Start

### 1. Connect the source globally

Register this source once on your machine. After that, all profiles are available by name — no need to type full URIs.

```bash
baton source connect github:baton-dx/baton-dx-source
```

### 2. Initialize a project

Run `baton init` in your project directory. The interactive wizard lets you pick from all connected sources and their profiles:

```bash
baton init
```

Select the profile that matches your role (maintainer, creator, or consumer). This creates a `baton.yaml` in your project.

### 3. Sync configurations

```bash
baton sync
```

This resolves profiles, merges configs, transforms them per tool, and places everything. Run `baton sync --dry-run` first to preview changes.

## Alternative: Inline profile reference

If you prefer a one-liner without connecting the source first, pass the full profile URI directly:

```bash
baton init --profile github:baton-dx/baton-dx-source/creator
baton sync
```

This works the same way but requires the full URI every time.

## Composing Multiple Profiles

A developer who both creates profiles and uses them in projects can install both:

```yaml
# baton.yaml
profiles:
  - source: github:baton-dx/baton-dx-source/creator
  - source: github:baton-dx/baton-dx-source/consumer
```

## What Each Profile Includes

**maintainer** — 11 skills (add-adapter, add-ide-platform, review-code, find-dead-code, find-redundancy, create-pr, run-release, run-review, build, quality, verify), 2 agents, 3 rules

**creator** — 6 skills (create-source, create-profile, configure-tools, migrate-config, scaffold-profile, validate), 2 agents (profile-builder, source-manager), 2 rules

**consumer** — 5 skills (setup-project, troubleshoot-sync, update-profiles, sync, status), 1 agent, 1 rule

## Architecture

```text
profiles/base/        (weight: 0)  — shared knowledge, inherited by all
   ├── maintainer/    (weight: 10) — extends base
   ├── creator/       (weight: 10) — extends base
   └── consumer/      (weight: 10) — extends base
```

Base is applied first (weight 0), child profiles layer on top (weight 10).

## AI Tools Coverage

All profiles target all 14 supported AI tools. Baton's adapter system transforms canonical configurations automatically:

| Canonical | Claude Code | Cursor | Windsurf | Antigravity | GitHub Copilot |
| --------- | ----------- | ------ | -------- | ----------- | -------------- |
| MEMORY.md | CLAUDE.md | AGENTS.md | AGENTS.md | GEMINI.md | copilot-instructions.md |
| rules/*.md | rules/*.md | rules/*.mdc | rules/*.md | rules/*.md | rules/*.md |

Plus: Codex CLI, OpenCode, Amp, Kiro, Zed, Cline, Roo, Junie, Trae.

## Structure

```text
baton-dx-source/
├── baton.source.yaml          # Source manifest
├── README.md
└── profiles/
    ├── base/                  # Shared knowledge
    ├── maintainer/            # Contributor profile
    ├── creator/               # Author profile
    └── consumer/              # User profile
```

## Local Testing

For development, use the `file:` transport to test profiles locally:

```bash
baton source connect file:///path/to/baton-dx-source
baton init
baton sync --dry-run
```

## Learn More

- [Baton DX](https://github.com/baton-dx/baton-dx)
- [Documentation](https://github.com/baton-dx/baton-dx/tree/main/docs)
- [Creating Profiles](https://github.com/baton-dx/baton-dx/blob/main/docs/04-creating-profiles.md)
- [Creating Sources](https://github.com/baton-dx/baton-dx/blob/main/docs/03-creating-sources.md)
