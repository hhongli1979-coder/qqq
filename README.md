# 🧠 moda AI Studio - Local Deployment Guide

<a href="https://console.runpod.io/hub/hhongli1979-coder/ruoyi-ai"><img src="https://api.runpod.io/badge/hhongli1979-coder/ruoyi-ai"></a>

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

### 3. 配置环境变量（本地或 Vercel）
- 本地开发：在项目根目录创建 `.env`（已被 `.gitignore` 忽略，切勿提交）。
- 生产部署（Vercel）：到 Project Settings → Environment Variables 配置同名变量。

推荐变量（示例见 `.env.example`）：
```env
# Google AI Studio 密钥（推荐）
GEMINI_API_KEY=你的_GEMINI_API_KEY

# 可选：OpenAI 兼容密钥（若切换到 OPENAI 提供商）
OPENAI_API_KEY=可选_OPENAI_KEY

# 仅用于本地脚本与 Vercel API 交互（不要放到前端代码里）
VERCEL_TOKEN=你的_VERCEL_TOKEN
VERCEL_PROJECT_ID=你的_VERCEL_PROJECT_ID
VERCEL_ORG_ID=你的_VERCEL_ORG_ID
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

## ☁️ 部署选项

### 部署到 Vercel
- 连接 GitHub 仓库（main 分支自动部署）。
- 在 Vercel Project Settings → Environment Variables 设置：`GEMINI_API_KEY`（必填），如需 OpenAI 也设置 `OPENAI_API_KEY`。
- 本项目已提供 `vercel.json`，支持单页应用路由与静态资源缓存。

### 部署到 Runpod Serverless
本项目已配置好 Runpod Serverless 支持，可通过以下步骤部署：

1. **构建 Docker 镜像**:
   ```bash
   docker build -t moda-ai-studio .
   ```

2. **推送到容器注册表**:
   ```bash
   docker tag moda-ai-studio:latest your-registry/moda-ai-studio:latest
   docker push your-registry/moda-ai-studio:latest
   ```

3. **在 Runpod 上部署**:
   - 访问 [Runpod Console](https://console.runpod.io/)
   - 创建新的 Serverless Endpoint
   - 使用你的 Docker 镜像 URL
   - 设置环境变量：`GEMINI_API_KEY`, `OPENAI_API_KEY` (可选)
   - 设置 `HTTP_PORT=8000`

4. **访问应用**:
   部署完成后，通过 Runpod 提供的 URL 访问应用。

**处理脚本说明**:
- `handler.py`: Runpod Serverless 处理脚本，提供 HTTP 服务器和 API 端点
- `requirements.txt`: Python 依赖
- `Dockerfile`: 容器化配置，包含构建和运行环境

### （可选）后端代理以隐藏金钥
- 新增 `api/ai-proxy.ts` 作为 Vercel Serverless 函数，前端可改为调用 `/api/ai-proxy`，不再直接把金钥暴露在浏览器。
- 请求格式：`POST /api/ai-proxy`，JSON `{ provider?: 'GEMINI' | 'OPENAI', messages?: Message[], userInput: string }`
- 环境变量：`GEMINI_API_KEY`（或 `API_KEY` 兼容）/ `OPENAI_API_KEY`

### 绑定与验证自定义域名（例如 modamoda.club）
1) 在 Vercel 控制台 Project → Domains 添加 `modamoda.club`。
2) 到域名 DNS 服务商添加 Vercel 指引的 `A/CNAME/TXT` 记录。
3) 返回 Vercel 点击 Verify 直至状态为已验证。

> 注意：不要在代码中硬编码域名或任何密码/Token。域名、Token、项目 ID 等仅应放在 Vercel 的环境变量或本地 `.env` 中。

### 与 Vercel API 交互（可选）
使用环境变量驱动的脚本或 `curl`，避免将 Token/ID 写死在代码里：
```bash
# 获取项目信息
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
	"https://api.vercel.com/v9/projects/$VERCEL_PROJECT_ID"

# 列出域名
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
	"https://api.vercel.com/v10/projects/$VERCEL_PROJECT_ID/domains"

# 绑定域名
curl -X POST -H "Authorization: Bearer $VERCEL_TOKEN" \
	-H "Content-Type: application/json" \
	-d '{"name":"modamoda.club"}' \
	"https://api.vercel.com/v10/projects/$VERCEL_PROJECT_ID/domains"

# 触发域名验证
curl -X POST -H "Authorization: Bearer $VERCEL_TOKEN" \
	"https://api.vercel.com/v10/domains/modamoda.club/verify"
```

---
*Powered by Google Gemini & Moda Labs.*
