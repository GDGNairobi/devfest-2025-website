import { createClient } from "@sanity/client";
import { parse } from "csv-parse/sync";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables
config();

// Validate environment variables
if (!process.env.PUBLIC_SANITY_PROJECT_ID) {
  console.error("❌ Error: PUBLIC_SANITY_PROJECT_ID is required in .env file");
  process.exit(1);
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error("❌ Error: SANITY_WRITE_TOKEN is required in .env file");
  console.error(
    "Generate a token at: https://www.sanity.io/manage/project/" +
      process.env.PUBLIC_SANITY_PROJECT_ID +
      "/api#tokens",
  );
  process.exit(1);
}

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN, // You'll need a write token
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface CSVRow {
  Activity: string;
  Details: string;
  Speakers: string;
  Duration: string;
  Time: string;
  "Content Track/Theme": string;
  "Where?": string;
}

interface Speaker {
  name: string;
  title?: string;
  company?: string;
}

// Map activity types to session types
function mapActivityToSessionType(activity: string): string {
  const activityLower = activity.toLowerCase();

  if (activityLower.includes("codelab")) return "codelab";
  if (activityLower.includes("keynote")) return "keynote";
  if (activityLower.includes("fireside")) return "fireside";
  if (activityLower.includes("panel")) return "panel";
  if (activityLower.includes("showcase")) return "talk";
  if (activityLower.includes("ama")) return "panel";
  if (activityLower.includes("lunch")) return "lunch";
  if (activityLower.includes("registration")) return "registration";
  if (activityLower.includes("networking")) return "networking";
  if (activityLower.includes("ice breaker")) return "icebreaker";
  if (activityLower.includes("transition")) return "break";
  if (activityLower.includes("battle")) return "talk";

  return "talk";
}

// Parse speakers from CSV format
function parseSpeakers(speakersText: string): Speaker[] {
  if (!speakersText || speakersText.trim() === "") return [];

  const speakers: Speaker[] = [];
  const lines = speakersText.split("\n").filter((line) => line.trim());

  for (const line of lines) {
    const cleaned = line.trim();
    if (!cleaned || cleaned === "None" || cleaned.startsWith("Other")) continue;

    // Extract name and role
    const match = cleaned.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (match) {
      const name = match[1].trim();
      const role = match[2].trim();
      speakers.push({
        name,
        title:
          role.includes("Organizer") || role.includes("Host")
            ? role
            : undefined,
      });
    } else if (cleaned) {
      speakers.push({ name: cleaned });
    }
  }

  return speakers;
}

// Parse time range to get start and end times
function parseTime(
  timeStr: string,
): { startTime: string; endTime: string } | null {
  if (!timeStr || timeStr.trim() === "") return null;

  // Try format: "8:00 am - 9:00 pm" (both have am/pm)
  let match = timeStr.match(
    /(\d{1,2}):(\d{2})\s*(am|pm)\s*-\s*(\d{1,2}):(\d{2})\s*(am|pm)/i,
  );

  // Try format: "8:00 - 9:00 am" (only end has am/pm)
  if (!match) {
    match = timeStr.match(
      /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*(am|pm)/i,
    );
    if (match) {
      // Adjust match array to match the expected format
      // [full, startHour, startMin, endHour, endMin, period]
      const period = match[5].toLowerCase();
      return {
        startTime: `${parseInt(match[1]).toString().padStart(2, "0")}:${match[2]}`,
        endTime: `${(period === "pm" && parseInt(match[3]) !== 12 ? parseInt(match[3]) + 12 : parseInt(match[3])).toString().padStart(2, "0")}:${match[4]}`,
      };
    }
    return null;
  }

  let startHour = parseInt(match[1]);
  const startMin = match[2];
  const startPeriod = match[3].toLowerCase();

  let endHour = parseInt(match[4]);
  const endMin = match[5];
  const endPeriod = match[6].toLowerCase();

  // Convert to 24-hour format
  if (startPeriod === "pm" && startHour !== 12) startHour += 12;
  if (startPeriod === "am" && startHour === 12) startHour = 0;

  if (endPeriod === "pm" && endHour !== 12) endHour += 12;
  if (endPeriod === "am" && endHour === 12) endHour = 0;

  return {
    startTime: `${startHour.toString().padStart(2, "0")}:${startMin}`,
    endTime: `${endHour.toString().padStart(2, "0")}:${endMin}`,
  };
}

// Extract unique tracks
function extractTracks(rows: CSVRow[]): Set<string> {
  const tracks = new Set<string>();

  for (const row of rows) {
    const where = row["Where?"]?.trim();
    if (
      where &&
      where !== "Main Stage" &&
      where !== "Main stage" &&
      where !== "Sundar Video" &&
      where !== ""
    ) {
      tracks.add(where);
    }
  }

  return tracks;
}

// Create slug from name
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Get track color based on name
function getTrackColor(trackName: string): string {
  const name = trackName.toLowerCase();
  if (name.includes("ai") || name.includes("ml")) return "purple";
  if (name.includes("cloud")) return "blue";
  if (name.includes("android")) return "green";
  return "orange";
}

// Get track icon
function getTrackIcon(trackName: string): string {
  const name = trackName.toLowerCase();
  if (name.includes("ai") || name.includes("ml")) return "🤖";
  if (name.includes("cloud")) return "☁️";
  if (name.includes("android")) return "📱";
  return "💻";
}

