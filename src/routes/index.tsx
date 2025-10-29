import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import { HeroSection } from "~/components/sections/hero";
import { SponsorsOrganizersSection } from "~/components/sections/sponsors-organizers";
import { WhatHappeningSection } from "~/components/sections/what-happening";
import { getSponsors, getVenueLocations } from "~/lib/sanity";

export const useHomeDataLoader = routeLoader$(async () => {
  try {
    const [sponsors, venues] = await Promise.all([
      getSponsors(),
      getVenueLocations(),
    ]);
    return { sponsors, venues };
  } catch (error) {
    console.error("Failed to load home data:", error);
    return { sponsors: [], venues: [] };
  }
});

export default component$(() => {
  const homeData = useHomeDataLoader();

  return (
    <Layout>
      <HeroSection />

      <WhatHappeningSection />

      {/* Sponsors, Organizers & Venue Location */}
      <SponsorsOrganizersSection
        sponsors={homeData.value.sponsors}
        venues={homeData.value.venues}
      />
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "DevFest Nairobi 2025 - East Africa's Biggest Developer Festival",
  meta: [
    {
      name: "description",
      content:
        "Join DevFest Nairobi 2025 - East Africa's biggest developer festival. Two days of learning, networking, and innovation with 500+ developers and world-class speakers.",
    },
    {
      name: "keywords",
      content:
        "DevFest, Nairobi, Kenya, Developer Conference, Google Developer Group, GDG, Technology, AI, Web Development, Mobile Development, Cloud Computing",
    },
    {
      property: "og:title",
      content:
        "DevFest Nairobi 2025 - East Africa's Biggest Developer Festival",
    },
    {
      property: "og:description",
      content:
        "Together we grow, together we build! Join East Africa's biggest developer festival for two days of innovation.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "DevFest Nairobi 2025",
    },
    {
      name: "twitter:description",
      content:
        "East Africa's biggest developer festival - March 15-16, 2025 in Nairobi, Kenya",
    },
  ],
};
