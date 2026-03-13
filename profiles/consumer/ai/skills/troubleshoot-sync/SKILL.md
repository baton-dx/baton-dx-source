---
name: troubleshoot-sync
description: Diagnose and fix baton sync issues. Use when sync fails, produces unexpected results, or files are not placed correctly.
allowed-tools: Read, Bash, Grep, Glob
---

## Troubleshoot Baton Sync

Diagnose and fix issues with `baton sync`.

### Step 1: Run Verbose Dry Run

```bash
baton sync --verbose --dry-run
```

This shows the full resolution process without writing files. Look for errors or warnings.

### Step 2: Check Common Issues

#### Missing `baton.yaml`

**Symptom:** "No baton.yaml found"
**Fix:** Run `baton init` to create the project manifest.

#### Invalid Profile Manifest

**Symptom:** "Failed to parse baton.profile.yaml"
**Fix:** Check YAML syntax. Common issues:
- Name not kebab-case
- Version not valid semver
- Missing required fields (name, version)
- Invalid merge strategy name

#### Source Resolution Failure

**Symptom:** "Failed to resolve source"
**Fix:**
- Check the source URL format (e.g., `github:org/repo/profile`)
- Verify network connectivity
- For GitHub sources, check repo is public or auth is configured
- For `file:` sources, verify the path exists

#### Merge Conflicts

**Symptom:** Files not updating as expected
**Fix:**
- Check the merge strategy in the profile manifest
- Use `baton diff` to see what differs
- Use `--dry-run` to preview what sync would do
- Check profile weights if multiple profiles target the same file

#### Tool Not Detected

**Symptom:** Configs not placed for a specific tool
**Fix:**
- Run `baton ai-tools scan` to verify tool is detected
- Check `ai.targets` in `baton.yaml` includes the tool
- Check `ai.tools` in the profile includes the tool

#### Lockfile Issues

**Symptom:** Sync uses stale versions
**Fix:** Delete `baton.lock` and run `baton sync` to re-resolve and fetch latest.

#### MCP Server Issues

**Symptom:** MCP servers not appearing in tool config after sync
**Fix:**
- Check that the profile has MCP server files in `ai/mcp/*.yaml`
- Verify the AI tool is listed in `ai.tools` of the profile
- If the MCP entry has a `tools` filter, confirm your tool is included
- Check the target config file for the tool (e.g., `.claude/settings.json` for Claude Code)

**Symptom:** MCP server env vars not resolving
**Fix:** MCP env values use `${VAR}` syntax. The variables must be set in your shell environment — baton passes them through as references, not resolved values.

### Step 3: Validate Manifests

Read and check the project manifest:
```bash
cat baton.yaml
cat baton.lock
```

Verify: valid source URLs, expected tool targets, no duplicate profile entries.

### Step 4: Check Diffs

```bash
baton diff
baton diff --name-only
```

### Step 5: Reset and Re-sync

If all else fails:
```bash
baton manage  # use "Remove Baton" option
baton init --profile <source-url>
baton sync
```
