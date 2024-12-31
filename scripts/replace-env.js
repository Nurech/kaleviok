const fs = require('fs');
const path = require('path');

// Load local .env file based on the environment
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

// Determine the environment
const templateFile = './src/environments/environment.template.ts';

// Always generate `environment.ts`
const outputFile = './src/environments/environment.ts';

// Read template and replace placeholders with environment variable values
const template = fs.readFileSync(path.resolve(templateFile), 'utf-8');
const replaced = template.replace(/\$(\w+)/g, (_, key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
  return process.env[key];
});

// Write the output environment file
fs.writeFileSync(path.resolve(outputFile), replaced, 'utf-8');
console.log(`Generated: ${outputFile}`);
