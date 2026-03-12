---
name: scaffold-profile
description: Scaffold a new profile interactively. Use when the user wants to create a new profile with interactive prompts for name, tools, and inheritance.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Create New Profile

Interactively scaffold a new profile in the current source repository.

## Steps

1. Verify we are in a source repository (check for `baton.source.yaml`). If not found, suggest running `baton source create` first.

2. Ask the user for:
   - Profile name (must be kebab-case)
   - Brief description
   - Which AI tools to target (show list of 14)
   - Whether it should extend another profile (list existing profiles)

3. Create the profile:
   ```bash
   baton profile create <name>
   ```

4. Update the profile manifest with the chosen tools, extends reference, and weight.

5. Create an initial memory file (`ai/memory/MEMORY.md`) with placeholder sections. Ask the user what context to include.

6. Create at least one rule file based on the project type.

7. Validate (profiles are auto-discovered from `profiles/` — no manual registration needed):
   ```bash
   baton source validate
   ```

8. Suggest next steps: add more rules, create skills, sync to a test project.
