# Baton DX — Consumer Reference

## CLI Commands

### Project Commands

#### `baton init`

Initialize Baton in your project. Creates `baton.yaml`.

```bash
baton init
baton init --profile github:org/repo/profile-name
baton init --yes --force
```

Flags: `--profile <source>` (skip source selection), `--force` (overwrite existing baton.yaml)

#### `baton sync`

Resolve, merge, transform, and place all configurations from your profiles.

```bash
baton sync
baton sync --dry-run
baton sync --verbose
baton sync --category ai
```

Process: fetch sources → validate manifests → sort by weight → transform per tool → place files → update lockfile.

Flags: `--category <type>` (filter: `ai`, `files`, or `ide`)

#### `baton update`

Check for and apply updates to installed profiles (bypasses lockfile).

```bash
baton update
baton update --dry-run
```

#### `baton diff`

Compare local files with remote source versions.

```bash
baton diff
baton diff --name-only
```

Exit codes: 0 = no differences, 1 = differences detected.

#### `baton manage`

Interactive project management wizard. Add/remove profiles, change targets, modify variables.

```bash
baton manage
```

#### `baton config`

Show dashboard or configure settings.

```bash
baton config              # dashboard
baton config list         # all settings
baton config get <key>    # get value
baton config set <key> <value>  # set value
```

### AI Tools Commands

#### `baton ai-tools scan`

Detect installed AI tools. Prompts to save to `~/.baton/config.yaml`.

#### `baton ai-tools list`

List configured tools. Flags: `--all` (show all 14), `--json`.

### IDE Commands

#### `baton ides scan`

Detect installed IDE platforms.

#### `baton ides list`

List configured IDEs. Flags: `--all`, `--json`.

### Global Flags

- `--help / -h` — show help
- `--version / -v` — show version
- `--yes / -y` — non-interactive mode
- `--dry-run` — preview without writing
- `--verbose` — debug logging

## Project Manifest (`baton.yaml`)

```yaml
profiles:
  - source: github:org/repo/frontend
  - source: github:org/repo/backend
  - source: file:../local/experimental

ai:
  targets: [claude-code, cursor]   # limit which tools get configured

variables:
  project_name: "My App"

overrides:
  files:
    .gitignore:
      merge: skip
```

## Lockfile (`baton.lock`)

Records exact versions and commit hashes for reproducibility.

- `baton sync` respects locked versions
- `baton update` bypasses lockfile, fetches latest
- Always commit `baton.lock` to version control
- Team members get identical configs via the lockfile

## Multi-Profile Composition

When multiple profiles are applied:

1. Profiles sorted by `weight` (lowest first)
2. Equal weight: order in `baton.yaml` wins
3. Each profile layers on top of previous
4. Project `overrides` applied last

## Source References

Profiles can come from different transports:

| Transport | Format | Example |
| --------- | ------------------------------------ | ----------------------------------------- |
| GitHub | `github:org/repo/profile` | `github:my-org/dx-configs/frontend` |
| GitHub (pinned) | `github:org/repo/profile@version` | `github:my-org/dx-configs/frontend@v1.0` |
| GitLab | `gitlab:org/repo/profile` | `gitlab:team/configs/backend` |
| npm | `npm:@org/package/profile` | `npm:@my-org/dx/frontend` |
| Local | `file:path/to/profile` | `file:../my-source/profiles/frontend` |
