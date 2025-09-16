// Flat ESLint config compatible with Nx v21
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nx from '@nx/eslint-plugin';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@nx': nx,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }
          ],
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'coverage/**'],
  },
];