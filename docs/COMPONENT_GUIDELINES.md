# Component Guidelines

## Overview

This guide provides standards and best practices for developing components in the DevFest Nairobi 2025 website. Following these guidelines ensures consistency, maintainability, and optimal performance.

## Component Structure

### File Naming

**Convention**: Use PascalCase for component files

```
✅ Good
src/components/SessionCard.tsx
src/components/DaySelector.tsx
src/components/ui/Button.tsx

❌ Bad
src/components/sessionCard.tsx
src/components/day-selector.tsx
src/components/ui/button.tsx
```

### File Organization

```
src/components/
├── icons/              # SVG icon components
├── layout/             # Layout components (Header, Footer)
├── sections/           # Page sections (Hero, Tracks)
├── ui/                 # Reusable UI components
└── [ComponentName.tsx] # Page-specific components
```

## Component Patterns

### Basic Component Template

````typescript
import { component$ } from "@builder.io/qwik";
import type { ComponentProps } from "~/lib/types";

/**
 * Brief description of what the component does.
 *
 * @param props - Component properties
 * @param props.prop1 - Description of prop1
 * @param props.prop2 - Description of prop2
 *
 * @example
 * ```tsx
 * <MyComponent prop1="value" prop2={123} />
 * ```
 */
export const MyComponent = component$<ComponentProps>(({ prop1, prop2 }) => {
  return (
    <div class="my-component">
      {/* Component JSX */}
    </div>
  );
});
````

### Component with State

````typescript
import { component$, useSignal } from "@builder.io/qwik";

/**
 * Counter component with increment/decrement functionality.
 *
 * @param props - Component properties
 * @param props.initialValue - Starting count value
 *
 * @example
 * ```tsx
 * <Counter initialValue={0} />
 * ```
 */
export const Counter = component$<{ initialValue: number }>(({ initialValue }) => {
  const count = useSignal(initialValue);

  return (
    <div>
      <button onClick$={() => count.value--}>-</button>
      <span>{count.value}</span>
      <button onClick$={() => count.value++}>+</button>
    </div>
  );
});
````

### Component with Data Fetching

````typescript
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Speaker } from "~/lib/types";

/**
 * Server-side data loader for speakers.
 * Fetches all speakers from Sanity CMS.
 *
 * @returns Array of speaker objects
 */
export const useSpeakers = routeLoader$(async () => {
  const speakers = await fetchSpeakers();
  return speakers;
});

/**
 * Displays a grid of speaker cards.
 * Data is fetched server-side for optimal performance.
 *
 * @example
 * ```tsx
 * <SpeakerGrid />
 * ```
 */
export const SpeakerGrid = component$(() => {
  const speakers = useSpeakers();

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      {speakers.value.map((speaker) => (
        <SpeakerCard key={speaker._id} speaker={speaker} />
      ))}
    </div>
  );
});
````

## TypeScript Best Practices

### Type Definitions

**All component props must be defined in `src/lib/types.ts`**:

```typescript
// src/lib/types.ts
import type { QRL, Signal } from "@builder.io/qwik";
import type { Session as SanitySession } from "~/lib/sanity";

/**
 * Props for the SessionCard component.
 */
export interface SessionCardProps {
  /** Session data from Sanity CMS */
  session: SanitySession;
}

/**
 * Props for the DaySelector component.
 */
export interface DaySelectorProps {
  /** Signal holding the currently selected day (1 or 2) */
  selectedDay: Signal<number>;
}
```

### Using Props in Components

```typescript
import type { SessionCardProps } from "~/lib/types";

export const SessionCard = component$<SessionCardProps>(({ session }) => {
  // Component implementation
});
```

## Styling Guidelines

### Tailwind Class Organization

Order classes by category for consistency:

```typescript
<div class="
  flex items-center justify-between     // Layout
  relative                              // Positioning
  w-full max-w-md                       // Sizing
  p-4 gap-3                             // Spacing
  text-lg font-semibold                 // Typography
  bg-blue-600 text-white border-2       // Colors
  rounded-lg shadow-md                  // Effects
  hover:bg-blue-700 focus:ring-2        // Interactions
">
  Content
</div>
```

### Responsive Design

Use mobile-first approach with Tailwind breakpoints:

```typescript
<div class="
  text-sm              // Mobile (default)
  md:text-base         // Tablet (768px+)
  lg:text-lg           // Desktop (1024px+)
">
  Responsive Text
</div>
```

### Conditional Classes

```typescript
<button
  class={`
    rounded-lg px-6 py-2 font-semibold transition-all
    ${isActive
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-700 hover:text-gray-900"
    }
  `}
>
  Button
</button>
```

## Qwik-Specific Patterns

### Event Handlers

Always use `$` suffix for event handlers (QRL functions):

```typescript
// ✅ Good - Lazy loadable
<button onClick$={() => handleClick()}>Click</button>

// ❌ Bad - Not optimized
<button onClick={() => handleClick()}>Click</button>
```

### Signals for State

Use signals for reactive state:

```typescript
import { useSignal } from "@builder.io/qwik";

export const Component = component$(() => {
  const isOpen = useSignal(false);

  return (
    <button onClick$={() => isOpen.value = !isOpen.value}>
      {isOpen.value ? "Close" : "Open"}
    </button>
  );
});
```

### Visible Tasks

Use `useVisibleTask$()` for code that runs only when component is visible:

```typescript
import { useVisibleTask$ } from "@builder.io/qwik";

export const Component = component$(() => {
  useVisibleTask$(() => {
    // Initialize chart library
    // Add event listeners
    // Code runs only when component enters viewport
  });

  return <div>Content</div>;
});
```

## Accessibility Requirements

### Semantic HTML

Always use appropriate HTML elements:

