import { component$ } from "@builder.io/qwik";

export const WhatHappeningSection = component$(() => {
  const tracks = [
    {
      title: "AI-Powered Applications",
      description:
        "Build intelligent applications using Gemini API, Firebase ML, and TensorFlow. Learn practical approaches to integrate AI into real-world solutions.",
      icon: "🤖",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      tags: ["Gemini", "TensorFlow", "Firebase ML"],
      rotation: "-1deg",
    },
    {
      title: "Modern Web with AI",
      description:
        "Discover how Angular, Chrome DevTools, and Web AI APIs are transforming user experiences with intelligent features and better performance.",
      icon: "🌐",
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      tags: ["Angular", "Web AI", "Chrome"],
      rotation: "1.5deg",
    },
    {
      title: "Mobile Intelligence",
      description:
        "Create smarter mobile apps with Flutter and Android ML Kit. From on-device processing to cloud-based AI services.",
      icon: "📱",
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100",
      tags: ["Flutter", "Android", "ML Kit"],
      rotation: "-1.5deg",
    },
    {
      title: "Cloud AI Solutions",
      description:
        "Scale your AI applications with Google Cloud's Vertex AI, serverless functions, and managed infrastructure for production workloads.",
      icon: "☁️",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      tags: ["Google Cloud", "Vertex AI", "Functions"],
      rotation: "1deg",
    },
    {
      title: "Data & ML Pipelines",
      description:
        "Learn to build robust data pipelines, train models efficiently, and deploy ML solutions that scale with BigQuery and TensorFlow.",
      icon: "📊",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      tags: ["BigQuery", "TensorFlow", "Pipelines"],
      rotation: "-0.5deg",
    },
    {
      title: "Developer Productivity",
      description:
        "Enhance your workflow with AI-assisted coding tools, automated testing, and intelligent DevOps practices using Google's developer tools.",
      icon: "🛠️",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      tags: ["DevTools", "CI/CD", "AI Assist"],
      rotation: "0.5deg",
    },
  ];

  return (
    <section class="bg-gray-50 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
          <h2 class="headline-large mb-4 font-bold text-gray-900">
            What's Happening This Year?
          </h2>
          <p class="mx-auto max-w-3xl text-xl text-gray-600">
            Two days of incredible content across multiple tracks, bringing
            together East Africa's brightest minds in technology.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <div
              key={index}
              class={`group rounded-xl bg-linear-to-br ${track.bgGradient} p-8 shadow-sm transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-lg`}
              style={`transform: rotate(${track.rotation});`}
            >
              <div
                class={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${track.gradient} shadow-md`}
              >
                <span class="text-3xl">{track.icon}</span>
              </div>
              <h3 class="title-large mb-3 font-semibold text-gray-900">
                {track.title}
              </h3>
              <p class="mb-6 leading-relaxed text-gray-700">
                {track.description}
              </p>
              <div class="flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    class="rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-gray-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
