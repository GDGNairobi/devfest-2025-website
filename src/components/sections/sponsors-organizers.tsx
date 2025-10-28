import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  getOrganizers,
  getSponsors,
  getVenueLocations,
  type Organizer,
  type Sponsor,
  type VenueLocation,
} from "~/lib/sanity";

// Placeholder data
const PLACEHOLDER_VENUES: VenueLocation[] = [
  {
    _id: "placeholder-1",
    day: 1,
    venueName: "KICC - Kenyatta International Convention Centre",
    address: "Harambee Avenue, Nairobi, Kenya",
    latitude: -1.2921,
    longitude: 36.8219,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449876287!2d36.8197313!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6811b9dc7%3A0x9ce8e5d5d5d5d5d5!2sKICC!5e0!3m2!1sen!2ske!4v1234567890",
    directions:
      "Located in the heart of Nairobi's CBD, easily accessible via Matatus along Uhuru Highway or Tom Mboya Street.",
    parkingInfo:
      "Ample parking available at the KICC basement and nearby parking lots. Early arrival recommended.",
  },
  {
    _id: "placeholder-2",
    day: 2,
    venueName: "KICC - Kenyatta International Convention Centre",
    address: "Harambee Avenue, Nairobi, Kenya",
    latitude: -1.2921,
    longitude: 36.8219,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449876287!2d36.8197313!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6811b9dc7%3A0x9ce8e5d5d5d5d5d5!2sKICC!5e0!3m2!1sen!2ske!4v1234567890",
    directions:
      "Located in the heart of Nairobi's CBD, easily accessible via Matatus along Uhuru Highway or Tom Mboya Street.",
    parkingInfo:
      "Ample parking available at the KICC basement and nearby parking lots. Early arrival recommended.",
  },
];

const PLACEHOLDER_SPONSORS: Sponsor[] = [
  {
    _id: "sponsor-1",
    name: "Google",
    logo: {
      asset: {
        url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      },
    },
    website: "https://www.google.com",
    tier: "platinum",
  },
  {
    _id: "sponsor-2",
    name: "Microsoft",
    logo: {
      asset: {
        url: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
      },
    },
    website: "https://www.microsoft.com",
    tier: "gold",
  },
  {
    _id: "sponsor-3",
    name: "Amazon Web Services",
    logo: {
      asset: {
        url: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
      },
    },
    website: "https://aws.amazon.com",
    tier: "gold",
  },
];

