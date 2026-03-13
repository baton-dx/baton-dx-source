## YAML Conventions for Baton Configuration

### Manifest Files

- Use quoted strings for `name`, `description`, and `version` fields
- Version fields must be valid semver: `"1.0.0"`, `"0.1.0"` (not `"1"` or `"v1.0.0"`)
- Profile and source names must be kebab-case
- Always include the `name` and `version` fields (they are required)

### Formatting

- Indentation: 2 spaces (never tabs)
- Tools arrays may use inline format when listing tool keys:
  ```yaml
  tools: [claude-code, cursor, windsurf]
  ```

### AI Section

- Content (skills, rules, agents, memory) is auto-discovered from the filesystem — do NOT declare it in the manifest
- Only `ai.tools` is declared in the manifest (MCP servers live in `ai/mcp/*.yaml`)
- Use `MEMORY.md` as the memory source filename (baton adapters transform it per tool)
- Merge defaults to `concat`; override with `merge: replace` in file frontmatter
- Use directives (`<!-- baton:if -->`, `<!-- baton:include -->`) for conditional and shared content

<!-- baton:if tool="cursor" -->
- Cursor transforms rules to `.mdc` format with frontmatter — write standard Markdown, Baton handles the conversion
<!-- baton:endif -->

### Variables

- Variable names use snake_case: `project_type`, `node_version`
- Reference variables with double braces: `{{variable_name}}`
- No spaces inside braces: `{{name}}` not `{{ name }}`
