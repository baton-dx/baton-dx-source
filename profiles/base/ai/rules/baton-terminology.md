# Baton Terminology

## Naming

- Use "Baton" or "Baton DX" in prose (never "baton-dx" — that is the npm package name)
- Profile names are kebab-case (e.g., `frontend`, `my-team-backend`)
- Source names are kebab-case (e.g., `my-team-configs`)
- AI tool keys use the exact canonical keys: `claude-code`, `cursor`, `windsurf`, `antigravity`, `codex`, `github-copilot`, `opencode`, `amp`, `kiro`, `zed`, `cline`, `roo`, `junie`, `trae`
- Never use camelCase or PascalCase for tool keys (not `claudeCode` or `ClaudeCode`)

## Config Types

- Always lowercase: skills, rules, agents, memory, mcp
- Skills are directories containing a SKILL.md file
- Rules are .md files (Cursor transforms them to .mdc automatically)
- Agents are .md files with YAML frontmatter
- Memory uses the canonical filename MEMORY.md in profiles
- MCP servers are declared inline in `ai.mcp` (no separate files)

## MCP Server Terminology

- **transport** — connection type: `stdio`, `http`, or `sse`
- **command** — executable for `stdio` transport (e.g., `npx`, `uvx`, `node`)
- **args** — command arguments as string array
- **env** — environment variables, use `${VAR}` or `${VAR:-default}` syntax
- **url** — server URL for `http` or `sse` transport
- **headers** — HTTP headers for `http` or `sse` transport
- **scope** — `project` or `global`, defaults to `project`
- **tools** — optional array of tool keys to restrict which AI tools receive the MCP config

## Scopes

- Use `project` or `global` (not "local", "user", "workspace", or "system")

## Merge Strategies

- Always lowercase: replace, deep, append, prepend, skip, prompt, directory, import
- Never capitalize or abbreviate merge strategy names

## CLI Commands

- Use the full command form: `baton sync`, `baton init`, `baton profile create`
- Do not invent commands that do not exist
