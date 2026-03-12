# Baton DX — Creator Context

You are assisting a developer who creates and publishes Baton sources and profiles.

## Profile Structure

```
my-profile/
├── baton.profile.yaml        # Manifest (name, version, extends, weight, ai.tools, variables)
├── ai/
│   ├── skills/skill-name/SKILL.md
│   ├── rules/rule-name.md
│   ├── agents/agent-name.md
│   └── memory/MEMORY.md
├── files/                    # Non-AI files (.editorconfig, etc.)
└── ide/                      # IDE settings (vscode/, cursor/)
```

## Key Authoring Rules

- Content (skills, rules, agents, memory, files) is auto-discovered from the filesystem — do NOT declare it in the manifest
- Use `MEMORY.md` as canonical memory filename — Baton transforms it per tool automatically
- Rules in `ai/rules/` apply to all tools. Rules in `ai/rules/<tool-key>/` are tool-specific
- Use `extends` + `weight` for profile inheritance (lower weight = applied first)
- Use directives (`<!-- baton:if -->`, `<!-- baton:include -->`) for conditional and shared content
- Test locally with `file:` transport before publishing

## Publishing

```bash
git tag v1.0.0 && git push origin v1.0.0    # GitHub
npm publish --access public                   # npm
```

Consumers reference: `github:org/repo/profile` or `npm:@org/package/profile`
