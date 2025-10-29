# Architecture

## Tech Stack

| Technology           | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| **Qwik**             | Zero-hydration web framework - instant interactivity |
| **TypeScript**       | Type safety                                          |
| **Tailwind CSS v4**  | Styling                                              |
| **Sanity.io**        | Headless CMS                                         |
| **Cloudflare Pages** | Hosting                                              |

**Why Qwik?** Instant loading, no hydration overhead, perfect for mobile.

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

## Component Organization

Components are organized by function:

- **UI Components** (`src/components/ui/`): Reusable components
- **Layout** (`src/components/layout/`): Header, Footer
- **Sections** (`src/components/sections/`): Homepage sections
- **Icons** (`src/components/icons/`): SVG icons

## Data Flow

1. Content managed in Sanity CMS
2. Qwik fetches via Sanity client
3. Components render with TypeScript types
4. Real-time updates without redeployment

## Key Features

- **Qwik Signals**: Reactive state management
- **Route Loaders**: Server-side data fetching
- **Lazy Loading**: Images and components load as needed
- **Image Optimization**: WebP, lazy loading, responsive sizes
