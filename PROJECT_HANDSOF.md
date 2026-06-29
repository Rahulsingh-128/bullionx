# BullionX PROJECT_HANDOFF

Stack: React 19 + TypeScript + Vite · Tailwind CSS v3 · React Router v6 · TanStack Query v5 · Zustand · Axios · Node.js + Express · PostgreSQL + Prisma

Architecture:
- Feature-based structure
- Shared UI in components/ui
- Custom hooks for React Query
- Axios via centralized api.ts
- Zustand only for client/UI state
- Strict TypeScript · No any · Named exports

Completed:
✅ Phase 0 Setup
✅ Phase 1 Live Price Dashboard

Current Phase:
Phase 2 — Authentication

Step Progress: 0/4
  Step 1: Types + authService + useAuth hook  ← CURRENT (awaiting approval)
  Step 2: LoginForm + RegisterForm UI
  Step 3: authStore (Zustand) + token handling
  Step 4: ProtectedRoute / PublicRoute wiring + auto wallet creation

API Contract (locked):
  POST /api/auth/register → { user, token }
  POST /api/auth/login → { user, token }
  POST /api/auth/logout → { success }
  GET  /api/auth/me → User

Key Decisions:
- Dark-first UI · Gold #D4AF37 · Silver #C0C0C0
- JWT stored in httpOnly cookie (preferred) — never localStorage for token
- Axios interceptor (api.ts) attaches token automatically; no manual header setting in components
- authStore (Zustand) holds only session/user state — no token value itself if httpOnly cookie is used
- Auto wallet creation triggered server-side on successful register
- TanStack Query = server state (auth/me) · Zustand = client state (session flags)
- Mock via env flag in api.ts (no MSW)

Next Milestones: Phase 3 Buy → Phase 4 Portfolio → Phase 5 Transactions → Phase 6 Wallet → Phase 7 Sell → Phase 8 Polish → Phase 9 Testing → Phase 10 Deploy

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