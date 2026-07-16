# ⚡ NextBoi — Premium Next.js 16 + Bun Startup Template

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-v1.3-f9f1e7?style=flat-square&logo=bun)](https://bun.sh)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2e8b57?style=flat-square&logo=playwright)](https://playwright.dev)
[![Biome](https://img.shields.io/badge/Biome-Linter-60a5fa?style=flat-square&logo=biome)](https://biomejs.dev)

NextBoi is a state-of-the-art Next.js 16 and Bun boilerplate designed for high-velocity SaaS startup deployment. Enforcing strict type safety, modular domain boundaries, complete UI-logic hooks separation, and modern Server Actions pipelines.

---

## ✨ Key Features & DX

- **Next.js 16 (App Router)**: Fast rendering using Server Components by default.
- **Server Actions**: Type-safe data mutations using native `"use server";` actions, eliminating REST API router configurations.
- **React Compiler**: Automatic render memoization out-of-the-box (no manual `useMemo` / `useCallback` hooks).
- **Separation of Concerns (SoC)**: UI components are purely visual. Form validation (Zod), submission states (TanStack Query), and side-effects are extracted into isolated logic hooks.
- **Tailwind CSS v4 & Glassmorphism**: Premium styling with curated dark modes, glassmorphism utilities (`glass-panel`, `glass-card`), and mesh grid layouts.
- **Playwright E2E Testing**: Comprehensive, parallel-ready E2E browser tests out-of-the-box.
- **Biome Toolchain**: Formatting, linting, and imports sorting checked in under `120ms`!

---

## 📂 Codebase Directory Structure

```text
src/
├── app/                    # Routing, layouts, page templates, sitemap, and robots
│   ├── page.tsx            # Single-page landing layout
│   ├── layout.tsx          # Global template (Plus Jakarta Sans, Theme Provider)
│   ├── robots.ts           # Dynamic search engine crawler policies
│   └── sitemap.ts          # Dynamic XML sitemap generator
├── components/             # Reusable global layout elements
│   ├── ui/                 # Raw base components (buttons, inputs, cards)
│   ├── footer.tsx          # Presentation Footer
│   └── navbar.tsx          # Presentation Navigation Bar
├── config/                 # Static data configurations (e.g. navigation items)
├── features/               # Domain-specific feature modules
│   └── feedback/           # Feedback Form feature module
│       ├── actions.ts      # [NEW] Next.js Server Actions (type-safe server execution)
│       ├── components/     # UI presentation elements (e.g. FeedbackForm)
│       ├── hooks/          # Logic hooks (useFeedbackFormLogic)
│       ├── schemas/        # Zod validation schemas
│       ├── types/          # TypeScript interface types
│       └── index.ts        # Barrel exports (Feature public API)
├── hooks/                  # Global helper hooks (e.g. useNewsletterLogic)
├── providers/              # Global React Context providers (React Query, Theme)
└── tests/                  # Playwright E2E specs (landing-page.spec.ts)
```

---

## 🧠 Core Conventions & Guidelines

### 1. UI vs Logic Hook Separation
All state managers, Zod form controllers, and side-effects must be decoupled into custom hooks. The component file retains pure representational markup:

```typescript
// Good: Extracting Logic to hooks
export function FeedbackForm() {
  const { register, handleSubmit, errors, isPending } = useFeedbackFormLogic();

  return (
    <form onSubmit={handleSubmit}>
      <Input {...register("name")} />
      {/* Visual Markup */}
    </form>
  );
}
```

### 2. Next.js 16 Server Actions
Data submission and mutations are conducted through server action functions rather than Express-style REST route handlers:

```typescript
// src/features/feedback/actions.ts
"use server";

export async function submitFeedbackAction(data: FeedbackRequest) {
  const result = feedbackSchema.safeParse(data);
  if (!result.success) throw new Error("Invalid Input");
  
  // Database processing...
  return { success: true };
}
```

### 3. Rendering Flow (RSC vs CSR)
1. Default to **React Server Components (RSC)** for all routes, layouts, and page structures.
2. Nest Client Components (`"use client"`) strictly at leaf node interface elements (such as forms or interactive buttons).

---

## 🛠️ Developer Commands

### 1. Project Initialization
Install packages and download browser binaries for Playwright:
```bash
bun install
bunx playwright install
```

### 2. Run Local Development Server
```bash
bun dev
```

### 3. Verification Pipeline (Lint, Typecheck, Build)
```bash
# Format, lint, and sort imports via Biome
bun run check

# Next.js TypeScript Type-check & Production Bundling
bun run build
```

### 4. Run End-to-End Tests
```bash
# Run all Playwright tests across Chromium, Firefox, and WebKit
bun run test:e2e

# Run tests in interactive UI mode
bun run test:e2e:ui
```

---

## 📄 License
Created by **jekz**. Licensed under the [MIT License](LICENSE).
