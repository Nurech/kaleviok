const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

const envFiles = [
  { template: './src/environments/environment.template.ts', output: './src/environments/environment.ts' },
  { template: './src/environments/environment.prod.template.ts', output: './src/environments/environment.prod.ts' },
];

envFiles.forEach(({ template, output }) => {
  const content = fs.readFileSync(path.resolve(template), 'utf-8');
  const replaced = content.replace(/\$(\w+)/g, (_, key) => process.env[key] || '');
  fs.writeFileSync(path.resolve(output), replaced, 'utf-8');
  console.log(`Generated: ${output}`);
});
