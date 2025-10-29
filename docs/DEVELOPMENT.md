# Development Guide

## Setup

### Requirements

- Node.js 18.17.0+ or 20.3.0+
- pnpm 9.15.0+

### Install

```bash
git clone https://github.com/GDGNairobi/devfest-2025-website.git
cd devfest-2025-website
pnpm install
```

### Configure

Create `.env.local`:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
```

Get credentials from [sanity.io/manage](https://sanity.io/manage) → Your Project → Settings

### Run

```bash
pnpm run dev
```

Visit http://localhost:5173

## Commands

```bash
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run build.types  # TypeScript check
pnpm run lint         # Run ESLint
pnpm run fmt          # Format with Prettier
```

## Workflow

```bash
# Create branch
git checkout -b feature/your-feature

# Make changes, then commit
git add .
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature
```

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `perf:` - Performance
- `chore:` - Maintenance

## Project Structure

```
src/
├── components/       # Qwik components
│   ├── layout/      # Header, Footer
│   ├── sections/    # Homepage sections
│   └── ui/          # Reusable components
├── lib/             # Utilities, types
├── routes/          # Pages (file-based routing)
└── global.css       # Global styles
```

## Creating Components

```typescript
import { component$ } from "@builder.io/qwik";
import type { MyProps } from "~/lib/types";

export const MyComponent = component$<MyProps>(({ title }) => {
  return <div>{title}</div>;
});
```

Add types to `src/lib/types.ts`:

```typescript
export interface MyProps {
  title: string;
}
```

## State & Data

**Local State:**
```typescript
import { useSignal } from "@builder.io/qwik";

const count = useSignal(0);
```

**Fetch Data:**
```typescript
import { routeLoader$ } from "@builder.io/qwik-city";

export const useData = routeLoader$(async () => {
  return await fetchData();
});
```

## Styling

Use Tailwind classes:

```typescript
<div class="flex items-center gap-4 rounded-lg bg-blue-600 p-4 text-white">
  Content
</div>
```

## Testing

Before PR:
- [ ] Test Chrome, Firefox, Safari
- [ ] Test mobile (375px), tablet (768px), desktop (1920px)
- [ ] Check keyboard navigation
- [ ] No console errors
- [ ] Run `pnpm run build.types`
- [ ] Run `pnpm run lint`

## Debugging

```bash
# Clear cache
rm -rf dist .qwik node_modules
pnpm install

# Check types
pnpm run build.types

# Test build
pnpm run build
```

## Need Help?

- [Qwik Docs](https://qwik.builder.io/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- Open an issue on GitHub