const PLACEHOLDER_ORGANIZERS: Organizer[] = [
  {
    _id: "org-1",
    name: "John Doe",
    role: "Lead Organizer",
    photo: {
      asset: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      },
    },
    bio: "Passionate about building tech communities in East Africa.",
    twitter: "johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "johndoe",
  },
  {
    _id: "org-2",
    name: "Jane Smith",
    role: "Community Manager",
    photo: {
      asset: {
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
    },
    bio: "GDG organizer and developer advocate.",
    twitter: "janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    _id: "org-3",
    name: "Alex Johnson",
    role: "Technical Lead",
    photo: {
      asset: {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      },
    },
    bio: "Software engineer and open source contributor.",
    github: "alexjohnson",
  },
  {
    _id: "org-4",
    name: "Sarah Williams",
    role: "Partnerships Lead",
    photo: {
      asset: {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
    },
    bio: "Connecting developers with opportunities.",
    linkedin: "https://linkedin.com/in/sarahwilliams",
  },
];

export const SponsorsOrganizersSection = component$(() => {
  const selectedDay = useSignal<1 | 2>(1);
  const sponsors = useSignal<Sponsor[]>([]);
  const organizers = useSignal<Organizer[]>([]);
  const venues = useSignal<VenueLocation[]>([]);
  const loading = useSignal(true);

  // Fetch data from Sanity
  useTask$(async () => {
    try {
      const [sponsorsData, organizersData, venuesData] = await Promise.all([
        getSponsors(),
        getOrganizers(),
        getVenueLocations(),
      ]);

      sponsors.value = sponsorsData;
      organizers.value = organizersData;
      venues.value = venuesData;
    } catch (error) {
      console.error("Error fetching Sanity data:", error);
      // Use placeholder data on error
      sponsors.value = PLACEHOLDER_SPONSORS;
      organizers.value = PLACEHOLDER_ORGANIZERS;
      venues.value = PLACEHOLDER_VENUES;
    } finally {
      loading.value = false;
    }
  });

  // Use placeholder data if no data is available
  const displaySponsors =
    sponsors.value.length > 0 ? sponsors.value : PLACEHOLDER_SPONSORS;
  const displayOrganizers =
    organizers.value.length > 0 ? organizers.value : PLACEHOLDER_ORGANIZERS;
  const displayVenues =
    venues.value.length > 0 ? venues.value : PLACEHOLDER_VENUES;

  const currentVenue = displayVenues.find((v) => v.day === selectedDay.value);

  // Group sponsors by tier
  const sponsorsByTier = {
    platinum: displaySponsors.filter((s) => s.tier === "platinum"),
    gold: displaySponsors.filter((s) => s.tier === "gold"),
    silver: displaySponsors.filter((s) => s.tier === "silver"),
    bronze: displaySponsors.filter((s) => s.tier === "bronze"),
    community: displaySponsors.filter((s) => s.tier === "community"),
  };

  return (
    <section class="bg-gradient-to-b from-gray-50 to-white py-20">
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
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to ${currentVenue.venueName}`}
                ></iframe>
              </div>

              {/* Venue Details */}
              <div class="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-xl">
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
        {!loading.value && (
          <div class="mb-20">
            <h2 class="mb-12 text-center text-4xl font-bold text-gray-900">
              Our Amazing Sponsors
            </h2>

            {/* Platinum Sponsors */}
            {sponsorsByTier.platinum.length > 0 && (
              <div class="mb-12">
                <h3 class="mb-6 text-center text-2xl font-semibold text-gray-700">
                  Platinum Sponsors
                </h3>
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {sponsorsByTier.platinum.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center rounded-2xl bg-white p-12 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
                    >
                      <img
                        src={sponsor.logo.asset.url}
                        alt={sponsor.name}
                        class="max-h-24 w-auto object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Gold Sponsors */}
            {sponsorsByTier.gold.length > 0 && (
              <div class="mb-12">
                <h3 class="mb-6 text-center text-2xl font-semibold text-gray-700">
                  Gold Sponsors
                </h3>
                <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {sponsorsByTier.gold.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center rounded-xl bg-white p-8 shadow-md transition-all hover:scale-105 hover:shadow-xl"
                    >
                      <img
                        src={sponsor.logo.asset.url}
                        alt={sponsor.name}
                        class="max-h-16 w-auto object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Silver Sponsors */}
            {sponsorsByTier.silver.length > 0 && (
              <div class="mb-12">
                <h3 class="mb-6 text-center text-xl font-semibold text-gray-700">
                  Silver Sponsors
                </h3>
                <div class="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
                  {sponsorsByTier.silver.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md"
                    >
                      <img
                        src={sponsor.logo.asset.url}
                        alt={sponsor.name}
                        class="max-h-12 w-auto object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bronze & Community Sponsors */}
            {(sponsorsByTier.bronze.length > 0 ||
              sponsorsByTier.community.length > 0) && (
              <div>
                <h3 class="mb-6 text-center text-xl font-semibold text-gray-700">
                  Community Partners
                </h3>
                <div class="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
                  {[...sponsorsByTier.bronze, ...sponsorsByTier.community].map(
                    (sponsor) => (
                      <a
                        key={sponsor._id}
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
                      >
                        <img
                          src={sponsor.logo.asset.url}
                          alt={sponsor.name}
                          class="max-h-8 w-auto object-contain"
                        />
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Organizers Section */}
        {!loading.value && (
          <div>
            <h2 class="mb-12 text-center text-4xl font-bold text-gray-900">
              Meet the Organizers
            </h2>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayOrganizers.map((organizer) => (
                <div
                  key={organizer._id}
                  class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <div class="mb-4 overflow-hidden rounded-xl">
                    <img
                      src={organizer.photo.asset.url}
                      alt={organizer.name}
                      class="aspect-square w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h3 class="mb-1 text-xl font-bold text-gray-900">
                    {organizer.name}
                  </h3>
                  <p class="mb-3 text-sm font-medium text-blue-600">
                    {organizer.role}
                  </p>
                  {organizer.bio && (
                    <p class="mb-4 text-sm text-gray-600">{organizer.bio}</p>
                  )}
                  <div class="flex gap-3">
                    {organizer.twitter && (
                      <a
                        href={`https://twitter.com/${organizer.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 transition-colors hover:text-blue-500"
                        aria-label="Twitter"
                      >
                        🐦
                      </a>
                    )}
                    {organizer.linkedin && (
                      <a
                        href={organizer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 transition-colors hover:text-blue-700"
                        aria-label="LinkedIn"
                      >
                        💼
                      </a>
                    )}
                    {organizer.github && (
                      <a
                        href={`https://github.com/${organizer.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 transition-colors hover:text-gray-900"
                        aria-label="GitHub"
                      >
                        💻
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
