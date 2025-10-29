# Sanity CMS Guide

## Overview

DevFest Nairobi 2025 uses Sanity.io as its headless CMS for managing all event content. This guide covers content management workflows, schema documentation, and best practices.

## Access

### Sanity Studio Access

**Local Development**:

```bash
cd sanity-studio
pnpm install
pnpm run dev
```

Studio will be available at: `http://localhost:3333`

**Production Studio**:
Visit your deployed Sanity Studio URL (configured during setup)

### User Roles

| Role              | Permissions                             | Who Gets This          |
| ----------------- | --------------------------------------- | ---------------------- |
| **Administrator** | Full access to all content and settings | GDG Nairobi organizers |
| **Editor**        | Create, edit, publish content           | Content team           |
| **Reviewer**      | View and comment only                   | Reviewers, volunteers  |

## Content Types

### 1. Event Info

Global event configuration and settings.

**Fields**:

- **Event Name**: DevFest Nairobi 2025
- **Dates**: Event start and end dates
- **Venue**: Location details with map coordinates
- **Timezone**: Africa/Nairobi
- **Status**: upcoming | live | ended
- **Registration URL**: Link to RSVP page
- **Live Stream URL**: Optional live stream link

**Usage**:

- Only ONE event info document should exist
- Update dates/status as event approaches
- Live status controls real-time features on site

### 2. Speakers

Individual speaker profiles.

**Required Fields**:

- **Name**: Speaker's full name
- **Slug**: URL-friendly identifier (auto-generated)
- **Bio**: Speaker biography (rich text, 2-3 paragraphs)
- **Photo**: Profile photo (recommended: 800x800px, square)
- **Company**: Current employer
- **Job Title**: Current position

**Optional Fields**:

- **Twitter**: Handle (without @)
- **LinkedIn**: Profile URL
- **GitHub**: Username
- **Website**: Personal website
- **Country**: Speaker's country
- **Is Keynote**: Highlight as keynote speaker

**Best Practices**:

- Use high-quality, professional photos
- Keep bios concise but informative
- Include social links for networking
- Mark keynote speakers appropriately

### 3. Sessions

Conference talks, workshops, and panels.

**Required Fields**:

- **Title**: Session title
- **Slug**: URL-friendly identifier
- **Description**: Detailed session description (rich text)
- **Start Time**: Date and time (includes timezone)
- **End Time**: Date and time
- **Type**: Talk | Workshop | Panel | Keynote | Break
- **Track**: Reference to track document
- **Speakers**: Array of speaker references

**Optional Fields**:

- **Level**: Beginner | Intermediate | Advanced
- **Tags**: Array of topic tags
- **Room**: Venue room/stage name
- **Capacity**: Max attendees (for workshops)
- **Prerequisites**: Required knowledge/tools

**Best Practices**:

- Use descriptive titles (50-70 characters)
- Include learning outcomes in description
- Set accurate start/end times
- Assign appropriate difficulty level
- Tag sessions for better discoverability

### 4. Tracks

Conference tracks/themes.

**Fields**:

- **Name**: Track name (e.g., "AI & ML", "Web", "Mobile")
- **Slug**: URL-friendly identifier
- **Description**: Track overview
- **Color**: Brand color for visual distinction
- **Icon**: Optional emoji or icon
- **Order**: Display order (lower numbers first)

**Example Tracks**:

- AI & Machine Learning 🤖
- Web Development 🌐
- Mobile Development 📱
- Cloud & DevOps ☁️
- Community & Career 🚀

### 5. Sponsors

Event sponsors and partners.

**Required Fields**:

- **Name**: Company name
- **Logo**: Company logo (SVG preferred, PNG fallback)
- **Website**: Company website URL
- **Tier**: Platinum | Gold | Silver | Bronze | Community

**Optional Fields**:

- **Description**: Company description
- **Social Links**: Twitter, LinkedIn, etc.
- **Featured**: Highlight on homepage
- **Perks**: What they're offering (e.g., swag, hiring)

**Logo Guidelines**:

- Format: SVG (vector) or PNG with transparency
- Size: Minimum 400x400px
- Style: Use official brand logo
- Background: Transparent preferred

### 6. Organizers

GDG Nairobi team members.

**Fields**:

- **Name**: Organizer name
- **Role**: Title/position (e.g., "Lead Organizer")
- **Photo**: Profile photo (recommended: 400x400px)
- **Bio**: Short bio (1-2 sentences)
- **Twitter**: Handle (without @)
- **LinkedIn**: Profile URL
- **Order**: Display order

### 7. Venue Location

Event venue details.

**Fields**:

- **Name**: Venue name
- **Address**: Full address
- **City**: Nairobi
- **Country**: Kenya
- **Coordinates**: Latitude/Longitude (for maps)
- **Directions**: How to get there
- **Parking**: Parking information
- **Accessibility**: Accessibility features
- **Day**: Which event day (1 or 2)

## Content Workflows

### Adding a New Speaker

1. **Navigate**: Go to "Speakers" in Sanity Studio
2. **Create**: Click "Create new Speaker"
3. **Fill Details**:
   - Enter name (slug auto-generates)
   - Upload photo (drag & drop)
   - Write bio (2-3 paragraphs)
   - Add company and job title
   - Include social links
4. **Review**: Preview in studio
5. **Publish**: Click "Publish" button

### Creating a Session

1. **Navigate**: Go to "Sessions"
2. **Create**: Click "Create new Session"
3. **Details**:
   - Enter title and description
   - Select type (Talk, Workshop, etc.)
   - Choose track
   - Set start/end times (use timezone picker!)
   - Add speakers (select from existing)
   - Set difficulty level
   - Add relevant tags
