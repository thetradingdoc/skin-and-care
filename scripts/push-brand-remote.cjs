#!/usr/bin/env node
'use strict';

/**
 * Push the current brand branch to its product GitHub remote.
 * Usage: node scripts/push-brand-remote.cjs [brand-name]
 * Example: node scripts/push-brand-remote.cjs skin-and-care
 */

const { execSync } = require('child_process');

const BRAND_REMOTES = {
  'skin-and-care': {
    branch: 'brand/skin-and-care',
    remote: 'skin-care',
    ref: 'main',
  },
};

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

function currentBranch() {
  return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
}

const brandKey = (process.argv[2] || 'skin-and-care').trim().toLowerCase();
const config = BRAND_REMOTES[brandKey];

if (!config) {
  console.error(`Unknown brand "${brandKey}". Known: ${Object.keys(BRAND_REMOTES).join(', ')}`);
  process.exit(1);
}

const branch = currentBranch();
if (branch !== config.branch) {
  console.error(`Expected branch "${config.branch}" but on "${branch}".`);
  console.error(`Run: git checkout ${config.branch}`);
  process.exit(1);
}

const pushRef = `${config.branch}:${config.ref}`;
console.log(`Pushing ${pushRef} → ${config.remote}`);
run(`git push ${config.remote} ${pushRef}`);
console.log(`Done. Product repo: https://github.com/richiejeremiah/${brandKey}`);
