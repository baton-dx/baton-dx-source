# Profile Conventions

## Manifest Requirements

- Profile names must be kebab-case (e.g., `frontend`, `my-team-backend`)
- Always include a `description` field explaining what the profile provides
- List all target `ai.tools` explicitly — do not rely on source-level defaults
- Use valid semver for the `version` field (e.g., `"1.0.0"`)

## Memory Files

- Use `MEMORY.md` as the canonical memory filename
- Baton transforms `MEMORY.md` to tool-specific names automatically
- Use `append` merge strategy for memory (accumulates context across profiles)
- Keep memory files concise — they are loaded into every AI session

## Rules

- Rules should be concise, actionable constraints
- Use `replace` merge strategy for rules (profile rules are authoritative)
- Place universal rules directly in `ai/rules/`
- Place tool-specific rules in `ai/rules/<tool-key>/` subdirectories

## Skills

- Each skill lives in its own directory with a `SKILL.md` file
- Include frontmatter: `name`, `description`, `allowed-tools`
- Include `argument-hint` if the skill accepts arguments

## Agents

- Agents must have YAML frontmatter with at least `name` and `description`
- Set `tools` in frontmatter to limit which tools the agent can use
- Set `model` if the agent benefits from a specific model tier

## Weight and Inheritance

- Set explicit `weight` when the profile will be composed with others
- Use `extends` to share common configuration via a base profile
- Lower weight = applied first, higher weight = wins conflicts
- Default weight is 0

## MCP Servers

- Declare MCP servers in `ai.mcp` as an array of server objects
- Server names must be kebab-case (used as config key in target tools)
- Use `stdio` transport for local process-based servers, `http` or `sse` for remote
- Never hardcode secrets — use `${VAR}` or `${VAR:-default}` syntax for env values
- Set `scope: project` (default) for project-specific servers, `scope: global` for user-level
- Use `tools` array to restrict which AI tools receive the server config
- `command` + `args` are required for `stdio`, `url` is required for `http`/`sse`

## Variables

- Use snake_case for variable names
- Provide sensible defaults in `variables`
- Document variables in the profile description or README
