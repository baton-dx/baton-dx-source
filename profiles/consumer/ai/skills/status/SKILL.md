---
name: status
description: Show comprehensive baton project status. Use when the user wants to see the current state of baton in their project.
allowed-tools: Read, Bash, Glob
---

# Baton Project Status

Show the current state of baton in this project.

## Steps

1. Check if `baton.yaml` exists. If not, inform the user to run `baton init`.

2. Read and display `baton.yaml`:
   - List installed profiles with their source URLs
   - Show AI tool targets
   - Show any project-level variables
   - Show any overrides

3. Check if `baton.lock` exists. If so:
   - Show locked versions and commit SHAs
   - Show lock timestamp

4. Run tool detection:
   ```bash
   baton ai-tools list 2>/dev/null
   baton ides list 2>/dev/null
   ```

5. Check for divergences:
   ```bash
   baton diff --name-only 2>/dev/null
   ```

6. Summarize:
   - Number of profiles installed
   - Number of AI tools targeted
   - Whether lockfile is present and committed
   - Whether any files have diverged from the profile
