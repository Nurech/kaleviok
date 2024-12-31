const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

const envFilesMap = {
  dev: { template: './src/environments/environment.template.ts', output: './src/environments/environment.ts' },
  prod: {
    template: './src/environments/environment.prod.template.ts',
    output: './src/environments/environment.prod.ts',
  },
  shared: { template: './src/environments/environment.template.ts', output: './src/environments/environment.ts' },
};

const currentEnv = process.env.NODE_ENV || 'dev';

// Generate environment file for the current environment
if (envFilesMap[currentEnv]) {
  const content = fs.readFileSync(path.resolve(envFilesMap[currentEnv].template), 'utf-8');
  const replaced = content.replace(/\$(\w+)/g, (_, key) => process.env[key] || '');
  fs.writeFileSync(path.resolve(envFilesMap[currentEnv].output), replaced, 'utf-8');
  console.log(`Generated: ${envFilesMap[currentEnv].output}`);
}

// Ensure the default environment.ts is always generated
const sharedContent = fs.readFileSync(path.resolve(envFilesMap.shared.template), 'utf-8');
const sharedReplaced = sharedContent.replace(/\$(\w+)/g, (_, key) => process.env[key] || '');
fs.writeFileSync(path.resolve(envFilesMap.shared.output), sharedReplaced, 'utf-8');
console.log(`Generated: ${envFilesMap.shared.output}`);
