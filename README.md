<div align="center">

# SiteCraft AI

### Intelligent Project Management Platform for Digital Agencies

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A full-stack microservices platform that streamlines the client-agency workflow — from project intake and AI-powered requirement analysis to real-time collaboration and lifecycle tracking.**

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [File Reference](#-file-reference)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Multi-Device & Network Setup](#-multi-device--network-setup)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🧩 About The Project

**SiteCraft AI** was built to solve a real-world problem: the disjointed communication and project tracking between development agencies and their clients. Traditional workflows rely on scattered emails, spreadsheets, and disconnected tools — leading to delays, miscommunication, and poor client experience.

This platform provides:

- A **public-facing client portal** where users can explore services, submit project requirements, and track their project's lifecycle in real time.
- A **private admin dashboard** where agency teams manage incoming leads, update project statuses, communicate with clients, and organize team members — all from a single command center.
- An **AI analysis engine** that processes raw project descriptions and extracts actionable technical insights (technology suggestions, timeline estimates, project categorization).

> Built as a production-grade MERN application with a microservices architecture, containerized via Docker for consistent deployment across environments.

---

## 🔥 Key Features

| Feature | Description |
|:--------|:------------|
| **AI Requirement Analysis** | Clients submit a project idea; the AI service automatically extracts the recommended tech stack, estimated timelines, and project classification. |
| **Real-time Project Lifecycle** | Clients see their project status update live (Pending → Analyzing → In Development → Completed) without refreshing — powered by Socket.io. |
| **Integrated Chat System** | Direct, real-time messaging between clients and admins per project. No more email threads or context switching. |
| **Admin Command Center** | Centralized dashboard with stats cards, project management, team CRUD, and messaging — all behind role-based authentication. |
| **JWT Authentication** | Secure login/register flow with role-based access control (client vs. admin). Protected routes on both frontend and backend. |
| **Team Management** | Admins can dynamically add, edit, and remove team members. Changes reflect immediately on the public-facing website. |
| **Premium UI/UX** | Dark-mode-first design with glassmorphism, Framer Motion animations, responsive layouts, and a custom lime-accent design system. |
| **Docker Orchestration** | One command (`docker-compose up`) spins up all 4 microservices, the API gateway, 4 MongoDB instances, and both frontends. |

---

## 🏗 Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────────┐            ┌──────────────────┐           │
│  │   client-web     │            │   admin-web      │           │
│  │   (React + Vite) │            │   (React + Vite) │           │
│  │   Port: 5173     │            │   Port: 5174     │           │
│  └────────┬─────────┘            └────────┬─────────┘           │
│           │          HTTP / WS             │                    │
└───────────┼───────────────────────────────┼─────────────────────┘
            │                               │
            ▼                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API GATEWAY (Port: 5000)                    │
│            Express + http-proxy-middleware                       │
│   /api/auth → auth-service    /api/projects → project-service   │
│   /api/chat → chat-service    /api/ai → ai-service              │
└──────┬──────────┬──────────────┬──────────────┬─────────────────┘
       │          │              │              │
       ▼          ▼              ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Auth    │ │ Project  │ │  Chat    │ │   AI     │
│ Service  │ │ Service  │ │ Service  │ │ Service  │
│ :5001    │ │ :5002    │ │ :5003    │ │ :5004    │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │             │
     ▼            ▼            ▼             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Auth DB  │ │Project DB│ │ Chat DB  │ │  AI DB   │
│ MongoDB  │ │ MongoDB  │ │ MongoDB  │ │ MongoDB  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Tech Stack Breakdown

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 3 | Component-based UI with hot module replacement |
| **Animations** | Framer Motion 12 | Page transitions, hover effects, scroll-triggered reveals |
| **Icons** | Lucide React | Consistent, lightweight SVG icon library |
| **Routing** | React Router DOM 7 | Client-side navigation with protected route guards |
| **State** | React Context API + Custom Hooks | Authentication state, socket connections |
| **API Gateway** | Express + http-proxy-middleware | Central entry point, request routing to microservices |
| **Auth Service** | Express, bcryptjs, JWT, Passport.js | User registration, login, Google OAuth, role management |
| **Project Service** | Express, Mongoose, Multer | CRUD operations for projects, file uploads, team management |
| **Chat Service** | Express, Socket.io, Mongoose | Real-time bidirectional messaging with message persistence |
| **AI Service** | Express, Mongoose | NLP processing of project requirements for insights |
| **Database** | MongoDB (Atlas / Local) | Document-based storage — one database per service |
| **Containerization** | Docker, Docker Compose | Multi-container orchestration with volume mounts |

---

## 📁 Project Structure

```
sitecraft-ai/
│
├── client-web/                    # Public-facing client website
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PortfolioSection.jsx
│   │   │   ├── ProcessSection.jsx
│   │   │   ├── RequirementForm.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   └── TeamSection.jsx
│   │   ├── pages/                 # Route-level page views
│   │   │   ├── Home.jsx           # Landing page with hero, stats, portfolio
│   │   │   ├── About.jsx          # Agency manifesto + live project tracker
│   │   │   ├── Auth.jsx           # Login / Register forms
│   │   │   ├── Chat.jsx           # Real-time project chat
│   │   │   ├── Contact.jsx        # Contact form
│   │   │   ├── Dashboard.jsx      # Client project dashboard
│   │   │   ├── Portfolio.jsx      # Portfolio showcase grid
│   │   │   ├── ProjectDetails.jsx # Individual project deep-dive
│   │   │   ├── Services.jsx       # Services catalog
│   │   │   └── StartProject.jsx   # Project submission wizard
│   │   ├── context/               # AuthContext (JWT token management)
│   │   ├── hooks/                 # Custom React hooks
│   │   └── services/              # Axios API layer
│   ├── Dockerfile
│   └── package.json
│
├── admin-web/                     # Private admin dashboard
│   ├── src/
│   │   ├── components/            # Admin UI components (Sidebar, Topbar, Cards)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Overview with stats + recent projects
│   │   │   ├── Projects.jsx       # Full project list with filters
│   │   │   ├── ProjectDetails.jsx # Manage individual project lifecycle
│   │   │   ├── Messages.jsx       # Chat inbox across all projects
│   │   │   ├── TeamManagement.jsx # CRUD for agency team members
│   │   │   ├── Settings.jsx       # Admin account settings
│   │   │   └── Login.jsx          # Admin authentication
│   │   ├── context/               # Admin AuthContext
│   │   ├── socket/                # Socket.io client for real-time updates
│   │   └── services/              # Admin API layer
│   ├── Dockerfile
│   └── package.json
│
├── gateway/                       # API Gateway (reverse proxy)
│   ├── index.js                   # Route mapping + proxy middleware
│   ├── Dockerfile
│   └── package.json
│
├── services/
│   ├── auth-service/              # Authentication microservice
│   │   ├── index.js               # Express server setup
│   │   ├── passport.js            # Google OAuth strategy
│   │   ├── models/                # User schema (Mongoose)
│   │   ├── routes/                # /register, /login, /profile
│   │   └── package.json
│   │
│   ├── project-service/           # Project management microservice
│   │   ├── index.js               # Express server + Socket.io
│   │   ├── models/                # Project, TeamMember schemas
│   │   ├── routes/                # CRUD endpoints for projects & team
│   │   ├── utils/                 # Helper utilities
│   │   └── package.json
│   │
│   ├── chat-service/              # Real-time messaging microservice
│   │   ├── index.js               # Express + Socket.io server
│   │   ├── models/                # Message schema
│   │   ├── routes/                # Chat history endpoints
│   │   └── package.json
│   │
│   └── ai-service/                # AI analysis microservice
│       ├── index.js               # Express server
│       ├── models/                # Analysis result schema
│       ├── routes/                # /analyze endpoint
│       └── package.json
│
├── docker/                        # Docker-specific configurations
├── docker-compose.yml             # Full-stack orchestration (11 containers)
├── start-all.ps1                  # Windows quick-start script
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ How It Works

### Client Journey

```
 ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐
 │  Browse   │───▶│  Register │───▶│  Submit   │───▶│   Track   │───▶│   Chat    │
 │  Website  │    │  / Login  │    │  Project  │    │  Progress │    │  with Dev │
 └───────────┘    └───────────┘    └───────────┘    └───────────┘    └───────────┘
```

1. **Explore** — Client visits the public website, browses the services catalog, portfolio, and team section.
2. **Register** — Creates an account via email/password or Google OAuth.
3. **Submit a Project** — Fills out the "Start Your Project" wizard with title, description, category, and budget range.
4. **AI Analysis** — The `ai-service` processes the description and returns tech stack recommendations and timeline estimates.
5. **Real-time Tracking** — Once accepted, the project moves through stages: `Pending → Analyzing → Developer Assigned → Completed`. The client sees every status change live on their dashboard.
6. **Direct Communication** — Clients open a per-project chat channel to communicate directly with the assigned admin/developer.

### Admin Workflow

1. **Dashboard** — Admins see stats (total projects, pending, active, completed) and a feed of recent project cards.
2. **Review Projects** — Open any project to see full details, update its status, assign developers, and view the AI analysis.
3. **Messaging** — Respond to client messages in real time via the Messages inbox.
4. **Team Management** — Add or update team member profiles (name, role, description, social links) that are displayed on the public website.
5. **Settings** — Manage admin account preferences.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Required |
|:-----|:--------|:---------|
| **Node.js** | v18 or higher | ✅ Yes |
| **npm** | v9 or higher | ✅ Yes |
| **MongoDB** | Atlas account or local install | ✅ Yes |
| **Docker Desktop** | Latest | ❌ Optional (for containerized setup) |
| **Git** | Latest | ✅ Yes |

### Option 1: Quick Start (Windows)

```powershell
# Clone the repository
git clone https://github.com/your-username/sitecraft-ai.git
cd sitecraft-ai

# Run the quick-start script — opens all services in separate terminals
./start-all.ps1
```

### Option 2: Docker Compose (Recommended for Production)

```bash
# Clone and start all 11 containers
git clone https://github.com/your-username/sitecraft-ai.git
cd sitecraft-ai
docker-compose up -d --build
```

### Option 3: Manual Setup (Service by Service)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/sitecraft-ai.git
cd sitecraft-ai

# 2. Install & start each backend service
cd gateway && npm install && npm start
cd ../services/auth-service && npm install && npm start
cd ../project-service && npm install && npm start
cd ../chat-service && npm install && npm start
cd ../ai-service && npm install && npm start

# 3. Install & start each frontend
cd ../../client-web && npm install && npm run dev
cd ../admin-web && npm install && npm run dev
```

### Accessing the Platform

| Portal | URL | Description |
|:-------|:----|:------------|
| **Client Website** | `http://localhost:5173` | Public-facing landing page, services, portfolio |
| **Admin Dashboard** | `http://localhost:5174` | Protected admin panel (requires admin role) |
| **API Gateway** | `http://localhost:5000` | Central API endpoint |
| **Health Check** | `http://localhost:5000/health` | Gateway status verification |

---

## 🔐 Environment Variables

Each service requires a `.env` file. Create them using the templates below:

### `gateway/.env`
```env
PORT=5000
AUTH_SERVICE_URL=http://localhost:5001
PROJECT_SERVICE_URL=http://localhost:5002
CHAT_SERVICE_URL=http://localhost:5003
AI_SERVICE_URL=http://localhost:5004
```

### `services/auth-service/.env`
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sitecraft-auth
JWT_SECRET=your_jwt_secret_key
```

### `services/project-service/.env`
```env
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sitecraft-project
JWT_SECRET=your_jwt_secret_key
```

### `services/chat-service/.env`
```env
PORT=5003
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sitecraft-chat
JWT_SECRET=your_jwt_secret_key
```

### `services/ai-service/.env`
```env
PORT=5004
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sitecraft-ai
```

> **⚠️ Important:** Never commit `.env` files to version control. The `.gitignore` is already configured to exclude them.

---

## 🐳 Deployment

### Docker Compose (Staging / Production)

The `docker-compose.yml` orchestrates the entire stack — **11 containers** in total:

| Container | Service | Port |
|:----------|:--------|:-----|
| `api-gateway` | Express reverse proxy | 5000 |
| `auth-service` | JWT auth + Google OAuth | 5001 (internal) |
| `project-service` | Project CRUD + team management | 5002 (internal) |
| `chat-service` | Socket.io messaging server | 5003 |
| `ai-service` | AI analysis engine | 5004 (internal) |
| `auth-db` | MongoDB for auth data | 27017 |
| `project-db` | MongoDB for project data | 27018 |
| `chat-db` | MongoDB for chat data | 27019 |
| `ai-db` | MongoDB for AI data | 27020 |
| `client-web` | React client app (Vite) | 5173 |
| `admin-web` | React admin app (Vite) | 5174 |

```bash
# Build and start all containers
docker-compose up -d --build

# View logs for a specific service
docker-compose logs -f auth-service

# Stop all containers
docker-compose down

# Reset everything (including volumes)
docker-compose down -v
```

---

## 📡 API Reference

All endpoints are accessed through the API Gateway at `http://localhost:5000`.

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/auth/profile` | Get current user profile | ✅ |

### Projects (`/api/projects`)
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/projects/list` | List all projects (admin) / user's projects | ✅ |
| `POST` | `/api/projects/create` | Create a new project | ✅ |
| `PUT` | `/api/projects/:id` | Update project status | ✅ Admin |
| `GET` | `/api/projects/:id` | Get project details | ✅ |

### Team (`/api/team`)
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/team` | List all team members | ❌ |
| `POST` | `/api/team` | Add a team member | ✅ Admin |
| `PUT` | `/api/team/:id` | Update team member | ✅ Admin |
| `DELETE` | `/api/team/:id` | Remove team member | ✅ Admin |

### Chat (`/api/chat`)
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/chat/:projectId` | Get chat history for a project | ✅ |
| `WS` | `ws://localhost:5003` | Socket.io real-time connection | ✅ |

### AI (`/api/ai`)
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/ai/analyze` | Analyze project requirements | ✅ |

---

## 📱 Multi-Device & Network Setup

To access the platform from other devices on your local network (phone, tablet, second laptop):

### Step 1: Find Your Local IP
```powershell
# Windows
ipconfig
# Look for: IPv4 Address . . . . : 192.168.x.x

# macOS / Linux
ifconfig | grep "inet "
```

### Step 2: Update Frontend Environment
Create or update `.env` files in both `client-web/` and `admin-web/`:

```env
VITE_API_URL=http://192.168.x.x:5000
VITE_CHAT_URL=http://192.168.x.x:5003
```

### Step 3: Access From Other Devices
| Device | URL |
|:-------|:----|
| Phone/Tablet (client) | `http://192.168.x.x:5173` |
| Phone/Tablet (admin) | `http://192.168.x.x:5174` |

> **Note:** Both frontends already use `vite --host`, which exposes the dev server to the local network. Just ensure your firewall allows connections on ports 5173 and 5174.

---

## 🔮 Future Roadmap

- [ ] **AI Code Scaffolding** — Auto-generate project boilerplates based on AI analysis results
- [ ] **Payment Integration** — Stripe-based milestone billing and invoice generation
- [ ] **Client Analytics Dashboard** — Behavioral insights and engagement metrics for admins
- [ ] **Email Notifications** — Automated emails on status changes, new messages, and project milestones
- [ ] **Mobile App** — React Native companion app for on-the-go project monitoring
- [ ] **Multi-tenant Support** — White-label the platform for multiple agencies
- [ ] **CI/CD Pipeline** — GitHub Actions for automated testing and deployment
- [ ] **File Sharing** — Document and asset upload within project chat
- [ ] **Kanban Board** — Visual task management within each project

---

## 🤝 Contributing

Contributions are welcome and appreciated.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add: your feature description'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

**Aman Sharma** — Full-Stack Developer & Project Lead

- GitHub: [@amankumar26](https://github.com/amankumar26)
- Email: Amanks9354963037@gmail.com

---

<div align="center">
  <sub>Built with precision and purpose. Engineered for scale.</sub>
</div>
