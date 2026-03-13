---
name: create-pr
description: Create a well-documented pull request with summary, changes list, testing instructions, and checklist. Use when the user wants to create a PR, open a pull request, or prepare changes for review.
allowed-tools: Read, Bash, Glob, Grep
argument-hint: <optional branch name or description>
---

## Create Pull Request

Create a comprehensive, well-documented pull request for the current changes.

### Process

#### 1. Analyze Changes

```bash
git diff --stat main...HEAD 2>/dev/null || git diff --stat origin/main...HEAD
git log --oneline main...HEAD 2>/dev/null || git log --oneline origin/main...HEAD
```

#### 2. Categorize Changes

Group changes into:
- **Features**: New functionality (adapters, commands, schemas)
- **Fixes**: Bug fixes
- **Refactoring**: Code improvements without behavior change
- **Chores**: Config, dependencies, tooling

#### 3. Generate PR Description

```markdown
## Summary
Brief description of what this PR does and why.

## Changes
- List of specific changes made
- Grouped by category

## How to Test
1. Step-by-step testing instructions
2. Include specific CLI commands to verify

## Checklist
- [ ] TypeScript compiles without errors (`bun run typecheck`)
- [ ] All tests pass (`bun run test`)
- [ ] No linting errors (`bun run lint`)
- [ ] New code has test coverage
- [ ] No `any` types introduced
- [ ] All file I/O uses `fs/promises` (async)
- [ ] Named exports only (no `export default`)
- [ ] No dead code (`bun run dead-code`)
```

#### 4. Create the PR

```bash
gh pr create --title "<type>: <description>" --body "<generated description>"
```

Use conventional commit prefixes for the title: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`
