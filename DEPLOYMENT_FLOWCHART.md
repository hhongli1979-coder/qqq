# RunPod.io 部署流程图

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│                  hhongli1979-coder/qqq                       │
│                                                               │
│  ├── Dockerfile (Node.js 20 + Nginx)                        │
│  ├── nginx.conf (SPA配置)                                    │
│  ├── .dockerignore (构建优化)                                │
│  ├── .github/workflows/runpod-build.yml (CI/CD)             │
│  └── Source Code (React + TypeScript + Vite)                │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Push/Commit
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions (自动触发)                        │
│                                                               │
│  1. Checkout code                                            │
│  2. Set up Docker Buildx                                     │
│  3. Build Docker image                                       │
│  4. Test container (curl http://localhost:8080)             │
│  5. Display deployment instructions                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Manual: Connect to RunPod
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    RunPod Console                            │
│                https://www.runpod.io/console                 │
│                                                               │
│  1. Settings → Connections → Connect GitHub                 │
│  2. Serverless → New Endpoint                                │
│  3. Import Git Repository → Select qqq repo                 │
│  4. Configure:                                               │
│     - Type: Load Balancer                                    │
│     - Port: 80                                               │
│     - Resources: CPU (2-4 cores, 2-4GB RAM)                 │
│     - Environment: GEMINI_API_KEY=xxx                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Deploy
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              RunPod Build Process                            │
│                                                               │
│  Stage 1: Builder (Node.js 20-alpine)                       │
│  ├── npm install (dependencies)                             │
│  ├── npm run build (Vite build)                             │
│  └── Output: /app/dist                                      │
│                                                               │
│  Stage 2: Production (Nginx alpine)                         │
│  ├── Copy nginx.conf → /etc/nginx/conf.d/default.conf      │
│  ├── Copy dist → /usr/share/nginx/html                     │
│  └── Expose port 80                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Container Start
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            Running Container on RunPod                       │
│                                                               │
│  Container:                                                  │
│  ├── Nginx serving on port 80                               │
│  ├── Health check: every 30s                                │
│  ├── Auto-restart on failure                                │
│  └── Logs available in RunPod Console                       │
│                                                               │
│  Access URL:                                                 │
│  https://your-endpoint.runpod.io                            │
└─────────────────────────────────────────────────────────────┘
```

## Docker 构建流程详解

```
Dockerfile (Multi-stage build)
│
├── Stage 1: Builder
│   │
│   ├── FROM node:20-alpine
│   ├── WORKDIR /app
│   ├── COPY package*.json ./
│   ├── RUN npm install           ← 安装所有依赖（包括 devDependencies）
│   ├── COPY . .                  ← 复制源代码
│   └── RUN npm run build         ← Vite 构建 → dist/
│       └── 输出: React SPA 静态文件
│
└── Stage 2: Production
    │
    ├── FROM nginx:alpine         ← 轻量级 Nginx 镜像
    ├── COPY nginx.conf → /etc/nginx/conf.d/
    ├── COPY --from=builder /app/dist → /usr/share/nginx/html/
    ├── EXPOSE 80
    ├── HEALTHCHECK              ← 每 30 秒检查健康状态
    └── CMD ["nginx", "-g", "daemon off;"]
```

## Nginx 配置

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    
    # SPA 路由处理
    location / {
        try_files $uri $uri/ /index.html;  ← 所有路由返回 index.html
    }
    
    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;                         ← 缓存 1 年
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/javascript;
}
```

## 环境变量流程

```
┌──────────────────────┐
│  Build Time (Docker) │
│                      │
│  ARG 变量（可选）     │  ← 不推荐放密钥
└──────────────────────┘
            │
            ▼
┌──────────────────────┐
│   Runtime (RunPod)   │
│                      │
│  ENV 变量设置在:      │
│  RunPod Console       │  ← 推荐：GEMINI_API_KEY
│  → Environment Vars   │
└──────────────────────┘
            │
            ▼
┌──────────────────────┐
│  Application Access  │
│                      │
│  浏览器端访问时       │
│  → 提示输入 API Key   │  ← 备选方案
│  → LocalStorage 存储  │
└──────────────────────┘
```

## 部署时间线

```
┌─────────────────────────────────────────────────────────┐
│ 0:00 - Start Deploy                                     │
│   └── RunPod 克隆 GitHub 仓库                            │
├─────────────────────────────────────────────────────────┤
│ 0:30 - Docker Build Stage 1: Builder                   │
│   ├── Pull node:20-alpine (~40MB)                      │
│   ├── npm install (~75s, 下载依赖)                      │
│   └── npm run build (~10s, Vite 构建)                   │
├─────────────────────────────────────────────────────────┤
│ 1:45 - Docker Build Stage 2: Production                │
│   ├── Pull nginx:alpine (~20MB)                        │
│   ├── Copy nginx.conf                                   │
│   └── Copy built files from Stage 1                    │
├─────────────────────────────────────────────────────────┤
│ 2:00 - Upload Image to RunPod Registry                 │
│   └── 压缩并上传镜像 (~100MB)                            │
├─────────────────────────────────────────────────────────┤
│ 2:30 - Deploy Container                                │
│   ├── 创建端点                                           │
│   ├── 分配资源                                           │
│   └── 启动容器                                           │
├─────────────────────────────────────────────────────────┤
│ 3:00 - Ready! ✅                                        │
│   └── 访问 URL: https://your-endpoint.runpod.io        │
└─────────────────────────────────────────────────────────┘

Total: ~3 分钟
后续部署（有缓存）: ~1-2 分钟
```

## 成本计算

```
┌─────────────────────────────────────────────────┐
│ CPU Instance (推荐用于 Web 应用)                 │
├─────────────────────────────────────────────────┤
│ 配置: 2 vCPU, 4GB RAM                           │
│ 费率: ~$0.0002/秒                                │
│                                                  │
│ 每小时: $0.72                                    │
│ 每天 (24/7): $17.28                            │
│ 每月: $518.40                                   │
│                                                  │
│ 💡 优化建议:                                     │
│  - 启用自动暂停 (idle > 5min)                    │
│  - 设置最大运行时间                              │
│  - 使用 Spot 实例（更便宜）                       │
│                                                  │
│ 优化后估算:                                      │
│  - 实际使用: ~2-4 小时/天                        │
│  - 月成本: ~$43-87                               │
└─────────────────────────────────────────────────┘
```

## 监控和维护

```
RunPod Console 功能:
│
├── Logs (日志)
│   ├── Container stdout/stderr
│   ├── Nginx 访问日志
│   └── 应用错误日志
│
├── Builds (构建)
│   ├── 构建状态 (Pending/Building/Completed/Failed)
│   ├── 构建日志
│   └── Docker 层信息
│
├── Metrics (指标)
│   ├── CPU 使用率
│   ├── 内存使用量
│   ├── 请求数/响应时间
│   └── 网络流量
│
└── Settings (设置)
    ├── 环境变量
    ├── 自动缩放规则
    ├── 健康检查配置
    └── 域名绑定
```

## 故障排查决策树

```
部署失败？
│
├─ 构建阶段失败？
│  ├─ npm install 错误？
│  │  └─ 检查: package.json 依赖版本, Node.js 版本
│  │
│  └─ npm run build 错误？
│     └─ 检查: TypeScript 错误, Vite 配置
│
├─ 镜像上传失败？
│  └─ 检查: 网络连接, RunPod 配额
│
└─ 容器启动失败？
   ├─ 端口冲突？
   │  └─ 确认: Dockerfile EXPOSE 80, RunPod 配置 port 80
   │
   ├─ 健康检查失败？
   │  └─ 查看: Container logs, Nginx 配置
   │
   └─ 环境变量问题？
      └─ 验证: RunPod Console 中的 ENV 设置
```

---

**部署成功标志**: 访问 RunPod 提供的 URL，看到 MODA AI Studio 界面！
