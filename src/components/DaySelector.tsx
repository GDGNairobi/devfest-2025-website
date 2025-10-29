import { component$ } from "@builder.io/qwik";
import type { DaySelectorProps } from "~/lib/types";

export const DaySelector = component$<DaySelectorProps>(({ selectedDay }) => {
  return (
    <div
      class="mx-auto mb-8 inline-flex rounded-xl bg-gray-200 p-1.5 shadow-sm"
      role="group"
      aria-label="Select event day"
    >
      <button
        class={`rounded-lg px-8 py-3 font-semibold transition-all ${
          selectedDay.value === 1
            ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
            : "text-gray-700 hover:text-gray-900"
        }`}
        onClick$={() => (selectedDay.value = 1)}
        type="button"
        aria-pressed={selectedDay.value === 1}
        aria-label="Select Friday, October 31st schedule"
      >
        Friday, Oct 31
      </button>
      <button
        class={`rounded-lg px-8 py-3 font-semibold transition-all ${
          selectedDay.value === 2
            ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-md"
            : "text-gray-700 hover:text-gray-900"
        }`}
        onClick$={() => (selectedDay.value = 2)}
        type="button"
        aria-pressed={selectedDay.value === 2}
        aria-label="Select Saturday, November 1st schedule"
      >
        Saturday, Nov 1
      </button>
    </div>
  );
});
