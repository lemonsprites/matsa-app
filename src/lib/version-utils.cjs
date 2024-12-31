const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Get the current branch
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Path to package.json
const packageJsonPath = path.resolve(__dirname, '../../package.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment version based on branch
if (branch === 'main') {
  console.log('Incrementing major version for main branch...');
  const [major, minor, patch] = packageJson.version.split('.').map(Number);
  packageJson.version = `${major + 1}.0.0`;
} else if (branch === 'dev') {
  console.log('Incrementing minor version for dev branch...');
  const [major, minor, patch] = packageJson.version.split('.').map(Number);
  packageJson.version = `${major}.${minor + 1}.0`;
} else {
  console.log(`Branch ${branch} detected. No version increment.`);
}

// Write updated version back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
console.log(`Version updated to ${packageJson.version}`);

console.log(`Version updated to ${packageJson.version}`);
