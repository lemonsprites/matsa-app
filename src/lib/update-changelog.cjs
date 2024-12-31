const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths
const changelogPath = path.resolve(__dirname, '../../CHANGELOG.md');

// Generate or update the changelog
console.log('Generating changelog...');
execSync('npx conventional-changelog -p angular -i CHANGELOG.md -s', { stdio: 'inherit' });

// Commit the updated changelog
console.log('Changelog updated.');
