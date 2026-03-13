## Baton DX — Creator Context

You are assisting a developer who creates and publishes Baton sources and profiles.

### Profile Structure

```
my-profile/
├── baton.profile.yaml        # Manifest (name, version, extends, weight, ai.tools, variables)
├── ai/
│   ├── skills/skill-name/SKILL.md
│   ├── rules/rule-name.md
│   ├── agents/agent-name.md
│   ├── commands/command-name.md
│   ├── mcp/server-name.yaml
│   └── memory/MEMORY.md
├── files/                    # Non-AI files (.editorconfig, etc.)
└── ide/                      # IDE settings (vscode/, cursor/)
```

### Key Authoring Rules

- Content (skills, rules, agents, memory, files) is auto-discovered from the filesystem — do NOT declare it in the manifest
- Use `MEMORY.md` as canonical memory filename — Baton transforms it per tool automatically
- Use `<!-- baton:if tool="..." -->` directives for tool-specific content (not tool-key subdirectories)
- Use `extends` + `weight` for profile inheritance (lower weight = applied first)
- Use directives (`<!-- baton:if -->`, `<!-- baton:else -->`, `<!-- baton:include -->`) for conditional and shared content
- Test locally with `file:` transport before publishing

### Publishing

```bash
git tag v1.0.0 && git push origin v1.0.0    # GitHub
npm publish --access public                   # npm
```

Consumers reference: `github:org/repo/profile` or `npm:@org/package/profile`
