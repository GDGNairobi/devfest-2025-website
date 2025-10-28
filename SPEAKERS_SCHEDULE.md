# Speakers & Schedule Pages

Two new dynamic pages have been added to showcase DevFest Nairobi 2025 content!

## 🎤 Speakers Page (`/speakers`)

### Features

- **Stunning Grid Layout**: Responsive 4-column grid (adjusts for mobile/tablet)
- **Search Functionality**: Real-time search by name, title, company, or bio
- **Hover Effects**: Cards scale and reveal overlay effects on hover
- **Social Links**: Twitter, LinkedIn, and GitHub integration
- **Fallback Avatars**: Gradient circles with initials when no photo available
- **Loading States**: Skeleton loaders while data fetches
- **Empty States**: Helpful message when no results found

### Design Elements

- Dark theme with blue/purple gradient background
- Animated background blobs
- Speaker cards with rounded corners and borders
- Photo zoom on hover
- Social icons in card footer
- Truncated bio with line-clamp

## 📅 Schedule Page (`/schedule`)

### Features

- **Day Switcher**: Toggle between Friday (Oct 31) and Saturday (Nov 1)
- **Track Filtering**: Filter by All Sessions, Main Stage, or specific tracks (AI/ML, Cloud, Android)
- **Timeline View**: Vertical timeline with connecting line
- **Session Cards**: Rich cards with all session details
- **Type Badges**: Color-coded badges for session types (keynote, codelab, panel, etc.)
- **Speaker Info**: Inline speaker cards with photos
- **Duration Bars**: Visual progress bars showing session length
- **Keynote Highlighting**: Special yellow styling for keynote sessions
- **Break Sessions**: Dimmed styling for breaks/transitions
- **Responsive Design**: Mobile-optimized timeline

### Session Types & Colors

- **Keynote**: Yellow/Orange (⭐ starred)
- **Codelab**: Blue/Cyan
- **Workshop**: Green/Emerald
- **Panel**: Purple/Pink
- **Fireside**: Orange/Red
- **Talk**: Indigo/Blue

### Track Colors

- **AI/ML**: Purple (🤖)
- **Cloud Stage**: Blue (☁️)
- **Android Stage**: Green (📱)
- **Main Stage**: Yellow (🎤)

## 📊 Data Integration

Both pages automatically fetch data from Sanity CMS:

```typescript
// Speakers page
const speakers = await getSpeakers();

// Schedule page
const sessions = await getSessions();
const tracks = await getTracks();
```

## 🎨 Design Philosophy

1. **Dark Theme**: Slate/black backgrounds with vibrant accents
2. **Gradients**: Linear gradients throughout for visual interest
3. **Animations**: Subtle hover effects and transitions
4. **Accessibility**: Proper semantic HTML and ARIA labels
5. **Performance**: Loading states and optimized images
6. **Mobile-First**: Responsive at all breakpoints

## 🚀 Navigation

Both pages are already integrated into the main navigation:

- Desktop: Top navbar links
- Mobile: Hamburger menu

## 📱 Responsive Breakpoints

- **Mobile**: Single column, stacked elements
- **Tablet** (md): 2-column grid, adjusted timeline
- **Desktop** (lg): 3-column grid, full timeline with time badges
- **XL** (xl): 4-column speaker grid

## 🎯 Interactive Elements

### Speakers Page

- Search input with live filtering
- Hover effects on cards
- Clickable social links (open in new tab)

### Schedule Page

- Day toggle buttons
- Track filter pills
- Timeline dots
- Expandable session details
- Duration visualization

## 🌟 Key Features

1. **Real-time Search** on speakers page
2. **Multi-track Support** with color coding
3. **Timeline Visualization** with connecting line
4. **Type System** for sessions (11 types)
5. **Speaker References** in sessions
6. **Responsive Images** with fallbacks
7. **Loading States** for better UX
8. **Empty States** when no data

Enjoy your beautiful new pages! 🎉
