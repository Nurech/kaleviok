/**
 * The following script reads the environment.template.ts file
 * and replaces the placeholders in environment.ts and firebase-messaging-sw.js
 */
const fs = require('fs');
const path = require('path');

// Load environment variables and sanitize them
function loadAndSanitizeEnv(filePath) {
  const envContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const sanitizedEnv = {};

  envContent
    .split('\n')
    .map((line) => line.trim()) // Remove leading/trailing spaces
    .filter((line) => line && !line.startsWith('#')) // Remove empty lines and comments
    .forEach((line) => {
      const [key, value] = line.split('=');
      sanitizedEnv[key.trim()] = value.trim();
    });

  return sanitizedEnv;
}

// File to process and .env file
const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`;
const filesToReplace = ['./src/firebase-messaging-sw.js', './src/environments/environment.ts'];
const envVariables = loadAndSanitizeEnv(envFilePath);

// Function to replace key-value pairs in a file
function replaceEnvVariables(filePath, envVariables) {
  let content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const lines = content.split('\n');

  Object.entries(envVariables).forEach(([key, value]) => {
    const regex = new RegExp(`\\s*${key}:\\s*['"].*?['"],?`); // Match existing key-value pairs
    const formattedLine = `  ${key}: '${value}',`; // Properly formatted new line

    const lineIndex = lines.findIndex((line) => regex.test(line));
    if (lineIndex !== -1) {
      // Replace the line if the key exists
      lines[lineIndex] = formattedLine;
    } else {
      // Add the new line if the key doesn't exist
      const insertIndex = lines.findIndex((line) => line.trim() === '}'); // Before the closing brace
      lines.splice(insertIndex, 0, formattedLine);
    }
  });

  content = lines.join('\n');
  fs.writeFileSync(path.resolve(filePath), content, 'utf-8');
  console.log(`Processed and updated keys in: ${filePath}`);
}

// Process each file
filesToReplace.forEach((file) => replaceEnvVariables(file, envVariables));
