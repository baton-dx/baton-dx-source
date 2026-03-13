---
name: create-profile
description: Guide for creating a new profile in a baton source. Use when the user wants to add a profile, create AI tool configs, or set up project standards.
allowed-tools: Read, Write, Edit, Bash, Glob
argument-hint: <profile-name> (e.g., "frontend", "backend", "data-science")
---

## Create a New Baton Profile

Guide the user through creating a complete profile with AI configurations.

### Step 1: Scaffold the Profile

Inside the source repo:
```bash
baton profile create <profile-name>
```

Or manually:
```bash
mkdir -p profiles/<name>/ai/{skills,rules,agents,memory,mcp,commands}
mkdir -p profiles/<name>/{files,ide}
touch profiles/<name>/baton.profile.yaml
```

### Step 2: Configure the Profile Manifest

Create `profiles/<name>/baton.profile.yaml`:

```yaml
name: "<profile-name>"
version: "0.1.0"
description: "Description of what this profile provides"
```

Content (rules, memory, skills, agents, mcp, commands) is auto-discovered from the filesystem — do NOT declare it in the manifest. Omit `ai.tools` to target all tools.

Key decisions:
- **tools**: Which AI tools should this profile target?
- **extends**: Should this profile extend a base profile? Use `extends: base`
- **weight**: If composed with other profiles, what priority? Default is 0

### Step 3: Create Memory File

Create `profiles/<name>/ai/memory/MEMORY.md`:

```markdown
## Project Context

### About This Project
Describe the project type, key technologies, and important context.

### Architecture
Key architectural decisions, patterns, and constraints.

### Conventions
Coding standards, naming conventions, and team agreements.
```

This is the most important file — it gives AI tools persistent context about the project.

### Step 4: Create Rules

Create rule files in `profiles/<name>/ai/rules/`:

Rules should be concise and actionable. Common rules:
- `coding-style.md` — formatting, naming, patterns
- `testing.md` — test conventions and requirements
- `architecture.md` — structural constraints

For tool-specific content, use `<!-- baton:if -->` directives within rule files instead of subdirectories:
```markdown
<!-- baton:if tool="cursor" -->
Cursor-specific guidance here.
<!-- baton:endif -->

<!-- baton:if has="typescript" -->
For TypeScript projects, consider adding rules for strict mode, Zod schema patterns, and async conventions.
<!-- baton:endif -->

## Step 5: Create Skills (optional)

For each skill, create a directory with SKILL.md:

```
profiles/<name>/ai/skills/<skill-name>/
└── SKILL.md
```

Include frontmatter with `name`, `description`, `allowed-tools`, and optionally `argument-hint`.

## Step 6: Create Agents (optional)

Create agent files in `profiles/<name>/ai/agents/` with YAML frontmatter including `name`, `description`, `tools`, and optionally `model` and `memory`.

## Step 7: Configure MCP Servers (optional)

Create YAML files in `ai/mcp/` — one file per server (auto-discovered):

`ai/mcp/filesystem.yaml`:
```yaml
name: filesystem
transport: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-filesystem"]
env:
  ROOT_DIR: "${HOME}"
scope: project
```

`ai/mcp/remote-api.yaml`:
```yaml
name: remote-api
transport: http
url: "https://api.example.com/mcp"
scope: project
```

Key decisions:
- **transport**: `stdio` for local process-based servers, `http` or `sse` for remote
- **scope**: `project` places config per-project, `global` places in home directory
- **tools**: Optionally restrict to specific AI tools (e.g., `tools: [claude-code]`)
- **env**: Use `${VAR}` syntax for environment variables — never hardcode secrets

## Step 8: Validate

```bash
baton source validate
```

Profiles are auto-discovered from the `profiles/` directory — no manual registration needed.

## Checklist

- [ ] Profile directory exists with conventional layout
- [ ] `baton.profile.yaml` has valid name and version
- [ ] Memory file created with meaningful project context
- [ ] At least one rule file created
- [ ] MCP servers configured if the profile provides tool integrations
- [ ] Validation passes