4. **Verify**: Double-check times
5. **Publish**: Click "Publish"

### Updating Schedule

**For Minor Changes**:

1. Find session in Sessions list
2. Edit start/end time
3. Publish changes
4. Changes appear on site immediately

**For Major Changes**:

1. Consider using "Drafts" first
2. Review all affected sessions
3. Publish all changes together
4. Verify on preview URL

### Managing Sponsors

**Adding New Sponsor**:

1. Go to "Sponsors"
2. Create new sponsor
3. Upload logo (check guidelines!)
4. Set tier (Platinum, Gold, etc.)
5. Add website URL
6. Enable "Featured" if homepage highlight
7. Publish

**Reordering Sponsors**:

- Within each tier, drag to reorder
- Or use "Order" field for explicit ordering

## Best Practices

### Content Quality

**Writing Guidelines**:

- Use clear, concise language
- Avoid jargon when possible
- Proofread before publishing
- Use active voice
- Keep paragraphs short (3-4 lines)

**Image Guidelines**:

- **Format**: WebP, PNG, or JPG
- **Size**: Optimize before upload (use TinyPNG)
- **Dimensions**: Follow recommended sizes
- **Alt Text**: Always provide descriptive alt text
- **Naming**: Use descriptive filenames

### Scheduling Best Practices

**Timing**:

- Include 10-15 minute breaks between sessions
- Allow 45-60 minutes for lunch
- Schedule popular talks in larger rooms
- Avoid parallel tracks for keynotes

**Time Zones**:

- Always use Africa/Nairobi timezone
- Double-check AM/PM when entering times
- Consider international attendee timezones in descriptions

### SEO Optimization

**Titles**:

- Front-load important keywords
- Keep under 60 characters
- Make them compelling and descriptive

**Descriptions**:

- First 150 characters are most important
- Include relevant keywords naturally
- Write for humans, not just search engines

**Slugs**:

- Use hyphens, not underscores
- Keep short but descriptive
- Include primary keyword when relevant

## Rich Text Editing

### Formatting Options

Sanity's rich text editor (Portable Text) supports:

- **Headings**: H2, H3, H4 (H1 reserved for page titles)
- **Emphasis**: Bold, italic
- **Lists**: Bullet points, numbered lists
- **Links**: External and internal links
- **Blocks**: Quote blocks, code blocks

### Link Best Practices

```
[Link Text](https://example.com)
```

- Use descriptive link text
- Avoid "click here" or "learn more"
- Check links work before publishing
- Use HTTPS for all links

## Publishing Workflow

### Draft → Review → Publish

1. **Draft**: Create content, save as draft
2. **Review**: Share draft link with team
3. **Feedback**: Make revisions
4. **Publish**: Final review, then publish

### Scheduling Content

**For Future Sessions**:

- Create session with future dates
- Publish immediately
- Site will show "Coming Soon" automatically

**For Announcements**:

- Use draft mode until ready
- Publish at announcement time
- Content appears immediately on site

## Troubleshooting

### Common Issues

**Images Not Showing**:

- Check file size (max 10MB)
- Verify image format (JPG, PNG, WebP, SVG)
- Ensure image is published (not just saved)
- Clear browser cache

**Schedule Not Updating**:

- Verify session is published
- Check times are in correct timezone
- Wait 1-2 minutes for CDN cache
- Hard refresh browser (Cmd/Ctrl + Shift + R)

**Slugs Conflicting**:

- Each slug must be unique
- Sanity will warn about duplicates
- Use more specific slugs

### Getting Help

**Documentation**:

- [Sanity.io Docs](https://www.sanity.io/docs)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)

**Support Channels**:

- GDG Nairobi Slack: #website-help
- Email: tech@gdgnairobi.com

## Data Import/Export

### Bulk Import Sessions

Use the provided script for CSV import:

```bash
pnpm run seed:schedule
```

**CSV Format**:

```csv
title,description,startTime,endTime,type,track,speakers
"Session Title","Description",2025-10-31T09:00:00+03:00,2025-10-31T09:45:00+03:00,talk,web,"Speaker Name"
```

### Export Data

```bash
# Export all data
sanity dataset export production backup.tar.gz

# Export specific type
sanity dataset export production backup.tar.gz --types session
```

### Backup Frequency

- **Automatic**: Daily backups by Sanity
- **Manual**: Weekly backups recommended
- **Pre-Event**: Full backup before event day

## Advanced Features

### Validation Rules

Schemas include custom validation:

- Required fields enforced
- Email format validation
- URL format validation
- Date range validation
- String length limits

### References & Relationships

**One-to-Many**:

- Speaker → Multiple Sessions
- Track → Multiple Sessions

**Many-to-Many**:

- Session → Multiple Speakers
- Session → Multiple Tags

### API Access

For developers integrating with Sanity:

```typescript
import { client } from "~/lib/sanity";

// Fetch all published sessions
const sessions = await client.fetch(`
  *[_type == "session" && !(_id in path("drafts.**"))] {
    title,
    slug,
    description,
    startTime,
    endTime,
    speakers[]->{ name, photo }
  }
`);
```

## Security

### Access Control

- Use strong passwords (min 12 characters)
- Enable 2FA for all admin users
- Review user permissions regularly
- Revoke access for departed team members

### Content Moderation

- Review all content before publishing
- Monitor for inappropriate content
- Have clear content guidelines
- Designate content moderators

### API Token Security

- Never commit tokens to git
- Rotate tokens every 90 days
- Use read-only tokens when possible
- Limit token scopes appropriately
