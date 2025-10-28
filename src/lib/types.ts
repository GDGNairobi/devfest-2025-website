import type { QRL } from '@builder.io/qwik';

// TypeScript definitions for DevFest Nairobi 2025

export interface EventConfiguration {
  eventName: string;
  eventDates: {
    day1: string; // ISO date string
    day2: string; // ISO date string
  };
  venue: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  timezone: string; // e.g., "Africa/Nairobi"
  isLive: boolean;
  eventStatus: 'upcoming' | 'live' | 'ended';
}

export interface Speaker {
  id: string;
  name: string;
  slug: string;
  bio: string;
  profileImage: string;
  company: string;
  jobTitle: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  sessions: string[]; // Array of session IDs
  isKeynote: boolean;
  country: string;
}

export interface Session {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: string; // ISO datetime string
  endTime: string;   // ISO datetime string
  room: string;
  track: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Talk' | 'Workshop' | 'Panel' | 'Keynote' | 'Break';
  speakers: string[]; // Array of speaker IDs
  tags: string[];
  eventDay: number; // 1 or 2
}

export interface Schedule {
  day: number; // 1 or 2
  date: string; // ISO date string
  sessions: string[]; // Array of session IDs
  breaks: {
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
  }[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Community';
  description?: string;
  featured: boolean;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  description?: string;
  location?: string;
}

// Utility types for live session tracking
export interface LiveSessionStatus {
  currentSession: Session | null;
  nextSession: Session | null;
  timeUntilNext: string;
  timeRemaining: string;
  isEventLive: boolean;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Component prop types
export interface CardProps {
  class?: string;
  elevated?: boolean;
  onClick$?: QRL<() => void>;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  class?: string;
  onClick$?: QRL<() => void>;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}