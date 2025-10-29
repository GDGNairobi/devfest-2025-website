# Architecture Documentation

## Project Overview

The DevFest Nairobi 2025 website is built with modern web technologies optimized for performance, maintainability, and developer experience. This document outlines the technical architecture and design decisions.

## Tech Stack

### Core Technologies

| Technology           | Version | Purpose                                            |
| -------------------- | ------- | -------------------------------------------------- |
| **Qwik**             | 1.17.1  | Web framework with zero hydration and resumability |
| **TypeScript**       | 5.4.5   | Type safety and enhanced developer experience      |
| **Tailwind CSS**     | v4      | Utility-first CSS framework                        |
| **Sanity.io**        | Latest  | Headless CMS for content management                |
| **Cloudflare Pages** | Latest  | Edge deployment platform                           |

### Why Qwik?

Qwik was chosen for several key advantages:

1. **Zero Hydration**: Instant interactivity without JavaScript execution
2. **Resumability**: Application state preserved across page loads
3. **O(1) Loading**: Performance doesn't degrade as app grows
4. **Mobile Optimized**: Perfect for varying internet conditions
5. **Progressive**: Only loads JavaScript for interactive components

### Design System

- **Material You**: Google's modern design language
- **Tailwind v4**: Utility-first CSS with custom design tokens
- **Responsive**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliance

## Project Structure

```
devfest-nairobi-2025/
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   ├── workflows/             # CI/CD workflows
│   └── PULL_REQUEST_TEMPLATE.md
├── adapters/                   # Platform adapters
│   └── cloudflare-pages/      # Cloudflare Pages adapter
├── data/                       # Static data files
│   ├── friday-schedule.csv
│   └── saturday-schedule.csv
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md        # This file
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── CMS_GUIDE.md           # Sanity CMS documentation
│   └── DEVELOPMENT.md         # Development setup
├── public/                     # Static assets
│   ├── _headers               # Cloudflare headers
│   ├── _redirects             # Cloudflare redirects
│   ├── manifest.json          # PWA manifest
│   └── robots.txt
├── sanity-studio/             # Sanity Studio (separate app)
│   ├── schemaTypes/           # Content schemas
│   └── sanity.config.ts
├── scripts/                    # Utility scripts
│   └── seed-schedule.ts       # Schedule data seeding
├── src/
│   ├── components/            # Qwik components
│   │   ├── icons/            # SVG icon components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── sections/         # Page sections (Hero, Tracks, etc.)
│   │   └── ui/               # Reusable UI components
│   ├── config/               # Configuration files
│   │   └── floating-icons.ts # Floating icon config
│   ├── lib/                  # Utilities and types
│   │   ├── sanity.ts        # Sanity client setup
│   │   ├── schedule.hooks.ts # Schedule-related hooks
│   │   ├── schedule.utils.ts # Schedule utilities
│   │   ├── types.ts         # TypeScript definitions
│   │   └── utils.ts         # Common utilities
│   ├── routes/              # Qwik file-based routing
│   │   ├── index.tsx        # Homepage
│   │   ├── schedule/        # Schedule page
│   │   ├── speakers/        # Speakers page
│   │   └── sponsors/        # Sponsors page
│   ├── sanity/              # Sanity integration
│   ├── entry.*.tsx          # Entry points
│   ├── global.css           # Global styles
│   └── root.tsx             # Root component
├── eslint.config.js          # ESLint configuration
├── package.json
├── prettier.config.js        # Prettier configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Component Architecture

### Component Organization

Components are organized by function:

1. **UI Components** (`src/components/ui/`): Reusable, presentational components
2. **Layout Components** (`src/components/layout/`): App structure (Header, Footer)
3. **Section Components** (`src/components/sections/`): Page-specific sections
4. **Icon Components** (`src/components/icons/`): SVG icons as components

### Component Best Practices

- **Qwik Components**: Use `component$()` for all components
- **Type Safety**: All props defined in `src/lib/types.ts`
- **Signals**: Use `useSignal()` for reactive state
- **Lazy Loading**: Components load only when needed
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Example Component Structure

```typescript
import { component$ } from "@builder.io/qwik";
import type { ComponentProps } from "~/lib/types";

export const MyComponent = component$<ComponentProps>(({ prop1, prop2 }) => {
  // Component logic
  return (
    <div class="...">
      {/* Component JSX */}
    </div>
  );
});
```

## Data Flow

### Content Management

1. **Sanity CMS**: Content created and managed in Sanity Studio
2. **API Integration**: Qwik components fetch data via Sanity client
3. **Type Safety**: TypeScript interfaces for all content types
4. **Real-time**: Content updates without redeployment

### State Management

- **Qwik Signals**: Reactive state management
- **URL State**: Route parameters for navigation state
- **Local State**: Component-level state with `useSignal()`
- **Server State**: Data fetching with Qwik's `routeLoader$()`

## Performance Optimizations

### Qwik-Specific Optimizations

1. **Resumability**: No hydration overhead
2. **Lazy Execution**: Code executes only when needed
3. **Fine-grained Loading**: Component-level code splitting
4. **Prefetching**: Intelligent prefetching of likely user interactions

### Additional Optimizations

1. **Image Optimization**: Lazy loading, modern formats (WebP)
2. **Code Splitting**: Route-based and component-based
3. **CSS Optimization**: Tailwind CSS purging, critical CSS
4. **Caching**: Cloudflare edge caching, service worker

## Security Considerations

### Content Security

- **Sanity Validation**: Schema-level validation
- **Type Safety**: TypeScript prevents type-related errors
- **Input Sanitization**: All user inputs sanitized

### Deployment Security

- **HTTPS Only**: Enforced via Cloudflare
- **Security Headers**: CSP, HSTS, X-Frame-Options
- **Environment Variables**: Secrets stored in Cloudflare
- **Access Control**: Sanity API tokens with appropriate permissions

## Scalability

### Horizontal Scaling

- **Cloudflare Edge**: Global CDN distribution
- **Serverless Functions**: Auto-scaling compute
- **Static Generation**: Pre-rendered pages for performance

### Content Scaling

- **Sanity CDN**: Optimized content delivery
- **Image CDN**: Sanity's image pipeline
- **Pagination**: Efficient data loading for large datasets

## Browser Support

### Target Browsers

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

### Progressive Enhancement

- Works without JavaScript (basic functionality)
- Enhanced experience with JavaScript
- Graceful degradation for older browsers

## Development Workflow

### Local Development

1. Clone repository
2. Install dependencies (`pnpm install`)
3. Configure environment variables
4. Start dev server (`pnpm run dev`)
5. Start Sanity Studio (separate process)

### Testing Strategy

- **Type Checking**: TypeScript compilation
- **Linting**: ESLint for code quality
- **Build Testing**: Production build verification
- **Manual Testing**: Cross-browser and device testing

### CI/CD Pipeline

1. **Lint & Type Check**: Automated on PR
2. **Build Verification**: Ensures production build succeeds
3. **Deployment**: Automatic to Cloudflare Pages on merge to main

## Future Enhancements

### Phase 2 (Post-Event)

- PWA capabilities (offline support)
- Push notifications for updates
- Enhanced analytics and tracking
- Performance monitoring (RUM)

### Phase 3 (Long-term)

- Multi-language support
- Advanced search functionality
- Personalized recommendations
- Native mobile app

## References

- [Qwik Documentation](https://qwik.builder.io/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
