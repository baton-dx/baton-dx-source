---
name: configure-tools
description: Guide for selecting and configuring AI tools in a baton project or profile. Use when the user wants to target specific tools, understand tool differences, or configure tool-specific settings.
allowed-tools: Read, Write, Edit, Bash
---

## Configure AI Tools

Help the user select and configure AI tools for their baton project or profile.

### Step 1: Detect Installed Tools

```bash
baton ai-tools scan
```

This checks for 14 supported tools by scanning for CLI binaries and config directories.

### Step 2: List Available Tools

```bash
baton ai-tools list --all
```

Shows all 14 supported tools with installation status.

### Step 3: Choose Target Tools

For a **profile** (source author), set in `baton.profile.yaml`:
```yaml
ai:
  tools: [claude-code, cursor, windsurf]
```

For a **project** (consumer), set in `baton.yaml`:
```yaml
ai:
  targets: [claude-code, cursor]
```

If `ai.targets` is omitted in the project, baton uses the union of all `ai.tools` from applied profiles.

### Step 4: Understand Tool-Specific Behaviors

#### Memory File Names

| Tool | Memory File |
| --------------- | -------------------------- |
| Claude Code | `CLAUDE.md` |
| Cursor | `AGENTS.md` |
| Windsurf | `AGENTS.md` |
| Antigravity | `GEMINI.md` |
| GitHub Copilot | `copilot-instructions.md` |
| All others | `AGENTS.md` |

Use `MEMORY.md` in profiles — baton transforms it automatically.

#### Rule Format Differences

| Tool | Format |
| ---------- | ---------------------------------------- |
| Cursor | `.mdc` with frontmatter (auto-transformed) |
| Windsurf | Plain Markdown (frontmatter stripped) |
| All others | Standard Markdown |

Write rules as standard Markdown with optional YAML frontmatter. Baton handles per-tool transformation.

### Step 5: Tool-Specific Content (optional)

Use `<!-- baton:if -->` directives for tool-specific content within rule files:

```markdown
## Coding Style

General coding conventions here.

<!-- baton:if tool="cursor" -->
### Cursor-Specific Patterns
Cursor-specific guidance here.
<!-- baton:endif -->
```

### Step 6: Configure MCP Servers (optional)

Profiles can distribute MCP server configurations to AI tools. Create YAML files in `ai/mcp/` — one file per server:

`ai/mcp/server-name.yaml`:
```yaml
name: server-name
transport: stdio
command: npx
args: ["-y", "@scope/mcp-server"]
env:
  API_KEY: "${API_KEY}"
scope: project
```

For remote servers — `ai/mcp/remote-server.yaml`:
```yaml
name: remote-server
transport: http
url: "https://api.example.com/mcp"
headers:
  Authorization: "Bearer ${TOKEN}"
scope: project
```

Use `tools` to restrict which AI tools receive the config — `ai/mcp/claude-only-server.yaml`:
```yaml
name: claude-only-server
transport: stdio
command: node
args: ["server.js"]
tools: [claude-code]
```

### Step 7: Detect IDEs (optional)

```bash
baton ides scan
baton ides list --all
```

Supported: VS Code, JetBrains, Cursor, Windsurf, Antigravity, Zed.
