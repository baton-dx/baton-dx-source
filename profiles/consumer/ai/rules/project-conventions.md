# Project Conventions

## baton.yaml

- Always commit `baton.yaml` to version control
- List profiles in priority order (later profiles override earlier ones for equal weight)
- Set `ai.targets` explicitly to limit which tools get configured
- Use `overrides` sparingly — prefer adjusting profile weights instead

## Lockfile

- Always commit `baton.lock` to version control
- Run `baton sync` after pulling changes to ensure lockfile is current
- Use `baton update` to fetch latest profile versions (bypasses lockfile)
- Never manually edit `baton.lock`

## Variables

- Override profile variables in `baton.yaml` under `variables`
- Variable values in the project manifest take precedence over profile defaults
- Use snake_case for variable names

## Sync Workflow

- Always preview changes first: `baton sync --dry-run`
- Review the output before applying
- After sync, check `baton diff` for any unexpected divergences
- Commit `baton.lock` after successful sync

## Team Collaboration

- New team members: clone the repo, run `baton sync` to get all configs
- Profile updates: run `baton update --dry-run` to preview, then `baton update`
- Adding a profile: use `baton manage` or edit `baton.yaml` directly, then `baton sync`
