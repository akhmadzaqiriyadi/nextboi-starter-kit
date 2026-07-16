<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Coding Assistant Guidelines (AGENTS.md)

Welcome agent! You are pair-programming with the user on the NextBoi project. Please adhere to these guidelines to ensure consistency, clean execution, and high-fidelity code architecture.

## 🛠️ Code Quality & Verification Flow

1. **Strict Linting**: We use **Biome** for linting and formatting. After writing or modifying any file, you **must** run `bun run check` to format and check for warnings. Fix all lint warnings (e.g. unused imports, explicit `any` types) immediately.
2. **Type Checking & Production Build**: Run `bun run build` before completing a task. If type checking fails (e.g. components utilizing wrong props or callback signatures), resolve it.
3. **TypeScript Integrity**: Never use `any`. Always declare clean interfaces and types. Guard against `null`/`undefined` when dealing with callback parameter overrides (such as Select onValueChange handlers).
4. **E2E Testing (Playwright)**: Maintain E2E tests for user journeys inside `tests/`. Run `bun run test:e2e` to ensure all tests pass before completing your task.

## 📁 Codebase Directory Guidelines

- **Modular Features**: New domain logic (e.g., feedback form, auth, cart, analytics) belongs in `src/features/[feature_name]/`. Organize it internally as:
  - `components/` - Feature-specific components.
  - `hooks/` - Feature-specific React hooks.
  - `schemas/` - Zod validation schemas.
  - `services/` - API requests services.
  - `types/` - Type interfaces.
  - `index.ts` - Central exporter file.
- **Global UI Elements**: Base components (buttons, input fields, cards, tables, etc.) belong in `src/components/ui/`. Layout elements like navbar and footer go in `src/components/`.
- **NEVER place feature-specific files in global folders**: Do NOT put feature hooks in `src/hooks/` or feature components in `src/components/` if they belong to a domain feature. Features with their own state, types, or logic MUST live under `src/features/[feature_name]/`.

## 🔍 MANDATORY Pre-Execution Architecture Check

**Before writing or modifying ANY code**, you MUST:

1. **Read `AGENTS.md`** — every session, no exceptions.
2. **Read the relevant `src/features/[feature]/` folder** — understand how the existing feature is structured before adding to it.
3. **Check for existing shared types** — before declaring a new interface, search `src/features/auth/types/`, `src/features/[feature]/types/` and other existing `types/` modules to avoid duplication.
4. **Check for existing UI components** — before writing raw HTML `<button>`, `<table>`, `<input>`, `<select>`, etc., check `src/components/ui/` for a shadcn/ui primitive that already exists.

Failure to complete this check before execution is an architecture violation.

## 🧩 Shadcn/UI Component Usage (REQUIRED)

This project uses **shadcn/ui** as the primary component library. You MUST use these components wherever applicable:

| Native HTML | Required shadcn/ui Component |
|---|---|
| `<button>` | `<Button>` from `@/components/ui/button` |
| `<input>` | `<Input>` from `@/components/ui/input` |
| `<table>` | `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` |
| `<select>` | `<Select>` from `@/components/ui/select` (uses `@base-ui/react` under the hood) |
| Toggle/Switch | `<Switch>` from `@/components/ui/switch` |
| Status label | `<Badge>` from `@/components/ui/badge` |
| Container card | `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardContent>` |
| Sidebar layout | `<SidebarProvider>`, `<Sidebar>`, `<SidebarHeader>`, `<SidebarContent>`, `<SidebarFooter>`, `<SidebarTrigger>`, `<SidebarInset>`, `<SidebarMenu>`, `<SidebarMenuItem>`, `<SidebarMenuButton>` |

> ⚠️ **NEVER write inline HTML equivalents** when a shadcn/ui primitive is available. Writing raw HTML markup where a shadcn/ui component exists is an architecture violation.

## ⚡ Framework Conventions (Next.js 16 & React 19)

- **App Router Routing**: Use App Router pages. Pages should be Server Components by default. Use Client Components (`"use client"`) only when subscribing to dynamic client hooks, states, or DOM triggers.
- **React Compiler Memoization**: The React Compiler memoizes elements automatically. Do **not** manually declare `useMemo` or `useCallback` hooks unless building a custom React hook with specific dependency triggers.
- **Base UI Integration**: Primitives like inputs, dropdowns, and selects are built with `@base-ui/react`. Note the Select component's `onValueChange` passes `string | null`, requiring manual null checks before writing to standard string states.

## 🎨 Styling with Tailwind CSS v4

- **CSS-First Theme Config**: Do **not** create a `tailwind.config.js` file. Tailwind CSS v4 configurations live inside `src/app/globals.css` using the `@theme inline` block.
- **Colors & Transparency**: Use modern `oklch` syntax for color variables (e.g. `oklch(0.585 0.233 277.117)` for primary).
- **Glassmorphism Utilities**: Leverage custom CSS utilities:
  - `glass-panel` - Frosted glass containers.
  - `glass-card` - Frosted interactive cards with hover transition.
  - `bg-grid-mesh` - Subtle mesh-grid background pattern.

## 🧠 Logic & UI Separation

1. **Custom Logic Hooks**: Keep TSX files clean and representational. Do not declare complex React hook states (such as `useState`, `useForm`, or query mutations) directly inside representational UI components.
2. **Hook Extraction**: Extract form states, validation triggers, and side-effects into a dedicated custom hook (e.g., `use[Component]Logic`), leaving the UI component focused exclusively on rendering JSX.
3. **State Minimization**: Avoid declaring redundant local `useState` hooks (e.g., for tracking submission status or global submission success/error) if those states are already managed and exposed by the form library (e.g., `react-hook-form`'s `formState.isSubmitting` or `formState.isSubmitSuccessful`). Leverage built-in mechanisms like `form.setError("root", { type: "server", message })` to handle server-side errors.
4. **Type Reuse over Redeclaration**: Before writing a new `interface` or `type`, check existing shared types first:
   - `User`, `AuthSession` → always import from `@/features/auth`
   - Feature-specific types (e.g., `TabType`, `MockUser`) → live in `src/features/[feature]/types/index.ts`
   - Inline prop interface duplication across components is forbidden if a canonical type exists.

## 📦 DOM Efficiency & Rendering Modes

1. **Minimize DOM Nodes**: Avoid redundant wrapper `div` layers. Use CSS grid spacing, flex gaps, or semantic tags directly instead of nesting container divs.
2. **SSR vs CSR Selection**:
   - Default to **React Server Components (RSC)** for structural layouts, metadata, and static parts.
   - Use Client Components (`"use client"`) strictly at leaf node components requiring interactive states (input inputs, custom selectors, form callbacks).
   - If a page has complex client states, wrap the stateful elements inside a separate Client Component rather than converting the entire page to a Client Component.
3. **Card Borders & Outlines**: Never combine outline rings (`ring-*`) with layout borders (`border-*`) on the same container. Doing so creates double-border rendering artifacts at rounded corners. Delegate interior spacings to child elements (`CardHeader`, `CardContent`) to align layouts perfectly with the design system.

