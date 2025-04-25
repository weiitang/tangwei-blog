---
title: '自动化部署Github Actions & Pages'
date: '2025-04-24'
categories: 'Github'
summary: 'github actions | github pages'
---

> 在用nextJs部署自己的静态博客的时候，用了github actions&pages来部署，这里记录一下。

#### 新建仓库

> 如果直接是 `[用户名].github.io` 即将访问 https://[用户名].github.io
> 如果是其它仓库名如 _Blog_ 即访问 https://[用户名].github.io/Blog
> 这里遇到一个坑，next build的时候 之前没有设置basePath，导致访问资源路径为/，仓库名为*Blog*时，打包出的out文件里自动访问/，而我们上传的artifact是在https://[用户名].github.io下的*Blog*文件下

#### 配置.github/workflows/ 文件

```yml
# nextJs.yml
# Sample workflow for building and deploying a Next.js site to GitHub Pages
name: Deploy Next.js site to Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # - name: Detect package manager
      #   id: detect-package-manager
      #   run: |
      #     if [ -f "${{ github.workspace }}/package.json" ]; then
      #     echo "manager=npm" >> $GITHUB_OUTPUT
      #     echo "command=install" >> $GITHUB_OUTPUT
      #     echo "runner=npm" >> $GITHUB_OUTPUT
      #     exit 0
      #     elif [ -f "${{ github.workspace }}/yarn.lock" ]; then
      #       echo "manager=yarn" >> $GITHUB_OUTPUT
      #       echo "command=install" >> $GITHUB_OUTPUT
      #       echo "runner=yarn" >> $GITHUB_OUTPUT
      #       exit 0
      #     elif [ -f "${{ github.workspace }}/pnpm-lock.yaml" ]; then
      #       echo "manager=pnpm" >> $GITHUB_OUTPUT
      #       echo "command=install" >> $GITHUB_OUTPUT
      #       echo "runner=pnpm" >> $GITHUB_OUTPUT
      #       exit 0
      #     else
      #       echo "Unable to determine package manager"
      #       exit 1
      #     fi

      # - name: Install dependencies
      #   run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}

      # - name: Build with Next.js
      #   run: ${{ steps.detect-package-manager.outputs.runner }} run build

      # 当时是npm error Exit handler never called! 是因为我之前的lock文件里用的是cnpm，vpn拦截流量了，导致ca-certificates(CERT_HAS_EXPIRED)失效
      # 删除lock文件重新安装
      # - name: Upgrade npm
      #   run: |
      #     # npm install -g npm@latest
      #     # npm -v
      #     npm cache clean --force
      #     npm -v

      - name: Get Version
        run: node -v && npm -v && npm config get registry

      - name: Clean node_modules and locks
        run: |
          rm -rf node_modules
          rm -f yarn.lock pnpm-lock.yaml package-lock.json

      - name: Install dependencies
        run: |
          # npm install --verbose
          npm install
          # ls -la node_modules # Verify `node_modules` exists

      # - name: Verify Next.js installation
      #   run: |
      #     if [ ! -f node_modules/.bin/next ]; then
      #       echo "Next.js is not installed. Please check your package.json.";
      #       exit 1;
      #     fi

      - name: Build with Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 放开Github Pages

当然，publish我们的(Pages)[https://github.com/[用户名]/[仓库名]/settings/pages]访问

#### 小插曲

> 博客应该要有个评论功能，而对于静态页面，也就没必要做个serve服务，`giscus`是个很好的选择
> 利用 GitHub Discussions 实现的评论系统，让访客借助 GitHub 在你的网站上留下评论和反应吧！

- (giscus)[https://giscus.app/zh-CN] 上配置好我们的 github 项目，并在项目中开启 GitHub Discussions 功能。
- 配置giscus需要仓库公开，在github上下载安装(giscus.app)[https://github.com/apps/giscus]，启用(GitHub Discussions)[https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository]功能
- 我用的nextJs，所以用的也是giscus的react组件(@giscus/react)[https://github.com/giscus/giscus-component]

```js
'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <Giscus
      repo="仓库"
      repoId="仓库id"
      category="Announcements"
      categoryId="分类Id"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
    />
  );
}
```
