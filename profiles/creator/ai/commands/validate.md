---
name: validate
description: Validate source and profile manifests
---

# Validate Baton Source

Validate the current source repository and all its profiles.

## Steps

1. Read `baton.source.yaml` and verify:
   - `name` is kebab-case
   - `version` is valid semver
   - All entries in `profiles` array have `name`, `path`, and `description`

2. For each registered profile, verify:
   - Directory exists at the declared `path`
   - `baton.profile.yaml` exists inside the directory
   - Profile manifest has valid `name` and `version`
   - If `extends` is set, the referenced profile path exists
   - All referenced files (memory sources, rules, skills) exist on disk

3. Check for common issues:
   - Profiles that exist on disk but are not registered in `baton.source.yaml`
   - Duplicate profile names
   - Circular inheritance chains
   - Missing MEMORY.md files referenced in memory entries

4. Run `baton source validate` if available:
   ```bash
   baton source validate
   ```

5. Report results with pass/fail for each check. For failures, include the specific file and issue.
