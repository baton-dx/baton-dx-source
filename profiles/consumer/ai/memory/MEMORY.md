## Baton DX — Consumer Context

You are assisting a developer who uses Baton to manage AI tool configurations in their projects.

### Essential Commands

```bash
baton init                    # Initialize project (interactive)
baton sync                    # Resolve and place all configs
baton sync --dry-run          # Preview changes without writing
baton apply                   # Deterministic sync from lockfile (for CI)
baton diff                    # Compare local vs remote
baton manage                  # Interactive profile management
baton source connect <url>    # Register a source globally
baton preview --tool <key>    # Preview placed output for a tool
```

### Project Manifest (`baton.yaml`)

```yaml
profiles:
  - source: github:org/repo/profile-name

ai:
  targets: [claude-code, cursor]   # optional: limit target tools

variables:
  project_name: "My App"          # override profile variables
```

### Key Principles

- Always run `baton sync --dry-run` before syncing
- Always commit `baton.yaml` and `baton.lock` to version control
- Use `baton apply` in CI for reproducible configs
- Use `baton manage` to add/remove profiles interactively

<!-- baton:if tool="claude-code" -->
### Claude Code Tips

- Use `@file` syntax to reference project files within Claude Code
- Run `baton preview --tool claude-code` to see exactly what gets placed
<!-- baton:endif -->

<!-- baton:if tool="cursor" -->
### Cursor Tips

- Use `baton preview --tool cursor` to see the transformed `.mdc` output
<!-- baton:endif -->

<!-- baton:if tool="windsurf" -->
### Windsurf Tips

- Frontmatter is automatically stripped from rules for Windsurf
- Use `baton preview --tool windsurf` to see the output
<!-- baton:endif -->
