import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import type { Speaker } from "~/lib/sanity";
import { getSpeakers } from "~/lib/sanity";

// Server-side data loading
export const useSpeakersLoader = routeLoader$(async () => {
  try {
    const speakers = await getSpeakers();
    return speakers;
  } catch (error) {
    console.error("Failed to load speakers:", error);
    return [];
  }
});

export default component$(() => {
  const speakersData = useSpeakersLoader();
  const searchQuery = useSignal("");

  const filteredSpeakers = speakersData.value.filter((speaker: Speaker) => {
    const query = searchQuery.value.toLowerCase();
    return (
      speaker.name.toLowerCase().includes(query) ||
      speaker.title?.toLowerCase().includes(query) ||
      speaker.company?.toLowerCase().includes(query) ||
      speaker.bio?.toLowerCase().includes(query)
    );
  });

  const getRotation = (index: number) => {
    const rotations = [
      "-1deg",
      "1deg",
      "-1.5deg",
      "0.5deg",
      "1.5deg",
      "-0.5deg",
      "0.8deg",
      "-1.2deg",
    ];
    return rotations[index % rotations.length];
  };

  const getGradient = (index: number) => {
    const gradients = [
      { bg: "from-blue-50 to-blue-100", icon: "from-blue-500 to-blue-600" },
      {
        bg: "from-purple-50 to-purple-100",
        icon: "from-purple-500 to-purple-600",
      },
      { bg: "from-pink-50 to-pink-100", icon: "from-pink-500 to-pink-600" },
      { bg: "from-green-50 to-green-100", icon: "from-green-500 to-green-600" },
      {
        bg: "from-orange-50 to-orange-100",
        icon: "from-orange-500 to-orange-600",
      },
      { bg: "from-cyan-50 to-cyan-100", icon: "from-cyan-500 to-cyan-600" },
      { bg: "from-red-50 to-red-100", icon: "from-red-500 to-red-600" },
      {
        bg: "from-indigo-50 to-indigo-100",
        icon: "from-indigo-500 to-indigo-600",
      },
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Layout>
      <div class="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section class="bg-white px-6 py-20">
          <div class="mx-auto max-w-7xl">
            <div class="text-center">
              <h2 class="headline-large mb-4 font-bold text-gray-900">
                Meet Our Speakers
              </h2>
              <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                Learn from industry experts, Google Developer Experts, and
                thought leaders shaping the future of technology in Africa and
                beyond.
              </p>

              {/* Search Bar */}
              <div class="mx-auto max-w-md">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search speakers..."
                    class="w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                    value={searchQuery.value}
                    onInput$={(e) =>
                      (searchQuery.value = (e.target as HTMLInputElement).value)
                    }
                  />
                  <svg
                    class="absolute top-1/2 right-6 h-5 w-5 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Grid */}
        <section class="bg-gray-50 px-6 pb-20">
          <div class="mx-auto max-w-7xl">
            {speakersData.value.length === 0 ? (
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    class="animate-pulse rounded-xl bg-white p-8 shadow-sm"
                  >
                    <div class="mb-4 h-14 w-14 rounded-xl bg-gray-200"></div>
                    <div class="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                    <div class="h-4 w-1/2 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            ) : filteredSpeakers.length === 0 ? (
              <div class="py-20 text-center">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p class="text-xl text-gray-600">
                  No speakers found matching "{searchQuery.value}"
                </p>
              </div>
            ) : (
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSpeakers.map((speaker, index) => {
                  const gradient = getGradient(index);
                  return (
                    <div
                      key={speaker._id}
                      class={`group rounded-xl bg-linear-to-br ${gradient.bg} p-8 shadow-sm transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-lg`}
                      style={`transform: rotate(${getRotation(index)});`}
                    >
                      {/* Speaker Photo/Icon */}
                      <div class="mb-6 flex justify-center">
                        {speaker.photo?.asset?.url ? (
                          <div class="relative">
                            <img
                              src={speaker.photo.asset.url}
                              alt={speaker.name}
                              class="h-32 w-32 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                              width={128}
                              height={128}
                            />
                            <div
                              class={`absolute -right-2 -bottom-2 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${gradient.icon} shadow-md`}
                            >
                              <span class="text-2xl">🎤</span>
                            </div>
                          </div>
                        ) : (
                          <div
                            class={`flex h-32 w-32 items-center justify-center rounded-xl bg-linear-to-br ${gradient.icon} shadow-md`}
                          >
                            <span class="text-6xl font-bold text-white">
                              {speaker.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Speaker Info */}
                      <div class="space-y-3 text-center">
                        <h3 class="title-large font-semibold text-gray-900">
                          {speaker.name}
                        </h3>
                        {speaker.title && (
                          <p class="text-sm font-medium text-gray-700">
                            {speaker.title}
                          </p>
                        )}
                        {speaker.company && (
                          <p class="text-sm font-medium text-gray-600">
                            📍 {speaker.company}
                          </p>
                        )}

                        {/* Bio Section */}
                        {speaker.bio && (
                          <div class="rounded-lg bg-white/60 p-4">
                            <p class="line-clamp-4 text-sm leading-relaxed text-gray-700">
                              {speaker.bio}
                            </p>
                          </div>
                        )}

                        {/* Social Links */}
                        {(speaker.twitter ||
                          speaker.linkedin ||
                          speaker.github ||
                          speaker.website) && (
                          <div class="flex flex-wrap justify-center gap-2 pt-2">
                            {speaker.twitter && (
                              <a
                                href={`https://twitter.com/${speaker.twitter.replace("@", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:scale-105 hover:bg-blue-500 hover:text-white"
                                title="Twitter"
                              >
                                <svg
                                  class="h-3.5 w-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span class="hidden sm:inline">Twitter</span>
                              </a>
                            )}
                            {speaker.linkedin && (
                              <a
                                href={speaker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:scale-105 hover:bg-blue-600 hover:text-white"
                                title="LinkedIn"
                              >
                                <svg
                                  class="h-3.5 w-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span class="hidden sm:inline">LinkedIn</span>
                              </a>
                            )}
                            {speaker.github && (
                              <a
                                href={`https://github.com/${speaker.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:scale-105 hover:bg-gray-900 hover:text-white"
                                title="GitHub"
                              >
                                <svg
                                  class="h-3.5 w-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span class="hidden sm:inline">GitHub</span>
                              </a>
                            )}
                            {speaker.website && (
                              <a
                                href={speaker.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:scale-105 hover:bg-purple-600 hover:text-white"
                                title="Website"
                              >
                                <svg
                                  class="h-3.5 w-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                  />
                                </svg>
                                <span class="hidden sm:inline">Website</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Speaker Count */}
            {speakersData.value.length > 0 && filteredSpeakers.length > 0 && (
              <div class="mt-12 text-center">
                <p class="text-lg text-gray-700">
                  Showing{" "}
                  <span class="font-semibold text-blue-600">
                    {filteredSpeakers.length}
                  </span>{" "}
                  of{" "}
                  <span class="font-semibold text-blue-600">
                    {speakersData.value.length}
                  </span>{" "}
                  speakers
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
  title: "Speakers - DevFest Nairobi 2025",
  meta: [
    {
      name: "description",
      content:
        "Meet the speakers at DevFest Nairobi 2025. Learn from industry experts, Google Developer Experts, and thought leaders.",
    },
  ],
};
