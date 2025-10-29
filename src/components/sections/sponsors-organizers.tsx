import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  getSponsors,
  getVenueLocations,
  type Sponsor,
  type VenueLocation,
} from "~/lib/sanity";

// Placeholder data
const PLACEHOLDER_VENUES: VenueLocation[] = [
  {
    _id: "placeholder-1",
    day: 1,
    venueName: "Simba Corporation Aspire Center",
    address: "Waiyaki Way, Westlands, Nairobi, Kenya",
    latitude: -1.266283,
    longitude: 36.80249,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7822!2d36.80249!3d-1.266283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNTguNiJTIDM2wrA0OCcwOC45IkU!5e0!3m2!1sen!2ske!4v1234567890",
    directions:
      "Located along Waiyaki Way in Westlands. Accessible via matatu routes along Waiyaki Way. Uber/taxi drop-off at main entrance.",
    parkingInfo: "Parking available on-site. Arrive early for best spots.",
  },
  {
    _id: "placeholder-2",
    day: 2,
    venueName: "Sarit Expo Centre",
    address: "Karuna Road, Westlands, Nairobi, Kenya",
    latitude: -1.2634,
    longitude: 36.8018,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7780832469434!2d36.79925731475398!3d-1.2633794990634896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170b6b2c7d3f%3A0x7a3b3b3b3b3b3b3b!2sSarit%20Centre!5e0!3m2!1sen!2ske!4v1234567890",
    directions:
      "Located in Westlands along Karuna Road. Accessible via matatu routes 23, 33, and 46. Uber/taxi drop-off at main entrance.",
    parkingInfo:
      "Parking available at Sarit Centre shopping mall. Arrive early for best spots.",
  },
];

// Hardcoded organizers from GDG Community page
const ORGANIZERS = [
  {
    _id: "org-1",
    name: "Brayan Mwanyumba",
    role: "GDG Co-Lead & Crew",
    company: "",
    twitter: "Kai_mwanyumba",
    bio: "GDG Co-Lead & Crew",
  },
  {
    _id: "org-2",
    name: "Cynthia Kamau",
    role: "Software Engineer | Programs Lead",
    company: "Africa Vibe Coders",
    twitter: "cynthiakwanjiru",
    bio: "WTM Ambassador",
  },
  {
    _id: "org-3",
    name: "Wayne Gakuo",
    role: "GDG Co-organizer & Crew",
    company: "Unstacked Labs",
    twitter: "wayne_gakuo",
    bio: "GDG Co-organizer & Crew",
  },
  {
    _id: "org-4",
    name: "Sabina Benerdette",
    role: "QA Engineer",
    company: "PULA",
    twitter: "SBenerdette",
    bio: "QA Engineer",
  },
  {
    _id: "org-5",
    name: "Danroy Mwangi",
    role: "Branding and Marketing",
    company: "",
    twitter: "",
    bio: "Branding and Marketing",
  },
  {
    _id: "org-6",
    name: "Wangari Njeri",
    role: "Organizer - Media & Communication",
    company: "",
    twitter: "Kareynjeri1",
    bio: "Organizer - Media & Communication",
  },
  {
    _id: "org-7",
    name: "Brian Ouma",
    role: "GDG Co-organizer & Logistics",
    company: "",
    twitter: "MarkxOBrian",
    bio: "Software Engineer",
  },
  {
    _id: "org-8",
    name: "Ngesa Marvin",
    role: "Strategic Partnerships, Content & ML",
    company: "Safaricom PLC",
    twitter: "ngesa254",
    bio: "Strategic Partnerships, Content & ML",
  },
  {
    _id: "org-9",
    name: "Rachael Kimberly Msabeni",
    role: "Software Developer, UX Designer",
    company: "",
    twitter: "KimberlyMsabeni",
    bio: "WTM Ambassador",
  },
  {
    _id: "org-10",
    name: "Mwangi Morris",
    role: "Communication and Social Media Branding",
    company: "",
    twitter: "",
    bio: "Communication and Social Media Branding",
  },
  {
    _id: "org-11",
    name: "Mambo Bryan",
    role: "Strategy and Partnerships",
    company: "BiziLabs",
    twitter: "mambo_bryan",
    bio: "Strategy and Partnerships",
  },
  {
    _id: "org-12",
    name: "Tabitha Kavyu",
    role: "Community Coordinator",
    company: "",
    twitter: "TabithaKavyu",
    bio: "Community Coordinator",
  },
  {
    _id: "org-13",
    name: "Maina Wycliffe",
    role: "Typescript Aficionado",
    company: "Flanksource",
    twitter: "mwycliffe_dev",
    bio: "Google Developer Expert",
  },
];

