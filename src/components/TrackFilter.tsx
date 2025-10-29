import { component$ } from "@builder.io/qwik";
import type { TrackFilterProps } from "~/lib/types";
import { getTrackGradient } from "../lib/schedule.utils";

type Stage = {
  id: string;
  name: string;
  icon: string;
  category: "ai-ml" | "cloud" | "mobile-web" | "main";
};

const STAGES: Stage[] = [
  { id: "main", name: "Main Stage", icon: "🎤", category: "main" },
  { id: "ai-ml", name: "AI/ML Stage", icon: "🤖", category: "ai-ml" },
  { id: "cloud", name: "Cloud Stage", icon: "☁️", category: "cloud" },
  {
    id: "mobile-web",
    name: "Mobile & Web Stage",
    icon: "📱",
    category: "mobile-web",
  },
];

export const TrackFilter = component$<TrackFilterProps>(({ selectedStage }) => {
  return (
    <div
      class="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
      role="group"
      aria-label="Filter sessions by track"
    >
      <button
        class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
          selectedStage.value === "all"
            ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
            : "bg-white text-gray-700 shadow-sm hover:shadow-md"
        }`}
        onClick$={() => (selectedStage.value = "all")}
        type="button"
        aria-pressed={selectedStage.value === "all"}
        aria-label="Show all sessions"
      >
        All Sessions
      </button>
      {STAGES.map((stage: Stage) => (
        <button
          key={stage.id}
          class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
            selectedStage.value === stage.id
              ? `bg-linear-to-r ${getTrackGradient(stage.category)} text-white shadow-md`
              : "bg-white text-gray-700 shadow-sm hover:shadow-md"
          }`}
          onClick$={() => (selectedStage.value = stage.id)}
          type="button"
          aria-pressed={selectedStage.value === stage.id}
          aria-label={`Filter by ${stage.name}`}
        >
          <span aria-hidden="true">{stage.icon}</span> {stage.name}
        </button>
      ))}
    </div>
  );
});
