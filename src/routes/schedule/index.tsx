import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import type { Session, Track } from "~/lib/sanity";
import { getSessions, getTracks } from "~/lib/sanity";

// Server-side data loading
export const useScheduleLoader = routeLoader$(async () => {
  try {
    const [sessions, tracks] = await Promise.all([getSessions(), getTracks()]);
    return { sessions, tracks };
  } catch (error) {
    console.error("Failed to load schedule:", error);
    return { sessions: [], tracks: [] };
  }
});

export default component$(() => {
  const scheduleData = useScheduleLoader();
  const selectedDay = useSignal<1 | 2>(1);
  const selectedTrack = useSignal<string>("all");

  const filteredSessions = useComputed$(() => {
    return scheduleData.value.sessions
      .filter((session: Session) => session.day === selectedDay.value)
      .filter(
        (session: Session) =>
          selectedTrack.value === "all" ||
          session.track?.slug?.current === selectedTrack.value ||
          (!session.track && selectedTrack.value === "main"),
      )
      .sort((a: Session, b: Session) => a.startTime.localeCompare(b.startTime));
  });

  const getTrackColor = (color?: string) => {
    const colors: Record<string, string> = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      purple: "from-purple-500 to-pink-500",
      orange: "from-orange-500 to-red-500",
      red: "from-red-500 to-rose-500",
      cyan: "from-cyan-500 to-blue-500",
    };
    return colors[color || "blue"] || "from-blue-500 to-cyan-500";
  };

  const getSessionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      keynote: "bg-gradient-to-r from-yellow-500 to-orange-500",
      codelab: "bg-gradient-to-r from-blue-500 to-cyan-500",
      workshop: "bg-gradient-to-r from-green-500 to-emerald-500",
      panel: "bg-gradient-to-r from-purple-500 to-pink-500",
      fireside: "bg-gradient-to-r from-orange-500 to-red-500",
      talk: "bg-gradient-to-r from-indigo-500 to-blue-500",
    };
    return colors[type] || "bg-gradient-to-r from-slate-500 to-slate-600";
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

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
              <h2 class="headline-large mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
                Event Schedule
              </h2>
              <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                Two days packed with keynotes, codelabs, workshops, and
                networking. Plan your DevFest experience!
              </p>

              {/* Day Switcher */}
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

              {/* Track Filter */}
              <div class="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
                <button
                  class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                    selectedTrack.value === "all"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                  onClick$={() => (selectedTrack.value = "all")}
                >
                  All Sessions
                </button>
                <button
                  class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                    selectedTrack.value === "main"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                      : "bg-white text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                  onClick$={() => (selectedTrack.value = "main")}
                >
                  🎤 Main Stage
                </button>
                {scheduleData.value.tracks.map((track: Track) => (
                  <button
                    key={track._id}
                    class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                      selectedTrack.value === track.slug.current
                        ? `bg-linear-to-r ${getTrackColor(track.color)} text-white shadow-md`
                        : "bg-white text-gray-700 shadow-sm hover:shadow-md"
                    }`}
                    onClick$={() => (selectedTrack.value = track.slug.current)}
                  >
                    {track.icon} {track.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Timeline */}
        <section class="bg-gray-50 px-6 pb-20">
          <div class="mx-auto max-w-6xl">
            {scheduleData.value.sessions.length === 0 ? (
              <div class="space-y-4">
                {[...Array(8)].map((_, i) => {
                  const colors = [
                    "bg-blue-100",
                    "bg-purple-100",
                    "bg-pink-100",
                    "bg-green-100",
                    "bg-orange-100",
                  ];
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
            ) : filteredSessions.value.length === 0 ? (
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
            ) : (
              <div class="relative space-y-6">
                {/* Timeline line */}
                <div class="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-30 md:left-28"></div>

                {filteredSessions.value.map((session) => (
                  <div key={session._id} class="group relative ml-12 md:ml-36">
                    {/* Time badge */}
                    <div class="absolute top-6 -left-36 hidden w-24 text-right md:block">
                      <span class="inline-block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm">
                        {formatTime(session.startTime)}
                      </span>
                    </div>

                    {/* Timeline dot */}
                    <div class="absolute top-8 -left-10 h-4 w-4 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md md:-left-28"></div>

                    {/* Session Card */}
                    <div
                      class={`rounded-xl border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                        session.isKeynote
                          ? "border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50"
                          : session.isBreak
                            ? "border-gray-200 bg-gray-100"
                            : "border-gray-200 bg-white"
                      }`}
                    >
                      <div class="p-6">
                        {/* Mobile time */}
                        <div class="mb-2 block text-sm font-semibold text-gray-600 md:hidden">
                          {formatTime(session.startTime)} -{" "}
                          {formatTime(session.endTime)}
                        </div>

                        {/* Session type badge */}
                        <div class="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            class={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide text-white uppercase ${getSessionTypeColor(session.type)}`}
                          >
                            {session.type}
                          </span>
                          {session.isKeynote && (
                            <span class="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                              ⭐ Keynote
                            </span>
                          )}
                          {session.track && (
                            <span
                              class={`inline-block rounded-full bg-gradient-to-r ${getTrackColor(session.track.color)} px-3 py-1 text-xs font-bold text-white`}
                            >
                              {session.track.icon} {session.track.name}
                            </span>
                          )}
                          {session.level && (
                            <span class="inline-block rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                              {session.level}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          class={`mb-2 text-xl font-bold ${
                            session.isKeynote
                              ? "text-orange-600"
                              : "text-gray-900"
                          }`}
                        >
                          {session.title}
                        </h3>

                        {/* Description */}
                        {session.description && !session.isBreak && (
                          <p class="mb-4 text-gray-600">
                            {session.description}
                          </p>
                        )}

                        {/* Speakers */}
                        {session.speakers && session.speakers.length > 0 && (
                          <div class="flex flex-wrap items-center gap-3">
                            {session.speakers.map((speaker) => (
                              <div
                                key={speaker._id}
                                class="flex items-center gap-2"
                              >
                                {speaker.photo?.asset?.url ? (
                                  <img
                                    src={speaker.photo.asset.url}
                                    alt={speaker.name}
                                    class="h-10 w-10 rounded-full border-2 border-gray-200 object-cover shadow-sm"
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-sm">
                                    {speaker.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <p class="text-sm font-semibold text-gray-900">
                                    {speaker.name}
                                  </p>
                                  {speaker.title && (
                                    <p class="text-xs text-gray-600">
                                      {speaker.title}
                                      {speaker.company &&
                                        ` at ${speaker.company}`}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags */}
                        {session.tags && session.tags.length > 0 && (
                          <div class="mt-4 flex flex-wrap gap-2">
                            {session.tags.map((tag) => (
                              <span
                                key={tag}
                                class="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Duration bar */}
                      <div class="h-1 w-full overflow-hidden rounded-b-2xl bg-slate-800">
                        <div
                          class={`h-full ${getSessionTypeColor(session.type)}`}
                          style={{
                            width: `${Math.min(((session.duration || 30) / 60) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Session Count */}
            {filteredSessions.value.length > 0 && (
              <div class="mt-12 text-center">
                <p class="text-slate-400">
                  {filteredSessions.value.length} session(s) on{" "}
                  {selectedDay.value === 1 ? "Friday" : "Saturday"}
                  {selectedTrack.value !== "all" && " for selected track"}
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
