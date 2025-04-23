// 注意  eslint版本不同，配置文件后缀不同，并且.eslintignore相关也是在当前文件配置ignores
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['scripts/**', 'node_modules/'] },
  ...compat.config({
    // ignorePatterns: ['scripts/**', 'node_modules/'],
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'prettier',
    ],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // "@next/next/no-img-element": 'off',
    },
    // overrides: [
    //   {
    //     files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    //   },
    // ],
    // parserOptions: {
    //   project: './tsconfig.json',
    // },
  }),
];

export default eslintConfig;
