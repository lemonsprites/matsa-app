const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Get the current branch
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Path to package.json
const packageJsonPath = path.resolve(__dirname, '../../package.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Split the current version
const [major, minor, patch] = packageJson.version.split('.').map(Number);

// Increment version based on branch
if (branch === 'main') {
  console.log('Incrementing major version for main branch...');
  packageJson.version = `${major+1}.${minor}.${patch}`; // Reset minor and patch after major increment
} else if (branch === 'preview') {
  console.log('Incrementing minor version for dev branch...');
  packageJson.version = `${major}.${minor + 1}.${patch}`; // Reset patch after minor increment
} else {
  console.log(`Branch ${branch} detected. Incrementing patch version.`);
  packageJson.version = `${major}.${minor}.${patch + 1}`; // Increment patch by 1 for other branches
}

// Write updated version back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
console.log(`Version updated to ${packageJson.version}`);
