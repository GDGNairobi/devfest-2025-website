import { component$ } from "@builder.io/qwik";
import type { TimelineMarkerProps } from "~/lib/types";
import { formatTime } from "../lib/schedule.utils";

/**
 * TimelineMarker displays a formatted time badge in the schedule timeline.
 *
 * Features:
 * - Blue gradient background badge
 * - Formatted time display (12-hour format via formatTime)
 * - Positioned to the left of the timeline
 * - Hidden on mobile devices (shown on medium+ screens)
 * - Shadow effect for depth
 * - Right-aligned text within 96px width container
 *
 * Position:
 * - Absolute positioning relative to parent
 * - Left offset: -144px (left-36)
 * - Top offset: 24px (top-6)
 * - Width: 96px (w-24)
 *
 * @component
 *
 * @param props - Component properties
 * @param props.time - Time string in 24-hour format (e.g., "09:00", "14:30")
 *
 * @example
 * ```tsx
 * <TimelineMarker time="09:00" />
 * // Displays: "9:00 AM" in a blue gradient badge
 * ```
 *
 * @accessibility
 * - Uses semantic time element via formatTime utility
 * - Text is visible and readable with high contrast (white on blue)
 * - Badge has adequate padding for touch targets
 *
 * @performance
 * - Minimal component with single div and span
 * - CSS transforms not used (static positioning)
 * - Gradient rendering optimized with Tailwind utilities
 */
export const TimelineMarker = component$<TimelineMarkerProps>(({ time }) => {
  return (
    <>
      {/* Time badge - shown once per time slot */}
      <div class="absolute top-6 -left-36 hidden w-24 text-right md:block">
        <span class="inline-block rounded-lg bg-linear-to-r from-blue-500 to-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm">
          {formatTime(time)}
        </span>
      </div>
    </>
  );
});
