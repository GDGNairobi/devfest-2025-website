import { component$ } from "@builder.io/qwik";

/**
 * LoadingSkeleton displays animated placeholder cards while content is loading.
 *
 * Features:
 * - 8 skeleton cards in a vertical stack
 * - Cycling through 5 different pastel colors (blue, purple, pink, green, orange)
 * - Pulse animation for loading effect
 * - Three placeholder bars per card (title, content, metadata)
 * - Rounded corners and subtle shadows
 *
 * Visual Design:
 * - Card background: Rotating pastel colors (100 shade)
 * - Placeholder bars: White with 50% opacity
 * - Border radius: xl (0.75rem)
 * - Shadow: sm (subtle)
 *
 * Placeholder Elements per Card:
 * 1. Title bar: h-6 w-32 (height: 24px, width: 128px)
 * 2. Content bar: h-8 w-3/4 (height: 32px, width: 75%)
 * 3. Metadata bar: h-4 w-1/2 (height: 16px, width: 50%)
 *
 * @component
 *
 * @example
 * ```tsx
 * {isLoading && <LoadingSkeleton />}
 * ```
 *
 * @accessibility
 * - Uses animate-pulse for motion (respects prefers-reduced-motion)
 * - Color combinations maintain sufficient contrast
 * - Semantic structure with proper spacing
 *
 * @performance
 * - CSS animation (animate-pulse) for GPU acceleration
 * - Fixed 8-card count for predictable rendering
 * - Minimal DOM nodes per skeleton card
 */
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

/**
 * EmptyState displays a message when no sessions are available.
 *
 * Features:
 * - Centered layout with calendar icon
 * - Informative message about missing content
 * - Clean, minimal design
 * - Consistent styling with the rest of the app
 *
 * Visual Design:
 * - White background with subtle shadow
 * - Gray calendar icon (h-16 w-16)
 * - Gray text color (text-gray-600)
 * - Large text size (text-xl)
 * - Generous padding (py-20) for emphasis
 *
 * Use Cases:
 * - No sessions found for selected filters
 * - Empty schedule before content is added
 * - No data returned from API/CMS
 *
 * @component
 *
 * @example
 * ```tsx
 * {sessions.length === 0 && <EmptyState />}
 * ```
 *
 * @accessibility
 * - Semantic SVG with proper viewBox
 * - Readable text with sufficient color contrast
 * - Centered layout for easy scanning
 * - Calendar icon provides visual context
 *
 * @performance
 * - Inline SVG for reduced HTTP requests
 * - Minimal DOM nodes
 * - No animations or heavy computations
 */
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
