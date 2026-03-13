---
name: setup-project
description: Guide for initializing a project with Baton. Use when the user wants to set up baton in a new or existing project.
allowed-tools: Read, Write, Edit, Bash
argument-hint: <optional profile source> (e.g., "github:org/repo/frontend")
---

## Set Up a Project with Baton

Guide the user through initializing Baton in their project.

### Step 1: Check Prerequisites

Verify baton is installed:
```bash
baton --version
```

If not installed, suggest:
```bash
# Homebrew (recommended)
brew tap baton-dx/baton-dx https://github.com/baton-dx/baton-dx
brew install baton-dx

# Or via npm/bun
npm install -g @baton-dx/cli
```

### Step 2: Initialize

```bash
baton init
```

Or with a specific profile:
```bash
baton init --profile github:org/repo/profile-name
```

This creates `baton.yaml` in the project root.

### Step 3: Detect Tools

```bash
baton ai-tools scan
baton ides scan
```

Review detected tools and confirm which to configure.

### Step 4: Configure Targets

Edit `baton.yaml` to set which tools should receive configurations:

```yaml
ai:
  targets: [claude-code, cursor]
```

If omitted, baton configures all tools listed in the profile's `ai.tools`.

### Step 5: Preview and Sync

```bash
baton sync --dry-run
```

Review the output — this shows which files will be placed, including any MCP server configurations from the profile. If everything looks correct:

```bash
baton sync
```

If the profile includes MCP servers, `baton sync` writes them into the appropriate tool-specific config files (e.g., `.claude/settings.json`, `.cursor/mcp.json`).

### Step 6: Commit

```bash
git add baton.yaml baton.lock
git commit -m "chore: initialize baton"
```

Always commit both `baton.yaml` and `baton.lock` for reproducibility.

### Step 7: Team Onboarding

Other team members only need to:
```bash
baton sync
```

The lockfile ensures everyone gets identical configurations.

### Checklist

- [ ] Baton installed and accessible via `baton --version`
- [ ] `baton init` completed with desired profile(s)
- [ ] AI tools detected and targets configured
- [ ] `baton sync --dry-run` shows expected output
- [ ] `baton sync` completed successfully
- [ ] `baton.yaml` and `baton.lock` committed to version control
