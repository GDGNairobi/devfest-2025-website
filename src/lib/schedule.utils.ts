import type { Session } from "~/lib/sanity";

/**
 * Format time string from 24h format to 12h format with AM/PM
 * @param time - Time string in HH:mm format
 * @returns Formatted time string
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Get background color class for session type (sticky note colors)
 */
export function getSessionBgColor(sessionType: Session["type"]): string {
  const colorMap: Record<Session["type"], string> = {
    keynote: "bg-yellow-200",
    workshop: "bg-green-200",
    codelab: "bg-blue-200",
    panel: "bg-purple-200",
    lightning: "bg-orange-200",
    talk: "bg-pink-200",
    break: "bg-gray-200",
    lunch: "bg-gray-200",
    registration: "bg-gray-200",
    networking: "bg-gray-200",
  };

  return colorMap[sessionType] || "bg-pink-200";
}

/**
 * Get title color class for session type
 */
export function getSessionTitleColor(sessionType: Session["type"]): string {
  return sessionType === "keynote" ? "text-orange-900" : "text-gray-900";
}

/**
 * Check if session is a break/non-talk type
 */
export function isBreakType(sessionType: Session["type"]): boolean {
  return ["break", "lunch", "registration", "networking"].includes(sessionType);
}

/**
 * Get display label for break types
 */
export function getBreakTypeLabel(sessionType: Session["type"]): string {
  const labels: Record<string, string> = {
    break: "☕ Break",
    lunch: "🍽️ Lunch",
    registration: "📝 Check-in",
    networking: "🤝 Network",
  };

  return labels[sessionType] || sessionType;
}

/**
 * Get gradient colors for track category
 */
export function getTrackGradient(category?: string): string {
  const gradients: Record<string, string> = {
    "ai-ml": "from-purple-500 to-pink-500",
    cloud: "from-blue-500 to-cyan-500",
    "mobile-web": "from-green-500 to-emerald-500",
    main: "from-orange-500 to-red-500",
  };

  return gradients[category || "main"] || "from-blue-500 to-cyan-500";
}

/**
 * Generate random rotation angle for sticky note effect
 */
export function getRandomRotation(): string {
  return `rotate(${Math.random() * 2 - 1}deg)`;
}

/**
 * Group sessions by time slot for concurrent display
 */
export interface TimeSlot {
  timeKey: string;
  startTime: string;
  endTime: string;
  sessions: Session[];
}

export function groupSessionsByTimeSlot(sessions: Session[]): TimeSlot[] {
  const timeSlots: Record<string, Session[]> = {};

  sessions.forEach((session) => {
    const timeKey = `${session.startTime}-${session.endTime}`;
    if (!timeSlots[timeKey]) {
      timeSlots[timeKey] = [];
    }
    timeSlots[timeKey].push(session);
  });

  // Convert to array and sort by start time
  return Object.entries(timeSlots)
    .map(([timeKey, sessions]) => ({
      timeKey,
      startTime: sessions[0].startTime,
      endTime: sessions[0].endTime,
      sessions,
    }))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}
