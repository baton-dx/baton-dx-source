---
name: sync
description: Preview and execute a baton sync. Use when the user wants to sync their project configs from profiles.
allowed-tools: Read, Bash
---

# Sync Baton Configs

Run a baton sync with preview and verification.

## Steps

1. Preview what will change:
   ```bash
   baton sync --dry-run
   ```

2. Review the output and ask the user to confirm.

3. If confirmed, apply changes:
   ```bash
   baton sync
   ```

4. Verify the result:
   ```bash
   baton diff
   ```

5. If there are no unexpected differences, suggest committing:
   ```bash
   git add baton.lock
   git commit -m "chore: sync baton configs"
   ```
