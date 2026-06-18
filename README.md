# 🪙 BullionX — Project Blueprint & Development Roadmap

> **Living Document** — Updated as each phase is completed.  
> Digital Gold & Silver Investment Platform  
> Stack: React + TypeScript + Vite + Tailwind | Node + Express + PostgreSQL + Prisma

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Tech Stack Reference](#2-tech-stack-reference)
3. [Project Structure — Frontend](#3-project-structure--frontend)
4. [Project Structure — Backend](#4-project-structure--backend)
5. [Database Schema (Master)](#5-database-schema-master)
6. [Phase Roadmap](#6-phase-roadmap)
7. [Phase Details](#7-phase-details)
8. [Environment Setup](#8-environment-setup)
9. [Coding Conventions](#9-coding-conventions)
10. [Interview Talking Points](#10-interview-talking-points)

---

## 1. Project Vision

BullionX lets users **buy, track, and manage** digital gold and silver investments.  
Think of it as a simplified Zerodha/Groww — but only for precious metals.

### Core User Journey
```
Register/Login → View Live Prices → Buy Gold/Silver → Track Portfolio → View History → Withdraw
```

### Design Philosophy
- Dark-first UI (financial apps live in dark mode)
- Gold (`#D4AF37`) and Silver (`#C0C0C0`) as primary accent colors
- Data-dense but scannable — like a trading terminal, not a landing page
- Mobile responsive from day one

---

## 2. Tech Stack Reference

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety everywhere |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| React Router v6 | 6.x | Client-side routing |
| TanStack Query | 5.x | Server state, caching, background refetch |
| Zustand | 4.x | Client state (auth, UI state) |
| Axios | 1.x | HTTP client (with interceptors) |
| Recharts | 2.x | Price charts & portfolio graphs |
| Vitest | 1.x | Unit & integration testing |
| React Testing Library | 14.x | Component testing |

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x LTS | Runtime |
| Express | 4.x | HTTP server |
| PostgreSQL | 15.x | Primary database |
| Prisma | 5.x | ORM & migrations |
| JWT | jsonwebtoken | Auth tokens |
| bcrypt | 5.x | Password hashing |
| zod | 3.x | Request validation |
| dotenv | 16.x | Environment management |

### Deployment
| Target | Platform |
|--------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | Railway PostgreSQL |

---

## 3. Project Structure — Frontend

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Root component, providers
│   │   ├── QueryProvider.tsx          # TanStack Query setup
│   │   └── RouterProvider.tsx         # React Router setup
│   │
│   ├── routes/
│   │   ├── index.tsx                  # All route definitions
│   │   ├── ProtectedRoute.tsx         # Auth guard component
│   │   └── PublicRoute.tsx            # Redirect if logged in
│   │
│   ├── pages/
│   │   ├── DashboardPage.tsx          # Phase 1 — Live Prices
│   │   ├── LoginPage.tsx              # Phase 2 — Auth
│   │   ├── RegisterPage.tsx           # Phase 2 — Auth
│   │   ├── BuyPage.tsx                # Phase 3 — Buy
│   │   ├── PortfolioPage.tsx          # Phase 4 — Portfolio
│   │   ├── TransactionHistoryPage.tsx # Phase 5 — History
│   │   └── NotFoundPage.tsx           # 404
│   │
│   ├── features/
│   │   ├── prices/                    # Phase 1
│   │   │   ├── components/
│   │   │   │   ├── PriceCard.tsx
│   │   │   │   ├── PriceChart.tsx
│   │   │   │   └── PriceTicker.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useLivePrices.ts
│   │   │   ├── services/
│   │   │   │   └── priceService.ts
│   │   │   └── types/
│   │   │       └── price.types.ts
│   │   │
│   │   ├── auth/                      # Phase 2
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── trade/                     # Phase 3
│   │   │   ├── components/
│   │   │   │   ├── BuyForm.tsx
│   │   │   │   ├── MetalSelector.tsx
│   │   │   │   └── OrderSummary.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useTrade.ts
│   │   │   ├── services/
│   │   │   │   └── tradeService.ts
│   │   │   └── types/
│   │   │       └── trade.types.ts
│   │   │
│   │   ├── portfolio/                 # Phase 4
│   │   │   ├── components/
│   │   │   │   ├── HoldingCard.tsx
│   │   │   │   ├── PortfolioChart.tsx
│   │   │   │   └── PnLSummary.tsx
│   │   │   ├── hooks/
│   │   │   │   └── usePortfolio.ts
│   │   │   ├── services/
│   │   │   │   └── portfolioService.ts
│   │   │   └── types/
│   │   │       └── portfolio.types.ts
│   │   │
│   │   └── transactions/              # Phase 5
│   │       ├── components/
│   │       │   ├── TransactionRow.tsx
│   │       │   └── TransactionFilters.tsx
│   │       ├── hooks/
│   │       │   └── useTransactions.ts
│   │       ├── services/
│   │       │   └── transactionService.ts
│   │       └── types/
│   │           └── transaction.types.ts
│   │
│   ├── components/
│   │   ├── ui/                        # Reusable base components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       └── PageWrapper.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts             # Global reusable hook
│   │   └── useLocalStorage.ts
│   │
│   ├── services/
│   │   └── api.ts                     # Axios instance + interceptors
│   │
│   ├── store/
│   │   ├── authStore.ts               # Zustand — user session
│   │   └── uiStore.ts                 # Zustand — sidebar, modals, theme
│   │
│   ├── types/
│   │   └── global.types.ts            # Shared global types
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── formatDate.ts
│   │   └── formatWeight.ts
│   │
│   └── assets/
│       └── logo.svg
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Project Structure — Backend

```
backend/
├── src/
│   ├── routes/
│   │   ├── index.ts                   # Mount all routers
│   │   ├── auth.routes.ts             # /api/auth/*
│   │   ├── price.routes.ts            # /api/prices/*
│   │   ├── trade.routes.ts            # /api/trades/*
│   │   ├── portfolio.routes.ts        # /api/portfolio/*
│   │   └── transaction.routes.ts      # /api/transactions/*
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── price.controller.ts
│   │   ├── trade.controller.ts
│   │   ├── portfolio.controller.ts
│   │   └── transaction.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── price.service.ts           # External API + caching
│   │   ├── trade.service.ts           # Business logic for buy/sell
│   │   ├── portfolio.service.ts
│   │   └── transaction.service.ts
│   │
│   ├── middleware/
│   │   ├── authenticate.ts            # JWT verification
│   │   ├── validate.ts                # Zod schema validation
│   │   └── errorHandler.ts            # Global error handler
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── utils/
│   │   ├── ApiError.ts                # Custom error class
│   │   ├── ApiResponse.ts             # Consistent response shape
│   │   └── logger.ts
│   │
│   ├── types/
│   │   └── express.d.ts               # Extend Request with user
│   │
│   └── app.ts                         # Express app setup
│
├── .env
├── .env.example
├── tsconfig.json
└── package.json
```

---

## 5. Database Schema (Master)

> Full schema — each phase activates relevant tables.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Phase 2: Auth ────────────────────────────────────────────────
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  fullName     String
  phone        String?
  kycStatus    KYCStatus @default(PENDING)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  wallet       Wallet?
  holdings     Holding[]
  transactions Transaction[]
}

enum KYCStatus {
  PENDING
  VERIFIED
  REJECTED
}

// ─── Phase 2: Wallet ──────────────────────────────────────────────
model Wallet {
  id        String   @id @default(uuid())
  userId    String   @unique
  balance   Decimal  @default(0) @db.Decimal(12, 2)
  currency  String   @default("INR")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
}

// ─── Phase 1: Metal Prices (cached in DB) ────────────────────────
model MetalPrice {
  id        String    @id @default(uuid())
  metal     MetalType
  pricePerGram Decimal @db.Decimal(10, 4)
  currency  String    @default("INR")
  source    String    @default("external_api")
  fetchedAt DateTime  @default(now())

  @@index([metal, fetchedAt])
}

enum MetalType {
  GOLD
  SILVER
}

// ─── Phase 3: Holdings ───────────────────────────────────────────
model Holding {
  id          String    @id @default(uuid())
  userId      String
  metal       MetalType
  quantity    Decimal   @db.Decimal(10, 4)   // in grams
  avgBuyPrice Decimal   @db.Decimal(10, 4)   // per gram
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  user         User          @relation(fields: [userId], references: [id])
  transactions Transaction[]

  @@unique([userId, metal])
}

// ─── Phase 3: Transactions ───────────────────────────────────────
model Transaction {
  id          String          @id @default(uuid())
  userId      String
  holdingId   String?
  metal       MetalType
  type        TransactionType
  quantity    Decimal         @db.Decimal(10, 4)   // in grams
  pricePerGram Decimal        @db.Decimal(10, 4)
  totalAmount Decimal         @db.Decimal(12, 2)
  status      TxStatus        @default(PENDING)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  user    User     @relation(fields: [userId], references: [id])
  holding Holding? @relation(fields: [holdingId], references: [id])

  @@index([userId, createdAt])
  @@index([userId, metal])
}

enum TransactionType {
  BUY
  SELL
}

enum TxStatus {
  PENDING
  SUCCESS
  FAILED
}
```

---

## 6. Phase Roadmap

| Phase | Feature | Status | Command to Trigger |
|-------|---------|--------|-------------------|
| **P0** | Project Setup (Frontend + Backend) | ✅ Current | `Phase 0 — Setup` |
| **P1** | Live Price Dashboard | 🔜 Next | `Phase 1 — Price Dashboard` |
| **P2** | Authentication (Register + Login) | ⏳ Pending | `Phase 2 — Auth` |
| **P3** | Buy Gold & Silver | ⏳ Pending | `Phase 3 — Buy` |
| **P4** | Portfolio Page | ⏳ Pending | `Phase 4 — Portfolio` |
| **P5** | Transaction History | ⏳ Pending | `Phase 5 — Transaction History` |
| **P6** | Wallet & Balance Top-up | ⏳ Pending | `Phase 6 — Wallet` |
| **P7** | Sell Gold & Silver | ⏳ Pending | `Phase 7 — Sell` |
| **P8** | UI Polish + Animations | ⏳ Pending | `Phase 8 — Polish` |
| **P9** | Testing Suite | ⏳ Pending | `Phase 9 — Testing` |
| **P10** | Deployment (Vercel + Railway) | ⏳ Pending | `Phase 10 — Deploy` |

---

## 7. Phase Details

### Phase 0 — Project Setup
**Goal:** Bootstrap both frontend and backend with all tooling configured.

#### Frontend Setup Checklist
- [ ] Vite + React + TypeScript scaffold
- [ ] Tailwind CSS configured with custom BullionX theme tokens
- [ ] React Router v6 configured
- [ ] TanStack Query provider set up
- [ ] Zustand stores scaffolded (authStore, uiStore)
- [ ] Axios instance with base URL + interceptors
- [ ] ESLint + Prettier configured
- [ ] Folder structure created
- [ ] Base UI components: Button, Input, Card, Spinner

#### Backend Setup Checklist
- [ ] Node + Express + TypeScript scaffold
- [ ] Prisma initialized + connected to PostgreSQL
- [ ] JWT middleware scaffolded
- [ ] Global error handler wired
- [ ] Zod validation middleware
- [ ] Environment variables (.env.example)
- [ ] Health check endpoint: `GET /api/health`
- [ ] CORS configured for frontend origin

---

### Phase 1 — Live Price Dashboard
**Goal:** Show real-time gold and silver prices with a chart.

#### What Gets Built
- Price cards for Gold and Silver (price per gram in INR)
- 7-day price trend chart (Recharts)
- Auto-refresh every 30 seconds (TanStack Query)
- Price change indicator (green ▲ / red ▼)

#### APIs Involved
- External price source (metals-api.com or goldapi.io)
- `GET /api/prices/live` — returns current gold + silver price
- `GET /api/prices/history?metal=GOLD&days=7` — chart data

#### Key Decisions
- Prices cached server-side (1-minute TTL) to avoid API rate limits
- No auth required for price viewing — public page
- Backend acts as a proxy to the external metals API

---

### Phase 2 — Authentication
**Goal:** Register, Login, JWT-based protected routes.

#### What Gets Built
- Register form (name, email, password)
- Login form (email, password)
- JWT stored in `httpOnly` cookie OR `localStorage` (decision documented)
- Axios interceptor attaches token to every request
- ProtectedRoute component guards authenticated pages
- Auto wallet creation on register

#### APIs Involved
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

---

### Phase 3 — Buy Gold & Silver
**Goal:** Users can buy gold or silver using wallet balance.

#### What Gets Built
- Metal selector (Gold / Silver toggle)
- Amount input (by INR amount OR by grams)
- Live price shown at time of purchase
- Order summary: quantity, price, total
- Confirmation modal
- Deduct from wallet, update holding, create transaction

#### APIs Involved
- `POST /api/trades/buy`
- `GET /api/wallet/balance`

#### Business Logic
- Lock price at time of order (snapshot)
- Validate wallet has sufficient balance
- Atomic DB transaction: deduct wallet + update holding + create transaction record

---

### Phase 4 — Portfolio Page
**Goal:** Show user's current holdings with live P&L.

#### What Gets Built
- Holding cards (Gold grams, Silver grams)
- Current value at live price
- Average buy price vs current price
- Total P&L (absolute + percentage)
- Portfolio allocation pie chart (Recharts)

#### APIs Involved
- `GET /api/portfolio` — holdings with current value calculation

---

### Phase 5 — Transaction History
**Goal:** Full log of all buy/sell transactions.

#### What Gets Built
- Paginated transaction table
- Filter by metal type (Gold / Silver / All)
- Filter by type (Buy / Sell / All)
- Date range filter
- CSV export button

#### APIs Involved
- `GET /api/transactions?page=1&limit=20&metal=GOLD&type=BUY`

---

### Phase 6 — Wallet
**Goal:** View balance, add funds (mock payment).

#### What Gets Built
- Wallet balance card
- Add funds modal (mock — no real payment gateway)
- Wallet transaction log

---

### Phase 7 — Sell
**Goal:** Users can sell their holdings back.

#### What Gets Built
- Sell form (similar to Buy)
- Validates user has enough holdings to sell
- Credits wallet on successful sale

---

### Phase 8 — UI Polish
**Goal:** Animations, transitions, loading skeletons, error states.

---

### Phase 9 — Testing
**Goal:** Unit + integration tests for critical paths.

- Auth flow tests
- Buy/Sell transaction tests
- Price component tests
- Custom hook tests

---

### Phase 10 — Deployment
**Goal:** Live on Vercel + Railway.

- Environment variable configuration
- CORS update for production URL
- Database migrations on Railway
- Vercel project setup

---

## 8. Environment Setup

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=BullionX
```

### Backend `.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/bullionx
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_URL=http://localhost:5173
METALS_API_KEY=your_metals_api_key
NODE_ENV=development
```

---

## 9. Coding Conventions

### TypeScript
```typescript
// ✅ Always type API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ✅ Feature-scoped types, not global unless truly shared
// ✅ Use `interface` for objects, `type` for unions/aliases
// ✅ Never use `any` — use `unknown` and narrow
```

### Component Pattern
```tsx
// ✅ Named exports for components
// ✅ Props interface defined above component
// ✅ Co-locate types with features

interface PriceCardProps {
  metal: 'GOLD' | 'SILVER';
  price: number;
  change: number;
}

export const PriceCard = ({ metal, price, change }: PriceCardProps) => {
  // ...
};
```

### TanStack Query Convention
```typescript
// ✅ Query keys as constants in feature/hooks file
// ✅ Custom hook per feature (useLivePrices, usePortfolio)
// ✅ Never call useQuery directly in page components
```

### Zustand Convention
```typescript
// ✅ One store per concern (authStore, uiStore)
// ✅ Keep derived state outside the store (compute in component or selector)
// ✅ Actions co-located in store definition
```

### API Response Shape (Backend)
```typescript
// All backend responses follow this shape:
{
  "success": true,
  "data": { ... },
  "message": "Prices fetched successfully"
}

// Error shape:
{
  "success": false,
  "error": "INSUFFICIENT_BALANCE",
  "message": "Your wallet balance is too low."
}
```

### Git Branch Convention
```
main              → production
develop           → integration
feature/phase-1-prices
feature/phase-2-auth
feature/phase-3-buy
```

---

## 10. Interview Discussion Points

> These come up when you explain BullionX in interviews.

### Architecture
- **Why feature-based folder structure?** Scales better than type-based. Each feature is a self-contained vertical slice — easier to onboard new devs.
- **Why TanStack Query + Zustand together?** TanStack Query owns server state (prices, portfolio). Zustand owns client state (auth session, UI toggles). No overlap.
- **Why Prisma?** Type-safe queries, migration management, readable schema. Perfect for a TypeScript-first backend.

### State Management
- **Where does auth token live?** `httpOnly` cookie preferred (XSS-safe). Falls back to memory via Zustand — never `localStorage` for sensitive tokens.
- **How does price auto-refresh work?** TanStack Query `refetchInterval: 30000`. Background refetch doesn't block UI. Stale-while-revalidate pattern.

### Performance
- **How do you prevent price API abuse?** Server-side 1-minute cache. Frontend polls every 30s. Backend doesn't forward every request to external API.
- **How do you handle loading states?** Each TanStack Query returns `isLoading`, `isFetching`, `isError`. Skeleton loaders shown during first load. Stale data shown during background refetch.

### Database
- **Why store prices in the DB?** Audit trail + fallback if external API is down + needed for historical chart data.
- **Why `Decimal` for prices and quantities?** Floating point errors in financial apps are catastrophic. `Decimal` in Prisma maps to PostgreSQL `NUMERIC` — exact arithmetic.
- **Why `@@unique([userId, metal])` on Holding?** A user has exactly one gold holding and one silver holding. Prevents duplicate rows; we update the existing row on each purchase.

### Security
- **How is the buy transaction safe?** DB-level transaction (Prisma `$transaction`). Either wallet deduction + holding update + transaction record ALL succeed, or ALL roll back.
- **How are passwords stored?** `bcrypt` with salt rounds 12. JWT signed with `HS256` and expires in 7 days.

---

*Last updated: Phase 0 — Setup*  
*Next: Phase 1 — Price Dashboard*
