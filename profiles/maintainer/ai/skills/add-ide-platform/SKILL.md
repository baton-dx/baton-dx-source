---
name: add-ide-platform
description: Step-by-step guide for adding a new IDE platform to Baton. Use when adding support for a new IDE (e.g., a new editor or development environment).
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
argument-hint: <platform-key> (e.g., "neovim", "emacs", "fleet")
---

## Add New IDE Platform

Add support for a new IDE platform to Baton's IDE settings sync.

### Before You Start

Gather the following information about the IDE:
- **Key**: kebab-case identifier (e.g., `neovim`, `fleet`)
- **Name**: Human-readable name (e.g., `Neovim`, `JetBrains Fleet`)
- **Target directory**: Where settings live in a project (e.g., `.nvim/`, `.fleet/`)
- **Detection**: CLI binary name and/or home config directory (e.g., `nvim`, `~/.config/nvim/`)

### Step 1: Add to Platform Registry

**File**: `packages/core/src/ide/platform-registry.ts`

Add a new entry to the `idePlatformRegistry` object:

```typescript
export const idePlatformRegistry: Record<string, IdePlatformEntry> = {
  // ... existing platforms
  "my-ide": { targetDir: ".my-ide", detection: ["my-ide", "~/.my-ide/"] },
};
```

### Step 2: Add Detection Logic

Detection is handled by `packages/core/src/detection/ide-detection.ts`. It uses the `detection` array from the registry:
- **CLI binary names** — checked via `which`
- **Home-relative paths** — checked via file existence

No changes needed if the standard detection methods work.

### Step 3: Create Tests

**File**: `packages/core/src/ide/platform-registry.test.ts`

```typescript
describe("platform-registry", () => {
  it("should include my-ide platform", () => {
    expect(isKnownIdePlatform("my-ide")).toBe(true);
  });

  it("should return correct target directory for my-ide", () => {
    expect(getIdePlatformTargetDir("my-ide")).toBe(".my-ide");
  });

  it("should include my-ide in registered platforms", () => {
    expect(getRegisteredIdePlatforms()).toContain("my-ide");
  });
});
```

### Step 4: Update Documentation

**File**: `docs/09-ide-platforms-reference.md`

Add the new platform to the platforms table.

### Step 5: Verify

```bash
bun run typecheck
bun run test
bun run lint
baton ides scan
```

### Checklist

- [ ] Entry added to `idePlatformRegistry` in `packages/core/src/ide/platform-registry.ts`
- [ ] `targetDir` is correct for the IDE's project config location
- [ ] `detection` array has CLI binary and/or config directory
- [ ] Tests added or updated in `packages/core/src/ide/platform-registry.test.ts`
- [ ] Documentation updated in `docs/09-ide-platforms-reference.md`
- [ ] All tests pass (`bun run test`)
- [ ] Type check passes (`bun run typecheck`)
- [ ] `baton ides scan` works correctly
