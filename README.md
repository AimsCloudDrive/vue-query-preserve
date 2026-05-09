# @msom/vue-query-preserve

一个 Vue 插件，在路由跳转时自动保留指定的查询参数，支持 Vue 2 和 Vue 3 版本。

## 功能特性

- 🎯 **路由参数保留**：自动将指定的查询参数从来源路由传递到目标路由
- 🚀 **双版本支持**：同时提供 Vue 2 和 Vue 3 版本
- ⚡ **轻量级**：零依赖，代码简洁
- 🎛️ **可配置**：支持自定义保留的参数列表和跳转前钩子

## 安装

```bash
# 使用 pnpm
pnpm add @msom/vue-query-preserve

# 使用 npm
npm install @msom/vue-query-preserve

# 使用 yarn
yarn add @msom/vue-query-preserve
```

## 使用

### Vue 3

```typescript
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import createQueryPreservePlugin from '@msom/vue-query-preserve/v3';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.use(createQueryPreservePlugin({
  preserveKeys: ['lang', 'theme'],
  beforeNavigate(to, from) {
    console.log('Navigating from', from.path, 'to', to.path);
  },
}));

app.mount('#app');
```

### Vue 2

```typescript
import Vue from 'vue';
import Router from 'vue-router';
import createQueryPreservePlugin from '@msom/vue-query-preserve/v2';

Vue.use(Router);

const router = new Router({
  routes,
});

Vue.use(createQueryPreservePlugin({
  preserveKeys: ['lang', 'theme'],
  beforeNavigate(to, from) {
    console.log('Navigating from', from.path, 'to', to.path);
  },
}));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
```

## API

### createQueryPreservePlugin(options?)

创建路由查询参数保留插件。

#### 参数

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `preserveKeys` | `string[]` | `[]` | 需要保留的查询参数键名白名单 |
| `beforeNavigate` | `(to, from) => boolean \| void` | - | 跳转前的自定义钩子函数，返回 `false` 可阻止跳转 |

## 示例

假设当前 URL 为 `http://example.com/page1?lang=en&theme=dark`，配置如下：

```typescript
app.use(createQueryPreservePlugin({
  preserveKeys: ['lang'],
}));
```

当跳转到 `page2` 时，URL 将自动变为 `http://example.com/page2?lang=en`。

## 项目结构

```
vue-query-preserve/
├── packages/
│   ├── v2/           # Vue 2 版本
│   │   └── src/
│   │       └── index.ts
│   └── v3/           # Vue 3 版本
│       └── src/
│           └── index.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

## 许可证

ISC