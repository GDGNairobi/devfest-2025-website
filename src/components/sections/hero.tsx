import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { FloatingTechIcon } from "~/components/floating-tech-icon";
import { Button } from "~/components/ui/button";
import { floatingIconsConfig } from "~/config/floating-icons";

/**
 * Technology category configuration for hero section.
 * Each category contains tags with gradient color schemes.
 */
// Define technology categories with Google-focused technologies
const techCategories = [
  {
    name: "AI & Machine Learning",
    tags: [
      { label: "Gemini AI", gradient: "from-blue-500 to-purple-600" },
      { label: "Gemma", gradient: "from-purple-500 to-pink-600" },
      { label: "TensorFlow", gradient: "from-orange-500 to-red-600" },
      { label: "Vertex AI", gradient: "from-blue-600 to-cyan-500" },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    tags: [
      { label: "Google Cloud", gradient: "from-blue-400 to-cyan-500" },
      { label: "Kubernetes", gradient: "from-blue-600 to-indigo-600" },
      { label: "Cloud Run", gradient: "from-cyan-500 to-blue-600" },
      { label: "BigQuery", gradient: "from-blue-500 to-purple-500" },
    ],
  },
  {
    name: "Mobile & Web",
    tags: [
      { label: "Android", gradient: "from-green-500 to-green-600" },
      { label: "Flutter", gradient: "from-blue-400 to-cyan-400" },
      { label: "Chrome", gradient: "from-red-500 to-yellow-500" },
      { label: "Angular", gradient: "from-red-600 to-pink-600" },
    ],
  },
  {
    name: "Developer Tools",
    tags: [
      { label: "Firebase", gradient: "from-yellow-500 to-orange-500" },
      { label: "Cloud Build", gradient: "from-blue-500 to-indigo-600" },
      { label: "DevOps", gradient: "from-indigo-500 to-purple-600" },
      { label: "Workspace APIs", gradient: "from-green-500 to-blue-500" },
    ],
  },
];

/**
 * HeroSection displays the main hero banner on the homepage.
 *
 * Features:
 * - Large event title with gradient text effects
 * - Event date, time, and venue information
 * - Animated floating technology icons (Android, Firebase, Flutter, etc.)
 * - Animated technology tags grouped by category
 * - Dual call-to-action buttons (Register Now, View Schedule)
 * - Responsive design with mobile-first approach
 * - Custom keyframe animations for floating and fade-in effects
 * - Nairobi skyline illustration
 *
 * Technology Categories:
 * - AI & Machine Learning (Gemini, TensorFlow, Vertex AI)
 * - Cloud & Infrastructure (Google Cloud, Kubernetes, Cloud Run)
 * - Mobile & Web (Android, Flutter, Chrome, Angular)
 * - Developer Tools (Firebase, Cloud Build, DevOps)
 *
 * Animation Effects:
 * - Floating icons with CSS animations
 * - Staggered fade-in animations for tech tags
 * - Smooth hover transitions on buttons and tags
 * - Client-side animation initialization via useVisibleTask$
 *
 * @component
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Time element with machine-readable datetime attribute
 * - Focus visible states on all interactive elements
 * - High contrast text and gradients for readability
 * - Descriptive button labels
 *
 * @performance
 * - useVisibleTask$ for client-side only animations (avoids SSR issues)
 * - CSS animations for GPU acceleration
 * - Lazy-loaded floating icons via FloatingTechIcon component
 * - Optimized gradient rendering with linear-to-* utilities
 */
export const HeroSection = component$(() => {
  useStyles$(`
    @keyframes float {
      0% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
      }
      25% {
        transform: translateY(-60px) translateX(25px) rotate(8deg);
      }
      50% {
        transform: translateY(-100px) translateX(0px) rotate(0deg);
      }
      75% {
        transform: translateY(-60px) translateX(-25px) rotate(-8deg);
      }
      100% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
      }
    }
    
    @keyframes float-alt {
      0% {
        transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
      }
      20% {
        transform: translateY(-40px) translateX(-20px) rotate(-6deg) scale(1.15);
      }
      40% {
        transform: translateY(-70px) translateX(-35px) rotate(-10deg) scale(1);
      }
      60% {
        transform: translateY(-70px) translateX(20px) rotate(6deg) scale(1.15);
      }
      80% {
        transform: translateY(-40px) translateX(35px) rotate(10deg) scale(1);
      }
      100% {
        transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
      }
    }
    
    @keyframes float-bounce {
      0%, 100% {
        transform: translateY(0px) scale(1);
      }
      10% {
        transform: translateY(-25px) scale(1.15);
      }
      20% {
        transform: translateY(-45px) scale(1.08);
      }
      30% {
        transform: translateY(-65px) scale(1.18);
      }
      40% {
        transform: translateY(-85px) scale(1.08);
      }
      50% {
        transform: translateY(-105px) scale(1);
      }
      60% {
        transform: translateY(-85px) scale(1.08);
      }
      70% {
        transform: translateY(-65px) scale(1.18);
      }
      80% {
        transform: translateY(-45px) scale(1.08);
      }
      90% {
        transform: translateY(-25px) scale(1.15);
      }
    }
    
    .floating-icon {
      transition: transform 0.3s ease-out;
      filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
      animation-timing-function: ease-in-out;
    }
    
    .floating-icon:hover {
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25));
      animation-play-state: paused !important;
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 15px 2px currentColor;
        transform: scale(1.05);
      }
    }
    
    .theme-tag {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .theme-tag:hover {
      animation: pulse-glow 0.6s ease-in-out;
      transform: translateY(-2px);
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOutDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
    
    .category-enter {
      animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .category-exit {
      animation: fadeOutDown 0.5s ease-out forwards;
    }
  `);

  // State for day selection and category rotation
  const selectedDay = useSignal<1 | 2>(1);
  const currentCategoryIndex = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      currentCategoryIndex.value =
        (currentCategoryIndex.value + 1) % techCategories.length;
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  });

  return (
    <section class="relative min-h-screen overflow-hidden bg-white">
      {/* Floating Tech Icons with Animation */}
      {floatingIconsConfig.map((config, index) => (
        <FloatingTechIcon key={index} config={config} />
      ))}
      {/* Main Content - Centered */}
      <div class="relative z-20 flex min-h-screen items-center justify-center px-4">
        <div class="mx-auto max-w-4xl text-center">
          {/* DevFest Logo/Badge */}
          <div class="mb-8 inline-block">
            <div class="mb-2 text-4xl font-semibold text-gray-900 md:text-8xl">
              DevFest Nairobi 2025
            </div>
          </div>

          {/* Day Switcher */}
          <div class="mb-6 flex justify-center">
            <div
              class="inline-flex rounded-xl bg-gray-200 p-1.5 shadow-sm"
              role="group"
              aria-label="Select event day"
            >
              <button
                onClick$={() => (selectedDay.value = 1)}
                type="button"
                aria-pressed={selectedDay.value === 1}
                aria-label="View Day 1 - October 31, 2025"
                class={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                  selectedDay.value === 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                DAY 1
              </button>
              <button
                onClick$={() => (selectedDay.value = 2)}
                type="button"
                aria-pressed={selectedDay.value === 2}
                aria-label="View Day 2 - November 1, 2025"
                class={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                  selectedDay.value === 2
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                DAY 2
              </button>
            </div>
          </div>

          {/* Event Details - Dynamic based on selected day */}
          <div class="mb-6 space-y-2">
            <p class="text-xl font-semibold text-gray-700 md:text-2xl">
              🗓️{" "}
              {selectedDay.value === 1
                ? "October 31, 2025"
                : "November 1, 2025"}
            </p>
            <p class="text-lg text-gray-600 md:text-xl">
              ⏰ 8:00 AM – 5:00 PM (EAT) • Day {selectedDay.value} of 2
            </p>
            <p class="text-lg text-gray-600 md:text-xl">
              📍{" "}
              {selectedDay.value === 1
                ? "Simba Corporation Aspire Center Westlands"
                : "The Sarit Expo Centre, Nairobi"}
            </p>
          </div>

          {/* Stats - Replace description */}
          <div class="mx-auto mb-10 grid max-w-md grid-cols-2 gap-6">
            <div class="text-center">
              <div class="mb-2 text-4xl font-bold text-blue-600 md:text-5xl">
                2040+
              </div>
              <div class="text-sm font-semibold text-gray-700 md:text-base">
                Attendees
              </div>
              <div class="text-xs text-gray-500">Across East Africa</div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-4xl font-bold text-green-600 md:text-5xl">
                40+
              </div>
              <div class="text-sm font-semibold text-gray-700 md:text-base">
                Speakers
              </div>
              <div class="text-xs text-gray-500">Industry Experts</div>
            </div>
          </div>

          {/* Key Themes - Animated Category Carousel */}
          <div class="mb-10">
            <div class="mb-3 text-center">
              <span class="text-sm font-semibold text-gray-500">
                {techCategories[currentCategoryIndex.value].name}
              </span>
            </div>
            <div
              key={currentCategoryIndex.value}
              class="category-enter flex flex-wrap justify-center gap-3"
            >
              {techCategories[currentCategoryIndex.value].tags.map(
                (tag, idx) => (
                  <span
                    key={idx}
                    class={`theme-tag rounded-full bg-linear-to-r ${tag.gradient} px-4 py-2 text-sm font-semibold text-white shadow-md`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {tag.label}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="https://gdg.community.dev/events/details/google-gdg-nairobi-presents-devfest-nairobi-day-two/"
              variant="primary"
              size="large"
              class="bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-700"
            >
              🎫 RSVP Now - It's FREE!
            </Button>
            <Button
              href="/schedule"
              variant="outline"
              size="large"
              class="border-2 border-gray-900 px-8 py-4 text-lg text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              📅 View Full Schedule
            </Button>
          </div>

          {/* RSVP Count */}
          <div class="mt-8">
            <p class="text-sm text-gray-600 md:text-base">
              <span class="text-2xl font-bold text-blue-600">2040+</span>{" "}
              developers already registered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
