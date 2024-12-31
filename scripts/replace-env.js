const fs = require('fs');
const path = require('path');

// Define expected environment variables
const envVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_MEASUREMENT_ID',
];

// Load local .env.prod file if available
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

// Determine the environment
const isProd = process.env.NODE_ENV === 'prod';
const templateFile = isProd
  ? './src/environments/environment.prod.template.ts'
  : './src/environments/environment.template.ts';
const outputFile = isProd ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';

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
