# Schedule Seeding Script

This script imports the DevFest Nairobi 2025 schedule data from CSV files into Sanity CMS.

## Prerequisites

1. **Sanity Project Setup**: Ensure you have a Sanity project configured with the required schemas:
   - `speaker`
   - `track`
   - `session`
   - `eventInfo`

   See `/src/sanity/schemas.md` for the complete schema definitions.

2. **Environment Variables**: Create a `.env` file with the following:

   ```bash
   PUBLIC_SANITY_PROJECT_ID=your-project-id
   PUBLIC_SANITY_DATASET=production
   SANITY_WRITE_TOKEN=your-write-token
   ```

   Generate a write token with Editor or Admin permissions at:
   https://www.sanity.io/manage/project/YOUR_PROJECT_ID/api#tokens

3. **CSV Files**: The script expects CSV files at:
   - `data/friday-schedule.csv` (October 31st)
   - `data/saturday-schedule.csv` (November 1st)

## Running the Script

```bash
pnpm seed:schedule
```

## What It Does

The script performs the following operations:

1. **Parses CSV files** for both Friday and Saturday schedules
2. **Extracts unique speakers** from the Speakers column and creates speaker documents
3. **Extracts unique tracks** from the Where? column (AI/ML, Cloud Stage, Android Stage)
4. **Creates session documents** with:
   - Proper time parsing (12-hour to 24-hour format)
   - Activity type mapping (codelab, keynote, fireside, panel, etc.)
   - Speaker and track references
   - Break and keynote flags
   - Day assignment (1 for Friday, 2 for Saturday)
5. **Creates event info** document with event metadata and statistics

## CSV Format

Expected columns:

- **Activity**: Session title (e.g., "Hands-On Codelab", "Technical Keynote")
- **Details**: Session description
- **Speakers**: Speaker names (newline or comma separated, with optional roles in parentheses)
- **Duration**: Duration in minutes
- **Time**: Time range (e.g., "9:00 - 9:30 am")
- **Content Track/Theme**: Optional theme tags
- **Where?**: Track name (AI/ML, Cloud Stage, Android Stage, Main Stage, etc.)

## Activity Type Mapping

The script maps CSV activities to session types:

- Codelab → `codelab`
- Keynote → `keynote`
- Fireside Chat → `fireside`
- Panel → `panel`
- Lunch → `lunch`
- Registration → `registration`
- Networking → `networking`
- Ice Breaker → `icebreaker`
- Transition → `break`
- Default → `talk`

## Track Color Assignment

- AI/ML tracks → Purple
- Cloud tracks → Blue
- Android tracks → Green
- Other tracks → Orange

## Output

The script will:

- Create/update all speaker documents
- Create/update all track documents
- Create/update all session documents
- Create/update the event info document
- Log progress and any errors to the console

## Troubleshooting

**Error: "SANITY_WRITE_TOKEN is required"**

- Ensure you've added `SANITY_WRITE_TOKEN` to your `.env` file

**Error: "CSV file not found"**

- Verify CSV files exist in the `data/` directory
- Check file names match: `friday-schedule.csv` and `saturday-schedule.csv`

**Error: "Failed to create document"**

- Check your Sanity project has all required schemas installed
- Verify your write token has sufficient permissions
- Check the Sanity dashboard for validation errors
