## Profile Conventions

### Manifest Requirements

- Profile names must be kebab-case (e.g., `frontend`, `my-team-backend`)
- Always include a `description` field explaining what the profile provides
- Omit `ai.tools` to target all tools, or list specific tools to restrict
- Use valid semver for the `version` field (e.g., `"1.0.0"`)
- Content (skills, rules, agents, memory, files) is auto-discovered — do NOT declare it in the manifest

### Memory Files

- Use `MEMORY.md` as the canonical memory filename
- Baton transforms `MEMORY.md` to tool-specific names automatically
- Keep memory files concise — they are loaded into every AI session

### Rules

- Rules should be concise, actionable constraints
- Place universal rules directly in `ai/rules/`
- Use `<!-- baton:if tool="..." -->` directives for tool-specific content within a rule file
- Do not use tool-key subdirectories (`ai/rules/<tool-key>/`) — use directives instead
- Use `merge: replace` in frontmatter if a rule should be authoritative (last profile wins)

### Skills

- Each skill lives in its own directory with a `SKILL.md` file
- Include frontmatter: `name`, `description`, `allowed-tools`
- Include `argument-hint` if the skill accepts arguments

### Agents

- Agents must have YAML frontmatter with at least `name` and `description`
- Set `tools` in frontmatter to limit which tools the agent can use
- Set `model` if the agent benefits from a specific model tier

### Weight and Inheritance

- Set explicit `weight` when the profile will be composed with others
- Use `extends` to share common configuration via a base profile
- Lower weight = applied first, higher weight = wins conflicts
- Default weight is 0

### MCP Servers

- Each MCP server is a separate YAML file in `ai/mcp/` (e.g., `ai/mcp/filesystem.yaml`)
- Files are auto-discovered — do not declare MCP servers in the profile manifest
- Server names must be kebab-case (derived from filename, used as config key in target tools)
- Use `stdio` transport for local process-based servers, `http` or `sse` for remote
- Never hardcode secrets — use `${VAR}` or `${VAR:-default}` syntax for env values
- Set `scope: project` (default) for project-specific servers, `scope: global` for user-level
- Use `tools` array to restrict which AI tools receive the server config
- `command` + `args` are required for `stdio`, `url` is required for `http`/`sse`

### Directives

#### Conditional Content (`baton:if`)

- Use `<!-- baton:if tool="..." -->` for tool-specific content within a single file
- Supports `<!-- baton:else -->` for fallback content
- Supports expression-based conditions: `<!-- baton:if condition="..." -->`
- Available condition attributes: `tool`, `not-tool`, `ide`, `scope`, `type`, `file`, `not-file`, `var`, `not-var`, `has`, `not-has`

#### Shared Content (`baton:include`)

- Use `<!-- baton:include src="..." -->` to share fragments across skills/rules without duplication
- Include modes: `inline` (embed content), `link` (create file link), `reference` (create `@`-reference)
- Use `@project/` prefix for project-relative includes
- Place shared fragments in `ai/memory/shared/` — they become `@.baton/includes/...` references
- Supports ROOT + Fragments pattern for composing memory from reusable pieces

### Commands

- Commands are .md files in `ai/commands/`
- Each command file is auto-discovered from the filesystem
- Commands extend the AI tool's slash-command or action capabilities

### Hooks

- Use `hooks.post-install` to run commands after a profile is first installed
- Use `hooks.post-update` to run commands after a profile is updated
- Declare hooks in the profile manifest (`baton.profile.yaml`)

### Variables

- Use snake_case for variable names
- Provide sensible defaults in `variables`
- Document variables in the profile description or README
