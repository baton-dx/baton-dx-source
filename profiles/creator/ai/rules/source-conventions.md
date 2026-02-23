# Source Conventions

## Manifest Requirements

- Source names must be kebab-case (e.g., `my-team-configs`)
- Always register all profiles in `baton.source.yaml` with correct paths
- Include a `description` for both the source and each profile entry
- Use valid semver for the `version` field
- Set the `repository` field for discoverability

## Directory Layout

- Use the conventional structure: `profiles/<name>/ai/{skills,rules,agents,memory}`
- Keep all profile content inside the `profiles/` directory
- Do not place profile files at the source root

## Versioning

- Tag releases in Git with `v` prefix (e.g., `v1.0.0`)
- Keep `baton.source.yaml` version in sync with the latest Git tag
- Follow semver:
  - New profile added → minor bump
  - New rule or skill in existing profile → minor bump
  - Bug fix in a rule or config → patch bump
  - Breaking rename or removal → major bump

## Testing and Validation

- Test profiles locally with `file:` transport before publishing
- Run `baton source validate` before committing changes
- Include `baton source validate` in CI if available

## Documentation

- Include a README.md with usage instructions at the source root
- Document each profile's purpose and target audience
- Include example `baton init` commands for each profile

## Publishing

- For GitHub: push to a repository, consumers use `github:org/repo/profile-name`
- For npm: publish as a scoped package, consumers use `npm:@org/package/profile-name`
- For local testing: consumers use `file:../path-to-source/profiles/profile-name`

## Multi-Profile Organization

- Extract shared config into a `base` profile when multiple profiles share content
- Use `extends` in child profiles to inherit from base
- Set `weight: 0` on base, `weight: 10` on specialized profiles
- Document the inheritance hierarchy in the source README
