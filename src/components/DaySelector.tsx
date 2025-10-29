import { component$, type Signal } from "@builder.io/qwik";

interface DaySelectorProps {
  selectedDay: Signal<1 | 2>;
}

export const DaySelector = component$<DaySelectorProps>(({ selectedDay }) => {
  return (
    <div class="mx-auto mb-8 inline-flex rounded-xl bg-gray-200 p-1.5 shadow-sm">
      <button
        class={`rounded-lg px-8 py-3 font-semibold transition-all ${
          selectedDay.value === 1
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
            : "text-gray-700 hover:text-gray-900"
        }`}
        onClick$={() => (selectedDay.value = 1)}
      >
        Friday, Oct 31
      </button>
      <button
        class={`rounded-lg px-8 py-3 font-semibold transition-all ${
          selectedDay.value === 2
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            : "text-gray-700 hover:text-gray-900"
        }`}
        onClick$={() => (selectedDay.value = 2)}
      >
        Saturday, Nov 1
      </button>
    </div>
  );
});