```typescript
// ✅ Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/speakers">Speakers</a></li>
  </ul>
</nav>

// ❌ Bad
<div class="navigation">
  <div><a href="/speakers">Speakers</a></div>
</div>
```

### ARIA Labels

Add descriptive labels for screen readers:

```typescript
<button
  onClick$={toggleMenu}
  aria-label="Open mobile menu"
  aria-expanded={isOpen.value}
  aria-controls="mobile-menu"
>
  <span aria-hidden="true">☰</span>
</button>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
<div
  tabIndex={0}
  role="button"
  onClick$={handleClick}
  onKeyDown$={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Clickable content
</div>
```

### Focus Management

Provide visible focus indicators:

```typescript
<a
  href="/speakers"
  class="
    text-blue-600 hover:text-blue-800
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  "
>
  Speakers
</a>
```

## Performance Optimization

### Image Optimization

Always use lazy loading for images:

```typescript
<img
  src={speaker.photo.asset.url}
  alt={`${speaker.name} profile photo`}
  width={400}
  height={400}
  loading="lazy"
  decoding="async"
  class="rounded-full"
/>
```

### Component Lazy Loading

Large components should be code-split:

```typescript
import { component$, useSignal } from "@builder.io/qwik";

export const HeavyComponent = component$(() => {
  // This component will only load when rendered
  return <div>Heavy content</div>;
});
```

### Avoid Unnecessary Re-renders

Use `memo` for expensive computations:

```typescript
import { component$, useComputed$ } from "@builder.io/qwik";

export const Component = component$(() => {
  const items = useSignal([1, 2, 3, 4, 5]);

  // Computed value updates only when items change
  const total = useComputed$(() =>
    items.value.reduce((sum, item) => sum + item, 0)
  );

  return <div>Total: {total.value}</div>;
});
```

## JSDoc Standards

### Component Documentation

````typescript
/**
 * SessionCard displays detailed information about a conference session.
 *
 * Features:
 * - Session title, description, and timing
 * - Speaker information with photos
 * - Track and difficulty level badges
 * - Responsive design for mobile and desktop
 *
 * @component
 *
 * @param props - Component properties
 * @param props.session - Session data from Sanity CMS including title, time, speakers, etc.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <SessionCard session={sessionData} />
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <SessionCard
 *   session={sessionData}
 *   class="custom-class"
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic HTML (time element for timestamps)
 * - Images have descriptive alt text
 * - Speaker avatars have ARIA labels
 *
 * @performance
 * - Images are lazy-loaded
 * - Component uses Qwik's resumability for instant interactivity
 */
export const SessionCard = component$<SessionCardProps>(({ session }) => {
  // Implementation
});
````

### Function Documentation

````typescript
/**
 * Formats a time string to 12-hour format with AM/PM.
 *
 * @param time - Time string in ISO format or HH:mm format
 * @returns Formatted time string (e.g., "9:00 AM")
 *
 * @example
 * ```typescript
 * formatTime("2025-10-31T09:00:00+03:00") // "9:00 AM"
 * formatTime("14:30") // "2:30 PM"
 * ```
 */
export function formatTime(time: string): string {
  // Implementation
}
````

## Testing Checklist

Before submitting a component:

- [ ] TypeScript types are defined in `types.ts`
- [ ] Component has JSDoc documentation
- [ ] Follows naming conventions
- [ ] Uses semantic HTML
- [ ] Has ARIA labels where needed
- [ ] Supports keyboard navigation
- [ ] Has focus indicators
- [ ] Images are optimized (lazy loading, alt text)
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Passes ESLint and Prettier checks

## Common Patterns

### Loading States

```typescript
export const Component = component$(() => {
  const data = useData();

  if (!data.value) {
    return (
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
});
```

### Error Boundaries

```typescript
export const Component = component$(() => {
  const data = useData();

  if (data.value.error) {
    return (
      <div class="rounded-lg bg-red-50 p-4 text-red-800">
        <p class="font-semibold">Error loading data</p>
        <p class="text-sm">{data.value.error.message}</p>
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
});
```

### Empty States

```typescript
export const Component = component$(() => {
  const items = useItems();

  if (items.value.length === 0) {
    return (
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg font-semibold">No items found</p>
        <p class="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return <div>{/* Render items */}</div>;
});
```

## Anti-Patterns to Avoid

### ❌ Don't Use Inline Styles for Layout

```typescript
// Bad
<div style={{ display: "flex", padding: "16px" }}>

// Good
<div class="flex p-4">
```

### ❌ Don't Forget $ Suffix for Event Handlers

```typescript
// Bad - Not optimized
<button onClick={() => console.log('clicked')}>

// Good - Lazy loadable
<button onClick$={() => console.log('clicked')}>
```

### ❌ Don't Use Index as Key

```typescript
// Bad
{items.map((item, index) => <div key={index}>{item}</div>)}

// Good
{items.map((item) => <div key={item.id}>{item}</div>)}
```

### ❌ Don't Mutate Signals Directly

```typescript
// Bad
const items = useSignal([1, 2, 3]);
items.value.push(4); // Direct mutation

// Good
items.value = [...items.value, 4]; // Create new array
```

## Resources

### Official Documentation

- [Qwik Documentation](https://qwik.builder.io/docs/)
- [Qwik Cheat Sheet](https://qwik.builder.io/docs/cheat-sheet/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Accessibility

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

### Project-Specific

- [Architecture Guide](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

## Getting Help

If you have questions about component development:

1. Check this guide and other documentation
2. Search existing issues and pull requests
3. Ask in GitHub Discussions
4. Reach out on GDG Nairobi Slack (#devfest-website)
5. Email: tech@gdgnairobi.com

---

**Remember**: Write components that are accessible, performant, and maintainable. When in doubt, refer to this guide and existing components for patterns.
