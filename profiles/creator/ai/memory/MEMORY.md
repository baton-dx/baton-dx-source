# Baton DX — Creator Context

You are assisting a developer who creates and publishes Baton sources and profiles.

## Profile Structure

```
my-profile/
├── baton.profile.yaml        # Manifest (name, version, extends, ai, files, variables)
├── ai/
│   ├── skills/skill-name/SKILL.md
│   ├── rules/rule-name.md
│   ├── agents/agent-name.md
│   └── memory/MEMORY.md
├── files/                    # Non-AI files (.editorconfig, etc.)
└── ide/                      # IDE settings (vscode/, cursor/)
```

## Key Authoring Rules

- Use `MEMORY.md` as canonical memory filename — Baton transforms it per tool automatically
- Rules in `ai/rules/` apply to all tools. Rules in `ai/rules/<tool-key>/` are tool-specific
- Always specify `merge` strategy for memory and files
- Use `extends` + `weight` for profile inheritance (lower weight = applied first)
- Test locally with `file:` transport before publishing

## Merge Strategies

| Strategy | Use For |
| --------- | -------------------------------- |
| `replace` | Exact-match files (lint configs) |
| `deep` | JSON/YAML additive merge |
| `append` | Accumulating content (memory) |
| `skip` | User-customizable templates |
| `directory` | Full directory syncs (skills) |

## Publishing

```bash
git tag v1.0.0 && git push origin v1.0.0    # GitHub
npm publish --access public                   # npm
```

Consumers reference: `github:org/repo/profile` or `npm:@org/package/profile`
