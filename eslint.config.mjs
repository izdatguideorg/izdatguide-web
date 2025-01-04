import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['**/(payload)/admin/importMap.js'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/lines-between-class-members': 0,
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 0,
      'react/button-has-type': 0,
      'react/no-unstable-nested-components': [
        2,
        {
          allowAsProps: true,
        },
      ],
      'react/no-array-index-key': 0,
      'no-param-reassign': 0,
      'import/no-cycle': 0,
      'no-restricted-syntax': 0,
      'no-irregular-whitespace': 0,
      'no-void': 0,
      'no-underscore-dangle': 0,
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-loop-func': 0,
      'sort-keys': 0,
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      'import/order': 0,
      'import/extensions': 0,
      'import/no-extraneous-dependencies': 0,
      'import/prefer-default-export': 0,
      'import/export': 0,
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
];

export default eslintConfig;
