import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';


/** @type {import('eslint').Linter.Config[]} */
export default [
  reactHooks.configs['recommended-latest'],
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      'quotes': ['warn', 'single'],
      'semi': 'warn',
      'indent': ['warn', 2],
      'react/react-in-jsx-scope': 'off',
    }
  }
];