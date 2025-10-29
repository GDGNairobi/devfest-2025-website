# Development Guide

## Getting Started

This guide will help you set up your development environment and start contributing to the DevFest Nairobi 2025 website.

## Prerequisites

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 18.17.0+ or 20.3.0+ or >=21.0.0 | JavaScript runtime |
| **pnpm** | 9.15.0+ | Package manager |
| **Git** | Latest | Version control |
| **VS Code** | Latest (recommended) | Code editor |

### Recommended VS Code Extensions

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind class autocomplete
- **TypeScript Vue Plugin (Volar)**: Better TypeScript support
- **Qwik Snippets**: Qwik-specific snippets

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GDGNairobi/devfest-2025-website.git
cd devfest-2025-website
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Sanity Configuration
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Getting Sanity Credentials**:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Find Project ID in settings
4. Use `production` for dataset (or your dataset name)

### 4. Start Development Server

```bash
pnpm run dev
```

The site will be available at `http://localhost:5173/`

### 5. Start Sanity Studio (Optional)

In a separate terminal:

```bash
cd sanity-studio
pnpm install
pnpm run dev
```

Sanity Studio will be available at `http://localhost:3333/`

## Development Workflow

### Branch Strategy

```bash
main            # Production branch
  ├─ feature/*  # New features
  ├─ fix/*      # Bug fixes
  ├─ docs/*     # Documentation updates
  └─ chore/*    # Maintenance tasks
```

### Creating a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/session-bookmarks

# Make your changes
# ...

# Commit with conventional commit format
git add .
git commit -m "feat: add session bookmark functionality"

# Push to GitHub
git push origin feature/session-bookmarks

# Create a Pull Request on GitHub
```

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat: add speaker filtering by track
fix: correct session time display in Safari
docs: update deployment guide
style: format code with prettier
refactor: simplify schedule utils
perf: optimize image loading
chore: update dependencies
```

## Available Commands

### Development

```bash
# Start dev server
pnpm run dev

# Start dev server with host exposed (for mobile testing)
pnpm run dev -- --host
```

### Building

```bash
# Type checking only
pnpm run build.types

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview
```

### Code Quality

```bash
# Run ESLint
pnpm run lint

# Format code with Prettier
pnpm run fmt

# Check formatting
pnpm run fmt.check
```

### Sanity Studio

```bash
# Start Sanity Studio dev server
cd sanity-studio
pnpm run dev

# Build Sanity Studio
pnpm run build

# Deploy Sanity Studio
pnpm run deploy
```

## Project Structure Deep Dive

### Key Directories

```
src/
├── components/          # Qwik components
│   ├── icons/          # SVG icon components
│   ├── layout/         # Header, Footer, Layout
│   ├── sections/       # Page sections (Hero, etc.)
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
├── lib/                # Utilities and types
│   ├── sanity.ts      # Sanity client setup
│   ├── types.ts       # TypeScript type definitions
│   └── utils.ts       # Helper functions
├── routes/             # Qwik file-based routing
│   ├── index.tsx      # Homepage (/)
│   ├── speakers/      # Speakers page (/speakers)
│   ├── schedule/      # Schedule page (/schedule)
│   └── sponsors/      # Sponsors page (/sponsors)
└── global.css         # Global styles
```

### Routing in Qwik

Qwik uses file-based routing:

```
src/routes/
├── index.tsx           # /
├── speakers/
│   └── index.tsx       # /speakers
├── schedule/
│   └── index.tsx       # /schedule
└── [slug]/
    └── index.tsx       # /any-slug (dynamic route)
```

## Component Development

### Creating a New Component

1. **Create Component File**:

```typescript
// src/components/MyComponent.tsx
import { component$ } from "@builder.io/qwik";
import type { MyComponentProps } from "~/lib/types";

export const MyComponent = component$<MyComponentProps>(({ prop1, prop2 }) => {
  return (
    <div class="my-component">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
    </div>
  );
});
```

2. **Add Type Definition**:

```typescript
// src/lib/types.ts
export interface MyComponentProps {
  prop1: string;
  prop2: string;
}
```

3. **Use Component**:

```typescript
import { MyComponent } from "~/components/MyComponent";

<MyComponent prop1="Hello" prop2="World" />
```

### Component Best Practices

**State Management**:
```typescript
import { useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});
```

**Data Fetching**:
```typescript
import { routeLoader$ } from "@builder.io/qwik-city";

export const useSpeakers = routeLoader$(async () => {
  // Fetch data on server
  const speakers = await fetchSpeakers();
  return speakers;
});

export default component$(() => {
  const speakers = useSpeakers();
  
  return (
    <div>
      {speakers.value.map(speaker => (
        <div key={speaker.id}>{speaker.name}</div>
      ))}
    </div>
  );
});
```

**Event Handlers**:
```typescript
// Use $ suffix for QRL (lazy-loadable functions)
<button onClick$={(event) => {
  console.log('Clicked!', event);
}}>
  Click me
</button>
```

## Styling Guidelines

### Tailwind CSS

We use Tailwind CSS v4 with custom configuration:

```typescript
// Example component with Tailwind classes
<div class="flex items-center justify-between rounded-lg bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700">
  <span class="text-lg font-semibold">DevFest 2025</span>
  <button class="rounded-full bg-white px-4 py-2 text-blue-600">
    Register
  </button>
</div>
```

