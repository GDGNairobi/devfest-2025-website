# Sanity Schema Definitions for DevFest Nairobi 2025

This directory contains the schema definitions for the Sanity CMS integration.

## Setup Instructions

1. Create a Sanity project:

   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

2. Add the following schemas to your Sanity Studio:

### Sponsor Schema

```javascript
export default {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "website",
      title: "Website URL",
      type: "url",
    },
    {
      name: "tier",
      title: "Sponsorship Tier",
      type: "string",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
          { title: "Community", value: "community" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
```

### Organizer Schema

```javascript
export default {
  name: "organizer",
  title: "Organizer",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
    },
    {
      name: "twitter",
      title: "Twitter Handle",
      type: "string",
    },
    {
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub Username",
      type: "string",
    },
  ],
};
```

### Venue Location Schema

```javascript
export default {
  name: "venueLocation",
  title: "Venue Location",
  type: "document",
  fields: [
    {
      name: "day",
      title: "Event Day",
      type: "number",
      options: {
        list: [
          { title: "Day 1", value: 1 },
          { title: "Day 2", value: 2 },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "venueName",
      title: "Venue Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "directions",
      title: "Directions",
      type: "text",
      rows: 4,
    },
    {
      name: "parkingInfo",
      title: "Parking Information",
      type: "text",
      rows: 3,
    },
  ],
};
```

## Environment Variables

Add these to your `.env` file:

```env
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
```
