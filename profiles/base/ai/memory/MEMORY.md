# Baton DX — Core Concepts

## What is Baton

Baton is a CLI package manager for Developer Experience & AI configuration. It manages Skills, Rules, Agents, Memory Files, Commands, and file configs as versioned, composable profiles for 14 AI coding tools. Think of it as "npm for DX configs" — source repositories contain profiles that get resolved, merged, transformed, and placed into the correct format for each AI tool.

CLI aliases: `baton`, `baton-dx`, `btx`

## Core Concepts

### Sources

A source repository is the distribution unit. It is a directory (typically a Git repo) containing a `baton.source.yaml` manifest at its root. Sources are hosted via:
- `github:` — GitHub repository
- `gitlab:` — GitLab repository
- `git:` — any Git remote
- `npm:` — npm registry package
- `file:` — local filesystem path

### Profiles

A profile is a self-contained bundle of AI tool configurations, file placements, and IDE settings. Profiles live inside source repositories. A single source can export multiple profiles. Each profile has its own directory with a `baton.profile.yaml` manifest.

### Config Types

| Type | Description | File Pattern |
| -------- | ---------------------------------------- | ------------------------------- |
| skills | Reusable capability prompts | Directory with SKILL.md |
| rules | Behavioral constraints and coding standards | .md files |
| agents | Specialized AI personas | .md files with YAML frontmatter |
| memory | Persistent project context | MEMORY.md (transformed per tool) |
| commands | Custom slash commands | .md files |
| settings | Tool settings | JSON files |

### Scopes

- `project` — placed in the project directory (e.g., `.claude/skills/`)
- `global` — placed in the user's home directory (e.g., `~/.claude/skills/`)

## Supported AI Tools (14)

| Tool | Key | Config Dir | Memory File |
| --------------- | ----------------- | ---------- | -------------------------- |
| Claude Code | `claude-code` | `.claude/` | `CLAUDE.md` |
| Cursor | `cursor` | `.cursor/` | `AGENTS.md` |
| Windsurf | `windsurf` | `.windsurf/` | `AGENTS.md` |
| Antigravity | `antigravity` | `.agent/` | `GEMINI.md` |
| Codex CLI | `codex` | `.codex/` | `AGENTS.md` |
| GitHub Copilot | `github-copilot` | `.github/` | `copilot-instructions.md` |
| OpenCode | `opencode` | `.opencode/` | `AGENTS.md` |
| Amp | `amp` | `.agents/` | `AGENTS.md` |
| Kiro | `kiro` | `.kiro/` | `AGENTS.md` |
| Zed | `zed` | `.zed/` | `AGENTS.md` |
| Cline | `cline` | `.cline/` | `AGENTS.md` |
| Roo | `roo` | `.roo/` | `AGENTS.md` |
| Junie | `junie` | `.junie/` | `AGENTS.md` |
| Trae | `trae` | `.trae/` | `AGENTS.md` |

Use `MEMORY.md` as the canonical memory filename in profiles. Baton's adapters transform it to the tool-specific filename automatically.

## Merge Strategies (8)

| Strategy | Behavior |
| ----------- | ---------------------------------------------------- |
| `replace` | Target completely replaced with source |
| `deep` | JSON/YAML deep merge (source keys override target) |
| `append` | Source appended to target with separator |
| `prepend` | Source prepended to target |
| `skip` | Only write if target does not exist |
| `prompt` | Ask user interactively (replace/skip/diff) |
| `directory` | Directory merge: add new files, overwrite existing |
| `import` | Add `@import` reference line to target |

## Profile Inheritance

Profiles can extend other profiles using `extends` in `baton.profile.yaml`:

```yaml
extends:
  - ../base
```

Inheritance rules:
- Parent profiles are loaded first, child configurations layer on top
- Conflicts resolved in favor of the child
- The `weight` field controls priority when multiple profiles are composed:
  - Lower weight = applied first (easily overridden)
  - Higher weight = applied later (wins conflicts)
  - Default weight is 0

## Variable Substitution

Profiles can declare variables and use `{{variable_name}}` syntax in any Markdown or configuration file:

```yaml
variables:
  project_type: frontend
  framework: react
```

Variables can be overridden by the consuming project in `baton.yaml`.

## Key Configuration Files

| File | Purpose |
| ----------------------- | ------------------------------------------- |
| `baton.yaml` | Project manifest (created by `baton init`) |
| `baton.profile.yaml` | Profile manifest (inside a profile directory) |
| `baton.source.yaml` | Source manifest (at source repo root) |
| `baton.lock` | Lockfile for reproducible syncs |
| `~/.baton/config.yaml` | User-wide global configuration |

## IDE Platforms (6)

| Platform | Target Dir | Detection |
| ----------- | -------------- | ---------------------------------- |
| VS Code | `.vscode` | `code` binary, `~/.vscode/` |
| JetBrains | `.idea` | `idea` binary, `~/.config/JetBrains/` |
| Cursor | `.cursor` | `cursor` binary, `~/.cursor/` |
| Windsurf | `.windsurf` | `windsurf` binary, `~/.windsurf/` |
| Antigravity | `.antigravity` | `antigravity` binary, `~/.antigravity/` |
| Zed | `.config/zed` | `zed` binary, `~/.config/zed/` |
