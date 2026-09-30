# FYNORA — Smart School FinTech Platform

> **Smart School FinTech Platform** — A modern, full-stack fee management system designed to eliminate chaotic spreadsheets for schools. Features automated UPI collections, smart Edu-EMI splits, instant reconciliation, a tamper-evident audit ledger, and a polished admin dashboard.

---

## 1. Project Overview

**FYNORA** is built for school administrators, accountants, and finance teams. It replaces manual Excel-based fee tracking with an end-to-end digital pipeline:

```text
Fee Rule Setup → Student Assignment → Multi-Channel Collection → Auto-Reconciliation → Audit Trail
```

### Core Value Propositions
| Problem | FYNORA Solution |
|---|---|
| Manual cash/cheque tracking errors | Omnichannel payments (UPI auto-approves, cash/cheque go to reconciliation queue) |
| Parents can't pay large annual fees | **Edu-EMI Smart Split** — split any fee into 2–12 equal installments in one click |
| Unknown revenue & defaulters | Real-time dashboard with revenue trend, source breakdown, and prioritized defaulter list |
| Unauthorized waivers / fraud | **Hash-chained audit log** — every financial action is tamper-evident and IP-stamped |
| No staff accountability | Staff directory with roles, departments, and experience tracking |

---

## 2. Technology Stack

### Frontend
| Category | Technology | Version | Purpose |
|---|---|---|---|
| Language | **TypeScript** | ^5.8.3 | Type-safe application code |
| Framework | **TanStack Start** (React 19) | ^1.168.26 | Full-stack SSR/SSG React framework (builds on Vite + Nitro) |
| Router | **TanStack Router** | ^1.170.16 | File-based, type-safe routing |
| Data Layer | **TanStack React Query** | ^5.101.1 | Async data fetching, caching, prefetching |
| Build Tool | **Vite** | ^8.0.16 | Lightning-fast dev server & builds (Rolldown under the hood) |
| Package Mgr | **Bun** | 1.3.14 | Install, run scripts, node-compatible runtime |
| Styling | **Tailwind CSS v4** | ^4.2.1 | Utility-first CSS + OKLCH color model |
| Animations | **Framer Motion** | ^12.42.2 | Scroll-linked animations, tilt cards, motion variants |
| UI Library | **shadcn/ui** | — via `components.json` | 50+ accessible, copy-pasteable Radix UI components |
| Charts | **Recharts** | ^2.15.4 | Revenue trend line & pie charts on dashboard |
| Forms | **React Hook Form** + **Zod** | 7.71.2 / 3.24.2 | Typed form validation with resolver |
| Toast | **Sonner** | ^2.0.7 | Notification system (rich colors, closeable) |
| Server | **Nitro** | 3.0.260603-beta | Preset: `cloudflare-module` — serverless deployment ready |
| Fonts | Inter + Outfit | Google Fonts | Clean sans-serif typography |

### Backend
| Category | Technology | Version | Purpose |
|---|---|---|---|
| Language | **Python** | 3.11+ | Backend services & business logic |
| Framework | **FastAPI** | 0.115.0 | Async-first API with auto-generated Swagger docs |
| ASGI Server | **Uvicorn** (standard) | 0.30.6 | HTTP/WebSocket server |
| ORM | **SQLAlchemy** | 2.0.35 | Declarative models + session management |
| Database | **MySQL 8** | Official Docker image | Relational store for fees, payments, audit |
| DB Driver | **PyMySQL** | 1.1.1 | + Cryptography 43.0.1 for secure auth |
| Validation | **Pydantic v2** | 2.9.2 | Request/response schema validation |
| Container | **Docker + Compose** | — | One-command MySQL + FastAPI spin-up |

---

## 3. Monorepo Structure

