import { component$ } from "@builder.io/qwik";
import type { TimelineMarkerProps } from "~/lib/types";
import { formatTime } from "../lib/schedule.utils";

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
