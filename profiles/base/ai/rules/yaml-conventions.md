# YAML Conventions for Baton Configuration

## Manifest Files

- Use quoted strings for `name`, `description`, and `version` fields
- Version fields must be valid semver: `"1.0.0"`, `"0.1.0"` (not `"1"` or `"v1.0.0"`)
- Profile and source names must be kebab-case
- Always include the `name` and `version` fields (they are required)

## Formatting

- Indentation: 2 spaces (never tabs)
- Use block style for multi-item arrays:
  ```yaml
  skills:
    - name: code-review
      scope: project
    - name: refactor
      scope: project
  ```
- Tools arrays may use inline format when listing tool keys:
  ```yaml
  tools: [claude-code, cursor, windsurf]
  ```

## AI Section

- Always specify `merge` for memory entries (typically `append`)
- Always specify `scope` for skills, agents, and rules entries (`project` or `global`)
- Use `MEMORY.md` as the memory source filename (baton adapters transform it per tool)

## File Section

- Always specify `merge` strategy for file entries
- Use relative paths for `source` (relative to profile directory)
- Use project-root-relative paths for `target`

## Variables

- Variable names use snake_case: `project_type`, `node_version`
- Reference variables with double braces: `{{variable_name}}`
- No spaces inside braces: `{{name}}` not `{{ name }}`
