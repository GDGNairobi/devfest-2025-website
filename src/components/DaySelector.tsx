import { component$ } from "@builder.io/qwik";
import type { DaySelectorProps } from "~/lib/types";

/**
 * DaySelector provides toggle buttons to switch between event days.
 *
 * Features:
 * - Two-button toggle for Day 1 (Friday) and Day 2 (Saturday)
 * - Visual feedback with gradient backgrounds for active state
 * - Keyboard accessible with proper ARIA attributes
 * - Smooth transitions between states
 *
 * @component
 *
 * @param props - Component properties
 * @param props.selectedDay - Signal holding the currently selected day (1 or 2)
 *
 * @example
 * ```tsx
 * const selectedDay = useSignal(1);
 * <DaySelector selectedDay={selectedDay} />
 * ```
 *
 * @accessibility
 * - Uses role="group" with descriptive aria-label
 * - Each button has aria-pressed state
 * - Descriptive aria-labels include full date information
 * - Explicit button type attributes
 *
 * @performance
 * - Lightweight component with minimal re-renders
 * - Uses Qwik signals for reactive state updates
 */
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
