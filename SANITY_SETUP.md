# Sanity Setup Complete! 🎉

Your DevFest Nairobi 2025 Sanity project has been successfully created and configured.

## Project Details

- **Project ID**: `5gw7tzl4`
- **Project Name**: DevFest Nairobi 2025
- **Dataset**: `production`
- **Studio URL**: http://localhost:3333

## What's Been Set Up

### ✅ Sanity Schemas Created

All 7 schemas have been added to your Sanity Studio:

1. **Speaker** - Speaker profiles with photos, bios, and social links
2. **Track** - Event tracks (AI/ML, Cloud, Android) with colors and icons
3. **Session** - Sessions with times, speakers, tracks, and types
4. **Event Info** - Main event information and statistics
5. **Sponsor** - Sponsor companies with logos and tiers
6. **Organizer** - Event organizers with photos and roles
7. **Venue Location** - Venue details with maps for both days

### ✅ Environment Configuration

Your `.env` file has been created with:

```
PUBLIC_SANITY_PROJECT_ID=5gw7tzl4
PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=
```

## Next Steps

### 1. Generate a Write Token

You need a write token to run the seeding script:

1. The Sanity management page should be open in your browser, or visit:
   https://www.sanity.io/manage/project/5gw7tzl4/api#tokens

2. Click **"Add API Token"**
3. Name it: `DevFest Seeding Token`
4. Permissions: Select **"Editor"** or **"Admin"**
5. Click **"Add Token"**
6. Copy the generated token
7. Add it to your `.env` file:
   ```
   SANITY_WRITE_TOKEN=your-token-here
   ```

### 2. Explore Sanity Studio

Sanity Studio is running at: **http://localhost:3333**

You can now:

- View all your schema types in the left sidebar
- Manually create test documents
- Explore the Vision tool for testing GROQ queries

### 3. Run the Seeding Script

Once you've added the `SANITY_WRITE_TOKEN` to your `.env` file:

```bash
pnpm seed:schedule
```

This will import:

- All speakers from both days (~40+ speakers)
- 3 tracks (AI/ML, Cloud Stage, Android Stage)
- All Friday sessions (Day 1 - October 31st)
- All Saturday sessions (Day 2 - November 1st)
- Event information with statistics

### 4. Start Your Qwik App

In a separate terminal:

```bash
npm run dev
```

Your Qwik app will connect to Sanity and fetch the seeded data!

## File Structure

```
devfest-nairobi-2025/
├── .env                          # Environment variables
├── data/
│   ├── friday-schedule.csv       # Friday schedule data
│   └── saturday-schedule.csv     # Saturday schedule data
├── scripts/
│   ├── seed-schedule.ts          # Seeding script
│   └── README.md                 # Seeding documentation
├── sanity-studio/                # Sanity Studio
│   ├── schemaTypes/              # Schema definitions
│   │   ├── speaker.ts
│   │   ├── track.ts
│   │   ├── session.ts
│   │   ├── eventInfo.ts
│   │   ├── sponsor.ts
│   │   ├── organizer.ts
│   │   └── venueLocation.ts
│   └── sanity.config.ts          # Sanity configuration
└── src/
    └── lib/
        └── sanity.ts             # Sanity client & fetch functions
```

## Useful Commands

```bash
# Start Sanity Studio
cd sanity-studio && pnpm dev

# Seed schedule data
pnpm seed:schedule

# Start Qwik development server
npm run dev

# Open Sanity management dashboard
cd sanity-studio && npx sanity manage

# Deploy Sanity Studio
cd sanity-studio && npx sanity deploy
```

## Resources

- **Sanity Studio**: http://localhost:3333
- **Sanity Dashboard**: https://www.sanity.io/manage/project/5gw7tzl4
- **API Tokens**: https://www.sanity.io/manage/project/5gw7tzl4/api#tokens
- **Sanity Documentation**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet

## Troubleshooting

**Issue**: Seeding fails with "SANITY_WRITE_TOKEN is required"

- **Solution**: Generate a token and add it to your `.env` file

**Issue**: TypeScript errors in schema files

- **Solution**: These are cosmetic linting warnings and won't affect functionality. You can add `// eslint-disable-next-line @typescript-eslint/no-explicit-any` above validation rules if needed.

**Issue**: Sanity Studio won't start

- **Solution**: Make sure you're in the `sanity-studio` directory: `cd sanity-studio && pnpm dev`

**Issue**: Frontend can't fetch data

- **Solution**: Verify your `.env` file has the correct `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`

---

Happy coding! 🚀
