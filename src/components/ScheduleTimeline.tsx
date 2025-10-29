import { component$ } from "@builder.io/qwik";
import type { ScheduleTimelineProps } from "~/lib/types";
import { SessionCard } from "./SessionCard";
import { TimelineMarker } from "./TimelineMarker";

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
