# RunPod.io 自动部署配置完成

## 概述
已为您的 MODA AI Studio 项目配置好 RunPod.io 自动部署功能。所有必要的文件已经创建并提交。

## 已创建的文件

### 1. `Dockerfile`
- 多阶段构建配置
- 第一阶段：使用 Node.js 20 构建 React 应用
- 第二阶段：使用 Nginx Alpine 提供静态文件服务
- 包含健康检查配置
- 优化的构建层缓存

### 2. `nginx.conf`
- Nginx 服务器配置
- 支持 SPA 路由（所有路由指向 index.html）
- Gzip 压缩
- 静态资源缓存策略
- 安全头部配置

### 3. `.dockerignore`
- 排除 node_modules、构建产物等不必要文件
- 减少 Docker 镜像大小
- 加快构建速度

### 4. `.github/workflows/runpod-build.yml`
- GitHub Actions 工作流
- 每次推送到 main/master 分支时自动构建和测试 Docker 镜像
- 验证镜像可以正常启动
- 提供部署说明

### 5. `RUNPOD.md`
- 详细的 RunPod 配置指南
- 推荐的资源配置
- 环境变量设置说明
- 故障排查提示

### 6. `README.md` (已更新)
- 添加了完整的 RunPod 部署章节
- 包含中文的详细步骤说明
- 本地测试指南
- 费用说明和最佳实践

## 如何使用

### 方法一：RunPod 控制台手动部署（推荐新手）

1. 登录 [RunPod Console](https://www.runpod.io/console)

2. 连接 GitHub：
   - 进入 Settings → Connections
   - 点击 GitHub 卡片上的 Connect
   - 授权 RunPod 访问您的仓库

3. 创建端点：
   - 进入 Serverless 部分
   - 点击 New Endpoint
   - 选择 "Import Git Repository"
   - 选择 `hhongli1979-coder/qqq` 仓库
   - 选择要部署的分支（main 或 master）

4. 配置端点：
   - 端点名称：`moda-ai-studio`
   - 端点类型：Load Balancer（用于 HTTP 访问）
   - 端口：80
   - 添加环境变量（可选）：
     ```
     GEMINI_API_KEY=你的密钥
     ```
   - 资源：选择 CPU 实例（GPU 不是必需的）

5. 点击 Deploy Endpoint，RunPod 会自动：
   - 克隆您的仓库
   - 构建 Docker 镜像
   - 部署容器
   - 提供访问 URL

### 方法二：本地测试后部署

在部署到 RunPod 之前，可以本地测试：

```bash
# 构建镜像
docker build -t moda-ai-studio .

# 运行容器
docker run -d -p 8080:80 --name moda-test moda-ai-studio

# 在浏览器访问 http://localhost:8080

# 停止并删除
docker stop moda-test && docker rm moda-test
```

## 自动化

- GitHub Actions 会在每次推送时自动测试 Docker 构建
- RunPod 可以配置为在推送到特定分支时自动重新部署
- 所有构建日志都可以在 RunPod Builds 标签中查看

## 环境变量

在 RunPod 控制台配置端点时，可以添加以下环境变量：

- `GEMINI_API_KEY` - Google Gemini API 密钥（必需，用于 AI 功能）
- `OPENAI_API_KEY` - OpenAI API 密钥（可选）
- `NODE_ENV=production` - 生产环境标识

**注意**：不要将 API 密钥提交到代码仓库！

## 成本估算

- **CPU 实例**（推荐）：约 $0.0001-0.0003/秒（~$0.006-0.018/分钟）
- **按使用计费**：容器运行时间
- **建议**：配置自动暂停以节省成本

## 监控和维护

### 查看日志
- RunPod Console → 您的端点 → Logs 标签

### 查看构建状态
- RunPod Console → 您的端点 → Builds 标签
- GitHub Actions → Actions 标签

### 更新部署
- 推送代码到 GitHub
- RunPod 会自动检测并重新构建（如果启用了自动部署）

## 故障排查

### 构建失败
1. 检查 Builds 标签中的日志
2. 验证 Dockerfile 语法
3. 确保 package.json 中的依赖都可以安装

### 无法访问
1. 确认端点类型是 Load Balancer
2. 检查端口配置是否为 80
3. 查看容器日志

### API 密钥问题
1. 在 RunPod 环境变量中配置密钥
2. 或者在浏览器端输入密钥（应用支持）

## 下一步

1. ✅ 所有配置文件已创建并提交
2. ⏭️ 前往 RunPod 控制台连接 GitHub
3. ⏭️ 创建新端点并选择此仓库
4. ⏭️ 配置并部署
5. ⏭️ 获取访问 URL 并测试

## 支持资源

- [RunPod 官方文档](https://docs.runpod.io)
- [RunPod GitHub 集成指南](https://docs.runpod.io/serverless/workers/github-integration)
- 项目 README.md 中的详细说明
- RUNPOD.md 配置参考

---

**部署状态：✅ 已配置完成，ready to deploy！**

如有任何问题，请查看上述文档或 RunPod 官方支持。
