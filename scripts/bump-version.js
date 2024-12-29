const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const versionParts = packageJson.version.split('.');
versionParts[2] = parseInt(versionParts[2], 10) + 1; // Increment patch version
packageJson.version = versionParts.join('.');

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Version bumped to ${packageJson.version}`);
