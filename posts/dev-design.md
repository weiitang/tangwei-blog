---
title: 'Design'
date: '2025-04-24'
categories: 'Design'
summary: 'dev design'
---

#### monorepo(多仓库) 管理

> 设计主仓库和子仓库，主仓库用来管理组件及站点，子仓库用来管理公共方法、styles、公共UI等
> 在主仓库中，用分工作区的方式来管理依赖，如components，site，common(子仓库)等

```shell
# 创建主仓库
mkdir parent-repo && cd parent-repo
git init
echo "main content" > main.txt
git add . && git commit -m "Initial commit"

# 创建子模块仓库
mkdir submodule-repo && cd submodule-repo
git init
echo "submodule content" > submodule.txt
git add . && git commit -m "Submodule initial commit"

# 将子模块添加到主仓库
cd parent-repo
git submodule add ../submodule-repo submodule
git commit -m "Add submodule"

```

> 此时，主仓库的submodule会指向子模块的一个commitId，而不是一个分支，当然，也可以指向分支

```shell
# 切换到子模块文件，checkout分支即可(这里也可以正常提交)
git checkout master
git add .
git commit -m "update submodule"
git push

# 初始化子模块并更新最新的commit
git submodule update --init --remote

# 如果要指定到某一个commit
cd submodule
git log
git checkout <commitId>
```

#### 新建各自的工作区

- 新建各自工作区的package.json，采用pnpm-workspace.yml

```yaml
packages:
  - 'packages/**'
```

- 各级目录

```text
└── packages
    ├── common // 子仓库
    │   ├── package.json  // 根据name来命名当前子工作区
    │   ├── js
    │   ├── docs
    │   └── style
    │       ├── package.json // "@common/style"
    │       ├── web
    │       └── mobile
    ├── components
        ├── package.json // "@components"
    └── react
        ├── package.json // "@react"
        ├── components
        └── site
            ├── package.json // "@site"
            └── docs
```

- 在根目录的package.json中，添加依赖工作区

```json
"dependencies": {
  "@common": "workspace:^",
  "@common/style": "workspace:^",
  "@components": "workspace:^",
  "@site": "workspace:^",
}
```

- 需要用`pnpm i`来执行依赖，`npm i`需要高版本才支持workspace^

```shell
npm install pnpm -g
pnpm i
```

- 注意，这里并不是用git命令去建立子工作区

```shell
# 这会使得HEAD偏移
git worktree add ./common
git worktree remove ./common

```
