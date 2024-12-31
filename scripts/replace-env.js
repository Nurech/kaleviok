const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

const envFilesMap = {
  dev: { template: './src/environments/environment.template.ts', output: './src/environments/environment.ts' },
  prod: {
    template: './src/environments/environment.prod.template.ts',
    output: './src/environments/environment.prod.ts',
  },
};

const currentEnv = process.env.NODE_ENV || 'dev';
const envFile = envFilesMap[currentEnv];

if (!envFile) {
  console.error(`Error: No environment file mapping found for NODE_ENV="${currentEnv}"`);
  process.exit(1);
}

const content = fs.readFileSync(path.resolve(envFile.template), 'utf-8');
const replaced = content.replace(/\$(\w+)/g, (_, key) => process.env[key] || '');
fs.writeFileSync(path.resolve(envFile.output), replaced, 'utf-8');
console.log(`Generated: ${envFile.output}`);
