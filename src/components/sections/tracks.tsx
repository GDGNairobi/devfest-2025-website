import { component$ } from "@builder.io/qwik";

export const TracksSection = component$(() => {
  return (
    <section class="relative overflow-hidden bg-linear-to-b from-white to-gray-50 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            What's Happening This Year?
          </h2>
          <p class="mx-auto max-w-3xl text-xl text-gray-600">
            Explore cutting-edge Google technologies and their transformative
            intersection with AI across multiple tracks.
          </p>
        </div>

        {/* Card Stack Container */}
        <div class="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Gemini AI & Machine Learning */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(-2deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 to-blue-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-blue-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-500 to-blue-700 shadow-xl">
                  <span class="text-4xl">✨</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Gemini AI & ML
                </h3>
                <p class="mb-6 text-gray-700">
                  Harness the power of Google's Gemini AI for intelligent
                  applications. Learn multimodal AI, prompt engineering, and
                  real-world implementations.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Gemini API
                  </span>
                  <span class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    TensorFlow
                  </span>
                  <span class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Vertex AI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Firebase & AI Integration */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(1deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-50 to-orange-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-orange-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500 to-amber-600 shadow-xl">
                  <span class="text-4xl">🔥</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Firebase AI Apps
                </h3>
                <p class="mb-6 text-gray-700">
                  Build intelligent, real-time applications with Firebase + AI.
                  Cloud Functions, Firestore, and AI Extensions for rapid
                  development.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Firebase
                  </span>
                  <span class="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    GenKit
                  </span>
                  <span class="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Extensions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Flutter & On-Device AI */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(-1deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-cyan-50 to-blue-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-cyan-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-xl">
                  <span class="text-4xl">📱</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Flutter AI Mobile
                </h3>
                <p class="mb-6 text-gray-700">
                  Create beautiful cross-platform apps with on-device AI
                  capabilities. ML Kit, TensorFlow Lite, and Flutter
                  integration.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Flutter
                  </span>
                  <span class="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    ML Kit
                  </span>
                  <span class="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    TF Lite
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Angular & Modern Web AI */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(2deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-red-50 to-pink-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-red-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-red-500 to-pink-600 shadow-xl">
                  <span class="text-4xl">⚡</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Angular AI Web Apps
                </h3>
                <p class="mb-6 text-gray-700">
                  Build modern, intelligent web applications with Angular and
                  AI. Signals, server-side rendering, and AI-powered features.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Angular
                  </span>
                  <span class="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Analog
                  </span>
                  <span class="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    SSR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Cloud AI Platform */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(-1.5deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-green-50 to-emerald-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-green-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-green-500 to-emerald-600 shadow-xl">
                  <span class="text-4xl">☁️</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Cloud AI Solutions
                </h3>
                <p class="mb-6 text-gray-700">
                  Scale AI applications with Google Cloud Platform. Vertex AI,
                  Cloud Run, and enterprise-grade ML infrastructure.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    GCP
                  </span>
                  <span class="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Vertex AI
                  </span>
                  <span class="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Cloud Run
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Android AI Development */}
          <div
            class="transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0"
            style="transform: rotate(1.5deg);"
          >
            <div class="group relative overflow-hidden rounded-3xl bg-linear-to-br from-lime-50 to-green-100 p-8 shadow-2xl">
              <div class="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-lime-200 opacity-30"></div>
              <div class="relative">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-lime-500 to-green-600 shadow-xl">
                  <span class="text-4xl">🤖</span>
                </div>
                <h3 class="mb-3 text-2xl font-bold text-gray-900">
                  Android AI Native
                </h3>
                <p class="mb-6 text-gray-700">
                  Native Android development with AI-first approach. Jetpack
                  Compose, Kotlin coroutines, and on-device ML models.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Android
                  </span>
                  <span class="rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Kotlin
                  </span>
                  <span class="rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Compose
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div class="mt-16 text-center">
          <p class="mb-6 text-lg text-gray-600">
            Plus workshops, lightning talks, and hands-on labs across all tracks
          </p>
          <a
            href="/schedule"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
          >
            📅 View Full Schedule
          </a>
        </div>
      </div>
    </section>
  );
});