async function seedSchedule() {
  console.log("🌱 Starting schedule seeding...\n");

  try {
    // Read CSV files
    const fridayPath = join(process.cwd(), "data", "friday-schedule.csv");
    const saturdayPath = join(process.cwd(), "data", "saturday-schedule.csv");

    const fridayContent = readFileSync(fridayPath, "utf-8");
    const saturdayContent = readFileSync(saturdayPath, "utf-8");

    const fridayRows: CSVRow[] = parse(fridayContent, {
      columns: true,
      skip_empty_lines: true,
    });
    const saturdayRows: CSVRow[] = parse(saturdayContent, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log(`📄 Loaded ${fridayRows.length} Friday sessions`);
    console.log(`📄 Loaded ${saturdayRows.length} Saturday sessions\n`);

    // Extract unique speakers
    const allSpeakers = new Map<string, Speaker>();

    for (const row of [...fridayRows, ...saturdayRows]) {
      const speakers = parseSpeakers(row.Speakers);
      for (const speaker of speakers) {
        if (!allSpeakers.has(speaker.name)) {
          allSpeakers.set(speaker.name, speaker);
        }
      }
    }

    console.log(`👥 Found ${allSpeakers.size} unique speakers\n`);

    // Extract unique tracks
    const trackNames = extractTracks([...fridayRows, ...saturdayRows]);
    console.log(
      `🎯 Found ${trackNames.size} tracks: ${Array.from(trackNames).join(", ")}\n`,
    );

    // Create speaker documents
    console.log("Creating speaker documents...");
    const speakerIdMap = new Map<string, string>();

    for (const [name, speaker] of allSpeakers) {
      const speakerId = `speaker-${slugify(name)}`;

      try {
        await sanityClient.createOrReplace({
          _id: speakerId,
          _type: "speaker",
          name: speaker.name,
          title: speaker.title || "",
          company: speaker.company || "",
          bio: "",
        });

        speakerIdMap.set(name, speakerId);
        console.log(`  ✓ Created speaker: ${name}`);
      } catch (error) {
        console.error(`  ✗ Failed to create speaker ${name}:`, error);
      }
    }

    console.log("");

    // Create track documents
    console.log("Creating track documents...");
    const trackIdMap = new Map<string, string>();

    for (const trackName of trackNames) {
      const trackSlug = slugify(trackName);
      const trackId = `track-${trackSlug}`;

      try {
        await sanityClient.createOrReplace({
          _id: trackId,
          _type: "track",
          name: trackName,
          slug: trackSlug,
          color: getTrackColor(trackName),
          icon: getTrackIcon(trackName),
          description: `Sessions focused on ${trackName}`,
        });

        trackIdMap.set(trackName, trackId);
        console.log(`  ✓ Created track: ${trackName}`);
      } catch (error) {
        console.error(`  ✗ Failed to create track ${trackName}:`, error);
      }
    }

    console.log("");

    // Create session documents
    console.log("Creating session documents...\n");

    async function processSessions(rows: CSVRow[], day: 1 | 2) {
      const dayName = day === 1 ? "Friday" : "Saturday";
      console.log(`Processing ${dayName} sessions...`);

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const times = parseTime(row.Time);

        if (!times || !row.Activity) continue;

        const sessionType = mapActivityToSessionType(row.Activity);
        const speakers = parseSpeakers(row.Speakers);
        const trackName = row["Where?"]?.trim();
        const isBreak = sessionType === "break";
        const isKeynote = sessionType === "keynote";

        // Get track reference
        let trackRef = null;
        if (trackName && trackIdMap.has(trackName)) {
          trackRef = {
            _type: "reference",
            _ref: trackIdMap.get(trackName)!,
          };
        }

        // Get speaker references
        const speakerRefs = speakers
          .map((s) => speakerIdMap.get(s.name))
          .filter(Boolean)
          .map((id) => ({
            _type: "reference",
            _ref: id!,
            _key: id!,
          }));

        const sessionId = `session-day${day}-${slugify(row.Activity)}-${i}`;

        try {
          await sanityClient.createOrReplace({
            _id: sessionId,
            _type: "session",
            title: row.Activity,
            description: row.Details || "",
            type: sessionType,
            day,
            startTime: times.startTime,
            endTime: times.endTime,
            duration: parseInt(row.Duration) || 0,
            track: trackRef,
            speakers: speakerRefs,
            isBreak,
            isKeynote,
            level: sessionType === "codelab" ? "intermediate" : undefined,
            tags: row["Content Track/Theme"]
              ? [row["Content Track/Theme"]]
              : [],
          });

          console.log(`  ✓ ${times.startTime} - ${row.Activity}`);
        } catch (error) {
          console.error(`  ✗ Failed to create session ${row.Activity}:`, error);
        }
      }

      console.log("");
    }

    await processSessions(fridayRows, 1);
    await processSessions(saturdayRows, 2);

    // Create event info
    console.log("Creating event info...");
    try {
      await sanityClient.createOrReplace({
        _id: "event-info",
        _type: "eventInfo",
        eventName: "DevFest Nairobi 2025",
        tagline: "Building the Future with Google Technologies",
        description:
          "Join us for two days of learning, networking, and innovation at East Africa's premier Google Developer Festival.",
        startDate: "2025-10-31",
        endDate: "2025-11-01",
        year: 2025,
        stats: [
          { label: "Speakers", value: allSpeakers.size.toString() },
          {
            label: "Sessions",
            value: (fridayRows.length + saturdayRows.length).toString(),
          },
          { label: "Tracks", value: trackNames.size.toString() },
          { label: "Days", value: "2" },
        ],
        themeTags: Array.from(trackNames),
      });

      console.log("  ✓ Created event info\n");
    } catch (error) {
      console.error("  ✗ Failed to create event info:", error);
    }

    console.log("✅ Schedule seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seeding
seedSchedule();
