const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const imports = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
    {
        ignores: [
            'generate-store/',
            'dist/',
            'tmp/',
            'out-tsc/',
            'bazel-out/',
            'node_modules/',
            'npm-debug.log',
            'yarn-error.log',
            '.idea/',
            '.project',
            '.classpath',
            '.c9/',
            '*.launch',
            '.settings/',
            '*.sublime-workspace',
            '.vscode/',
            '.angular/cache',
            '.sass-cache/',
            'connect.lock',
            'coverage/',
            'libpeerconnection.log',
            'testem.log',
            'typings/',
            '.DS_Store',
            'Thumbs.db',
            '.firebase/',
            '*-debug.log',
            '.runtimeconfig.json',
            'src/environments/environment.ts',
            'src/environments/environment.prod.ts',
            '.env.prod',
            '.env.dev',
            '.env.*'
        ]
    },
    {
        files: ['**/*.ts'],
        plugins: {
            'unused-imports': unusedImports,
            'import': imports
        },
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended, prettier],
        processor: angular.processInlineTemplates,
        rules: {
            'import/order': [
                'error',
                {
                    'groups': ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index'],
                    'newlines-between': 'never'
                }
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case'
                }
            ],
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ],
            'semi': ['error', 'always'],
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxEOF: 1,
                    maxBOF: 0
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxEOF: 1,
                    maxBOF: 0
                }
            ]
        }
    }
);
