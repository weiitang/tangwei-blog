---
title: 'Storybook Charts'
date: '2025-04-24'
categories: 'Design'
summary: '记录一个基于storybook自定义charts组件的文档'
---

#### 基于storybook自定义charts组件的文档

[storybook](https://storybook.js.org/docs)是一个UI组件的开发环境，它可以帮助你创建、预览和测试你的UI组件。在这个文档中，我们将介绍如何使用storybook来创建一个自定义的[charts组件](基于echarts库的自定义组件)。

##### 1. 安装storybook并创建storybook项目

```bash
npm create storybook@latest

```

当前命令会创建一个基于`react`的`storybook`项目，并自动安装所需的依赖，期间选择自己选择的技术库，这里我选择的是react和vite。

##### 2. 创建一个自定义的charts组件目录

当前创建的项目中是一个storybook项目，其包含.storybook，src及vite的一些配置文件等，现我们将其改成多包处理，将storybook单独隔离，charts组件也是一个包，在最外层管理当前项目的共同依赖，如react，vite等。

```text

├── packages
│   ├── charts-pc
│   │   ├── core // 核心逻辑
│   │   ├── react // 组件
│   │   ├── vite.config.ts // 单独的vite配置文件
│   │   ├── tsconfig.json // 当前包的ts配置文件
│   │   ├── packages.json
├── storybook
│   ├── .storybook
│   ├── src
│   │   ├── stories
│   ├── packages.json
├── vite.config.ts // 全局的vite配置文件
├── tsconfig.json // 全局的ts配置文件
├── package.json
├── ......

```

##### 3. 配置storybook

> 在storybook中，[插件](https://storybook.js.org/addons)是主流，用插件添加一些常用的功能，如文档、样式、测试等。

. 配置.storybook/main.ts

```ts
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  // 定义的框架
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  // 需要将默认配置结构...c，不然只配置了resolve会导致cors(因为vite默认允许跨域)
  async viteFinal(c) {
    return {
      ...c,
      resolve: {
        alias: {
          '@charts': path.resolve(__dirname, '../../packages/charts-pc/react'),
        },
      },
    };
  },
};
export default config;
```

. 编写一个storybook

```tsx
// ./storybook/src/stories/charts/bubble.stories.tsx
import { Bubble } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import './chart.css';

export default {
  title: 'Charts/Bubble',
  tags: ['autodocs'],
  component: (args) => (
    <div className="charts">
      <Bubble {...args} />
    </div>
  ),
} satisfies Meta<typeof Bubble>;
type Story = StoryObj<typeof Bubble>;

const TemplateChart = (args) => (
  <div className="charts">
    <Bubble {...args} />
  </div>
);
// Bubble（气泡图）
export const BasicBubble: Story = {
  args: {
    data: {
      dataset: {
        source: [
          ['', '总数'],
          ['天使轮 - A轮', '564'],
          ['A+轮 - B轮', '211'],
          ['B+轮 - C轮', '522'],
          ['C+轮 - F轮', '831'],
          ['上市轮', '168'],
          ['收购/并购', '68'],
        ],
      },
    },
  },
  render: TemplateChart,
};
BasicBubble.storyName = 'Bubble（气泡图）';
```

##### 4. 编写一个自定义的charts组件包

在这个包中，我们用的vite打包，在项目的最外层也有一个vite配置，是为了处理整个项目的启动等命令，而包内的vite配置是为了处理包的打包等命令。

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [
    react(),
    dts({
      entryRoot: './', // 指定 TypeScript 入口目录
      outDir: './lib', // 声明文件输出路径
      tsconfigPath: './tsconfig.json', // 确保读取正确配置
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: './react/index.ts',
      name: 'index',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});
```

这里我们单独配置了这个组件包的ts配置文件

```json
{
  "extends": "../../tsconfig.app.json",
  "compilerOptions": {
    "declaration": true, // 启用声明文件生成
    // "declarationDir": "./lib/react", // 声明文件输出目录（与插件配置保持一致）
    // "emitDeclarationOnly": true, // 仅生成声明文件
    "rootDir": "./", // 指定源码根目录
    "outDir": "./lib", // 输出目录（需与 Vite 一致）
    "esModuleInterop": true, // @types/react19以上，需要export=导入，这里简化下
    "skipLibCheck": true
  },
  "include": ["./core", "./react"],
  "exclude": ["node_modules", "dist", "lib"]
}
```

编写一个bar组件

```tsx
// 我们将echarts的配置单独放在core中的model中，如自定义颜色，轴线曲线等，react中只负责渲染
import { Component } from 'react';
import { Chart } from '../charts';
import { Model } from '../../core/charts/bar';

import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { BarChartsProps } from '../../core/types';

echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
  CanvasRenderer,
  BarChart,
]);

class Bar extends Component<BarChartsProps> {
  private model: Model;

  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    const chartModel = this.model.init(this.props);
    // 渲染器
    return (
      <Chart echarts={echarts} option={chartModel?.option} {...this.props} />
    );
  }
}

export { Bar };
```

##### 5. 静态资源部署在github page

storybook打包之后会生成一个storybook-static文件夹

```sh
# Sample workflow for building and deploying to GitHub Pages
name: Deploy Storybok Charts site to Pages

on:
  push:
    branches: ['master']
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

      - name: Build with Storybook
        run: npm run build:storybook

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./storybook/storybook-static

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