```text
FYNORA/
├── src/                                  # ─── FRONTEND (TanStack Start / React) ───
│   ├── assets/                           # 3D icons, staff avatars, hero videos (WebM/MP4)
│   │   └── staff/                        # 8 staff profile photos
│   ├── components/
│   │   ├── ui/                           # 50+ shadcn/ui components (Radix-based)
│   │   │   ├── sidebar-aceternity.tsx    # Collapsible glassmorphism sidebar
│   │   │   ├── number-ticker.tsx         # Animated counter for KPI cards
│   │   │   ├── notification-popover.tsx  # Top-right notifications
│   │   │   └── ... (accordion, dialog, table, sonner, etc.)
│   │   ├── fee/
│   │   │   ├── AnimatedFeeIcon.tsx       # Animated fee-category SVG icons
│   │   │   └── LivingBackdrop.tsx        # Animated mesh gradient for Fee Engine
│   │   ├── AppShell.tsx                  # Dashboard shell: Sidebar + Topbar + Outlet
│   │   ├── AppDock.tsx                   # macOS-style dock navigation
│   │   ├── MarketingNav.tsx              # Landing page navigation
│   │   ├── MarketingBackdrop.tsx         # Animated noise + grain hero backdrop
│   │   ├── PageHeader.tsx                # Shared section header component
│   │   ├── ThemeToggle.tsx               # Light/Dark mode switch (localStorage)
│   │   ├── TodayCollectionPulse.tsx      # Real-time collection indicator
│   │   └── DefaultersLedgerDialog.tsx    # Defaulter details modal
│   ├── hooks/
│   │   └── use-mobile.tsx                # Viewport size hook
│   ├── lib/
│   │   ├── utils.ts                      # cn(), formatters (clsx + tailwind-merge)
│   │   ├── error-capture.ts              # SSR error interception
│   │   └── error-page.ts                 # Catastrophic 500 HTML renderer
│   ├── routes/                           # FILE-BASED ROUTING (TanStack Router)
│   │   ├── __root.tsx                    # Root layout: QueryClientProvider + AppShell + Toasts
│   │   ├── index.tsx                     # / — Marketing landing page (hero, features, CTA)
│   │   ├── dashboard.tsx                 # /dashboard — KPI cards + Recharts + defaulters
│   │   ├── fee-engine.tsx                # /fee-engine — Fee heads, EMI split, waivers
│   │   ├── payments.tsx                  # /payments — UPI feed + offline reconciliation
│   │   ├── staff.tsx                     # /staff — Directory with dept filters
│   │   ├── audit.tsx                     # /audit — Hash-chain audit ledger
│   │   ├── settings.tsx                  # /settings — Theme + org preferences
│   │   └── controller.tsx                # /controller — Standalone widget route
│   ├── router.tsx                        # createRouter() with QueryClient injection
│   ├── server.ts                         # SSR entry — wraps TanStack Start, normalizes h3 errors
│   ├── start.ts                          # Client bootstrap
│   ├── routeTree.gen.ts                  # Auto-generated route tree (DO NOT EDIT)
│   └── styles.css                        # Tailwind v4 directives + @theme tokens
├── backend/                              # ─── BACKEND (FastAPI + MySQL) ───
│   ├── app/
│   │   ├── main.py                       # FastAPI app, CORS, router registration
│   │   ├── database.py                   # SQLAlchemy engine + SessionLocal + Base
│   │   ├── models/
│   │   │   └── models.py                 # 8 ORM models (Family, Student, FeeType, FeeRecord, Payment, Waiver, Staff, AuditLog)
│   │   ├── schemas/
│   │   │   └── schemas.py                # Pydantic Create/Out schemas for every entity
│   │   └── routers/
│   │       ├── students.py               # /api/students — CRUD + family lookup
│   │       ├── fees.py                   # /api/fees — types, records, EMI split, waivers
│   │       ├── payments.py               # /api/payments — digital feed, offline queue, approve/reject
│   │       ├── dashboard.py              # /api/dashboard — metrics + prioritized defaulters
│   │       ├── staff.py                  # /api/staff — list + create
│   │       └── audit.py                  # /api/audit — log, verify (hash chain integrity)
│   ├── sql/
│   │   ├── schema.sql                    # Source-of-truth MySQL schema (8 tables + indexes)
│   │   └── seed.sql                      # Demo seed data (mounted in Docker)
│   ├── Dockerfile                        # Python 3.11-slim → pip install → uvicorn
│   ├── docker-compose.yml                # MySQL 8 + FastAPI (auto-loads schema & seed)
│   └── requirements.txt                  # 7 pinned Python dependencies
├── public/                               # Static assets (favicons, apple-touch-icon)
├── components.json                       # shadcn/ui config (aliases, style, tokens)
├── vite.config.ts                        # Vite + TanStack Start configuration
├── tsconfig.json                         # TypeScript strict + @ path alias
├── eslint.config.js                      # ESLint 9 + Prettier + React Hooks + Refresh
├── bunfig.toml                           # Bun configuration
├── bun.lock                              # Bun lockfile
└── package.json                          # 54 dependencies (prod + dev)
```

