---
name: validate
description: Validate source and profile manifests. Use when the user wants to check that their source repository and profiles are correctly configured.
allowed-tools: Read, Bash, Glob, Grep
---

# Validate Baton Source

Validate the current source repository and all its profiles.

## Steps

1. Read `baton.source.yaml` and verify:
   - `name` is kebab-case
   - `version` is valid semver
   - `requires["baton-cli"]` is a valid semver range (if present)

2. Auto-discover profiles from `profiles/` directory and for each verify:
   - `baton.profile.yaml` exists inside the directory
   - Profile manifest has valid `name` and `version`
   - If `extends` is set, the referenced profile exists
   - Content files (rules, memory, skills, agents) exist on disk in the conventional structure

3. Check for common issues:
   - Duplicate profile names
   - Circular inheritance chains
   - Undefined variables referenced in content files
   - Sibling profiles with same weight that could conflict

4. Run `baton source validate` if available:
   ```bash
   baton source validate
   ```

5. Report results with pass/fail for each check. For failures, include the specific file and issue.
