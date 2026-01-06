# @v3ai/ui

<div align="center">

**零外部依赖的通用 UI 组件库**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)

</div>

---

## ✨ 特性

- 🎯 **零外部依赖** - 完全自主可控，无需担心第三方库
- 🎨 **40+ 精美图标** - SVG 图标，支持自定义大小和颜色
- 🎬 **强大动画系统** - 纯 CSS + React 实现，性能优秀
- 🧩 **实用 UI 组件** - Button, Dialog, Toast, Input...
- 🔧 **实用 Hooks** - localStorage, debounce, mediaQuery...
- 🤖 **AI 客户端** - 支持 Gemini, OpenAI
- 📦 **Tree-shaking 友好** - 按需导入，减小bundle体积
- 🌍 **TypeScript 优先** - 完整类型定义
- ⚡ **框架支持** - React (Vue 开发中)

---

## 📦 安装

### React

```bash
# React 组件
npm install @v3ai/ui-react

# 核心工具（可选）
npm install @v3ai/ui-core
```

### Vue (开发中)

```bash
# Vue 组件
npm install @v3ai/ui-vue

# 核心工具（可选）
npm install @v3ai/ui-core
```

---

## 🚀 快速开始

### React 示例

```tsx
import { Sparkles, Database } from '@v3ai/ui-react/icons';
import { Motion } from '@v3ai/ui-react/animation';
import { Button } from '@v3ai/ui-react/components';
import '@v3ai/ui-react/styles';

function App() {
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 300 }}
    >
      <Button variant="primary" size="lg">
        <Sparkles size={20} />
        开始使用
      </Button>
    </Motion>
  );
}
```

### AI 客户端示例

```typescript
import { GeminiClient } from '@v3ai/ui-core/ai';

const client = new GeminiClient(process.env.GEMINI_API_KEY);

// 流式生成
const stream = await client.generateStream('你好，世界！');

// 单次生成
const text = await client.generate('解释量子计算');

// 文本嵌入
const embedding = await client.embedText('这是一段文本');
```

### 存储工具示例

```typescript
import { localStorage } from '@v3ai/ui-core/storage';

// 存储数据
localStorage.set('user', { name: 'John', age: 30 });

// 获取数据
const user = localStorage.get<{ name: string; age: number }>('user');

// 删除数据
localStorage.remove('user');
```

---

## 📖 包说明

| 包名 | 说明 | 状态 |
|------|------|------|
| `@v3ai/ui-core` | 框架无关的核心工具 | ✅ 已完成 |
| `@v3ai/ui-react` | React 组件库 | ✅ 已完成 |
| `@v3ai/ui-vue` | Vue 组件库 | 🚧 开发中 |

---

## 🎨 可用组件

### 图标 (40+)

Sparkles, Database, Code, Settings, Users, FileText, Image, Video, Share, Download, Upload, Search, Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Plus, Minus, Check, AlertCircle, Info, Loader, Play, Pause, Stop, Home, Folder, File, Star, Heart, Globe, Mail, Bell, Lock, Unlock, Calendar, Clock, Zap, Cloud

### UI 组件

- **Button** - 按钮组件，支持多种变体和尺寸
- **Dialog** - 对话框组件，支持自定义大小和关闭方式
- **Toast** - 消息提示组件 (开发中)
- **Input** - 输入框组件 (开发中)

### 动画

- **Motion** - 动画容器组件
- **useAnimation** - 动画 Hook
- **transitions** - 预设动画效果

### Hooks

- **useLocalStorage** - localStorage 管理
- **useDebounce** - 防抖
- **useMediaQuery** - 媒体查询
- **useClickOutside** - 点击外部检测
- **useToggle** - 切换状态

### AI 客户端

- **GeminiClient** - Google Gemini API 客户端
- **OpenAIClient** - OpenAI API 客户端

### 存储工具

- **localStorage** - 增强的 localStorage 工具
- **sessionStorage** - 增强的 sessionStorage 工具
- **IndexedDBStorage** - IndexedDB 封装

---

## 📊 包体积

| 包名 | 大小（估算） | Gzip（估算） |
|------|------|------|
| `@v3ai/ui-react` | ~45KB | ~15KB |
| `@v3ai/ui-vue` | ~42KB | ~14KB |
| `@v3ai/ui-core` | ~8KB | ~3KB |

**对比其他方案**:
- `framer-motion` + `lucide-react` + `@radix-ui/*`: ~300KB
- `@v3ai/ui-react`: ~45KB ✨ **减少 85%**

---

## 🛠️ 开发

```bash
# 克隆仓库
git clone https://github.com/v3ai2026/modaai.git
cd modaai

# 安装依赖
pnpm install

# 开发模式
pnpm lib:dev

# 构建所有包
pnpm lib:build

# 格式化代码
pnpm format
```

---

## 📁 项目结构

```
modaai/
├── packages/
│   ├── core/          # 核心工具包
│   ├── react/         # React 组件库
│   └── vue/           # Vue 组件库 (开发中)
├── scripts/           # 构建脚本
├── turbo.json         # Turborepo 配置
├── pnpm-workspace.yaml
└── package.json
```

---

## 📄 许可证

[MIT](./LICENSE) © V3 AI Team

---

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

---

## 💬 联系我们

- 📧 Email: support@v3ai.com
- 🐦 GitHub: [@v3ai2026](https://github.com/v3ai2026)

---

## 🗺️ 路线图

- [x] 核心工具包 (@v3ai/ui-core)
- [x] React 图标组件 (40+)
- [x] React 动画系统
- [x] React UI 组件 (Button, Dialog)
- [x] React Hooks
- [ ] Vue 组件库
- [ ] 文档网站
- [ ] 示例项目
- [ ] NPM 发布
- [ ] 更多 UI 组件 (Toast, Input, Select, Tabs, Progress, Switch, Dropdown)

---

Made with ❤️ by V3 AI Team
