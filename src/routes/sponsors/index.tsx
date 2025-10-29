import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import type { Sponsor } from "~/lib/sanity";
import { getSponsors } from "~/lib/sanity";

export const useSponsorsLoader = routeLoader$(async () => {
  try {
    return await getSponsors();
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return [];
  }
});

export default component$(() => {
  const sponsorsData = useSponsorsLoader();

  // Group sponsors by tier
  const groupedSponsors = {
    platinum: sponsorsData.value.filter((s: Sponsor) => s.tier === "platinum"),
    gold: sponsorsData.value.filter((s: Sponsor) => s.tier === "gold"),
    silver: sponsorsData.value.filter((s: Sponsor) => s.tier === "silver"),
    bronze: sponsorsData.value.filter((s: Sponsor) => s.tier === "bronze"),
    community: sponsorsData.value.filter(
      (s: Sponsor) => s.tier === "community",
    ),
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "from-slate-300 to-slate-400";
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "silver":
        return "from-gray-300 to-gray-400";
      case "bronze":
        return "from-orange-700 to-orange-900";
      case "community":
        return "from-blue-500 to-purple-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getTierSize = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "h-32 md:h-40";
      case "gold":
        return "h-28 md:h-32";
      case "silver":
        return "h-24 md:h-28";
      case "bronze":
        return "h-20 md:h-24";
      case "community":
        return "h-16 md:h-20";
      default:
        return "h-24";
    }
  };

  return (
    <Layout>
      <div class="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section class="bg-white px-6 py-20">
          <div class="mx-auto max-w-7xl">
            <div class="text-center">
              <h2 class="headline-large mb-4 font-bold text-gray-900">
                Our Sponsors
              </h2>
              <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                DevFest Nairobi 2025 is made possible by the generous support of
                our sponsors. Thank you for helping us build the future of
                technology in East Africa!
              </p>

              {/* CTA */}
              <div class="mb-12 flex justify-center gap-4">
                <a
                  href="mailto:sponsors@devfestnairobi.com"
                  class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  💼 Become a Sponsor
                </a>
                <a
                  href="/sponsor-prospectus.pdf"
                  target="_blank"
                  class="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  📄 View Prospectus
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Grid */}
        <section class="bg-gray-50 px-6 py-12">
          <div class="mx-auto max-w-7xl">
            {sponsorsData.value.length === 0 && (
              <div class="space-y-12">
                {["Platinum", "Gold", "Silver", "Bronze", "Community"].map(
                  (tier) => (
                    <div key={tier} class="text-center">
                      <div class="mx-auto mb-8 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
                      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            class="animate-pulse rounded-xl bg-white p-6"
                          >
                            <div class="h-24 w-full rounded bg-gray-200"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {sponsorsData.value.length === 0 && (
              <div class="rounded-xl bg-white py-20 text-center shadow-sm">
                <div class="mb-4 text-6xl">🤝</div>
                <h3 class="mb-2 text-2xl font-bold text-gray-900">
                  Sponsorship Opportunities Available
                </h3>
                <p class="mb-6 text-lg text-gray-600">
                  Be part of East Africa's biggest developer festival!
                </p>
                <a
                  href="mailto:sponsors@devfestnairobi.com"
                  class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Get in Touch
                </a>
              </div>
            )}

            {sponsorsData.value.length > 0 && (
              <div class="space-y-16">
                {/* Platinum Sponsors */}
                {groupedSponsors.platinum.length > 0 && (
                  <div>
                    <h3 class="mb-8 text-center">
                      <span
                        class={`inline-block bg-linear-to-r ${getTierColor("platinum")} bg-clip-text text-3xl font-bold text-transparent`}
                      >
                        Platinum Sponsors
                      </span>
                    </h3>
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {groupedSponsors.platinum.map((sponsor) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group rounded-xl bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div class="flex items-center justify-center">
                            <img
                              src={sponsor.logo.asset.url}
                              alt={sponsor.name}
                              class={`${getTierSize("platinum")} w-auto object-contain transition-transform group-hover:scale-110`}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gold Sponsors */}
                {groupedSponsors.gold.length > 0 && (
                  <div>
                    <h3 class="mb-8 text-center">
                      <span
                        class={`inline-block bg-linear-to-r ${getTierColor("gold")} bg-clip-text text-2xl font-bold text-transparent`}
                      >
                        Gold Sponsors
                      </span>
                    </h3>
                    <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                      {groupedSponsors.gold.map((sponsor) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group rounded-xl bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div class="flex items-center justify-center">
                            <img
                              src={sponsor.logo.asset.url}
                              alt={sponsor.name}
                              class={`${getTierSize("gold")} w-auto object-contain transition-transform group-hover:scale-110`}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Silver Sponsors */}
                {groupedSponsors.silver.length > 0 && (
                  <div>
                    <h3 class="mb-8 text-center">
                      <span
                        class={`inline-block bg-linear-to-r ${getTierColor("silver")} bg-clip-text text-2xl font-bold text-transparent`}
                      >
                        Silver Sponsors
                      </span>
                    </h3>
                    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                      {groupedSponsors.silver.map((sponsor) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div class="flex items-center justify-center">
                            <img
                              src={sponsor.logo.asset.url}
                              alt={sponsor.name}
                              class={`${getTierSize("silver")} w-auto object-contain transition-transform group-hover:scale-110`}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bronze Sponsors */}
                {groupedSponsors.bronze.length > 0 && (
                  <div>
                    <h3 class="mb-8 text-center">
                      <span
                        class={`inline-block bg-linear-to-r ${getTierColor("bronze")} bg-clip-text text-xl font-bold text-transparent`}
                      >
                        Bronze Sponsors
                      </span>
                    </h3>
                    <div class="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-6">
                      {groupedSponsors.bronze.map((sponsor) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div class="flex items-center justify-center">
                            <img
                              src={sponsor.logo.asset.url}
                              alt={sponsor.name}
                              class={`${getTierSize("bronze")} w-auto object-contain transition-transform group-hover:scale-110`}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Partners */}
                {groupedSponsors.community.length > 0 && (
                  <div>
                    <h3 class="mb-8 text-center">
                      <span
                        class={`inline-block bg-linear-to-r ${getTierColor("community")} bg-clip-text text-xl font-bold text-transparent`}
                      >
                        Community Partners
                      </span>
                    </h3>
                    <div class="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-8">
                      {groupedSponsors.community.map((sponsor) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group rounded-lg bg-white p-3 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div class="flex items-center justify-center">
                            <img
                              src={sponsor.logo.asset.url}
                              alt={sponsor.name}
                              class={`${getTierSize("community")} w-auto object-contain transition-transform group-hover:scale-110`}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sponsorship Benefits CTA */}
            <div class="mt-16 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-lg">
              <h3 class="mb-4 text-3xl font-bold">
                Why Sponsor DevFest Nairobi?
              </h3>
              <p class="mx-auto mb-6 max-w-2xl text-lg">
                Connect with 2000+ developers, showcase your products, and
                support the growth of East Africa's tech ecosystem.
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <div class="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <div class="text-2xl font-bold">2040+</div>
                  <div class="text-sm">Attendees</div>
                </div>
                <div class="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <div class="text-2xl font-bold">40+</div>
                  <div class="text-sm">Speakers</div>
                </div>
                <div class="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <div class="text-2xl font-bold">2 Days</div>
                  <div class="text-sm">Of Innovation</div>
                </div>
                <div class="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <div class="text-2xl font-bold">15+</div>
                  <div class="text-sm">Countries</div>
                </div>
              </div>
              <div class="mt-8">
                <a
                  href="mailto:sponsors@devfestnairobi.com"
                  class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100"
                >
                  📧 Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "Sponsors - DevFest Nairobi 2025",
  meta: [
    {
      name: "description",
      content:
        "Thank you to our sponsors for making DevFest Nairobi 2025 possible. Join us in supporting East Africa's biggest developer festival.",
    },
  ],
};
