---
title: "一些npm包"
date: "2025-03-12"
categories: "Product"
summary: "整理一些遇到的npm包"
---


#### react
##### react-redux
- React Redux 是 Redux 的官方 React UI 绑定库。它使得你的 React 组件能够从 Redux store 中读取到数据，并且你可以通过dispatch actions去更新 store 中的 state
- https://github.com/reduxjs/react-redux
- https://cn.react-redux.js.org/api/hooks

##### @rematch/core
- Rematch是在redux的基础上再次封装，使用rematch，我们就不需要再声明action类型、action创建函数、thunks配置。
- https://github.com/rematch/rematch
- https://rematchjs.org/docs/getting-started/installation

##### @rematch/immer
- Rematch 的 Immer 插件。使用 immer 包装您的 Reducer，提供安全地进行可变更改并产生不可变状态的能力。在 Immer 中，reducer 可以执行突变以实现下一个不可变状态。Immer不要求您从 Reducer 返回下一个状态，Rematch 也不会强迫您这样做。
- https://rematchjs.org/docs/plugins/immer/

##### @rematch/persist
- 提供自动 Redux 状态持久性。一般是本地
- https://rematchjs.org/docs/plugins/persist/

#### 网络
##### axios
- https://github.com/axios/axios
- https://axios-http.com/zh/docs/intro 中文
- https://axios-http.com/docs/intro 英文

##### axios-extensions
- 缓存请求结果，节流请求，请求重试
- https://github.com/kuitos/axios-extensions

##### react-hook-form
- 高性能、灵活且可扩展的表单，具有易于使用的验证功能
- https://github.com/react-hook-form/react-hook-form
- https://react-hook-form.com/get-started

#### 工具
##### date-fns
- date-fns 提供了最全面、最简单、最一致的工具集，用于在浏览器和 Node.js 中操作 JavaScript 日期
- https://github.com/date-fns/date-fns
- https://date-fns.org/docs/Getting-Started

##### dayjs
- Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样
- https://github.com/iamkun/dayjs
- https://day.js.org/docs/zh-CN/installation/installation

##### decimal.js
- JavaScript 的任意精度 Decimal 类型。
- https://github.com/MikeMcl/decimal.js
- https://github.com/MikeMcl/decimal.js#readme

##### i18next
- 国际化
- https://github.com/i18next/i18next
- https://www.i18next.com/overview/api

##### i18next-intervalplural-postprocessor
- 这是一个 i18next 后置处理器，支持基于间隔的复数
- https://github.com/i18next/i18next-intervalPlural-postProcessor

##### immer
- 通过简单修改当前树来创建下一个不可变状态树(对象)，柯里化
- https://github.com/immerjs/immer
- https://immerjs.github.io/immer/zh-CN/

##### lodash
- 函数封装
- https://github.com/lodash/lodash
- https://www.lodashjs.com/

##### mathjs
- mathjs是用于JavaScript和NodeJS的数学库。它内置大量函数与常量，并提供集成解决方案来处理不同的数据类型，如数字，大数字，复数，分数，单位和矩阵等。
- https://github.com/josdejong/mathjs
- https://mathjs.org/index.html

##### numeral
- 用于格式化和处理数字的 javascript 库
- https://github.com/adamwdraper/Numeral-js
- http://numeraljs.com/

##### uuid
- For the creation of RFC9562 (formally RFC4122) UUIDs
- https://github.com/uuidjs/uuid
- https://github.com/uuidjs/uuid#readme

#### 工程化
##### @babel/core
- Babel 是一个 JavaScript 编译器，主要用于将高版本的JavaScript代码转为向后兼容的JS代码，从而能让我们的代码运行在更低版本的浏览器或者其他的环境中，是Babel进行转码的核心依赖包，我们常用的babel-cli和babel-node都依赖于它
- https://github.com/babel/babel
- https://www.babeljs.cn/docs/babel-core

##### @babel/plugin-proposal-decorators
- 转换装饰器
- https://www.babeljs.cn/docs/babel-plugin-proposal-decorators

##### @babel/preset-env
- 是一个智能预设，可让您使用最新的JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器polyfill）。这都使您的生活更轻松，JavaScript包更小！
- https://www.babeljs.cn/docs/babel-preset-env

##### @babel/preset-react
- react的预设
- https://www.babeljs.cn/docs/babel-preset-react

##### @babel/preset-typescript
- typescript预设
- https://www.babeljs.cn/docs/babel-preset-typescript

##### babel-plugin-lodash
- 通过简单的转换即可挑选 Lodash 模块
- https://github.com/lodash/babel-plugin-lodash

##### babel-jest & jest
-  JavaScript 测试解决方案
- https://github.com/jestjs/jest

##### chalk
- 终端字符串样式
- https://github.com/chalk/chalk

##### compressing
- The missing compressing and uncompressing lib for node.(压缩&解压)
- https://github.com/node-modules/compressing

##### cross-env
- 一款运行跨平台设置和使用环境变量的脚本
- https://github.com/kentcdodds/cross-env

##### cz-conventional-changelog ❌
- 属于commitizen家族的一部分。提示常规变更日志标准
- https://github.com/commitizen/cz-conventional-changelog

##### dependency-tree
- 获取模块的依赖树，适用于 JS（AMD、CommonJS、ES6 模块）、Typescript 和 CSS 预处理器（CSS（PostCSS）、Sass、Stylus 和 Less）；基本上，Precinct支持的任何模块类型
- https://github.com/dependents/node-dependency-tree


##### fs-extra
- 添加本机模块中未包含的文件系统方法fs，并为这些方法添加承诺支持fs。它还用于graceful-fs防止EMFILE错误。它应该是 的替代品fs
- https://github.com/jprichardson/node-fs-extra

##### husky
- 在提交或推送时自动检查您的提交消息、代码并运行测试
- https://github.com/typicode/husky
- https://typicode.github.io/husky/

##### lint-staged
- 针对工作区修改的文件,这对我们只希望处理将要提交的文件将会非常有用
- https://github.com/lint-staged/lint-staged

##### inquirer
- 常见的交互式命令行用户界面的集合
- https://github.com/SBoudrias/Inquirer.js
- https://github.com/SBoudrias/Inquirer.js/blob/main/packages/inquirer/README.md

##### @inquirer/prompts
- 新版 Inquirer
- https://github.com/SBoudrias/Inquirer.js
- https://github.com/SBoudrias/Inquirer.js/blob/main/packages/prompts/README.md

##### md5-file
- 获取给定文件的 MD5 值，即使文件很大，内存使用量也很低
- https://github.com/kodie/md5-file

##### mockdate
- 一个 JavaScript Mock Date 对象，可用于改变“现在”的时间
- https://github.com/boblauer/MockDate

##### puppeteer
- Chrome 和 Firefox 的 JavaScript API，Puppeteer 是一个 JavaScript 库，它提供了一个高级 API，用于通过 DevTools 协议或WebDriver BiDi控制 Chrome 或 Firefox。Puppeteer默认在无头模式下运行（无可见 UI）
- https://github.com/puppeteer/puppeteer/tree/main
- https://pptr.dev/category/introduction

```js
npm install
```



