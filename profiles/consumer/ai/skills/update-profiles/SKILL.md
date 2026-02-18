---
name: update-profiles
description: Guide for updating baton profiles and reviewing changes. Use when the user wants to update to latest profile versions or review what changed.
allowed-tools: Read, Bash, Grep
---

# Update Baton Profiles

Guide the user through updating their installed profiles to the latest versions.

## Step 1: Check Current State

```bash
baton diff
```

This shows files that have diverged from the profile. Note any local modifications.

## Step 2: Preview Updates

```bash
baton update --dry-run
```

This bypasses the lockfile and shows what the latest profile versions would change.

## Step 3: Review Changes

For each changed file, the user should consider:
- **Is the change expected?** (new rules, updated memory, etc.)
- **Will it overwrite local modifications?** (check merge strategies)
- **Are there breaking changes?** (renamed or removed configs)

## Step 4: Apply Updates

```bash
baton update
```

## Step 5: Verify

```bash
baton diff
```

Should show no differences after a successful update.

## Step 6: Commit

```bash
git add baton.lock
git commit -m "chore: update baton profiles"
```

The lockfile now pins the new versions. Team members will get the same versions after pulling and running `baton sync`.

## Rollback

If the update caused issues, restore the previous lockfile:

```bash
git checkout HEAD~1 -- baton.lock
baton sync
```

This restores the previously pinned versions.
