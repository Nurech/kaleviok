/**
 * The following script reads the package.json file and updates the
 * ngsw-config.json file with the version from the package.json file.
 */

const fs = require('fs');
const path = require('path');

// Paths to the files
const packageJsonPath = path.resolve(__dirname, '../package.json');
const ngswConfigPath = path.resolve(__dirname, '../ngsw-config.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Read ngsw-config.json
const ngswConfig = JSON.parse(fs.readFileSync(ngswConfigPath, 'utf-8'));

// Add version from package.json
ngswConfig.appData = {
  version: packageJson.version,
};

// Write the updated ngsw-config.json
fs.writeFileSync(ngswConfigPath, JSON.stringify(ngswConfig, null, 2));

console.log(`Updated ngsw-config.json with version: ${packageJson.version}`);
