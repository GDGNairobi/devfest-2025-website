import { component$, useComputed$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import { getSessions } from "~/lib/sanity";
import {
  EmptyState,
  LoadingSkeleton,
} from "../../../components/LoadingAndEmptyStates";
import { ScheduleTimeline } from "../../../components/ScheduleTimeline";
import { useGroupedTimeSlots } from "../../../lib/schedule.hooks";

// Server-side data loading
export const useScheduleLoader = routeLoader$(async ({ params, redirect }) => {
  const day = params.day;

  // Validate day parameter
  if (day !== "day-1" && day !== "day-2") {
    // Redirect to day 1 if invalid
    throw redirect(302, "/schedule/day-1");
  }

  try {
    const sessions = await getSessions();
    const dayNumber = day === "day-1" ? 1 : 2;
    return { sessions, day: dayNumber as 1 | 2 };
  } catch (error) {
    console.error("Failed to load schedule:", error);
    return { sessions: [], day: 1 as 1 | 2 };
  }
});

export default component$(() => {
  const scheduleData = useScheduleLoader();

  // Filter and group sessions
  const filteredSessions = useComputed$(() => {
    return scheduleData.value.sessions
      .filter((session) => session.day === scheduleData.value.day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  });
  const groupedByTimeSlot = useGroupedTimeSlots(filteredSessions);

  return (
    <Layout>
      <div class="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section class="relative overflow-hidden bg-white px-6 py-20">
          {/* Decorative background elements */}
          <div class="absolute inset-0 opacity-5">
            <div class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div class="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500 blur-3xl"></div>
          </div>

          <div class="relative mx-auto max-w-7xl">
            <div class="text-center">
              <h2 class="headline-large mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
                Event Schedule
              </h2>
              <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                Two days packed with keynotes, codelabs, workshops, and
                networking. Plan your DevFest experience!
              </p>

              {/* Day Switcher - Now uses links */}
              <div
                class="inline-flex rounded-xl bg-gray-200 p-1.5 shadow-sm"
                role="group"
                aria-label="Select event day"
              >
                <a
                  href="/schedule/day-1"
                  aria-pressed={scheduleData.value.day === 1}
                  aria-label="View Day 1 - October 31, 2025"
                  class={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                    scheduleData.value.day === 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  DAY 1
                </a>
                <a
                  href="/schedule/day-2"
                  aria-pressed={scheduleData.value.day === 2}
                  aria-label="View Day 2 - November 1, 2025"
                  class={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                    scheduleData.value.day === 2
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  DAY 2
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Timeline */}
        <section class="bg-gray-50 px-6 pb-20">
          <div class="mx-auto max-w-6xl">
            {scheduleData.value.sessions.length === 0 ? (
              <LoadingSkeleton />
            ) : filteredSessions.value.length === 0 ? (
              <EmptyState />
            ) : (
              <ScheduleTimeline timeSlots={groupedByTimeSlot.value} />
            )}

            {/* Session Count */}
            {filteredSessions.value.length > 0 && (
              <div class="mt-12 text-center">
                <p class="text-slate-400">
                  {filteredSessions.value.length} session(s) on{" "}
                  {scheduleData.value.day === 1 ? "Friday" : "Saturday"}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
});

export const head: DocumentHead = ({ params }) => {
  const day = params.day === "day-1" ? "Day 1" : "Day 2";
  const date = params.day === "day-1" ? "October 31" : "November 1";

  return {
    title: `Schedule ${day} - DevFest Nairobi 2025`,
    meta: [
      {
        name: "description",
        content: `View the ${day} (${date}, 2025) schedule for DevFest Nairobi 2025. Browse sessions by track and time.`,
      },
    ],
  };
};
