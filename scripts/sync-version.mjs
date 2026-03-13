#!/usr/bin/env node

/**
 * Syncs the version from package.json to baton.source.yaml.
 * Run after `changeset version` to keep both files in sync.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf-8"));
const sourceYaml = resolve(root, "baton.source.yaml");
const content = readFileSync(sourceYaml, "utf-8");

const updated = content.replace(
    /^version:\s*".*"/m,
    `version: "${pkg.version}"`,
);

if (updated !== content) {
    writeFileSync(sourceYaml, updated);
    console.log(`baton.source.yaml version synced to ${pkg.version}`);
} else {
    console.log(`baton.source.yaml already at ${pkg.version}`);
}
