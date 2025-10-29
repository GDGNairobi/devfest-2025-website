import { component$ } from "@builder.io/qwik";
import type { ScheduleTimelineProps } from "~/lib/types";
import { SessionCard } from "./SessionCard";
import { TimelineMarker } from "./TimelineMarker";

/**
 * ScheduleTimeline displays sessions organized chronologically with a visual timeline.
 *
 * Features:
 * - Vertical gradient timeline line on the left
 * - Sessions grouped by time slots
 * - Time markers for each slot
 * - Responsive grid layout for concurrent sessions
 * - Automatic grid adaptation (1 column for single session, 2-3 columns for concurrent)
 * - Gradient timeline from blue → purple → pink
 * - Left margin adjusts for timeline positioning (mobile: 48px, desktop: 144px)
 *
 * Layout:
 * - Timeline line: Fixed left position with gradient
 * - Time markers: Positioned at the start of each time slot
 * - Sessions: Grid layout with responsive columns based on concurrency
 *
 * Grid Behavior:
 * - Single session: 1 column (full width)
 * - Multiple sessions: 1 column mobile, 2 columns tablet, 3 columns desktop
 *
 * @component
 *
 * @param props - Component properties
 * @param props.timeSlots - Array of time slots, each containing startTime, timeKey, and sessions
 *
 * @example
 * ```tsx
 * const timeSlots = [
 *   {
 *     timeKey: "09:00",
 *     startTime: "09:00",
 *     sessions: [session1, session2]
 *   }
 * ];
 * <ScheduleTimeline timeSlots={timeSlots} />
 * ```
 *
 * @accessibility
 * - Semantic div structure with relative positioning
 * - Time markers use TimelineMarker component with proper semantics
 * - SessionCard components include full accessibility features
 * - Visual timeline is decorative (gradient line with low opacity)
 *
 * @performance
 * - Efficient grid layout with CSS Grid
 * - Conditional grid columns based on session count
 * - Gradient timeline using Tailwind's linear-to-* utilities
 * - Key-based rendering for optimal reconciliation
 */
export const ScheduleTimeline = component$<ScheduleTimelineProps>(
  ({ timeSlots }) => {
    return (
      <div class="relative space-y-8">
        {/* Timeline line */}
        <div class="absolute top-0 left-4 h-full w-0.5 bg-linear-to-b from-blue-400 via-purple-400 to-pink-400 opacity-30 md:left-28"></div>

        {/* Group sessions by time slot */}
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot.timeKey} class="relative">
            <TimelineMarker time={timeSlot.startTime} />

            {/* Sessions grid - side by side if concurrent */}
            <div
              class={`ml-12 grid gap-4 md:ml-36 ${
                timeSlot.sessions.length > 1
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {timeSlot.sessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
