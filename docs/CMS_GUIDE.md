# Sanity CMS Guide

## Access

**Local**: `cd sanity-studio && pnpm run dev` → http://localhost:3333

**Production**: Your deployed Sanity Studio URL

## Content Types

### Speakers

Add speaker profiles with:
- Name, bio, photo (800x800px recommended)
- Company, job title
- Social links (Twitter, LinkedIn, GitHub)
- Mark keynote speakers with checkbox

### Sessions

Create sessions with:
- Title, description
- Start/end time (use timezone picker - Africa/Nairobi)
- Type: Talk | Workshop | Panel | Keynote
- Track and speakers
- Difficulty level: Beginner | Intermediate | Advanced

### Tracks

Conference themes like "AI & ML", "Web", "Mobile"
- Add name, description, color
- Use emoji icon for visual appeal

### Sponsors

Company logos and info:
- Logo (SVG preferred, min 400x400px)
- Tier: Platinum | Gold | Silver | Community
- Website URL

### Event Info

Global event settings (only ONE should exist):
- Event dates and venue
- Timezone: Africa/Nairobi
- Status: upcoming | live | ended

## Quick Workflows

**Add Speaker:**
1. Go to Speakers → Create
2. Upload photo, write bio
3. Add social links
4. Publish

**Create Session:**
1. Go to Sessions → Create
2. Fill title, description
3. Set times (double-check timezone!)
4. Select speakers and track
5. Publish

**Update Schedule:**
1. Find session
2. Edit start/end time
3. Publish (changes appear immediately)

## Tips

- **Images**: Optimize before upload (use TinyPNG)
- **Times**: Always use timezone picker
- **Drafts**: Save as draft, review, then publish
- **Slugs**: Auto-generated from titles

## Bulk Import

Import sessions from CSV:

```bash
pnpm run seed:schedule
```

## Troubleshooting

**Images not showing?**
- Check file size < 10MB
- Verify image is published
- Clear browser cache

**Schedule not updating?**
- Verify session is published
- Wait 1-2 minutes for cache
- Hard refresh browser

Need help? Check [Sanity Docs](https://www.sanity.io/docs) or ask in #website-help
