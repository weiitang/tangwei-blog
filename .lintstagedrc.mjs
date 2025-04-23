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
  if (!selectFiles?.length) {
    return `echo No lint-stage`;
  }
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
  '**/*.{js,jsx,ts,tsx,mjs}': [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write'], // 这些格式的文件在提交时让 prettier 格式化
};

export default config;
