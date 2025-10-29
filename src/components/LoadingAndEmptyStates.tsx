import { component$ } from "@builder.io/qwik";

export const LoadingSkeleton = component$(() => {
  const colors = [
    "bg-blue-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-orange-100",
  ];

  return (
    <div class="space-y-4">
      {[...Array(8)].map((_, i) => {
        const bgColor = colors[i % colors.length];
        return (
          <div
            key={i}
            class={`animate-pulse rounded-xl ${bgColor} p-6 shadow-sm`}
          >
            <div class="mb-3 h-6 w-32 rounded bg-white/50"></div>
            <div class="mb-2 h-8 w-3/4 rounded bg-white/50"></div>
            <div class="h-4 w-1/2 rounded bg-white/50"></div>
          </div>
        );
      })}
    </div>
  );
});

export const EmptyState = component$(() => {
  return (
    <div class="rounded-xl bg-white py-20 text-center shadow-sm">
      <svg
        class="mx-auto mb-4 h-16 w-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="text-xl text-gray-600">No sessions scheduled yet</p>
    </div>
  );
});
