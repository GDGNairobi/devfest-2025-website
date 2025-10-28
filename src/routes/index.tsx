import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout/layout";
import { HeroSection } from "~/components/sections/hero";
import { SponsorsOrganizersSection } from "~/components/sections/sponsors-organizers";
import { WhatHappeningSection } from "~/components/sections/what-happening";

export default component$(() => {
  return (
    <Layout>
      <HeroSection />

      <WhatHappeningSection />

      {/* Sponsors, Organizers & Venue Location */}
      <SponsorsOrganizersSection />

      {/* Simplified CTA Section */}
      <section class="bg-gray-900 py-20">
        <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="headline-large mb-6 font-bold text-white">
            Join East Africa's Biggest DevFest
          </h2>
          <p class="mb-8 text-xl leading-relaxed text-gray-300">
            Connect with 500+ developers, learn from world-class speakers, and
            be part of the tech revolution happening right here in Nairobi.
          </p>

          <div class="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#register"
              class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            >
              � Get Your Free Ticket
            </a>
            <a
              href="/schedule"
              class="inline-flex items-center justify-center rounded-lg border-2 border-gray-600 px-8 py-4 text-lg font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              � View Full Schedule
            </a>
          </div>

          {/* Simple stats */}
          <div class="mx-auto grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-4">
            <div class="text-center">
              <div class="mb-1 text-3xl font-bold text-blue-400">500+</div>
              <div class="text-sm text-gray-400">Developers</div>
            </div>
            <div class="text-center">
              <div class="mb-1 text-3xl font-bold text-green-400">40+</div>
              <div class="text-sm text-gray-400">Speakers</div>
            </div>
            <div class="text-center">
              <div class="mb-1 text-3xl font-bold text-purple-400">15+</div>
              <div class="text-sm text-gray-400">Countries</div>
            </div>
            <div class="text-center">
              <div class="mb-1 text-3xl font-bold text-orange-400">FREE</div>
              <div class="text-sm text-gray-400">Admission</div>
            </div>
          </div>
        </div>
      </section>
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
