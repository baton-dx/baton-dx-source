---
name: create-profile
description: Guide for creating a new profile in a baton source. Use when the user wants to add a profile, create AI tool configs, or set up project standards.
allowed-tools: Read, Write, Edit, Bash, Glob
argument-hint: <profile-name> (e.g., "frontend", "backend", "data-science")
---

# Create a New Baton Profile

Guide the user through creating a complete profile with AI configurations.

## Step 1: Scaffold the Profile

Inside the source repo:
```bash
baton profile create <profile-name>
```

Or manually:
```bash
mkdir -p profiles/<name>/ai/{skills,rules,agents,memory,commands}
mkdir -p profiles/<name>/{files,ide}
touch profiles/<name>/baton.profile.yaml
```

## Step 2: Configure the Profile Manifest

Create `profiles/<name>/baton.profile.yaml`:

```yaml
name: "<profile-name>"
version: "0.1.0"
description: "Description of what this profile provides"

ai:
  tools: [claude-code, cursor, windsurf]
  rules:
    - coding-style
  memory:
    - source: MEMORY.md
      merge: append
```

Key decisions:
- **tools**: Which AI tools should this profile target?
- **extends**: Should this profile extend a base profile? Use `extends: ["../base"]`
- **weight**: If composed with other profiles, what priority? Default is 0

## Step 3: Create Memory File

Create `profiles/<name>/ai/memory/MEMORY.md`:

```markdown
# Project Context

## About This Project
Describe the project type, key technologies, and important context.

## Architecture
Key architectural decisions, patterns, and constraints.

## Conventions
Coding standards, naming conventions, and team agreements.
```

This is the most important file — it gives AI tools persistent context about the project.

## Step 4: Create Rules

Create rule files in `profiles/<name>/ai/rules/`:

Rules should be concise and actionable. Common rules:
- `coding-style.md` — formatting, naming, patterns
- `testing.md` — test conventions and requirements
- `architecture.md` — structural constraints

For tool-specific rules, create subdirectories:
```
ai/rules/
├── coding-style.md          # universal (all tools)
└── cursor/
    └── react-patterns.md    # Cursor only
```

## Step 5: Create Skills (optional)

For each skill, create a directory with SKILL.md:

```
profiles/<name>/ai/skills/<skill-name>/
└── SKILL.md
```

Include frontmatter with `name`, `description`, `allowed-tools`, and optionally `argument-hint`.

## Step 6: Create Agents (optional)

Create agent files in `profiles/<name>/ai/agents/` with YAML frontmatter including `name`, `description`, `tools`, and optionally `model` and `memory`.

## Step 7: Create Commands (optional)

Create command files in `profiles/<name>/ai/commands/` with YAML frontmatter including `name` and `description`.

## Step 8: Register in Source Manifest

Add the profile to `baton.source.yaml`:

```yaml
profiles:
  - name: "<profile-name>"
    path: "profiles/<profile-name>"
    description: "<profile description>"
```

## Step 9: Validate

```bash
baton source validate
```

## Checklist

- [ ] Profile directory exists with conventional layout
- [ ] `baton.profile.yaml` has valid name, version, and ai.tools
- [ ] Memory file created with meaningful project context
- [ ] At least one rule file created
- [ ] Profile registered in `baton.source.yaml`
- [ ] Validation passes
