import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { react: pluginReact, js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      // General code style rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multi-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-infix-ops': 'error',
      'eol-last': ['error', 'always'],
      
      // React specific rules
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'multiline' }],
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      }],
      'react/jsx-curly-spacing': ['error', { 'when': 'never', 'children': true }],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-wrap-multilines': ['error', {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line',
      }],
      'react/self-closing-comp': ['error', {
        'component': true,
        'html': true,
      }],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'never' }],
    },
  },
  tseslint.configs.recommended,
  { 
    plugins: { pluginReact },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
