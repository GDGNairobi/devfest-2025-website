import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import { getSessions } from "~/lib/sanity";
import { DaySelector } from "../../components/DaySelector";
import {
  EmptyState,
  LoadingSkeleton,
} from "../../components/LoadingAndEmptyStates";
import { ScheduleTimeline } from "../../components/ScheduleTimeline";
import { useGroupedTimeSlots } from "../../lib/schedule.hooks";

// Server-side data loading
export const useScheduleLoader = routeLoader$(async () => {
  try {
    const sessions = await getSessions();
    return { sessions };
  } catch (error) {
    console.error("Failed to load schedule:", error);
    return { sessions: [] };
  }
});

export default component$(() => {
  const scheduleData = useScheduleLoader();
  const selectedDay = useSignal<1 | 2>(1);

  // Filter and group sessions
  const filteredSessions = useComputed$(() => {
    return scheduleData.value.sessions
      .filter((session) => session.day === selectedDay.value)
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

              {/* Day Switcher */}
              <DaySelector selectedDay={selectedDay} />
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
                  {selectedDay.value === 1 ? "Friday" : "Saturday"}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "Schedule - DevFest Nairobi 2025",
  meta: [
    {
      name: "description",
      content:
        "View the full schedule for DevFest Nairobi 2025. Browse sessions by track and day.",
    },
  ],
};