### Class Organization

Order classes by category:

1. Layout (flex, grid, block)
2. Positioning (absolute, relative, top, left)
3. Sizing (w-, h-, max-w)
4. Spacing (p-, m-, gap)
5. Typography (text-, font-)
6. Colors (bg-, text-, border-)
7. Effects (shadow-, opacity-)
8. Interactions (hover:, focus:)

### Custom Styles

For one-off styles, use inline styles:

```typescript
<div style={{ transform: `rotate(${angle}deg)` }}>
  Content
</div>
```

## Data Fetching from Sanity

### Basic Query

```typescript
import { client } from "~/lib/sanity";

export const useSessions = routeLoader$(async () => {
  const sessions = await client.fetch(`
    *[_type == "session"] | order(startTime asc) {
      _id,
      title,
      description,
      startTime,
      endTime,
      speakers[]->{ name, photo }
    }
  `);
  
  return sessions;
});
```

### With Parameters

```typescript
export const useSessionBySlug = routeLoader$(async ({ params }) => {
  const session = await client.fetch(
    `*[_type == "session" && slug.current == $slug][0]`,
    { slug: params.slug }
  );
  
  return session;
});
```

### Type Safety

```typescript
import type { SanitySession } from "~/lib/types";

const sessions = await client.fetch<SanitySession[]>(`
  *[_type == "session"]
`);
```

## Testing

### Manual Testing Checklist

Before submitting a PR:

- [ ] Test on Chrome, Firefox, and Safari
- [ ] Test on mobile viewport (375px width)
- [ ] Test on tablet viewport (768px width)
- [ ] Test on desktop viewport (1920px width)
- [ ] Check accessibility (keyboard navigation, screen reader)
- [ ] Verify no console errors
- [ ] Test with slow 3G network throttling
- [ ] Verify images load correctly
- [ ] Check all links work

### Browser DevTools

**Network Tab**:
- Throttle to "Slow 3G" to test performance
- Check resource sizes
- Verify caching

**Lighthouse**:
- Run Lighthouse audit
- Aim for 90+ scores in all categories
- Fix any accessibility issues

**Console**:
- Check for errors and warnings
- Fix any React/Qwik warnings

## Debugging

### Common Issues

**Build Errors**:
```bash
# Clear build cache
rm -rf dist .qwik

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm run build
```

**Type Errors**:
```bash
# Run type checking
pnpm run build.types

# Check specific file
npx tsc --noEmit src/components/MyComponent.tsx
```

**Sanity Connection Issues**:
- Verify `.env.local` variables are correct
- Check Sanity project ID is valid
- Ensure dataset name is correct
- Verify API access permissions

### Debug Logs

Add debug logs:

```typescript
export default component$(() => {
  console.log('Component rendered');
  
  return <div>Content</div>;
});
```

## Performance Optimization

### Image Optimization

**Use Lazy Loading**:
```typescript
<img 
  src="/path/to/image.jpg" 
  loading="lazy"
  decoding="async"
  alt="Description"
/>
```

**Optimize with Sanity**:
```typescript
const imageUrl = urlForImage(image)
  .width(800)
  .height(600)
  .format('webp')
  .quality(85)
  .url();
```

### Code Splitting

Qwik handles this automatically, but you can help:

```typescript
// Large components that aren't always needed
import { component$, useVisibleTask$ } from "@builder.io/qwik";

export const HeavyComponent = component$(() => {
  useVisibleTask$(({ cleanup }) => {
    // Code that runs only when component is visible
  });
  
  return <div>Heavy content</div>;
});
```

## Accessibility Guidelines

### Semantic HTML

```typescript
// Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/speakers">Speakers</a></li>
  </ul>
</nav>

// Bad
<div class="navigation">
  <div><a href="/speakers">Speakers</a></div>
</div>
```

### ARIA Labels

```typescript
<button 
  onClick$={handleClick}
  aria-label="Close menu"
  aria-expanded={isOpen}
>
  <span aria-hidden="true">×</span>
</button>
```

### Keyboard Navigation

```typescript
<div 
  tabIndex={0}
  onKeyDown$={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  Clickable content
</div>
```

## Git Best Practices

### Before Committing

```bash
# Check what files changed
git status

# Review your changes
git diff

# Stage specific files
git add src/components/MyComponent.tsx

# Or stage all changes
git add .

# Commit with good message
git commit -m "feat: add session bookmark feature"
```

### Keeping Branch Updated

```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Switch back to feature branch
git checkout feature/my-feature

# Rebase on main
git rebase main

# If conflicts, resolve them, then:
git rebase --continue

# Force push (only if already pushed)
git push --force-with-lease origin feature/my-feature
```

## Getting Help

### Resources

- **Qwik Docs**: [qwik.builder.io/docs](https://qwik.builder.io/docs)
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript Handbook**: [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/)

### Support Channels

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **GDG Nairobi Slack**: #devfest-website channel
- **Email**: tech@gdgnairobi.com

## Next Steps

Now that you're set up:

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
2. Check [open issues](https://github.com/GDGNairobi/devfest-2025-website/issues) for tasks
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
4. Join the GDG Nairobi community channels

Happy coding! 🚀
