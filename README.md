# DevFest Nairobi 2025 🇰🇪

> **Building Innovation Together in East Africa** 🌱

A modern, mobile-first conference website for DevFest Nairobi 2025, inspired by the Google Developer Group community and designed for the next generation of African tech innovators.

## 🎯 Project Overview

This project creates a comprehensive conference website for DevFest Nairobi 2025, featuring real-time session tracking, speaker profiles, and seamless content management. Built with modern web technologies and optimized for the African market.

### 🗓️ Event Details

- **Date**: Managed via CMS (2-day event)
- **Location**: Nairobi, Kenya
- **Expected Attendees**: 500+
- **Focus**: AI, Web, Cloud, Mobile Development, and African Tech Innovation

## 🛠️ Tech Stack

| Technology           | Purpose       | Why We Chose It                                |
| -------------------- | ------------- | ---------------------------------------------- |
| **Qwik**             | Web Framework | Zero hydration, instant loading, resumability  |
| **Tailwind CSS**     | Styling       | Rapid development, consistent design system    |
| **Material You**     | Design System | Modern Google design language, accessibility   |
| **Sanity.io**        | CMS           | Flexible content management, real-time updates |
| **TypeScript**       | Language      | Type safety, better developer experience       |
| **Cloudflare Pages** | Deployment    | Global edge network, perfect for Qwik          |

## 🎨 Design Philosophy

### Inspired by DevFest Pisa 2025

