# Baton DX — Creator Reference

## Profile Manifest (`baton.profile.yaml`)

Complete schema for authoring profiles:

```yaml
name: "my-profile"          # required, kebab-case
version: "1.0.0"            # required, semver
description: "Description"  # optional

extends:                     # optional, paths to parent profiles
  - ../base

weight: 10                   # optional, default 0, higher = higher priority

ai:
  tools:                     # target AI tools
    - claude-code
    - cursor
    - windsurf

  skills:
    - name: code-review
      scope: project         # project or global

  rules:
    - coding-style           # universal rule (all tools)
    - cursor:                # tool-specific rules
        - react-patterns

  agents:
    - name: reviewer
      scope: project

  memory:
    - source: MEMORY.md
      merge: append          # always specify merge strategy

files:
  - source: files/.editorconfig
    target: .editorconfig
    merge: replace

ide:
  vscode:
    settings: ide/vscode/settings.json
    extensions: ide/vscode/extensions.json

variables:
  project_type: frontend

hooks:
  post-install:
    - echo "Profile installed"
  post-update:
    - npm install
```

## Source Manifest (`baton.source.yaml`)

```yaml
name: "my-configs"           # required, kebab-case
version: "1.0.0"             # required, semver
description: "Description"   # optional
repository: "github:org/repo" # optional

ai:
  tools:                     # default tools for all profiles
    - claude-code
    - cursor

ide:
  platforms:                 # default IDE platforms
    - vscode
    - cursor

profiles:
  - name: frontend
    path: profiles/frontend
    description: "Frontend development"
  - name: backend
    path: profiles/backend
```

## Directory Layout Convention

```
my-profile/
├── baton.profile.yaml
├── ai/
│   ├── skills/
│   │   └── skill-name/
│   │       └── SKILL.md
│   ├── rules/
│   │   ├── universal-rule.md       # all tools
│   │   └── cursor/
│   │       └── tool-specific.md    # Cursor only
│   ├── agents/
│   │   └── agent-name.md
│   └── memory/
│       └── MEMORY.md
├── files/
│   └── .editorconfig
└── ide/
    └── vscode/
        ├── settings.json
        └── extensions.json
```

Rules in `ai/rules/` are universal (all tools). Rules in `ai/rules/<tool-key>/` are tool-specific.

## Config Type Formats

### Skills

Each skill is a directory containing a `SKILL.md` file:

```markdown
---
name: skill-name
description: When to use this skill
allowed-tools: Read, Write, Edit, Bash
argument-hint: <what argument to pass>
---

# Skill Title

Step-by-step instructions for the AI tool to follow.
```

### Rules

Rules are `.md` files with behavioral constraints:

```markdown
# Rule Name

## Section
- Constraint
- Constraint
```

### Agents

Agents are `.md` files with YAML frontmatter:

```markdown
---
name: agent-name
description: What this agent does
tools: Read, Grep, Glob, Bash
model: opus
memory: project
---

You are a [role]. You specialize in [domain].
```

## Merge Strategy Guide

| Strategy | Best For | Example |
| ----------- | ---------------------------------------- | --------------------- |
| `replace` | Files that must match exactly | `.editorconfig`, lint configs |
| `deep` | Structured data with additive merging | `settings.json`, `biome.json` |
| `append` | Content that should accumulate | Memory files, `.gitignore` |
| `prepend` | Profile content should appear first | Header sections |
| `skip` | Templates users customize | `.env.example` |
| `prompt` | Sensitive configs needing user review | `tsconfig.json` |
| `directory` | Full directory syncs | Skill directories |
| `import` | CSS/SCSS modular imports | Stylesheets |

## Tool-Specific Transformations

When authoring profiles, write in the canonical format. Baton's adapters handle per-tool transformations:

### Memory Files

Write `MEMORY.md` — baton transforms to:
- Claude Code: `CLAUDE.md`
- Cursor: `AGENTS.md`
- Windsurf: `AGENTS.md`
- Antigravity: `GEMINI.md`
- GitHub Copilot: `copilot-instructions.md`
- All others: `AGENTS.md`

### Rule Format Differences

Write standard Markdown with optional YAML frontmatter:
- **Cursor**: Auto-transformed to `.mdc` format with `description`, `globs`, `alwaysApply` frontmatter. Rules without `paths` get `alwaysApply: true`.
- **Windsurf**: YAML frontmatter is stripped, only plain Markdown kept.
- **All others**: Standard Markdown as-is.

### Legacy Paths

Some tools have legacy single-file configs:
- Cursor: `.cursorrules`
- Windsurf: `.windsurfrules`

Baton can migrate these to the new format.

## Profile Inheritance Design

### When to Use Inheritance

Use `extends` when multiple profiles share common content:

```
profiles/base/     (weight: 0)  — shared standards
├── profiles/frontend/  (extends: ../base, weight: 10)
└── profiles/backend/   (extends: ../base, weight: 10)
```

### How It Works

1. `resolveProfileChain()` reads the child manifest
2. Finds `extends: ["../base"]` and resolves the relative path
3. Loads the parent, checks for further extends (recursive)
4. Returns chain: `[base, child]` — parents first, child last
5. Memory with `append` merge accumulates content from all layers
6. Rules and skills from child add to or override parent

### Weight Priority

- Lower weight = applied first (easily overridden)
- Higher weight = applied later (wins conflicts)
- Default weight is 0
- Set base profiles to weight 0, specialized profiles to weight 10+

## Publishing

### GitHub

```bash
git tag v1.0.0
git push origin v1.0.0
```

Consumers reference: `github:org/repo/profile-name` or `github:org/repo/profile-name@v1.0.0`

### npm

```bash
npm publish --access public
```

Consumers reference: `npm:@org/package/profile-name`

### Local Testing

Consumers reference: `file:../path-to-source/profiles/profile-name`

Always test locally with `file:` transport before publishing.
