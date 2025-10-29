# Component Guidelines

Quick reference for building components in this project.

## File Naming

Use PascalCase: `SessionCard.tsx`, `DaySelector.tsx`

## Component Structure

```typescript
import { component$ } from "@builder.io/qwik";
import type { MyProps } from "~/lib/types";

/**
 * Brief description of what the component does
 */
export const MyComponent = component$<MyProps>(({ title }) => {
  return <div>{title}</div>;
});
```

## With State

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

## Styling

```typescript
// Use Tailwind classes
<div class="flex items-center gap-4 rounded-lg bg-blue-600 p-4">
  Content
</div>
```

## Accessibility

```typescript
// Add ARIA labels
<button aria-label="Close menu" onClick$={close}>×</button>

// Use semantic HTML
<nav aria-label="Main navigation">...</nav>

// Support keyboard
<div 
  tabIndex={0}
  onKeyDown$={(e) => e.key === 'Enter' && handleClick()}
>
```

## Props

Define in `src/lib/types.ts`:

```typescript
export interface SessionCardProps {
  session: SanitySession;
}
```

## JSDoc

Add simple description:

```typescript
/**
 * Displays a session card with speaker info and timing
 */
export const SessionCard = component$<SessionCardProps>(...) => {
```

## Event Handlers

Use `$` suffix for lazy-loaded handlers:

```typescript
<button onClick$={() => console.log('clicked')}>Click</button>
```

## Data Fetching

```typescript
import { routeLoader$ } from "@builder.io/qwik-city";

export const useSessions = routeLoader$(async () => {
  return await client.fetch(`*[_type == "session"]`);
});
```

## That's It!

Keep components:
- Small and focused
- Typed with TypeScript
- Accessible
- Well-documented

See existing components for examples.
