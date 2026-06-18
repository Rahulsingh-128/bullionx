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

Current Phase:
Phase 1 — Live Price Dashboard

Step Progress: 0/4
  Step 1: Mock API + Types + Query Hooks  ← CURRENT (awaiting approval)
  Step 2: Price Cards UI
  Step 3: 7-day Chart (Recharts)
  Step 4: Layout + Public Route wiring

API Contract (locked):
  GET /api/prices/live → PriceLive[]
  GET /api/prices/history?metal=GOLD&days=7 → PriceHistory

Key Decisions:
- Dark-first UI · Gold #D4AF37 · Silver #C0C0C0
- Backend caches prices (1 min TTL), proxies external APIs
- TanStack Query = server state · Zustand = client state
- Mock via env flag in api.ts (no MSW)
- 30s refetch interval owned by hook, not component

Next Milestones: Phase 2 Auth → Phase 3 Buy → Phase 4 Portfolio → Phase 5 Transactions → Phase 6 Wallet → Phase 7 Sell → Phase 8 Polish → Phase 9 Testing → Phase 10 Deploy