Our design draws inspiration from [DevFest Pisa's excellent implementation](https://devfest.gdgpisa.it/) while adapting for:

- **African Context**: Local imagery, cultural elements
- **Mobile-First**: Optimized for mobile internet usage patterns
- **Ultra Performance**: Qwik's zero hydration for instant loading
- **Accessibility**: WCAG compliant, keyboard navigation

### Material You Integration

- **Dynamic Color System**: Adaptive color palettes
- **Typography**: Roboto/System fonts with optimal readability
- **Components**: Cards, buttons, and layouts following Material Design 3
- **Motion**: Smooth animations and transitions

## 📁 Project Structure

```
devfest-nairobi-2025/
├── public/
│   ├── images/
│   ├── icons/
│   └── manifest.json
├── src/
│   ├── routes/                 # Qwik file-based routing
│   │   ├── speakers/
│   │   │   └── index.tsx
│   │   ├── schedule/
│   │   │   └── index.tsx
│   │   ├── sponsors/
│   │   │   └── index.tsx
│   │   ├── layout.tsx          # Root layout
│   │   └── index.tsx           # Homepage
│   ├── components/             # Qwik components
│   │   ├── ui/                # Base UI components
│   │   ├── sections/          # Page sections
│   │   ├── forms/             # Form components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utilities and configurations
│   │   ├── sanity.ts         # Sanity client
│   │   ├── utils.ts          # Common utilities
│   │   └── types.ts          # TypeScript definitions
│   ├── styles/               # Global styles and themes
│   │   ├── global.css
│   │   └── material-tokens.css
│   └── sanity/               # Sanity studio configuration
│       ├── schemas/
│       ├── structure/
│       └── studio.config.ts
├── studio/                   # Sanity Studio (separate app)
├── tailwind.config.js
├── vite.config.ts           # Qwik uses Vite
└── package.json
```

## 🎪 Core Features

### 🏠 Homepage

- **Hero Section**: Event branding with dynamic countdown
- **Quick Stats**: Attendee count, speaker nations, tracks
- **Key Highlights**: Featured speakers, major announcements
- **Call-to-Actions**: Registration, CFP, merch store

### 👥 Speakers

- **Speaker Profiles**: Photos, bios, social links, company info
- **Session Mapping**: Which sessions each speaker is presenting
- **Filtering**: By track, experience level, country
- **Search**: Real-time speaker search functionality

### 📅 Schedule

- **Two-Day Layout**: Tabbed interface for each day
- **Session Details**: Time, room, description, speaker info
- **Live Tracking**: "Now Going On" indicator during event
- **Personal Schedule**: Bookmark favorite sessions
- **Room Information**: Venue maps and capacity details

### 🏢 Sponsors & Partners

- **Tiered Display**: Platinum, Gold, Silver, Community partners
- **Interactive Cards**: Hover effects, direct links
- **Community Partners**: Local tech communities and media

### 🛍️ Merch Integration

- **Header CTA**: Prominent "Get Merch" button
- **Featured Products**: Showcase on homepage
- **External Link**: Seamless redirect to store

### 🔴 Real-Time Features

- **"Now Going On"**: Live session tracking during event
- **Live Updates**: Real-time schedule changes
- **Announcements**: Important updates and notifications

## 🗄️ Content Management (Sanity CMS)

### Content Schemas

#### Event Configuration Schema

```typescript
{
  eventName: string;
  eventDates: {
    day1: date;
    day2: date;
  }
  venue: {
    name: string;
    address: string;
    coordinates: geopoint;
  }
  timezone: string; // e.g., "Africa/Nairobi"
  isLive: boolean; // Toggle for live event mode
  eventStatus: "upcoming" | "live" | "ended";
}
```

#### Speaker Schema

```typescript
{
  name: string
  slug: string
  bio: text
  profileImage: image
  company: string
  jobTitle: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  sessions: reference[]
  isKeynote: boolean
  country: string
}
```

### Session Schema

```typescript
{
  title: string
  slug: string
  description: text
  startTime: datetime // Full datetime with timezone
  endTime: datetime   // Full datetime with timezone
  room: reference
  track: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  type: 'Talk' | 'Workshop' | 'Panel' | 'Keynote'
  speakers: reference[]
  tags: string[]
  eventDay: number // 1 or 2 (which day of the event)
}
```

#### Schedule Schema

```typescript
{
  day: number (1 or 2)
  date: date
  sessions: reference[]
  breaks: {
    title: string
    startTime: datetime
    endTime: datetime
    description?: string
  }[]
}
```

#### Sponsor Schema

```typescript
{
  name: string
  logo: image
  website: url
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Community'
  description?: text
  featured: boolean
}
```

## 📱 Mobile-First Approach

### Performance Optimizations

- **Zero Hydration**: Qwik's resumability means instant interactivity
- **Image Optimization**: Optimized images with WebP support
- **Critical CSS**: Inlined above-the-fold styles
- **Progressive Loading**: Components load only when needed
- **Service Worker**: Offline functionality for key pages

### Mobile UX Features

- **Touch Navigation**: Swipe gestures for schedule browsing
- **Responsive Images**: Optimized for various screen sizes
- **Fast Loading**: Optimized for 2G/3G/4G connections
- **Progressive Enhancement**: Works without JavaScript
- **Instant Interactions**: Qwik's O(1) loading regardless of app size

## 🚀 Development Timeline (6 Hours)

### Hour 1: Foundation & Setup ⚙️

- [x] Qwik project initialization with TypeScript
- [x] Tailwind CSS configuration with Material You tokens
- [x] Project structure setup
- [x] Vite configuration for optimal performance

### Hour 2: CMS & Data Architecture 🗄️

- [x] Sanity studio setup and configuration
- [x] Content schemas (Speaker, Session, Schedule, Sponsor)
- [x] Sample content creation
- [x] API integration and TypeScript types

### Hours 3-4: Core Components & UI 🎨

- [x] Qwik layout components (Header, Footer, Navigation)
- [x] UI components library (Cards, Buttons, Typography)
- [x] Section components (Hero, Speaker Grid, Schedule Timeline)
- [x] Responsive design implementation with Qwik

### Hour 5: Pages & Features 📄

- [x] Homepage with all sections using Qwik routing
- [x] Speakers page with filtering and lazy loading
- [x] Schedule page with day navigation
- [x] Real-time "Now Going On" functionality with Qwik signals

### Hour 6: Polish & Deployment 🚀

- [x] Mobile responsiveness testing
- [x] Performance optimization leveraging Qwik benefits
- [x] Cloudflare Pages deployment setup
- [x] SEO optimization and meta tags

## 🔴 Real-Time "Now Going On" Feature

### Implementation Details

````typescript
## 🔴 Real-Time "Now Going On" Feature

### Implementation Details

```typescript
// Enhanced real-time session tracking with Qwik Signals
import { useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export const useCurrentSession = () => {
  const currentSession = useSignal<Session | null>(null);
  const nextSession = useSignal<Session | null>(null);
  const timeUntilNext = useSignal<string>('');
  const eventStatus = useSignal<'upcoming' | 'live' | 'ended'>('upcoming');

  // Qwik's useTask$ for efficient server-side and client-side execution
  useTask$(async ({ track, cleanup }) => {
    // Track signals for reactivity
    track(() => currentSession.value);

    const checkCurrentSession = () => {
      // Get current time in event timezone (Africa/Nairobi)
      const now = new Date();
      const eventTimezone = 'Africa/Nairobi';

      // Find currently active session
      const current = sessions.find(session => {
        const startTime = new Date(session.startTime);
        const endTime = new Date(session.endTime);
        return startTime <= now && endTime > now;
      });

      // Find next upcoming session
      const upcoming = sessions
        .filter(session => new Date(session.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];

      currentSession.value = current || null;
      nextSession.value = upcoming || null;

      // Calculate time until next session
      if (upcoming) {
        const timeUntil = new Date(upcoming.startTime).getTime() - now.getTime();
        const hours = Math.floor(timeUntil / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        timeUntilNext.value = `${hours}h ${minutes}m`;
      }
    };

    // Initial check
    checkCurrentSession();

    // Set up interval for updates
    const interval = setInterval(checkCurrentSession, 30000);

    // Cleanup function
    cleanup(() => clearInterval(interval));
  });

  return {
    currentSession: currentSession.value,
    nextSession: nextSession.value,
    timeUntilNext: timeUntilNext.value,
    eventStatus: eventStatus.value
  };
};

// Qwik component with real-time updates
export const LiveSessionBadge = component$(() => {
  const { currentSession, timeUntilNext } = useCurrentSession();

  return (
    <div class="live-session-container">
      {currentSession && (
        <div class="animate-pulse bg-red-500 text-white px-4 py-2 rounded-full">
          🔴 LIVE: {currentSession.title}
        </div>
      )}
      {timeUntilNext && (
        <div class="bg-orange-500 text-white px-4 py-2 rounded-full">
          ⏰ Next in {timeUntilNext}
        </div>
      )}
    </div>
  );
});
````

### Qwik Performance Benefits

- **Zero Hydration**: Components become interactive instantly without JavaScript execution
- **Resumability**: Application state preserved across page loads
- **Progressive Loading**: Only load JavaScript for components that need interactivity
- **O(1) Startup**: Performance doesn't degrade as app grows
- **Optimized for Mobile**: Perfect for African mobile internet conditions

### Features

- **Live Indicator**: Visual highlight of current sessions with Qwik signals
- **Next Up**: Preview of upcoming sessions with countdown
- **Time Remaining**: Countdown to current session end
- **Room Directions**: Quick navigation to current session rooms
- **Event Status**: Dynamic status based on CMS-configured dates
- **Timezone Support**: Proper handling of Africa/Nairobi timezone
- **Multi-day Support**: Separate tracking for day 1 and day 2
- **Instant Updates**: Qwik's reactivity system for real-time UI updates

````

### Features

- **Live Indicator**: Visual highlight of current sessions
- **Next Up**: Preview of upcoming sessions with countdown
- **Time Remaining**: Countdown to current session end
- **Room Directions**: Quick navigation to current session rooms
- **Event Status**: Dynamic status based on CMS-configured dates
- **Timezone Support**: Proper handling of Africa/Nairobi timezone
- **Multi-day Support**: Separate tracking for day 1 and day 2

## 🕒 CMS-Driven Time Management

### Dynamic Event Configuration

All time-related functionality is driven by content stored in Sanity CMS, making the website highly flexible and manageable:

#### Event Dates & Times

- **Event dates** stored in CMS (day 1 and day 2)
- **Session times** with full datetime including timezone
- **Timezone configuration** (Africa/Nairobi) stored in CMS
- **Event status** automatically calculated from current time vs event dates

#### Benefits of CMS-Driven Approach

1. **No Code Deployments**: Change event dates without touching code
2. **Multiple Timezones**: Support for different event locations
3. **Real-time Updates**: Content team can update schedule on-the-fly
4. **Automated Status**: Event status (upcoming/live/ended) calculated automatically
5. **Testing Flexibility**: Easy to test with different dates during development

#### Session Time Management

```typescript
// All session times stored as full datetime objects in Sanity
{
  title: "Building with AI in Africa",
  startTime: "2025-03-15T09:00:00+03:00", // Africa/Nairobi timezone
  endTime: "2025-03-15T09:45:00+03:00",
  eventDay: 1 // Which day of the event
}

// Real-time status calculation
const isSessionLive = (session: Session) => {
  const now = new Date()
  const start = new Date(session.startTime)
  const end = new Date(session.endTime)
  return now >= start && now < end
}

const getTimeUntilSession = (session: Session) => {
  const now = new Date()
  const start = new Date(session.startTime)
  const diff = start.getTime() - now.getTime()

  if (diff <= 0) return "Started"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}
````

#### Visual Time Indicators

- **Live Session Badge**: Red "LIVE" indicator on current sessions
- **Starting Soon**: Orange badge for sessions starting within 15 minutes
- **Time Remaining**: Countdown showing time left in current session
- **Next Up**: Preview of next session with countdown
- **Event Status Banner**: Site-wide banner showing event phase

#### Content Management Workflow

1. **Event Planning**: Set event dates and timezone in CMS
2. **Schedule Upload**: Bulk import sessions with times from spreadsheet
3. **Real-time Updates**: Adjust session times if needed during event
4. **Status Monitoring**: Automatic status updates without code changes

### Color Tokens

```css
:root {
  /* Primary Colors */
  --md-sys-color-primary: #1976d2;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #e3f2fd;

  /* Secondary Colors */
  --md-sys-color-secondary: #ff9800;
  --md-sys-color-on-secondary: #000000;

  /* Surface Colors */
  --md-sys-color-surface: #ffffff;
  --md-sys-color-on-surface: #1c1b1f;
  --md-sys-color-surface-variant: #f5f5f5;

  /* DevFest Brand */
  --devfest-blue: #4285f4;
  --devfest-red: #ea4335;
  --devfest-yellow: #fbbc04;
  --devfest-green: #34a853;
}
```

### Typography Scale

```css
.display-large {
  font-size: 57px;
  line-height: 64px;
}
.display-medium {
  font-size: 45px;
  line-height: 52px;
}
.headline-large {
  font-size: 32px;
  line-height: 40px;
}
.headline-medium {
  font-size: 28px;
  line-height: 36px;
}
.title-large {
  font-size: 22px;
  line-height: 28px;
}
.body-large {
  font-size: 16px;
  line-height: 24px;
}
.body-medium {
  font-size: 14px;
  line-height: 20px;
}
```

## 🛍️ Merch Store Integration

### Header CTA

- **Prominent Button**: "Get DevFest Merch" in header
- **Mobile Optimization**: Accessible hamburger menu item
- **External Link**: Opens in new tab/window

### Homepage Section

- **Featured Products**: T-shirts, hoodies, stickers
- **Visual Showcase**: High-quality product images
- **Quick Links**: Direct product category links

### Implementation

````typescript
### Implementation

```typescript
// Qwik component for merch CTA
import { component$ } from '@builder.io/qwik';

export const MerchCTA = component$(() => {
  return (
    <a
      href="https://store.devfestnairobi.com"
      target="_blank"
      class="bg-devfest-yellow text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
    >
      🛍️ Get Merch
    </a>
  );
});
```;
````

## 📈 Performance Targets

| Metric                       | Target | Strategy                                |
| ---------------------------- | ------ | --------------------------------------- |
| **First Contentful Paint**   | < 1.5s | Critical CSS, optimized fonts           |
| **Largest Contentful Paint** | < 2.5s | Image optimization, code splitting      |
| **Cumulative Layout Shift**  | < 0.1  | Defined image dimensions, stable layout |
| **Time to Interactive**      | < 3.5s | Progressive enhancement, lazy loading   |
| **Lighthouse Score**         | > 95   | Performance best practices              |

## 🌍 Accessibility & Internationalization

### Accessibility Features

- **WCAG 2.1 AA Compliance**: Color contrast, keyboard navigation
- **Screen Reader Support**: Semantic HTML, ARIA labels
- **Focus Management**: Visible focus indicators
- **Alternative Text**: Comprehensive image descriptions

### Internationalization (Future)

- **English Primary**: Main conference language
- **Swahili Support**: Local language option
- **RTL Preparation**: Layout flexibility for future languages

## 🚀 Deployment & DevOps

### Vercel Deployment

```bash
# Automatic deployment on push to main
git push origin main

# Preview deployments for PRs
git push origin feature-branch
```

### Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Feature Flags
NEXT_PUBLIC_ENABLE_LIVE_UPDATES=true
```

## 📊 Analytics & Monitoring

### Google Analytics 4

- **Event Tracking**: Speaker views, schedule interactions
- **Conversion Goals**: Registration clicks, merch store visits
- **User Journey**: Homepage → Speakers → Schedule → Registration

### Performance Monitoring

- **Core Web Vitals**: Real user monitoring
- **Error Tracking**: Sentry integration
- **Uptime Monitoring**: Vercel monitoring

## 🤝 Contributing

### Development Setup

```bash
# Clone the repository
git clone https://github.com/gdgnairobi/devfest-2025.git
cd devfest-2025

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Start Sanity Studio
npm run sanity:dev
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks

### Git Workflow

```bash
# Feature development
git checkout -b feature/speaker-profiles
git commit -m "feat: add speaker profile components"
git push origin feature/speaker-profiles

# Create PR for review
```

## 📦 Commands

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start Qwik development server    |
| `npm run build`        | Build for production             |
| `npm run preview`      | Preview production build locally |
| `npm run lint`         | Run ESLint                       |
| `npm run qwik`         | Run Qwik CLI commands            |
| `npm run sanity:dev`   | Start Sanity Studio              |
| `npm run sanity:build` | Build Sanity Studio              |
| `npm run deploy`       | Deploy to Cloudflare Pages       |

## 🎯 Success Metrics

### Technical KPIs

- **Page Load Speed**: < 2s on 3G
- **Mobile Performance**: 95+ Lighthouse score
- **Accessibility**: WCAG AA compliance
- **SEO Score**: 100/100 Lighthouse SEO

### Business KPIs

- **Registration Conversion**: > 5% homepage → registration
- **Engagement**: > 2 pages per session
- **Mobile Traffic**: > 70% mobile users
- **Return Visitors**: > 30% returning before event

## 🔮 Future Enhancements

### Phase 2 Features

- **PWA Functionality**: Offline schedule access
- **Push Notifications**: Session reminders
- **Social Integration**: Live social media feeds
- **Networking Features**: Attendee connections

### Phase 3 Features

- **Mobile App**: React Native companion app
- **Live Streaming**: Integrated video player
- **Interactive Maps**: Venue navigation
- **Gamification**: Conference badges and points

## 📞 Support & Community

### Technical Support

- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time community support
- **Email**: tech@gdgnairobi.com

### Community

- **GDG Nairobi**: [gdgnairobi.com](https://gdgnairobi.com)
- **Twitter**: [@gdgnairobi](https://twitter.com/gdgnairobi)
- **LinkedIn**: [GDG Nairobi](https://linkedin.com/company/gdg-nairobi)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by GDG Nairobi & the East African tech community**

_Together we grow, together we build! 🌱_
