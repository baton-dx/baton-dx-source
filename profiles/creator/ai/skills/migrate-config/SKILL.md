---
name: migrate-config
description: Migrate existing AI tool configurations into a baton profile. Use when the user has existing .cursorrules, CLAUDE.md, or other AI configs and wants to manage them with baton.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: <profile-name> (e.g., "my-project")
---

# Migrate Existing AI Configs to Baton

Convert existing per-tool AI configurations into a unified baton profile.

## Step 1: Scan for Existing Configs

Search the project for existing AI tool configuration files:

```bash
# Memory files
ls -la CLAUDE.md AGENTS.md GEMINI.md copilot-instructions.md 2>/dev/null

# Legacy rules files
ls -la .cursorrules .windsurfrules 2>/dev/null

# Tool config directories
ls -d .claude/ .cursor/ .windsurf/ .agent/ .codex/ .github/ 2>/dev/null

# Existing rules, skills, agents
find .claude .cursor .windsurf -name "*.md" 2>/dev/null
```

## Step 2: Inventory Found Configs

Create a list of what was found and which tools they belong to:

| File/Dir | Tool | Config Type |
| -------------- | ------------ | ------------- |
| `CLAUDE.md` | Claude Code | memory |
| `.cursorrules` | Cursor | legacy rules |
| `.claude/rules/` | Claude Code | rules |
| `.claude/skills/` | Claude Code | skills |

## Step 3: Create the Profile

```bash
baton source create <name>
baton profile create <profile-name>
```

## Step 4: Migrate Memory Files

Take content from existing memory files and consolidate into a single `profiles/<name>/ai/memory/MEMORY.md`. Combine the content, removing tool-specific formatting. Baton will transform it to the correct filename per tool.

## Step 5: Migrate Rules

Copy rule files from tool-specific directories into `profiles/<name>/ai/rules/`:

For `.cursorrules` (legacy single file), break it into separate rule files by topic. For Cursor's `.mdc` format, convert back to standard Markdown — baton handles the `.mdc` transformation automatically during sync.

## Step 6: Migrate Skills

```bash
cp -r .claude/skills/* profiles/<name>/ai/skills/
```

Ensure each skill directory has a `SKILL.md` file.

## Step 7: Configure the Profile Manifest

Update `profiles/<name>/baton.profile.yaml` with all migrated items:

```yaml
ai:
  tools: [claude-code, cursor, windsurf]
  skills:
    - name: skill-name
      scope: project
  rules:
    - rule-name
  memory:
    - source: MEMORY.md
      merge: append
```

## Step 8: Test

```bash
baton init --profile file:./path-to-source/profiles/<name>
baton sync --dry-run
```

Review the dry run output. Verify files would be placed in the expected locations.

## Step 9: Clean Up Legacy Files

After verifying sync works correctly, remove legacy files that baton now manages:

```bash
rm .cursorrules .windsurfrules 2>/dev/null
```

## Checklist

- [ ] All existing memory files identified and consolidated into MEMORY.md
- [ ] All existing rules migrated to profile's ai/rules/ directory
- [ ] Legacy rules files converted to standard Markdown
- [ ] Skills migrated with correct directory structure
- [ ] Profile manifest lists all migrated items
- [ ] Target tools include all tools that had existing configs
- [ ] `baton sync --dry-run` produces expected output
- [ ] Legacy files cleaned up after verification
