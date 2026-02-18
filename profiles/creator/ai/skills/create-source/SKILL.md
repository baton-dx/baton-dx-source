---
name: create-source
description: Guide for creating a new baton source repository. Use when the user wants to create a new source, start sharing configs, or set up a team DX repo.
allowed-tools: Read, Write, Edit, Bash
argument-hint: <source-name> (e.g., "my-team-configs")
---

# Create a New Baton Source Repository

Guide the user through creating a source repository that can host one or more profiles.

## Step 1: Scaffold the Source

```bash
baton source create <source-name>
```

Optional flags:
```bash
baton source create <source-name> \
  --description "Team DX standards" \
  --profile frontend \
  --profile backend
```

This creates a directory with `baton.source.yaml`, a default profile, and a README.

## Step 2: Review the Source Manifest

Open `baton.source.yaml` and verify:
- `name` is kebab-case
- `version` is valid semver (e.g., `0.1.0`)
- `description` is helpful
- `profiles` array lists all profiles with correct paths

## Step 3: Add Repository URL (optional)

If the source will be hosted on GitHub/GitLab, add:
```yaml
repository: "github:my-org/my-team-configs"
```

## Step 4: Add Profiles

For each profile, either:
- Use `baton profile create <name>` inside the source directory
- Manually create `profiles/<name>/` with `baton.profile.yaml`

See the `create-profile` skill for detailed profile creation guidance.

## Step 5: Set Up Git

```bash
git init
git add .
git commit -m "feat: initial source release"
git remote add origin git@github.com:my-org/my-team-configs.git
git push -u origin main
```

## Step 6: Register Globally (optional)

```bash
baton source connect github:my-org/my-team-configs --name my-team
```

## Step 7: Version and Tag

```bash
git tag v0.1.0
git push origin v0.1.0
```

Consumers can pin to this version:
```yaml
source: github:my-org/my-team-configs@v0.1.0/frontend
```

## Checklist

- [ ] `baton.source.yaml` exists at root with valid name, version, description
- [ ] At least one profile exists and is registered in the profiles array
- [ ] Each profile path points to a directory with `baton.profile.yaml`
- [ ] Git repository initialized and pushed
- [ ] Version tagged in Git
- [ ] README.md includes usage instructions
