import { component$, type Signal } from "@builder.io/qwik";
import { getTrackGradient } from "../lib/schedule.utils";

interface TrackFilterProps {
  selectedStage: Signal<string>;
}

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
    <div class="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
      <button
        class={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
          selectedStage.value === "all"
            ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
            : "bg-white text-gray-700 shadow-sm hover:shadow-md"
        }`}
        onClick$={() => (selectedStage.value = "all")}
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
        >
          {stage.icon} {stage.name}
        </button>
      ))}
    </div>
  );
});