export const SponsorsOrganizersSection = component$(() => {
  const selectedDay = useSignal<1 | 2>(1);
  const sponsors = useSignal<Sponsor[]>([]);
  const venues = useSignal<VenueLocation[]>([]);
  const loading = useSignal(true);

  // Fetch data from Sanity
  useTask$(async () => {
    try {
      const [sponsorsData, venuesData] = await Promise.all([
        getSponsors(),
        getVenueLocations(),
      ]);

      sponsors.value = sponsorsData;
      venues.value = venuesData;
    } catch (error) {
      console.error("Error fetching Sanity data:", error);
      // Use placeholder data on error for venues only
      venues.value = PLACEHOLDER_VENUES;
    } finally {
      loading.value = false;
    }
  });

  // Use placeholder data for venues if not available
  const displayVenues =
    venues.value.length > 0 ? venues.value : PLACEHOLDER_VENUES;

  const currentVenue = displayVenues.find((v) => v.day === selectedDay.value);

  // Group sponsors by tier - only if sponsors exist
  const sponsorsByTier =
    sponsors.value.length > 0
      ? {
          platinum: sponsors.value.filter((s) => s.tier === "platinum"),
          gold: sponsors.value.filter((s) => s.tier === "gold"),
          silver: sponsors.value.filter((s) => s.tier === "silver"),
          bronze: sponsors.value.filter((s) => s.tier === "bronze"),
          community: sponsors.value.filter((s) => s.tier === "community"),
        }
      : null;

  const hasSponsors = sponsors.value.length > 0;

  return (
    <section class="bg-linear-to-b from-gray-50 to-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Day Switcher */}
        <div class="mb-12 flex justify-center">
          <div class="inline-flex rounded-lg bg-gray-100 p-1 shadow-md">
            <button
              onClick$={() => (selectedDay.value = 1)}
              class={`rounded-md px-8 py-3 text-lg font-semibold transition-all ${
                selectedDay.value === 1
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              DAY 1
            </button>
            <button
              onClick$={() => (selectedDay.value = 2)}
              class={`rounded-md px-8 py-3 text-lg font-semibold transition-all ${
                selectedDay.value === 2
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              DAY 2
            </button>
          </div>
        </div>

        {/* Venue & Map Section */}
        {currentVenue && (
          <div class="mb-20">
            <h2 class="mb-8 text-center text-4xl font-bold text-gray-900">
              Event Location - Day {selectedDay.value}
            </h2>
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Map */}
              <div class="overflow-hidden rounded-2xl shadow-2xl">
                <iframe
                  src={currentVenue.mapEmbedUrl}
                  width="100%"
                  height="450"
                  style="border:0;"
                  allowFullscreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to ${currentVenue.venueName}`}
                ></iframe>
              </div>

              {/* Venue Details */}
              <div class="flex flex-col justify-center rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-8 shadow-xl">
                <h3 class="mb-4 text-3xl font-bold text-gray-900">
                  {currentVenue.venueName}
                </h3>
                <p class="mb-6 flex items-start text-lg text-gray-700">
                  <span class="mr-2 text-2xl">📍</span>
                  {currentVenue.address}
                </p>
                {currentVenue.directions && (
                  <div class="mb-6">
                    <h4 class="mb-2 font-semibold text-gray-900">
                      🚗 Getting There
                    </h4>
                    <p class="text-gray-700">{currentVenue.directions}</p>
                  </div>
                )}
                {currentVenue.parkingInfo && (
                  <div>
                    <h4 class="mb-2 font-semibold text-gray-900">🅿️ Parking</h4>
                    <p class="text-gray-700">{currentVenue.parkingInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sponsors Section */}
        {hasSponsors && sponsorsByTier && !loading.value && (
          <div class="mb-20">
            <div class="relative mb-16 text-center">
              {/* Decorative elements */}
              <div class="absolute inset-0 -z-10 opacity-10">
                <div class="absolute top-0 left-1/3 h-32 w-32 rounded-full bg-green-500 blur-3xl"></div>
                <div class="absolute top-0 right-1/3 h-32 w-32 rounded-full bg-blue-500 blur-3xl"></div>
              </div>

              <h2 class="headline-large mb-4 bg-linear-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text font-bold text-transparent">
                Our Sponsors
              </h2>
              <p class="mx-auto max-w-2xl text-lg text-gray-600">
                Thank you to our amazing sponsors who make DevFest Nairobi
                possible
              </p>
            </div>

            {/* Platinum Sponsors */}
            {sponsorsByTier.platinum.length > 0 && (
              <div class="mb-16">
                <div class="mb-8 text-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                    <span>💎</span>
                    <span>Platinum Sponsors</span>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {sponsorsByTier.platinum.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group relative overflow-hidden rounded-3xl bg-white p-12 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
                    >
                      {/* Animated gradient border */}
                      <div class="absolute inset-0 rounded-3xl bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div class="absolute inset-0.5 rounded-3xl bg-white"></div>

                      <div class="relative flex items-center justify-center">
                        <img
                          src={sponsor.logo.asset.url}
                          alt={sponsor.name}
                          class="max-h-24 w-auto object-contain transition-transform group-hover:scale-105"
                          width="200"
                          height="96"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Gold Sponsors */}
            {sponsorsByTier.gold.length > 0 && (
              <div class="mb-16">
                <div class="mb-8 text-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 px-6 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                    <span>🥇</span>
                    <span>Gold Sponsors</span>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {sponsorsByTier.gold.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div class="absolute inset-0 rounded-2xl bg-linear-to-br from-yellow-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div class="absolute inset-0.5 rounded-2xl bg-white"></div>

                      <div class="relative flex items-center justify-center">
                        <img
                          src={sponsor.logo.asset.url}
                          alt={sponsor.name}
                          class="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                          width="150"
                          height="64"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Silver Sponsors */}
            {sponsorsByTier.silver.length > 0 && (
              <div class="mb-16">
                <div class="mb-8 text-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-gray-400 to-gray-600 px-6 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                    <span>🥈</span>
                    <span>Silver Sponsors</span>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {sponsorsByTier.silver.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div class="absolute inset-0 rounded-xl bg-linear-to-br from-gray-300 to-gray-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div class="absolute inset-0.5 rounded-xl bg-white"></div>

                      <div class="relative flex items-center justify-center">
                        <img
                          src={sponsor.logo.asset.url}
                          alt={sponsor.name}
                          class="max-h-12 w-auto object-contain transition-transform group-hover:scale-105"
                          width="100"
                          height="48"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bronze & Community Sponsors */}
            {(sponsorsByTier.bronze.length > 0 ||
              sponsorsByTier.community.length > 0) && (
              <div>
                <div class="mb-8 text-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                    <span>🤝</span>
                    <span>Community Partners</span>
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
                  {[...sponsorsByTier.bronze, ...sponsorsByTier.community].map(
                    (sponsor) => (
                      <a
                        key={sponsor._id}
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group relative overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                      >
                        <div class="absolute inset-0 rounded-lg bg-linear-to-br from-orange-400 to-red-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div class="absolute inset-0.5 rounded-lg bg-white"></div>

                        <div class="relative flex items-center justify-center">
                          <img
                            src={sponsor.logo.asset.url}
                            alt={sponsor.name}
                            class="max-h-8 w-auto object-contain transition-transform group-hover:scale-105"
                            width="80"
                            height="32"
                          />
                        </div>
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Organizers Section */}
        <div class="mt-20">
          <div class="relative mb-16 text-center">
            {/* Decorative elements */}
            <div class="absolute inset-0 -z-10 opacity-10">
              <div class="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-blue-500 blur-3xl"></div>
              <div class="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-purple-500 blur-3xl"></div>
            </div>

            <h2 class="headline-large mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
              Meet the Team
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600">
              The amazing people making DevFest Nairobi 2025 possible
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ORGANIZERS.map((organizer, index) => (
              <div
                key={organizer._id}
                class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Gradient accent */}
                <div class="absolute top-0 right-0 h-1 w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div class="text-center">
                  {/* Floating badge for company */}
                  {organizer.company && (
                    <div class="mb-4 inline-block rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
                      {organizer.company}
                    </div>
                  )}

                  <h3 class="mb-1 text-lg font-bold text-gray-900">
                    {organizer.name}
                  </h3>
                  <p class="mb-3 text-sm font-medium text-purple-600">
                    {organizer.role}
                  </p>

                  {organizer.bio && organizer.bio !== organizer.role && (
                    <p class="mb-4 text-xs text-gray-500">{organizer.bio}</p>
                  )}

                  {/* Social links */}
                  {organizer.twitter && (
                    <a
                      href={`https://twitter.com/${organizer.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-all hover:bg-blue-100"
                      aria-label={`${organizer.name} on Twitter`}
                    >
                      <svg
                        class="h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      @{organizer.twitter}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading.value && (
          <div class="py-20 text-center">
            <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p class="mt-4 text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
});
