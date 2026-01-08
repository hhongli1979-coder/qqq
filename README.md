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

## ☁️ 部署到 Vercel
- 连接 GitHub 仓库（main 分支自动部署）。
- 在 Vercel Project Settings → Environment Variables 设置：`GEMINI_API_KEY`（必填），如需 OpenAI 也设置 `OPENAI_API_KEY`。
- 本项目已提供 `vercel.json`，支持单页应用路由与静态资源缓存。

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

## 🚀 部署到 RunPod.io

RunPod 是一个 GPU 云平台，支持从 GitHub 自动部署。本项目已配置好 Docker 部署文件。

### 前置准备
1. 注册 [RunPod.io](https://runpod.io) 账户
2. 确保你的 GitHub 仓库包含以下文件（已配置）：
   - `Dockerfile` - Docker 镜像构建配置
   - `nginx.conf` - Nginx 服务器配置
   - `.dockerignore` - Docker 构建优化

### 自动部署步骤

#### 1. 连接 GitHub 到 RunPod
1. 登录 [RunPod Console](https://www.runpod.io/console)
2. 进入 **Settings（设置）** → **Connections（连接）**
3. 找到 **GitHub** 卡片，点击 **Connect（连接）**
4. 授权 RunPod 访问你的仓库（可选择所有仓库或特定仓库）

#### 2. 创建部署端点
1. 进入 **Serverless（无服务器）** 部分
2. 点击 **New Endpoint（新建端点）**
3. 选择 **Import Git Repository（导入 Git 仓库）**
4. 选择 `hhongli1979-coder/qqq` 仓库
5. 选择要部署的分支（推荐 `main` 或 `master`）
6. RunPod 会自动检测 Dockerfile

#### 3. 配置端点
- **端点名称**: 例如 `moda-ai-studio`
- **端点类型**: 选择 **Load Balancer** 或 **Queue**（HTTP 访问选 Load Balancer）
- **容器配置**:
  - 端口映射：`80` (容器) → 外部端口
  - 环境变量（可选）：
    ```
    GEMINI_API_KEY=你的密钥
    OPENAI_API_KEY=你的密钥（可选）
    ```
- **资源配置**: 根据需要选择 CPU/GPU 配置（基础 Web 应用选 CPU 即可）
- **Worker 数量**: 建议从 1 开始

#### 4. 部署
1. 点击 **Deploy Endpoint（部署端点）**
2. RunPod 会自动：
   - 克隆你的 GitHub 仓库
   - 构建 Docker 镜像
   - 部署容器
   - 提供访问 URL

#### 5. 监控和更新
- 在 **Builds（构建）** 标签查看构建状态
- 推送代码到选定分支会触发自动重新部署
- 在端点详情页获取访问 URL

### GitHub Actions 自动测试
项目已配置 GitHub Actions 工作流（`.github/workflows/runpod-build.yml`）：
- 每次推送到 `main`/`master` 分支时自动构建和测试 Docker 镜像
- 验证镜像可以正常启动和响应
- 确保部署配置始终有效

### 本地测试 Docker 部署
在部署到 RunPod 之前，可以本地测试：

```bash
# 构建镜像
docker build -t moda-ai-studio .

# 运行容器
docker run -d -p 8080:80 --name moda-test moda-ai-studio

# 访问 http://localhost:8080 测试

# 停止并删除容器
docker stop moda-test
docker rm moda-test
```

### 环境变量配置
如需在 RunPod 中使用 API 密钥：
1. 在端点配置中添加环境变量
2. 或在 Dockerfile 中使用 ARG/ENV（不推荐，会暴露密钥）
3. 推荐：使用 RunPod 的环境变量功能（在部署时设置）

### 费用说明
- RunPod 按使用时间计费
- CPU 实例费用较低，适合 Web 应用
- GPU 实例费用较高，仅在需要时使用
- 可设置自动缩放和暂停规则以节省费用

### 故障排查
- **构建失败**: 检查 Builds 标签的日志
- **容器无法启动**: 确保端口配置正确（80）
- **无法访问**: 检查端点类型是否选择了 Load Balancer
- **API 密钥问题**: 在环境变量中配置或使用浏览器端输入

---
*Powered by Google Gemini & Moda Labs.*
