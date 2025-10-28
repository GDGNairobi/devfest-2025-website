import { createClient } from "@sanity/client";

// Sanity client configuration
export const sanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Disable CDN to get fresh data (set to true in production after initial seeding)
});

// Types for our Sanity data
export interface Sponsor {
  _id: string;
  name: string;
  logo: {
    asset: {
      url: string;
    };
  };
  website?: string;
  tier: "platinum" | "gold" | "silver" | "bronze" | "community";
}

export interface Organizer {
  _id: string;
  name: string;
  role: string;
  photo: {
    asset: {
      url: string;
    };
  };
  bio?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface VenueLocation {
  _id: string;
  day: 1 | 2;
  venueName: string;
  address: string;
  latitude: number;
  longitude: number;
  mapEmbedUrl: string;
  directions?: string;
  parkingInfo?: string;
}

export interface Speaker {
  _id: string;
  name: string;
  photo?: {
    asset: {
      url: string;
    };
  };
  title?: string;
  company?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Track {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  color?: string;
  icon?: string;
  description?: string;
}

export interface Session {
  _id: string;
  title: string;
  description?: string;
  type:
    | "keynote"
    | "talk"
    | "workshop"
    | "codelab"
    | "panel"
    | "fireside"
    | "break"
    | "lunch"
    | "registration"
    | "networking"
    | "icebreaker";
  day: 1 | 2;
  startTime: string;
  endTime: string;
  duration?: number;
  track?: Track;
  speakers?: Speaker[];
  isBreak?: boolean;
  isKeynote?: boolean;
  level?: "beginner" | "intermediate" | "advanced" | "all";
  tags?: string[];
  resources?: Array<{
    title: string;
    url: string;
  }>;
}

export interface EventInfo {
  _id: string;
  eventName: string;
  tagline?: string;
  description?: string;
  startDate: string;
  endDate: string;
  year: number;
  stats?: Array<{
    label: string;
    value: string;
    color?: string;
  }>;
  themeTags?: string[];
}

// Fetch sponsors
export async function getSponsors(): Promise<Sponsor[]> {
  const query = `*[_type == "sponsor"] | order(tier asc, name asc) {
    _id,
    name,
    logo {
      asset-> {
        url
      }
    },
    website,
    tier
  }`;

  return sanityClient.fetch(query);
}

// Fetch organizers
export async function getOrganizers(): Promise<Organizer[]> {
  const query = `*[_type == "organizer"] | order(name asc) {
    _id,
    name,
    role,
    photo {
      asset-> {
        url
      }
    },
    bio,
    twitter,
    linkedin,
    github
  }`;

  return sanityClient.fetch(query);
}

// Fetch venue locations
export async function getVenueLocations(): Promise<VenueLocation[]> {
  const query = `*[_type == "venueLocation"] | order(day asc) {
    _id,
    day,
    venueName,
    address,
    latitude,
    longitude,
    mapEmbedUrl,
    directions,
    parkingInfo
  }`;

  return sanityClient.fetch(query);
}

// Fetch speakers
export async function getSpeakers(): Promise<Speaker[]> {
  const query = `*[_type == "speaker"] | order(name asc) {
    _id,
    name,
    photo {
      asset-> {
        url
      }
    },
    title,
    company,
    bio,
    twitter,
    linkedin,
    github,
    website
  }`;

  return sanityClient.fetch(query);
}

// Fetch tracks
export async function getTracks(): Promise<Track[]> {
  const query = `*[_type == "track"] | order(name asc) {
    _id,
    name,
    slug,
    color,
    icon,
    description
  }`;

  return sanityClient.fetch(query);
}

// Fetch sessions
export async function getSessions(day?: 1 | 2): Promise<Session[]> {
  const dayFilter = day ? `&& day == ${day}` : "";
  const query = `*[_type == "session" ${dayFilter}] | order(startTime asc) {
    _id,
    title,
    description,
    type,
    day,
    startTime,
    endTime,
    duration,
    track-> {
      _id,
      name,
      slug,
      color,
      icon
    },
    speakers[]-> {
      _id,
      name,
      photo {
        asset-> {
          url
        }
      },
      title,
      company
    },
    isBreak,
    isKeynote,
    level,
    tags,
    resources
  }`;

  return sanityClient.fetch(query);
}

// Fetch event info
export async function getEventInfo(): Promise<EventInfo | null> {
  const query = `*[_type == "eventInfo"][0] {
    _id,
    eventName,
    tagline,
    description,
    startDate,
    endDate,
    year,
    stats,
    themeTags
  }`;

  return sanityClient.fetch(query);
}
