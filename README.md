# 🧠 moda AI Studio - Local Deployment Guide

欢迎使用 **Moda OS (v3.1)**。这是一个基于 Google Studio 规范构建的下一代 AI 前端编译器。遵循以下步骤，即可在你的本地机器上启动该工作站。

## 🛠️ 环境要求

- **Node.js**: v18.0.0 或更高版本
- **npm / pnpm / yarn**: 建议使用最新版本
- **Google AI API Key**: 用于激活逻辑编译、视频合成和图像渲染能力

## 🚀 快速开始

### 1. 克隆并进入目录
如果你已经下载了文件，请在终端进入项目根目录：
```bash
cd moda-ai-studio
```

### 2. 安装依赖
该项目依赖 React 19、Tailwind CSS、Framer Motion 以及 Google Generative AI SDK。
```bash
npm install
```

### 3. 配置环境变量
在项目根目录下创建一个 `.env` 文件，并填入你的 API Key：
```env
# 获取地址: https://aistudio.google.com/app/apikey
API_KEY=你的_GOOGLE_GEMINI_API_KEY
```

### 4. 启动开发服务器
```bash
npm run dev
```
启动成功后，访问终端输出的本地地址（通常是 `http://localhost:5173`）。

## 📁 项目结构说明

- `/components`: 核心 UI 模块（编译器、媒体实验室、战略后台等）。
- `/services`: AI 接口分发与持久化逻辑。
- `App.tsx`: 系统主入口与路由状态机。
- `index.html`: 注入了黑金主题 CSS 与光标逻辑的容器。

## 🔐 隐私与主权
- **本地持久化**: 所有的聊天记录和配置均存储在浏览器的 `LocalStorage` 中。
- **代码导出**: 在“编译器”中生成的代码遵循标准的 ES6/TSX 规范，可直接复制到 VS Code 中使用。

---
*Powered by Google Gemini & Moda Labs.*
