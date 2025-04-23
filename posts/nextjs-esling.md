---
title: Next.js项目使用eslint
date: '2022-05-11'
categories: '工程化'
summary: 'commit前增加eslint检查'
---

`NextJs`中本身自带[next lint](https://nextjs.org/docs/app/api-reference/config/eslint#with-typescript)命令。

> create-next-app时就可配置默认的eslint，也可以自定配置

#### 配置eslint，覆盖next lint默认规则，并兼容旧版本eslint

```js
// eslint.config.mjs
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
```

#### 安装husky和lint-staged

```shell
npm install husky --save-dev
npx husky install
```

```shell
npm install lint-staged --save-dev
```

```json
...
"scripts": {
  "prepare": "husky"
}
...
```

#### 增加.lintstagedrc文件

```js
import { ESLint } from 'eslint';
import path from 'path';

const buildEslintCommand = async (filenames) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    filenames.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  const selectFiles = filenames.filter((_, index) => !isIgnored[index]);
  // eslint-disable-next-line no-console
  console.log('---lint-staged.mjs', selectFiles, filenames);
  // next lint 运行时  会执行eslintrc和next.config.ts里的eslint配置，如包含的dirs(如有配置)文件也会跑

  // 这里--file会和eslintignore里的配置冲突，加个--no-ignore强制检查
  // 若想排除ignore文件，需要写个排除函数（如上）
  // 单独运行next lint时，可在next.config.ts里配置eslint.dirs
  return `next lint --file ${selectFiles
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')} --max-warnings 0 --fix --no-ignore --no-cache`;
  // return `eslint --max-warnings 0 --cache --cache-location .cache/eslint --ignore-path .eslintignore ${filenames.join(' ')}`;
};

const config = {
  './src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  '**/*.{js,jsx,ts,tsx}': [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write'], // 这些格式的文件在提交时让 prettier 格式化
};

export default config;
```

#### 配合commit规范

```js
// git/commit-msg.js
#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');

const msg = fs
  .readFileSync(`${process.env.PWD}/${process.argv[2]}`, 'utf-8')
  .trim();

const commitRE = [
  /^((feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?:).{1,100}/,
  /^Merge.*/gm,
];

if (!commitRE.some((re) => re.test(msg))) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `提交信息格式不正确`
    )}\n\n${chalk.red(
      `  请使用正确格式提交信息——type(scope): subject，例如：\n\n`
    )}    ${chalk.green(`feat(button): 修改文案`)}\n` +
      `    ${chalk.green(`refactor: 调整代码结构`)}\n` +
      `    ${chalk.green(`fix: fixbug xxxxx`)}\n\n` +
      `  ${chalk.red(`类型参考如下：`)}\n` +
      `    ${chalk.red(`feat：新功能（feature）`)}\n` +
      `    ${chalk.red(`fix：修补 bug`)}\n` +
      `    ${chalk.red(`docs：文档（documentation）`)}\n` +
      `    ${chalk.red(`style： 格式（不影响代码运行的变动）`)}\n` +
      `    ${chalk.red(
        `refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）`
      )}\n` +
      `    ${chalk.red(`perf：性能 代码变更提高性能`)}\n` +
      `    ${chalk.red(`test：增加测试`)}\n` +
      `    ${chalk.red(`chore：构建过程或辅助工具的变动`)}\n`
  );
  process.exit(1);
}
```

#### 更改.husky下pre-commit文件&commit-msg文件

```shell
// 旧版husky
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged --allow-empty
```

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node git/commit-msg $1

```

#### 配合prettier

```shell
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

#### 设置.prettierrc文件&.vscode文件

```json
// .prettierrc.json
{
  "plugins": [
    "prettier-plugin-organize-imports", // imports自动排序
    "prettier-plugin-tailwindcss" // tailwindcss自动排序
  ],
  "tailwindFunctions": ["classNames"],
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto"
}
```

```json
// .vscode/settings.json
{
  // Formatting using Prettier by default for all languages
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  // Formatting using Prettier for JavaScript, overrides VSCode default.
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // Linting using ESLint.
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],

  // Enable file nesting.
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "*.ts": "$(capture).test.ts, $(capture).test.tsx",
    "*.tsx": "$(capture).test.ts, $(capture).test.tsx"
  }
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    // Linting / Formatting
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```