---

## 4. Frontend — Architecture & Features

### 4.1 Routing & Layout

The app uses **TanStack Router** with a **file-based** route convention. Three distinct layout modes are detected by pathname in the root route:

| Mode | Path | Layout |
|---|---|---|
| **Marketing** | `/` (exact match) | `MarketingBackdrop` + `MarketingNav` — no sidebar, full-width hero |
| **App Shell** | `/dashboard`, `/fee-engine`, `/payments`, `/staff`, `/audit`, `/settings` | `AppShell` — collapsible sidebar + top search + notifications |
| **Standalone** | `/controller/*` | Bare `Outlet` — embedded widget mode |

**File**: [`__root.tsx`](./src/routes/__root.tsx)  
**Sidebar Nav**: 6 items (Dashboard, Fee Engine, Payments, Staff Directory, Audit Trail, Settings) — defined in [`AppShell.tsx`](./src/components/AppShell.tsx#L21-L28)

### 4.2 Data Fetching (TanStack React Query)

A `QueryClient` is created in [`router.tsx`](./src/router.tsx#L5-L16) and injected via router context. The root route wraps all children in `QueryClientProvider`.

> **Dual-Mode Architecture**: Supports **Instant Demo Mode** (pre-loaded seed state for zero-setup UI previews) alongside full **FastAPI + MySQL REST Backend** endpoints aligned via `schemas.py`. See Section 7 for API query bindings.

### 4.3 Pages in Detail

#### 🏠 Landing Page (`/`) — [`index.tsx`](./src/routes/index.tsx)
- Scroll-linked Framer Motion animations (6 floating 3D icons scatter from edges to center on scroll)
- Hero headline: **"Chaos-free fee collection, finally."**
- Feature section: WhatsApp Payments, Edu-EMI, Audit, Receipts, Defaulter Nudges
- Product demo videos (embedded via `.asset.json` pointer files)
- CTA → `/dashboard`

#### 📊 Dashboard (`/dashboard`) — [`dashboard.tsx`](./src/routes/dashboard.tsx)
- **4 KPI cards** with `NumberTicker` animation:
  1. Total Revenue (₹ Lakh format)
  2. Pending Dues
  3. Active Defaulters
  4. UPI vs Cash share
- **Revenue Trend** — Line chart (6 months, Apr–Sep)
- **Revenue Sources** — Pie chart (Tuition / Transport / Late Fees / Activities)
- **Today's Collection Pulse** — Live counter + status badge
- **Defaulters Table** — Top 10 prioritized by days overdue (High/Med/Low risk), opens `DefaultersLedgerDialog`
- **Action bar** — Bulk WhatsApp reminder, Send Demand Notice

#### 💼 Fee Engine (`/fee-engine`) — [`fee-engine.tsx`](./src/routes/fee-engine.tsx)
- **LivingBackdrop** — Animated mesh gradient background
- **Fee Head Cards** — 6 tilt cards (Framer Motion 3D tilt on pointer hover) with colored fee icons:
  - Tuition (₹45K/Q), Transport (₹12K/Q), Sports (₹4.5K/Y), Lab (₹3.8K/Y), Meal Plan (₹8.6K/M — Draft), Arts & Music (₹2.9K/Y)
- **Edu-EMI Smart Split** — Slider to pick N (2–12) installments → instant split preview
- **Waiver Rule Presets** — Sibling Discount (15%), First-Gen (25%), Academic Topper (100%), Penalty tiers
- Create new fee head command palette

#### 💳 Payments (`/payments`) — [`payments.tsx`](./src/routes/payments.tsx)
Two-tab layout:
1. **UPI Live Feed** — Real-time transaction list (payer, student, VPA, TXN ID, amount) with approve/reject
2. **Offline Reconciliation** — Cash/Cheque entries pending approval (receipt number, recorded by staff)

Date filters: Today / Yesterday / Last 7 Days / This Month  
Summary strip: Today's total, UPI share %, Cash share %, Pending approvals

#### 👥 Staff Directory (`/staff`) — [`staff.tsx`](./src/routes/staff.tsx)
- 8 team members with department filter chips (All / Finance / Admin / Transport / Reception / Tech / Compliance / HR)
- Spring-staggered card entrance (`cardVariants` — Framer Motion)
- Hover effects: lift + cyan glow shadow
- Cards show: avatar, role badge, experience bar, email + phone quick actions, "View Profile" → detail modal
- Add Staff button → creation dialog

#### 🔐 Audit Trail (`/audit`) — [`audit.tsx`](./src/routes/audit.tsx)
- **Hash chain integrity badge** at top (ShieldCheck + "Ledger intact: 312 entries verified")
- Sample logs with:
  - Timestamp, Admin ID/Username, Action description, IP address
  - Type badge (waive / approve / reject / split / delete / rule / system / export)
  - Category pill + Risk level (Low / Med / High)
- Filters: All actions / Waivers / Deletions / Rule changes / System
- Time range selector + search by action text / admin
- Verify chain button → runs `/api/audit/verify` integrity check

#### ⚙️ Settings (`/settings`) — [`settings.tsx`](./src/routes/settings.tsx)
Org preferences, theme toggle (light/dark — `ssft-theme` in localStorage), bank details for UPI, notification preferences.

### 4.4 UI Component Library (shadcn/ui + custom)

All components live in [`src/components/ui/`](./src/components/ui). Key components:

| Component | File | Notes |
|---|---|---|
| Sidebar | `sidebar-aceternity.tsx` | Glass blur, collapse animation, open/close |
| NumberTicker | `number-ticker.tsx` | `requestAnimationFrame`-based digit roll-up |
| NotificationPopover | `notification-popover.tsx` | Unread badge, priority groups, mark all read |
| ThemeToggle (SkyToggle) | `sky-toggle.tsx` | Animated sun/moon switcher |
| Card / Button / Input | Standard shadcn | Variant-driven via `class-variance-authority` |
| Table | `table.tsx` | TanStack Table-compatible base |
| Chart | `chart.tsx` | Recharts wrapper with typed config |
| Sonner Toast | `sonner.tsx` | Rendered in root — bottom-right, rich colors |

### 4.5 Styling System (Tailwind v4)

File: [`styles.css`](./src/styles.css)

- **`@import "tailwindcss";`** — Tailwind v4 zero-config imports
- **`@theme { ... }`** block defines:
  - OKLCH-based color tokens (`--color-primary`, `--color-muted`, etc.)
  - Radius scale (`--radius-lg: 0.75rem`, etc.)
  - Glassmorphism via `.glass` utility class (`backdrop-blur-xl` + semi-transparent bg + border)
- **`tw-animate-css`** — Animation keyframes
- `@tailwindcss/vite` plugin in Vite config

---

## 5. Backend — Architecture & API

### 5.1 FastAPI App Layout

Entry: [`backend/app/main.py`](./backend/app/main.py)

- **Title**: "Smart School FinTech API"
- **CORS**: Configured for frontend origin access
- **6 routers** mounted with `/api/` prefix

### 5.2 Database Schema (8 Tables)

Source of truth: [`backend/sql/schema.sql`](./backend/sql/schema.sql)

```text
┌──────────────┐      ┌──────────────┐      ┌───────────────┐
│   families   │1───∞│   students   │1───∞│  fee_records  │
│              │      │              │      │               │
│ id (PK)      │      │ id (PK)      │      │ id (PK)       │
│ family_name  │      │ student_code │      │ student_id FK │
│ contact info │      │ grade        │      │ fee_type_id FK│
│              │      │ family_id FK │      │ amount_due    │
└──────────────┘      │ parent info  │      │ amount_paid   │
                      │ status       │      │ due_date      │
                      └──────────────┘      │ status ENUM   │
                                            │ installment_* │
                                            └──────┬────────┘
                                                   │1
                                                   │
┌──────────────┐      ┌───────────────┐           │∞
│  fee_types   │1─────│  fee_records  │∞          │
│              │      └──────┬────────┘           │
│ id (PK)      │             │∞                   │
│ name         │             │                    │
│ category     │      ┌──────▼────────┐   ┌──────▼────────┐
│ amount       │      │   payments    │   │    waivers    │
│ cycle ENUM   │      │               │   │               │
│ status ENUM  │      │ id (PK)       │   │ id (PK)       │
└──────────────┘      │ fee_record FK │   │ fee_record FK │
                      │ student_id FK │   │ student_id FK │
                      │ amount        │   │ type (w/p)    │
                      │ method ENUM   │   │ amount        │
                      │ status ENUM   │   │ reason        │
                      │ receipt_no UQ │   │ approved_by   │
                      │ recorded_by   │   └───────────────┘
                      └───────────────┘

┌──────────────┐      ┌───────────────┐
│    staff     │      │  audit_log    │←── hash chain
│              │      │               │    (SHA-256 linked)
│ id (PK)      │      │ id (PK)       │
│ staff_code   │      │ admin_id      │
│ full_name    │      │ admin_name    │
│ role/dept    │      │ action        │
│ email/phone  │      │ ip_address    │
│ years_exp    │      │ prev_hash     │
└──────────────┘      │ entry_hash    │
                      │ created_at    │
                      └───────────────┘
```

### 5.3 Complete REST API Reference

**Base URL**: `http://localhost:8000`  
**Interactive Docs**: `http://localhost:8000/docs` (Swagger UI)  
**Redoc**: `http://localhost:8000/redoc`

#### 🧑 Students — `/api/students`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students?grade=` | List all (filter by grade optional) |
| `GET` | `/api/students/{id}` | Get single student |
| `POST` | `/api/students` | Create new student (body: `StudentCreate`) |
| `GET` | `/api/students/family/{family_id}` | List siblings in a family |

#### 💸 Fees — `/api/fees`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/fees/types` | List all fee types/heads |
| `POST` | `/api/fees/types` | Create fee type |
| `GET` | `/api/fees/records/student/{sid}` | All fee records for a student |
| `POST` | `/api/fees/records` | Assign fee to a student |
| `POST` | `/api/fees/records/{id}/split?installments=N` | **Edu-EMI Split** — split into N equal installments (2≤N≤12) |
| `POST` | `/api/fees/waivers` | Create waiver or penalty → auto-updates `fee_record.amount_due` + status |

#### 💳 Payments — `/api/payments`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/payments/digital?limit=20` | UPI/Card feed (newest first) — auto-approved |
| `GET` | `/api/payments/offline?status=pending` | Cash/Cheque reconciliation queue |
| `POST` | `/api/payments` | Record payment — UPI/Card → `auto_approved`, Cash/Cheque → `pending`. Generates receipt `R-XXXXXX`. Auto-applies to `fee_record` if digital. |
| `PATCH` | `/api/payments/{id}/decision` | Approve or reject offline payment (body: `{status, rejection_reason?}`). On approve → applies to `fee_record`. |

#### 📊 Dashboard — `/api/dashboard`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/metrics` | Aggregates → `{total_revenue, pending_dues, active_defaulters, upi_share_pct, cash_share_pct}` |
| `GET` | `/api/dashboard/defaulters` | Prioritized defaulters list (overdue only), sorted by balance desc → includes urgency: `low` (<15d) / `med` (15-30d) / `high` (>30d) |

#### 👔 Staff — `/api/staff`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/staff` | List all staff |
| `POST` | `/api/staff` | Create staff member |

#### 🔐 Audit — `/api/audit`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/audit?limit=50` | Audit log (newest first) |
| `POST` | `/api/audit?admin_id=&admin_name=&action=` | Append entry → SHA-256 chained with previous hash. Captures client IP. |
| `GET` | `/api/audit/verify` | **Chain integrity check** — walks all entries, recomputes expected hashes → `{valid: bool, broken_at_entry_id?}` |

---

### 5.4 Hash-Chained Audit Log (Tamper-Evident)

This is one of the project's flagship security differentiators. In [`audit.py`](./backend/app/routers/audit.py#L11-L29):

```python
# 1. Get the last entry's hash (or zero-hash for first entry)
prev_hash = last_entry.entry_hash if last_entry else "0" * 64

# 2. Hash = SHA-256(prev_hash + admin_id + action + ip_address)
raw = f"{prev_hash}{admin_id}{action}{ip_address}"
entry_hash = hashlib.sha256(raw.encode()).hexdigest()

# 3. Store both prev_hash and entry_hash
```

**Verification**: `/api/audit/verify` replays the chain from `id=1`, recomputing each expected hash. If any mismatch is detected, it returns the exact `broken_at_entry_id` where tampering occurred.

---

## 6. Getting Started

### 6.1 Prerequisites

| Tool | Minimum Version | Check |
|---|---|---|
| Bun | 1.0+ | `bun --version` |
| Docker Desktop | 4.0+ | `docker --version` |
| (Alternative) Python | 3.11+ | `python --version` |
| (Alternative) MySQL | 8.0+ | `mysql --version` |

### 6.2 Run Entire Stack (Frontend + Backend + DB)

#### 1. Clone the Repository:
```bash
git clone [https://github.com/Rehanator/FYNORA-Team-Beginners.git](https://github.com/Rehanator/FYNORA-Team-Beginners.git)
cd FYNORA-Team-Beginners
```

#### 2. Terminal 1 — Backend (Docker, one command):
```bash
cd backend
docker compose up --build
# MySQL on 3306, FastAPI on 8000
# Open http://localhost:8000/docs for Swagger UI
```

#### 3. Terminal 2 — Frontend:
```bash
bun install
bun run dev
# Open http://localhost:5173
```

### 6.3 Frontend-Only (Instant Demo Mode)

```bash
bun install
bun run dev
```
Runs immediately with pre-loaded seed state—no database setup required to preview the full UI.

### 6.4 Useful Scripts
| Command | Purpose |
|---|---|
| `bun run dev` | Vite dev server (HMR) |
| `bun run build` | Production build (client + SSR + Nitro) |
| `bun run preview` | Preview the production build |
| `bun run lint` | ESLint check |
| `bun run format` | Prettier write all files |
| `docker compose up --build` | Full backend + DB (run inside `backend/`) |
| `docker compose down -v` | Stop + wipe DB volume (run inside `backend/`) |

### 6.5 Build Outputs

```text
.output/
├── public/                              # Client assets (hashed filenames)
│   └── assets/                          # JS, CSS, images, videos
└── server/                              # Nitro server (Cloudflare Worker preset)
    ├── index.mjs                        # Entry worker
    ├── _ssr/                            # Per-route SSR chunks
    └── _libs/                           # Vendor chunks (code-split)
```

---

## 7. Frontend ↔ Backend Query Architecture

The backend response shapes in `schemas.py` are strictly aligned with the frontend state models:

| Page | State Model | TanStack Query Binding |
|---|---|---|
| Dashboard (`/dashboard`) | `metricMeta`, `revenueSources`, `trend`, `defaulters` | `useQuery({ queryKey: ['dashboard','metrics'], queryFn: () => fetch('/api/dashboard/metrics') })` + `['dashboard','defaulters']` |
| Fee Engine (`/fee-engine`) | `initialFeeHeads` | `useQuery({ queryKey: ['fees','types'], queryFn: () => fetch('/api/fees/types') })` |
| Payments (`/payments`) | `initialUpiFeed`, offline rows | `['payments','digital']`, `['payments','offline']` → TanStack Query mutations for approve/reject |
| Staff (`/staff`) | `initialStaff` | `useQuery({ queryKey: ['staff'], queryFn: () => fetch('/api/staff') })` |
| Audit (`/audit`) | `logs` | `useQuery({ queryKey: ['audit'], queryFn: () => fetch('/api/audit') })` — calls `/api/audit/verify` for chain badge |

**Mutation Pattern** (React Query mutation for sensitive actions):
```ts
const approve = useMutation({
  mutationFn: (id) => fetch(`/api/payments/${id}/decision`, {
    method: 'PATCH', body: JSON.stringify({ status: 'approved' })
  }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['payments'] })
});
```

---

## 8. Deployment

### Frontend — Cloudflare Pages / Workers
The Nitro preset is `cloudflare-module`. Build output in `.output/` is directly deployable:
```bash
bun run build
npx nitro deploy --prebuilt     # Uses Wrangler under the hood
```

### Backend — Any Docker Host
`docker-compose.yml` is container-ready (swap MySQL credentials and set `DATABASE_URL` as secret):
- **Fly.io**: `fly launch` from `backend/` folder
- **AWS ECS / GCP Cloud Run**: Mount the built image, wire Cloud SQL
- **Render / Railway**: One-click Docker deploy

---

## 9. Phase 2 — Production Hardening & AI Roadmap

| Priority | Feature | Implementation Architecture |
|---|---|---|
| 🔴 HIGH | **JWT Role-Based Auth** | Add `/api/auth/login` with JWT (`PyJWT` + `passlib` bcrypt) and FastAPI `Depends(get_current_user)` guards on mutation routes. |
| 🟡 HIGH | **AI Co-Pilot & Risk Engine** | `backend/app/routers/ai.py`: <br>1. **NL Query Bar** → Gemini 1.5 Flash generates SQL & chart data <br>2. **Defaulter Risk Predictor** → `scikit-learn` scoring model <br>3. **Anomaly Detection** → IQR/z-score flags unusual waivers |
| 🟡 HIGH | **n8n WhatsApp Reminders** | Dockerized [n8n](https://n8n.io) webhook at `/api/reminders/trigger` integrated with WhatsApp Business API / Twilio. |
| 🟡 HIGH | **PDF Receipt Generation** | `reportlab` / `WeasyPrint` service in backend → `/api/payments/{id}/receipt.pdf`. |
| 🟢 MEDIUM | **Family Combined Invoice** | `GET /api/students/family/{id}` → aggregate all siblings' fees into a single PDF and WhatsApp payment link. |
| ⚪ LOW | **HMAC Audit Hardening** | Upgrade SHA-256 chain to `hmac.new(secret, raw, hashlib.sha256)` with timestamp binding. |

---

## 10. Environment Variables

### Frontend
Vite env vars are prefixed `VITE_`:
| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | Instant Demo Mode | Backend origin, e.g. `http://localhost:8000` |

### Backend
| Variable | Default (Docker) | Purpose |
|---|---|---|
| `DATABASE_URL` | `mysql+pymysql://root:root@db:3306/school_fintech` | SQLAlchemy connection string |

---

## 11. File Index (Quick Navigation)

**Config files:**
- [`package.json`](./package.json) — Dependencies & scripts
- [`vite.config.ts`](./vite.config.ts) — Vite + TanStack Start config
- [`tsconfig.json`](./tsconfig.json) — TypeScript strict mode, `@/*` alias
- [`components.json`](./components.json) — shadcn/ui registry config

**Frontend pages:**
- [`index.tsx`](./src/routes/index.tsx) — Landing page
- [`dashboard.tsx`](./src/routes/dashboard.tsx) — KPI dashboard
- [`fee-engine.tsx`](./src/routes/fee-engine.tsx) — Fee rules + EMI
- [`payments.tsx`](./src/routes/payments.tsx) — UPI + reconciliation
- [`staff.tsx`](./src/routes/staff.tsx) — Team directory
- [`audit.tsx`](./src/routes/audit.tsx) — Tamper-evident log

**Backend API:**
- [`main.py`](./backend/app/main.py) — FastAPI app + CORS
- [`models.py`](./backend/app/models/models.py) — 8 ORM entities
- [`schemas.py`](./backend/app/schemas/schemas.py) — Pydantic validation
- [`schema.sql`](./backend/sql/schema.sql) — MySQL DDL
- [`docker-compose.yml`](./backend/docker-compose.yml) — Dev stack
- Routers: [`students.py`](./backend/app/routers/students.py), [`fees.py`](./backend/app/routers/fees.py), [`payments.py`](./backend/app/routers/payments.py), [`dashboard.py`](./backend/app/routers/dashboard.py), [`staff.py`](./backend/app/routers/staff.py), [`audit.py`](./backend/app/routers/audit.py)

---

*Built by **Team Beginners** — FYNORA Smart School FinTech Platform.*
