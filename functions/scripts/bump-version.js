/**
 * The following script reads the package.json file and increments the patch version by 1.
 * For example if the current version is 1.0.0, the new version will be 1.0.1.
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const versionParts = packageJson.version.split('.');
versionParts[2] = parseInt(versionParts[2], 10) + 1; // Increment patch version
packageJson.version = versionParts.join('.');

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Version bumped to ${packageJson.version}`);
