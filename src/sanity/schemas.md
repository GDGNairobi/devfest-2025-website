# Complete Sanity Schema Definitions for DevFest Nairobi 2025

## Setup Instructions

1. Install Sanity CLI and initialize:

   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

2. Add all schemas below to your Sanity Studio

---

## 1. Speaker Schema

```javascript
export default {
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
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
    },
    {
      name: "title",
      title: "Job Title",
      type: "string",
    },
    {
      name: "company",
      title: "Company/Organization",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
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
    {
      name: "website",
      title: "Personal Website",
      type: "url",
    },
  ],
};
```

---

## 2. Track Schema

```javascript
export default {
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Track Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., AI/ML, Cloud Stage, Android Stage, Main Stage",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "color",
      title: "Track Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Red", value: "red" },
          { title: "Orange", value: "orange" },
          { title: "Purple", value: "purple" },
          { title: "Cyan", value: "cyan" },
        ],
      },
    },
    {
      name: "icon",
      title: "Track Icon (Emoji)",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
  ],
};
```

---

## 3. Session Schema

```javascript
export default {
  name: "session",
  title: "Session",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Session Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "type",
      title: "Session Type",
      type: "string",
      options: {
        list: [
          { title: "Keynote", value: "keynote" },
          { title: "Talk", value: "talk" },
          { title: "Workshop", value: "workshop" },
          { title: "Hands-On Codelab", value: "codelab" },
          { title: "Panel Discussion", value: "panel" },
          { title: "Fireside Chat", value: "fireside" },
          { title: "Break", value: "break" },
          { title: "Lunch", value: "lunch" },
          { title: "Registration", value: "registration" },
          { title: "Networking", value: "networking" },
          { title: "Ice Breaker", value: "icebreaker" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "day",
      title: "Event Day",
      type: "number",
      options: {
        list: [
          { title: "Day 1 (Saturday)", value: 1 },
          { title: "Day 2 (Sunday)", value: 2 },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startTime",
      title: "Start Time",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Format: HH:mm (24-hour format, e.g., 09:00)",
    },
    {
      name: "endTime",
      title: "End Time",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Format: HH:mm (24-hour format, e.g., 10:30)",
    },
    {
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
    },
    {
      name: "track",
      title: "Track/Stage",
      type: "reference",
      to: [{ type: "track" }],
      description: "Leave empty for sessions that span all tracks",
    },
    {
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "speaker" }],
        },
      ],
    },
    {
      name: "isBreak",
      title: "Is Break/Non-session",
      type: "boolean",
      description: "Check this for breaks, lunch, networking, etc.",
      initialValue: false,
    },
    {
      name: "isKeynote",
      title: "Is Keynote/Main Stage",
      type: "boolean",
      description: "Check this for keynotes and main stage sessions",
      initialValue: false,
    },
    {
      name: "level",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "All Levels", value: "all" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "resources",
      title: "Session Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Resource Title" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      time: "startTime",
      track: "track.name",
      day: "day",
    },
    prepare(selection) {
      const { title, time, track, day } = selection;
      return {
        title: title,
        subtitle: `Day ${day} - ${time} ${track ? `@ ${track}` : ""}`,
      };
    },
  },
};
```

---

## 4. Event Info Schema

```javascript
export default {
  name: "eventInfo",
  title: "Event Information",
  type: "document",
  fields: [
    {
      name: "eventName",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "stats",
      title: "Event Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
            { name: "color", type: "string", title: "Color Class" },
          ],
        },
      ],
    },
    {
      name: "themeTags",
      title: "Theme Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Main themes/topics for the event",
    },
  ],
};
```

---

## 5. Sponsor Schema (Already exists, kept for reference)

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

---

## 6. Organizer Schema (Already exists, kept for reference)

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

---

## 7. Venue Location Schema (Already exists, kept for reference)

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
