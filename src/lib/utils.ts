// Utility functions for DevFest Nairobi 2025

import type { EventConfiguration, Session } from './types';

/**
 * Format date for display
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Nairobi'
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format time for display
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Nairobi'
  });
};

/**
 * Get time until a specific date/time
 */
export const getTimeUntil = (targetTime: string): string => {
  const now = new Date();
  const target = new Date(targetTime);
  const diff = target.getTime() - now.getTime();
  
  if (diff <= 0) return 'Started';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

/**
 * Check if a session is currently live
 */
export const isSessionLive = (session: Session): boolean => {
  const now = new Date();
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  return now >= start && now < end;
};

/**
 * Check if a session is starting soon (within 15 minutes)
 */
export const isSessionStartingSoon = (session: Session): boolean => {
  const now = new Date();
  const start = new Date(session.startTime);
  const diff = start.getTime() - now.getTime();
  return diff > 0 && diff <= 15 * 60 * 1000; // 15 minutes
};

/**
 * Get current session from a list of sessions
 */
export const getCurrentSession = (sessions: Session[]): Session | null => {
  return sessions.find(session => isSessionLive(session)) || null;
};

/**
 * Get next upcoming session
 */
export const getNextSession = (sessions: Session[]): Session | null => {
  const now = new Date();
  const upcoming = sessions
    .filter(session => new Date(session.startTime) > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  return upcoming[0] || null;
};

/**
 * Determine event status based on event configuration
 */
export const getEventStatus = (eventConfig: EventConfiguration): 'upcoming' | 'live' | 'ended' => {
  const now = new Date();
  const day1Start = new Date(eventConfig.eventDates.day1);
  const day2End = new Date(eventConfig.eventDates.day2);
  day2End.setHours(23, 59, 59); // End of day 2
  
  if (now < day1Start) return 'upcoming';
  if (now >= day1Start && now <= day2End) return 'live';
  return 'ended';
};

/**
 * Filter sessions by day
 */
export const getSessionsByDay = (sessions: Session[], day: number): Session[] => {
  return sessions.filter(session => session.eventDay === day);
};

/**
 * Group sessions by time blocks for schedule display
 */
export const getSessionTimeBlocks = (sessions: Session[]) => {
  const timeBlocks = new Map<string, Session[]>();
  
  sessions.forEach(session => {
    const timeKey = formatTime(session.startTime);
    if (!timeBlocks.has(timeKey)) {
      timeBlocks.set(timeKey, []);
    }
    timeBlocks.get(timeKey)!.push(session);
  });
  
  // Sort by time
  return new Map([...timeBlocks.entries()].sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a[0]}:00+03:00`);
    const timeB = new Date(`2000-01-01T${b[0]}:00+03:00`);
    return timeA.getTime() - timeB.getTime();
  }));
};

/**
 * Generate speaker initials for fallback avatars
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function for search and other frequent operations
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Generate a slug from a string
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Get track color for consistent UI theming
 */
export const getTrackColor = (track: string): string => {
  const trackColors: Record<string, string> = {
    'AI & Machine Learning': 'bg-blue-100 text-blue-800',
    'Web Development': 'bg-green-100 text-green-800',
    'Mobile Development': 'bg-purple-100 text-purple-800',
    'Cloud & DevOps': 'bg-orange-100 text-orange-800',
    'Design & UX': 'bg-pink-100 text-pink-800',
    'Career & Leadership': 'bg-indigo-100 text-indigo-800',
    'Open Source': 'bg-gray-100 text-gray-800',
  };
  
  return trackColors[track] || 'bg-gray-100 text-gray-800';
};

/**
 * Get level color for session difficulty
 */
export const getLevelColor = (level: string): string => {
  const levelColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
  };
  
  return levelColors[level] || 'bg-gray-100 text-gray-800';
};