# 🎓 LearnAI — Next-Generation AI Adaptive Learning Platform

<div align="center">

![Next.js 16.4](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.39-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Neon PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)

<p align="center">
  <b>Personalized education engine that adapts to your learning style, tracks cognitive energy, dynamically generates diagnostic practice tests, and optimizes daily study plans in real time.</b>
</p>

[Explore Live Demo](#-interactive-preview) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-routes) • [Contributing](#-contributing)

---

</div>

## 📖 Overview

**LearnAI** is a modern, full-stack adaptive learning application built on **Next.js 16.4+ (App Router)** and **React 19**. Unlike conventional e-learning systems that force every student down identical rigid paths, LearnAI leverages artificial intelligence to understand individual knowledge retention curves, detect cognitive fatigue, and dynamically curate custom curricula, interactive micro-quizzes, and habit-forming daily study routines.

---

## ✨ Key Features

### 🧠 1. Smart AI Diagnostic & Quiz Generator
* **Weakness Spotting**: Evaluates student responses and targets foundational knowledge gaps.
* **Instant Question Generation**: Synthesizes custom multiple-choice, true/false, and short-answer questions via OpenAI LLM integration.
* **Real-Time Timer & Feedback**: Active countdown timer with instant step-by-step logic explanations for each answer.

### ⚡ 2. Cognitive Mood & Fatigue Pacing
* **Readiness Evaluation**: Gauges student focus and stress levels prior to study sessions.
* **Dynamic Content Modulation**: Automatically switches between intensive problem-solving (high focus) and lightweight concept flashcards (low focus) to prevent burnout.

### 📅 3. Adaptive 30-Minute Study Planner
* **Spaced Repetition Scheduling**: Automatically structures weekly calendar slots around peak retention windows.
* **Session Management**: Add, tag, and track progress across personalized study blocks.

### 🏆 4. Gamified Motivation & Streaks
* **XP Progression**: Earn experience points for lesson completions and quiz masteries.
* **Tier Badges**: Progress from **Bronze** through **Silver**, **Gold**, **Platinum**, to **Diamond**.
* **Daily Streak Tracking**: Visual habit trackers that celebrate consistency.

### 📊 5. Comprehensive Learning Analytics
* **Heatmap & Retention Trends**: Visual progress tracking powered by Recharts.
* **Subject Mastery Breakdown**: Deep-dive analytics across Mathematics, Physics, Computer Science, Chemistry, Economics, and more.

### 🛡️ 6. Administrative Control Portal (`/admin`)
* **Live System Telemetry**: Database latency monitoring, storage utilization, and AI pipeline health status.
* **User & Staff Management**: Role-based access control (Student, Teacher, Sub-Admin, Admin).
* **Curriculum Management**: Publish courses, adjust difficulty ratings, and configure syllabus hierarchies.

### 🔐 7. Modern Edge Authentication
* **Cookie-Based JWT**: Lightweight, secure session validation using `jose`.
* **Password Encryption**: Industry-standard `bcryptjs` hashing.
* **Password Recovery Flow**: 6-character verification code generation and reset pipeline.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) | App Router, Server & Client Components, Route Handlers |
| **Runtime / UI** | [React 19](https://react.dev/) | React 19.3, Concurrent features, Server Actions ready |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking with 0 compiler errors |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS variables, glassmorphic effects, responsive design |
| **Component Primitives** | [Radix UI](https://www.radix-ui.com/) | Accessible primitives (Dialogs, Tabs, Accordions, Dropdowns) |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon system |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) | Client-side caching, background synchronization, optimistic UI |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) | Cloud PostgreSQL with pooled connection handling |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Type-safe SQL schema definitions and migrations |
| **AI Integration** | [OpenAI API](https://openai.com/) | Structured completions for quizzes, pacing, and feedback |
| **Charts & Analytics** | [Recharts](https://recharts.org/) & [Chart.js](https://www.chartjs.org/) | Responsive SVG charts and learning heatmaps |
| **Security & Auth** | [jose](https://github.com/panva/jose) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Edge-compatible JWT verification & password hashing |

---

## 📂 Project Structure

```text
LearnAI/
├── app/                              # Next.js 16 App Router
│   ├── (auth)/                       # Authentication Route Group
│   │   ├── login/                    # Glassmorphism login page
│   │   ├── register/                 # 2-step student registration
│   │   └── forgot-password/          # 6-digit code password reset
│   ├── (dashboard)/                  # Authenticated Student Dashboard Group
│   │   ├── achievements/             # XP badges & reward milestones
│   │   ├── analytics/                # Study streaks & efficiency heatmaps
│   │   ├── courses/                  # Course catalog & dynamic [id] viewer
│   │   ├── dashboard/                # Main student hub & overview
│   │   ├── help/                     # FAQ accordions & support tickets
│   │   ├── planner/                  # 30-min slot calendar & session scheduler
│   │   ├── profile/                  # Avatar upload & learning style settings
│   │   ├── progress/                 # Subject-by-subject Recharts graphs
│   │   ├── quizzes/                  # AI quiz generator & live [id] runner
│   │   ├── recommendations/          # Weak area / Strength discovery
│   │   ├── resources/                # Multi-format learning library
│   │   └── settings/                 # Theme, notification, and timer preferences
│   ├── (marketing)/                  # Public & Legal Route Group
│   │   ├── about-us/                 # Mission, vision, and team overview
│   │   ├── blog/                     # Educational articles & insights
│   │   ├── careers/                  # Open roles & company perks
│   │   ├── terms/                    # Terms of Service
│   │   ├── privacy-policy/           # Privacy Policy & compliance
│   │   └── [policies]/               # Cookie policy, accessibility, security
│   ├── admin/                        # Dedicated Admin Portal
│   │   ├── courses/                  # Course management & publication
│   │   ├── login/                    # High-security administrative login
│   │   ├── subadmins/                # Staff role & permission controls
│   │   ├── subjects/                 # Stream taxonomy & subject management
│   │   ├── users/                    # Learner user records & search
│   │   └── page.tsx                  # System telemetry & KPI dashboard
│   ├── api/                          # Serverless Route Handlers
│   │   ├── admin/stats/              # Telemetry & operational metrics
│   │   ├── auth/                     # login, register, me, logout, reset-pass
│   │   ├── courses/                  # catalog, details, enroll, complete
│   │   ├── moods/                    # focus tracking & adaptive recommendations
│   │   ├── notes/                    # study note CRUD endpoints
│   │   ├── notifications/            # real-time user notification alerts
│   │   ├── quizzes/                  # AI generation, recommendations, submit
│   │   └── subjects/                 # syllabus & relevant topic queries
│   ├── layout.tsx                    # Root Layout (Fonts, QueryProvider, AuthProvider)
│   ├── page.tsx                      # Modern Landing Page (Interactive Hero & Demos)
│   └── globals.css                   # Tailwind CSS v4 design tokens
├── components/                       # Reusable UI & Layout Components
│   ├── layout/                       # Header, Footer, SideNav, MobileNav
│   ├── providers/                    # AuthProvider, QueryProvider
│   └── ui/                           # Button, Card, Dialog, Badge, Tabs, Calendar...
├── context/                          # Client Auth context & session hooks
├── hooks/                            # Custom hooks (useToast, etc.)
├── lib/                              # Core Utilities
│   ├── auth/                         # Token verifier, cookies, memory stores
│   ├── db/                           # Drizzle ORM client & schema definitions
│   ├── queryClient.ts                # React Query client & apiRequest helper
│   └── utils.ts                      # Class merging & formatting helpers
├── public/                           # Static assets, logos, and illustrations
├── scripts/                          # SQL migrations & database seeding
├── .env                              # Environment configuration (Ignored in Git)
├── next.config.ts                    # Next.js configuration & compiler rules
├── package.json                      # Dependency manifests & scripts (Clean React 19 overrides)
└── tsconfig.json                     # Strict TypeScript configuration
```

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: `v20.0.0` or higher (LTS recommended)
* **npm**: `v10.0.0` or higher
* **PostgreSQL Database**: (e.g., [Neon](https://neon.tech/), Supabase, or local PostgreSQL)
* **OpenAI API Key**: (Optional for AI generation fallbacks, recommended for production)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/LearnAI.git
cd LearnAI
```

### 2. Install Dependencies
> [!NOTE]
> All peer dependencies are configured using native React 19 overrides. You can run standard `npm install` **without** needing `--legacy-peer-deps`!

```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (or use the existing template):

```env
# Database Connection (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# OpenAI API Key (For adaptive quiz generation & intelligent hints)
OPENAI_API_KEY="sk-proj-your-openai-api-key"

# JWT Authentication Secret
JWT_SECRET="your-ultra-secure-jwt-secret-key"

# Public Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Push Database Schema (Optional / First Setup)
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the platform!

---

## 🧪 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts local Next.js dev server on port `3000` |
| **Type Check** | `npm run check` | Runs `tsc --noEmit` to verify type safety (0 errors) |
| **Production Build** | `npm run build` | Compiles & optimizes all 65 static & dynamic routes |
| **Start Production** | `npm run start` | Runs the compiled production build |
| **Database Sync** | `npm run db:push` | Pushes Drizzle ORM schema changes to PostgreSQL |

---

## 📡 API Routes Overview

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` — Create new student account.
* `POST /api/auth/login` — Sign in and receive HTTP-only JWT cookie.
* `GET  /api/auth/me` — Retrieve current authenticated session.
* `POST /api/auth/logout` — Clear auth cookie.
* `POST /api/auth/forgot-password` — Issue 6-digit recovery code.
* `POST /api/auth/reset-password` — Verify code & update hashed password.

### 📚 Courses & Curriculum (`/api/courses`)
* `GET  /api/courses` — Fetch all published courses with difficulty filters.
* `GET  /api/courses/[id]` — Retrieve full course curriculum & lesson modules.
* `POST /api/courses/[id]/enroll` — Enroll student into course.
* `POST /api/courses/[id]/lessons/[lessonId]/complete` — Mark lesson as completed and award XP.

### 🎯 Quizzes & Practice (`/api/quizzes`)
* `GET  /api/quizzes/[id]` — Fetch quiz questions with countdown rules.
* `POST /api/quizzes/generate` — Generate AI customized quiz based on topic & difficulty.
* `POST /api/quizzes/[id]/submit` — Submit answers, calculate score, and log attempt.
* `GET  /api/quizzes/recommendations` — Fetch personalized diagnostic quizzes.

### 🛡️ Administrative Portal (`/api/admin`)
* `GET  /api/admin/stats` — Real-time telemetry, learner counts, course numbers, and server health.

---

## 🎨 Design System

* **Brand Colors**: 
  * Deep Indigo (`#4338ca` / `indigo-700`)
  * Amber Accent (`#f59e0b` / `amber-500`)
  * Emerald Glow (`#10b981` / `emerald-500`)
  * Slate Foundation (`#0f172a` / `slate-900`)
* **Visual Styling**: Glassmorphic frosted cards, subtle gradient borders, micro-interactions, responsive typography.
* **Component Standards**: Fully keyboard-accessible, screen-reader friendly Radix UI primitives.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Designed & Developed with ❤️ by **[Ashwani Kushwaha](https://github.com/ashwanikushwaha)**

*Empowering students worldwide through adaptive intelligence.*

</div>
