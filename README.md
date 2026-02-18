# baton-dx-source

Baton source repository.

## Usage

Add profiles from this source repository to your project:

```bash
# From GitHub (after you push)
baton init --profile github:baton/baton-dx-source/profiles/default

# Or locally (for testing)
baton init --profile file:./baton-dx-source/profiles/default
```

## Next Steps

1. **Customize your profiles:**
   - Edit `baton.source.yaml` to configure the source metadata
   - Modify profiles in `profiles/*/baton.profile.yaml`
   - Add project-specific configurations to `profiles/*/files/`
   - Customize AI tool configs in `profiles/*/ai/`

2. **Create additional profiles:**
   ```bash
   cd baton-dx-source
   baton profile create frontend
   baton profile create backend
   ```

3. **Set up Git remote:**
   ```bash
   git remote add origin https://github.com/baton/baton-dx-source.git
   git push -u origin main
   ```

4. **Share with your team:**
   - Publish to GitHub for team-wide access
   - Team members can use: `baton init --profile github:baton/baton-dx-source/profiles/default`

## Structure

- `baton.source.yaml` - Source repository manifest
- `profiles/` - Container for all profiles
  - `profiles/default/` - Default profile
    - `baton.profile.yaml` - Profile manifest
    - `ai/` - AI tool configurations
    - `files/` - Dotfiles and configs to sync
    - `ide/` - IDE settings

## Learn More

- [Baton Documentation](https://github.com/baton-dx/baton)
- [Source Schema](https://github.com/baton-dx/baton/blob/main/docs/source-schema.md)
- [Profile Schema](https://github.com/baton-dx/baton/blob/main/docs/profile-schema.md)

---

Generated with `baton source create`
