/**
 * The following script reads the environment.template.ts file
 * and replaces the placeholders in environment.ts
 */
const fs = require('fs');
const path = require('path');

// Load local .env file based on the environment
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

// Files to process
const filesToProcess = [
  {
    templateFile: './src/environments/environment.template.ts',
    outputFile: './src/environments/environment.ts',
  },
];

// Function to process templates
function replacePlaceholders({ templateFile, outputFile }) {
  try {
    const template = fs.readFileSync(path.resolve(templateFile), 'utf-8');
    const replaced = template.replace(/\$(\w+)/g, (_, key) => {
      if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
      }
      return process.env[key];
    });

    fs.writeFileSync(path.resolve(outputFile), replaced, 'utf-8');
    console.log(`Generated: ${outputFile}`);
  } catch (error) {
    console.error(`Failed to process file: ${templateFile}`, error);
    process.exit(1);
  }
}

// Process all files
filesToProcess.forEach(replacePlaceholders);
