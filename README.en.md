<p align="center">
  <a href="https://github.com/ketor/one-api"><img src="web/default/public/logo.svg" width="120" height="120" alt="Alaya Code"></a>
</p>

<div align="center">

# Alaya Code

_AI coding assistant subscription platform built on [One API](https://github.com/songquanpeng/one-api)_

**English** · [中文](./README.md)

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
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#development">Development</a> ·
  <a href="#docker">Docker</a> ·
  <a href="#environment-variables">Environment Variables</a> ·
  <a href="#project-structure">Project Structure</a>
</p>

---

## Overview

Alaya Code is a developer-facing AI coding assistant subscription platform, built on top of [One API](https://github.com/songquanpeng/one-api). It provides unified access to multiple LLMs through a standard OpenAI-compatible API, with added subscription billing, rolling window quotas, booster packs, and other commercial capabilities.

- **Frontend**: React 18 + TailwindCSS + Shadcn/ui with full i18n (Chinese & English)
- **Backend**: Go 1.20 + Gin + GORM
- **Database**: SQLite (dev) / MySQL / PostgreSQL (production)
- **Cache**: Redis (required for subscription window quotas)

> [!WARNING]
> After first login with the root user, make sure to change the default password `123456`!

## Features

### Subscription Billing System

- **Plan management**: Lite (free) / Pro / Max 5x / Max 20x with different pricing and quotas
- **5-hour rolling window quota**: Redis-based real-time quota control, automatically resets every 5 hours
- **Booster packs**: One-time quota top-ups, not subject to window limits, valid for 30 days
- **Order system**: Complete order creation and payment status tracking
- **Monthly spending cap**: Pro and above plans can set monthly spending limits

### Multi-Model Support (inherited from One API)

Supports 30+ model providers including OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Qwen, GLM, Moonshot, Wenxin, SparkDesk, Baichuan, Mistral, Groq, Ollama, Cohere, xAI, and more.

### Platform Capabilities

- **Channel management**: Multi-channel load balancing with automatic failover and retry
- **Token management**: Expiration, quota caps, IP whitelist, model scope
- **User groups**: User and channel grouping with configurable rate multipliers
- **Redemption codes**: Batch generation, user self-service top-up
- **Usage analytics**: Per-day and per-model detailed usage and quota charts
- **Streaming**: Full SSE streaming support
- **Multi-node deployment**: Master-slave architecture with Redis caching
- **Internationalization**: Full Chinese/English site-wide language switching

### Frontend Pages

- Marketing pages (landing, pricing, terms of service, privacy policy)
- Documentation center (API docs, SDK guide, tool integration, billing, error codes, FAQ)
- User console (dashboard, API keys, subscription, usage, billing, booster packs, settings)
- Admin panel (user management, channel management, redemption codes, logs, system settings)

## Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Go | 1.20+ | Backend compilation |
| Node.js | 18+ | Frontend build |
| Redis | 7+ | Subscription window counting (optional if not using subscriptions) |
| MySQL | 8.0+ | Production database (optional, defaults to SQLite) |

### Build and Run from Source

```bash
# 1. Clone the repository
git clone https://github.com/ketor/one-api.git
cd one-api

# 2. Build the frontend
cd web/default
npm install
npm run build
cd ../..

# 3. Build the backend (embeds frontend static files automatically)
go mod download
go build -ldflags "-s -w" -o one-api-server

# 4. Run (uses SQLite by default, no extra database needed)
./one-api-server --port 3000
```

Visit `http://localhost:3000`, default credentials: `root` / `123456`.

### Connect to MySQL + Redis (production)

```bash
export SQL_DSN="user:password@tcp(127.0.0.1:3306)/one-api"
export REDIS_CONN_STRING="redis://127.0.0.1:6379"
export SYNC_FREQUENCY=60
export SESSION_SECRET="your-random-secret-string"
./one-api-server --port 3000
```

## Development

### Separate Frontend & Backend Development

During development, the frontend and backend can run independently. The frontend dev server automatically proxies API requests to the backend.

**Terminal 1 — Start the backend:**

```bash
# From the project root
go run main.go --port 3000
```

**Terminal 2 — Start the frontend dev server:**

```bash
cd web/default
npm install    # First time only
npm start      # Starts at http://localhost:3001
```

The frontend dev server runs at `http://localhost:3001` and proxies `/api` and `/v1` requests to `http://localhost:3000` via the `proxy` field in `package.json`.

### Frontend Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TailwindCSS 3 | Styling |
| Shadcn/ui (Radix UI) | Component library |
| CRACO | CRA config override (PostCSS + Tailwind integration) |
| React Router 6 | Routing |
| i18next | Internationalization |
| Axios | HTTP client |
| Recharts | Data visualization |
| Lucide React | Icons |

**Key config files:**

- `web/default/craco.config.js` — CRACO configuration (PostCSS + Tailwind)
- `web/default/tailwind.config.js` — Tailwind theme and plugins
- `web/default/src/locales/` — i18n translation files (`zh/`, `en/`)

### Backend Tech Stack

| Technology | Purpose |
|------------|---------|
| Go 1.20 | Programming language |
| Gin | HTTP framework |
| GORM | ORM |
| go-redis | Redis client |
| gin-contrib/sessions | Session management |
| golang-jwt | JWT authentication |

### Building All Frontend Themes

The project includes three frontend themes (default, berry, air). To build all:

```bash
cd web
./build.sh
cd ..
go build -ldflags "-s -w" -o one-api-server
```

### Debugging

**Backend debugging:**

```bash
# Enable debug mode
export DEBUG=true
export DEBUG_SQL=true    # Print SQL statements
go run main.go --port 3000
```

You can also set breakpoints on `main.go` in your IDE (GoLand, VSCode with Go extension) and run in debug mode.

**Frontend debugging:**

```bash
cd web/default
npm start
# Open http://localhost:3001 in your browser and use DevTools
```

Hot reload is enabled by default — code changes are reflected immediately.

## Docker

### Building the Docker Image

```bash
# Build the image (multi-stage build, compiles frontend and backend automatically)
docker build -t alaya-code:latest .

# Cross-compile for a specific platform
docker build --platform linux/amd64 -t alaya-code:latest .
```

The Dockerfile uses a multi-stage build:
1. **Node.js stage**: Builds all three frontend themes (default, berry, air) in parallel
2. **Go stage**: Compiles the backend with embedded frontend assets, produces a statically linked binary
3. **Runtime stage**: Minimal Alpine 3.19 image, runs as non-root user

### Docker Compose Deployment (Recommended)

```bash
# Copy the environment template
cp .env.example .env
# Edit .env to change SESSION_SECRET and database passwords

# Start all services (one-api + MySQL + Redis)
docker-compose up -d

# View logs
docker-compose logs -f one-api

# Stop services
docker-compose down
```

`docker-compose.yml` includes three services:

| Service | Image | Description |
|---------|-------|-------------|
| one-api | alaya-code:latest | Main application, port 3000 |
| db | mysql:8.2.0 | Database, data persisted to `./data/mysql` |
| redis | redis:7-alpine | Cache + subscription window counting, data persisted to `./data/redis` |

### Using a Custom Image with Docker Compose

If you built your own image, update the `image` field in `docker-compose.yml`:

```yaml
services:
  one-api:
    image: alaya-code:latest   # Replace with your image name
    # ... rest of config unchanged
```

### Standalone Docker Run

**SQLite mode (simplest deployment):**

```bash
docker run -d --name alaya-code \
  --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -e SESSION_SECRET=your-random-secret \
  -v $(pwd)/data:/data \
  alaya-code:latest
```

**With external MySQL + Redis:**

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

### Nginx Reverse Proxy

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

## Environment Variables

> Environment variables can be loaded from a `.env` file. See `.env.example` for the full template.

### Core Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `GIN_MODE` | Gin run mode | `debug` (set to `release` in production) |
| `SQL_DSN` | Database connection string (empty = SQLite) | - |
| `REDIS_CONN_STRING` | Redis connection string (required for subscriptions) | - |
| `SESSION_SECRET` | Session secret (must change in production) | `random_string` |
| `TZ` | Timezone | `Asia/Shanghai` |

### Performance

| Variable | Description | Default |
|----------|-------------|---------|
| `MEMORY_CACHE_ENABLED` | Enable in-memory caching | `false` |
| `SYNC_FREQUENCY` | DB sync interval in seconds (enables Redis when set) | `600` |
| `BATCH_UPDATE_ENABLED` | Enable batch update aggregation | `false` |
| `BATCH_UPDATE_INTERVAL` | Batch update interval in seconds | `5` |

### Security & Rate Limiting

| Variable | Description | Default |
|----------|-------------|---------|
| `GLOBAL_API_RATE_LIMIT` | API rate limit per 3 minutes | `480` |
| `GLOBAL_WEB_RATE_LIMIT` | Web rate limit per 3 minutes | `240` |

### Multi-Node Deployment

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_TYPE` | Node type | `master` / `slave` |
| `FRONTEND_BASE_URL` | Redirect URL for slave nodes | `https://your-domain.com` |

### Channel Management

| Variable | Description | Default |
|----------|-------------|---------|
| `CHANNEL_TEST_FREQUENCY` | Auto-test interval in minutes (0 = disabled) | `0` |
| `RELAY_TIMEOUT` | Relay timeout in seconds (0 = unlimited) | `0` |
| `RELAY_PROXY` | HTTP proxy for relay requests | - |

### Debugging

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Enable debug mode | `false` |
| `DEBUG_SQL` | Print SQL statements | `false` |
| `THEME` | Frontend theme | `default` (options: `berry`, `air`) |

### Command-Line Arguments

```bash
./one-api-server --port 3000        # Set port
./one-api-server --log-dir ./logs   # Set log directory
./one-api-server --version          # Print version
./one-api-server --help             # Show help
```

## Project Structure

```
one-api/
├── main.go                     # Entry point (with go:embed directive)
├── controller/                 # API controllers
│   ├── subscription.go         #   Subscription management
│   ├── plan.go                 #   Plan management
│   ├── booster.go              #   Booster packs
│   ├── order.go                #   Orders
│   ├── channel.go              #   Channel management
│   ├── token.go                #   Token management
│   └── ...
├── model/                      # Data models
│   ├── subscription.go         #   Subscription model
│   ├── plan.go                 #   Plan model
│   ├── usage_window.go         #   Usage window
│   ├── booster_pack.go         #   Booster pack model
│   ├── cache_subscription.go   #   Redis cache layer
│   ├── user.go                 #   User model
│   ├── channel.go              #   Channel model
│   ├── token.go                #   Token model
│   └── ...
├── middleware/                 # Middleware
│   ├── auth.go                 #   Authentication
│   ├── subscription.go         #   Subscription window quota
│   ├── rate-limit.go           #   Rate limiting
│   └── ...
├── relay/                      # Model relay adapters
├── router/                     # Route definitions
│   ├── api.go                  #   API routes
│   ├── relay.go                #   Relay routes
│   └── web.go                  #   Static file routes
├── web/                        # Frontend
│   ├── default/                #   Theme - React 18 + TailwindCSS
│   │   ├── src/
│   │   │   ├── components/     #     UI / business / layout / navigation
│   │   │   ├── pages/          #     console / admin / marketing / docs
│   │   │   ├── locales/        #     i18n translations (zh, en)
│   │   │   └── helpers/        #     Utilities
│   │   ├── tailwind.config.js
│   │   └── craco.config.js
│   ├── berry/                  #   Theme - Berry
│   ├── air/                    #   Theme - Air
│   ├── build/                  #   Build output (embedded by Go)
│   └── build.sh                #   All-themes build script
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker Compose orchestration
├── .env.example                # Environment variable template
├── go.mod / go.sum             # Go dependencies
└── LICENSE                     # MIT License
```

## API Endpoints

### Relay API (OpenAI-Compatible)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/chat/completions` | Chat completions |
| POST | `/v1/completions` | Text completions |
| POST | `/v1/embeddings` | Text embeddings |
| POST | `/v1/images/generations` | Image generation |
| GET | `/v1/models` | List models |

### User API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/user/login` | Login |
| GET | `/api/user/self` | Current user info |
| GET | `/api/user/dashboard` | Usage dashboard |
| GET/POST | `/api/token/` | Token CRUD |
| GET | `/api/subscription/self` | Subscription details |
| GET | `/api/subscription/quota` | Window quota info |

### Admin API

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/channel/` | Channel CRUD |
| GET/POST | `/api/user/` | User management |
| GET/POST | `/api/redemption/` | Redemption code management |
| GET/PUT | `/api/option/` | System settings |

## Usage

1. Admin adds upstream API keys in **Channel Management**
2. Users register and create tokens on the **API Keys** page
3. Configure your IDE or tool:

```bash
OPENAI_API_KEY="sk-xxxxxx"          # Token generated by Alaya Code
OPENAI_API_BASE="https://<HOST>/v1" # Alaya Code deployment URL
```

Compatible with Cursor, Claude Code, VSCode + Cline / Continue, OpenCode, and any OpenAI API-compatible tool.

## Multi-Node Deployment

1. Set the same `SESSION_SECRET` on all nodes
2. Must use MySQL (`SQL_DSN`) — all nodes connect to the same database
3. Set `NODE_TYPE=slave` on worker nodes
4. Set `SYNC_FREQUENCY` to periodically sync configuration from the database
5. Configure Redis (`REDIS_CONN_STRING`) on each node

## FAQ

**How is quota calculated?**
> Quota = group multiplier × model multiplier × (prompt tokens + completion tokens × completion multiplier)

**What is a subscription window?**
> A 5-hour rolling window where API request count must stay within the plan's limit. After exceeding the limit, requests are either paused (Lite) or billed at API rates (Pro and above). The counter resets automatically when the window ends.

**Is Redis required?**
> Yes, if you use subscription billing features (window quotas). If you only use basic token + quota mode, Redis is optional.

**How to migrate from One API?**
> The database is fully compatible — just replace the binary. New subscription-related tables are created automatically.

**"No available channel" error?**
> Check that user groups and channel groups match, and that the channel's model list includes the requested model.

## Acknowledgments

This project is built on [One API](https://github.com/songquanpeng/one-api) by [songquanpeng](https://github.com/songquanpeng). Thank you for the excellent open-source foundation.

## License

[MIT License](./LICENSE)
