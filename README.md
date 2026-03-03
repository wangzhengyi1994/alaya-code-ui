<p align="center">
  <a href="https://github.com/ketor/one-api"><img src="web/default/public/logo.svg" width="120" height="120" alt="Alaya Code"></a>
</p>

<div align="center">

# Alaya Code

_AI coding assistant subscription platform built on [One API](https://github.com/songquanpeng/one-api)_

[English](./README.en.md) · **中文**

</div>

<p align="center">
  <a href="https://github.com/ketor/one-api/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ketor/one-api" alt="License">
  </a>
  <a href="https://github.com/ketor/one-api/releases">
    <img src="https://img.shields.io/github/v/release/ketor/one-api?include_prereleases" alt="Release">
  </a>
  <a href="https://github.com/ketor/one-api">
    <img src="https://img.shields.io/github/stars/ketor/one-api" alt="Stars">
  </a>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#部署指南">部署指南</a> ·
  <a href="#开发指南">开发指南</a> ·
  <a href="#docker">Docker</a> ·
  <a href="#环境变量">环境变量</a> ·
  <a href="#项目结构">项目结构</a>
</p>

---

## 简介

Alaya Code 是一个面向开发者的 AI 编程助手订阅平台，基于 [One API](https://github.com/songquanpeng/one-api) 二次开发。通过标准的 OpenAI API 格式，提供对多种大模型的统一访问，同时增加了订阅计费、滚动窗口限额、加油包等商业化能力。

- **前端**：React 18 + TailwindCSS + Shadcn/ui，支持中英文切换（i18n）
- **后端**：Go 1.20 + Gin + GORM
- **数据库**：SQLite（开发） / MySQL / PostgreSQL（生产）
- **缓存**：Redis（订阅窗口限额必须）

> [!WARNING]
> 使用 root 用户初次登录系统后，务必修改默认密码 `123456`！

## 功能特性

### 订阅计费系统（新增）

- **套餐管理**：Lite（免费）/ Pro / Max 5x / Max 20x，设置不同价格和额度
- **5 小时滚动窗口限额**：基于 Redis 的实时额度控制，每 5 小时自动重置
- **加油包**：用户可购买额外额度包，不受窗口限制，有效期 30 天
- **订单系统**：完整的订单创建、支付状态跟踪
- **月消费上限**：Pro 及以上套餐可设置月消费上限，防止超额失控

### 多模型支持（继承自 One API）

支持 30+ 模型提供商，包括 OpenAI、Anthropic Claude、Google Gemini、DeepSeek、通义千问、智谱 GLM、Moonshot、文心一言、讯飞星火、百川、Mistral、Groq、Ollama、Cohere、xAI 等。

### 平台能力

- **渠道管理**：多渠道负载均衡，自动故障转移和重试
- **令牌管理**：过期时间、额度上限、IP 白名单、模型范围
- **用户分组**：支持用户分组与渠道分组，设置不同倍率
- **兑换码系统**：批量生成兑换码，用户自助充值
- **用量统计**：按天/按模型的详细用量和配额消耗图表
- **Stream 模式**：完整支持流式传输
- **多机部署**：支持主从架构，Redis 缓存
- **国际化**：全站中英文切换

### 前端界面

- 营销页面（落地页、定价页、服务条款、隐私政策）
- 文档中心（API 文档、SDK 指南、工具对接教程、计费说明、错误码、FAQ）
- 用户控制台（数据看板、API 密钥、订阅管理、用量统计、账单、加油包、设置）
- 管理后台（用户管理、渠道管理、兑换码管理、日志、系统设置）

## 快速开始

### 前置条件

| 工具 | 版本 | 说明 |
|------|------|------|
| Go | 1.20+ | 后端编译 |
| Node.js | 18+ | 前端构建 |
| Redis | 7+ | 订阅窗口计数（可选，不使用订阅功能可跳过） |
| MySQL | 8.0+ | 生产数据库（可选，默认 SQLite） |

### 从源码构建并运行

```bash
# 1. 克隆仓库
git clone https://github.com/ketor/one-api.git
cd one-api

# 2. 构建前端
cd web/default
npm install
npm run build
cd ../..

# 3. 构建后端（自动嵌入前端静态文件）
go mod download
go build -ldflags "-s -w" -o one-api-server

# 4. 运行（默认使用 SQLite，无需额外数据库）
./one-api-server --port 3000
```

访问 `http://localhost:3000`，初始账号 `root` / `123456`。

### 连接 MySQL + Redis（生产模式）

```bash
export SQL_DSN="user:password@tcp(127.0.0.1:3306)/one-api"
export REDIS_CONN_STRING="redis://127.0.0.1:6379"
export SYNC_FREQUENCY=60
export SESSION_SECRET="your-random-secret-string"
./one-api-server --port 3000
```

## 开发指南

### 前后端分离开发

开发时前端和后端可以分别启动，前端开发服务器会自动代理 API 请求到后端。

**终端 1 — 启动后端：**

```bash
# 从项目根目录
go run main.go --port 3000
```

**终端 2 — 启动前端开发服务器：**

```bash
cd web/default
npm install    # 首次运行
npm start      # 启动在 http://localhost:3001
```

前端开发服务器运行在 `http://localhost:3001`，通过 `package.json` 中的 `proxy` 字段将 `/api` 和 `/v1` 请求代理到 `http://localhost:3000`。

### 前端技术栈

| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TailwindCSS 3 | 样式 |
| Shadcn/ui (Radix UI) | 组件库 |
| CRACO | CRA 配置覆盖（集成 PostCSS + Tailwind） |
| React Router 6 | 路由 |
| i18next | 国际化 |
| Axios | HTTP 请求 |
| Recharts | 数据图表 |
| Lucide React | 图标 |

**关键配置文件：**

- `web/default/craco.config.js` — CRACO 配置（PostCSS + Tailwind 集成）
- `web/default/tailwind.config.js` — Tailwind 主题和插件
- `web/default/src/locales/` — i18n 翻译文件（`zh/`、`en/`）

### 后端技术栈

| 技术 | 用途 |
|------|------|
| Go 1.20 | 编程语言 |
| Gin | HTTP 框架 |
| GORM | ORM |
| go-redis | Redis 客户端 |
| gin-contrib/sessions | 会话管理 |
| golang-jwt | JWT 认证 |

### 构建所有前端主题

项目包含三个前端主题（default、berry、air）。完整构建：

```bash
cd web
./build.sh
cd ..
go build -ldflags "-s -w" -o one-api-server
```

### 调试

**后端调试：**

```bash
# 开启 debug 模式
export DEBUG=true
export DEBUG_SQL=true    # 打印 SQL 语句
go run main.go --port 3000
```

在 IDE（如 GoLand、VSCode）中可直接对 `main.go` 设置断点运行调试。

**前端调试：**

```bash
cd web/default
npm start
# 浏览器打开 http://localhost:3001，使用浏览器 DevTools 调试
```

前端热重载默认开启，修改代码后自动刷新。

## Docker

### 构建 Docker 镜像

```bash
# 构建镜像（多阶段构建，自动编译前端和后端）
docker build -t alaya-code:latest .

# 构建时指定平台（用于交叉编译）
docker build --platform linux/amd64 -t alaya-code:latest .
```

Dockerfile 采用多阶段构建：
1. **Node.js 阶段**：并行构建三个前端主题（default、berry、air）
2. **Go 阶段**：编译后端，嵌入前端静态文件，生成静态链接二进制
3. **运行阶段**：Alpine 3.19 最小镜像，非 root 用户运行

### Docker Compose 部署（推荐）

```bash
# 复制环境变量模板
cp .env.example .env
# 编辑 .env 修改 SESSION_SECRET 和数据库密码

# 启动所有服务（one-api + MySQL + Redis）
docker-compose up -d

# 查看日志
docker-compose logs -f one-api

# 停止服务
docker-compose down
```

`docker-compose.yml` 包含三个服务：

| 服务 | 镜像 | 说明 |
|------|------|------|
| one-api | alaya-code:latest | 主应用，端口 3000 |
| db | mysql:8.2.0 | 数据库，数据持久化到 `./data/mysql` |
| redis | redis:7-alpine | 缓存 + 订阅窗口计数，数据持久化到 `./data/redis` |

### 使用自建镜像运行 Docker Compose

如果你构建了自己的镜像，修改 `docker-compose.yml` 中的 `image` 字段：

```yaml
services:
  one-api:
    image: alaya-code:latest   # 替换为你的镜像名
    # ... 其他配置不变
```

### Docker 单独运行

**SQLite 模式（最简部署）：**

```bash
docker run -d --name alaya-code \
  --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -e SESSION_SECRET=your-random-secret \
  -v $(pwd)/data:/data \
  alaya-code:latest
```

**连接外部 MySQL + Redis：**

```bash
docker run -d --name alaya-code \
  --restart always \
  -p 3000:3000 \
  -e SQL_DSN="user:password@tcp(mysql-host:3306)/one-api" \
  -e REDIS_CONN_STRING="redis://redis-host:6379" \
  -e SYNC_FREQUENCY=60 \
  -e SESSION_SECRET=your-random-secret \
  -e MEMORY_CACHE_ENABLED=true \
  -e BATCH_UPDATE_ENABLED=true \
  -e TZ=Asia/Shanghai \
  -v $(pwd)/data:/data \
  alaya-code:latest
```

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        client_max_body_size 64m;
        proxy_http_version 1.1;
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

## 环境变量

> 支持从 `.env` 文件读取环境变量，参照 `.env.example`。

### 基础配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务端口 | `3000` |
| `GIN_MODE` | Gin 运行模式 | `debug`（生产环境设为 `release`） |
| `SQL_DSN` | 数据库连接串（留空使用 SQLite） | - |
| `REDIS_CONN_STRING` | Redis 连接串（订阅窗口必须） | - |
| `SESSION_SECRET` | 会话密钥（生产环境必须修改） | `random_string` |
| `TZ` | 时区 | `Asia/Shanghai` |

### 性能优化

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `MEMORY_CACHE_ENABLED` | 启用内存缓存 | `false` |
| `SYNC_FREQUENCY` | 数据库同步频率（秒），设置后 Redis 才生效 | `600` |
| `BATCH_UPDATE_ENABLED` | 批量更新聚合 | `false` |
| `BATCH_UPDATE_INTERVAL` | 批量更新间隔（秒） | `5` |

### 安全与限流

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `GLOBAL_API_RATE_LIMIT` | API 速率限制（3 分钟） | `480` |
| `GLOBAL_WEB_RATE_LIMIT` | Web 速率限制（3 分钟） | `240` |

### 多机部署

| 变量 | 说明 | 示例 |
|------|------|------|
| `NODE_TYPE` | 节点类型 | `master` / `slave` |
| `FRONTEND_BASE_URL` | 从节点页面重定向地址 | `https://your-domain.com` |

### 渠道管理

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `CHANNEL_TEST_FREQUENCY` | 渠道自动检测频率（分钟，0 = 关闭） | `0` |
| `RELAY_TIMEOUT` | 中继超时（秒，0 = 不限） | `0` |
| `RELAY_PROXY` | 中继 HTTP 代理 | - |

### 调试

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `DEBUG` | 开启调试模式 | `false` |
| `DEBUG_SQL` | 打印 SQL 语句 | `false` |
| `THEME` | 前端主题 | `default`（可选 `berry`、`air`） |

### 命令行参数

```bash
./one-api-server --port 3000        # 指定端口
./one-api-server --log-dir ./logs   # 指定日志目录
./one-api-server --version          # 打印版本号
./one-api-server --help             # 帮助信息
```

## 项目结构

```
one-api/
├── main.go                     # 入口文件（包含 go:embed 指令）
├── controller/                 # API 控制器
│   ├── subscription.go         #   订阅管理
│   ├── plan.go                 #   套餐管理
│   ├── booster.go              #   加油包
│   ├── order.go                #   订单
│   ├── channel.go              #   渠道管理
│   ├── token.go                #   令牌管理
│   └── ...
├── model/                      # 数据模型
│   ├── subscription.go         #   订阅模型
│   ├── plan.go                 #   套餐模型
│   ├── usage_window.go         #   用量窗口
│   ├── booster_pack.go         #   加油包模型
│   ├── cache_subscription.go   #   Redis 缓存层
│   ├── user.go                 #   用户模型
│   ├── channel.go              #   渠道模型
│   ├── token.go                #   令牌模型
│   └── ...
├── middleware/                 # 中间件
│   ├── auth.go                 #   认证
│   ├── subscription.go         #   订阅窗口限额
│   ├── rate-limit.go           #   速率限制
│   └── ...
├── relay/                      # 模型请求中继适配器
├── router/                     # 路由定义
│   ├── api.go                  #   API 路由
│   ├── relay.go                #   中继路由
│   └── web.go                  #   静态文件路由
├── web/                        # 前端
│   ├── default/                #   主题 - React 18 + TailwindCSS
│   │   ├── src/
│   │   │   ├── components/     #     UI / 业务 / 布局 / 导航组件
│   │   │   ├── pages/          #     console / admin / marketing / docs
│   │   │   ├── locales/        #     i18n 翻译文件 (zh, en)
│   │   │   └── helpers/        #     工具函数
│   │   ├── tailwind.config.js
│   │   └── craco.config.js
│   ├── berry/                  #   主题 - Berry
│   ├── air/                    #   主题 - Air
│   ├── build/                  #   构建输出（被 Go embed）
│   └── build.sh                #   全主题构建脚本
├── Dockerfile                  # 多阶段 Docker 构建
├── docker-compose.yml          # Docker Compose 编排
├── .env.example                # 环境变量模板
├── go.mod / go.sum             # Go 依赖
└── LICENSE                     # MIT License
```

## API 端点

### 中继 API（OpenAI 兼容）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/v1/chat/completions` | 对话补全 |
| POST | `/v1/completions` | 文本补全 |
| POST | `/v1/embeddings` | 文本嵌入 |
| POST | `/v1/images/generations` | 图像生成 |
| GET | `/v1/models` | 模型列表 |

### 用户端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/user/login` | 登录 |
| GET | `/api/user/self` | 当前用户信息 |
| GET | `/api/user/dashboard` | 用量看板 |
| GET/POST | `/api/token/` | 令牌 CRUD |
| GET | `/api/subscription/self` | 订阅详情 |
| GET | `/api/subscription/quota` | 窗口配额 |

### 管理端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET/POST | `/api/channel/` | 渠道 CRUD |
| GET/POST | `/api/user/` | 用户管理 |
| GET/POST | `/api/redemption/` | 兑换码管理 |
| GET/PUT | `/api/option/` | 系统设置 |

## 使用方法

1. 管理员在**渠道管理**中添加上游 API Key
2. 用户注册登录后，在 **API 密钥**页面创建令牌
3. 在 IDE 或工具中配置：

```bash
OPENAI_API_KEY="sk-xxxxxx"          # Alaya Code 生成的令牌
OPENAI_API_BASE="https://<HOST>/v1" # Alaya Code 部署地址
```

支持的工具：Cursor、Claude Code、VSCode + Cline / Continue、OpenCode 等所有兼容 OpenAI API 的工具。

## 多机部署

1. 所有节点 `SESSION_SECRET` 设置相同值
2. 必须使用 MySQL（`SQL_DSN`），所有节点连接同一数据库
3. 从服务器设置 `NODE_TYPE=slave`
4. 设置 `SYNC_FREQUENCY` 定期从数据库同步配置
5. 各节点分别配置 Redis（`REDIS_CONN_STRING`）

## 常见问题

**额度怎么计算？**
> 额度 = 分组倍率 × 模型倍率 ×（提示 token + 补全 token × 补全倍率）

**订阅窗口是什么？**
> 默认 5 小时滚动窗口，窗口内的 API 请求次数不超过套餐限额。超额后根据套餐类型暂停使用或按 API 费率计费。窗口结束后计数器自动重置。

**Redis 是必须的吗？**
> 如果使用订阅计费功能（窗口限额），Redis 是必须的。如果只用基础的令牌 + 额度模式，可以不配置 Redis。

**如何从 One API 迁移？**
> 数据库完全兼容，直接替换二进制文件即可。新增的订阅相关表会自动创建。

**提示无可用渠道？**
> 检查用户分组和渠道分组设置是否匹配，以及渠道的模型列表是否包含请求的模型。

## 致谢

本项目基于 [One API](https://github.com/songquanpeng/one-api) 开源项目开发，感谢原作者 [songquanpeng](https://github.com/songquanpeng) 的贡献。

## License

[MIT License](./LICENSE)
