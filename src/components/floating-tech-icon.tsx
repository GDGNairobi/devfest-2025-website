import { component$ } from "@builder.io/qwik";
import {
  AndroidIcon,
  AngularIcon,
  ChromeIcon,
  CodeIcon,
  FirebaseIcon,
  FlutterIcon,
  GeminiIcon,
  GemmaIcon,
  GoogleCloudIcon,
  GoogleDevelopersIcon,
  GoogleIcon,
  TensorFlowIcon,
  TerminalIcon,
  VertexAIIcon,
} from "~/components/icons";
import type { FloatingTechIconProps } from "~/lib/types";

export interface FloatingIconConfig {
  component: string;
  label: string;
  x: number;
  y: number;
  delay: number;
  speed: number;
  animationType?: "float" | "float-alt" | "float-bounce";
}

const ICON_COMPONENTS = {
  Firebase: FirebaseIcon,
  GoogleCloud: GoogleCloudIcon,
  GoogleDevelopers: GoogleDevelopersIcon,
  TensorFlow: TensorFlowIcon,
  Flutter: FlutterIcon,
  Angular: AngularIcon,
  Android: AndroidIcon,
  Gemini: GeminiIcon,
  Gemma: GemmaIcon,
  Chrome: ChromeIcon,
  // DevFest: DevFestIcon,
  Code: CodeIcon,
  Terminal: TerminalIcon,
  Google: GoogleIcon,
  VertexAI: VertexAIIcon,
} as const;

export const FloatingTechIcon = component$<FloatingTechIconProps>(
  ({ config }) => {
    const IconComponent =
      ICON_COMPONENTS[config.component as keyof typeof ICON_COMPONENTS] ||
      GoogleIcon;

    const animationType = config.animationType || "float";

    // Make Android icon bigger
    const iconSize =
      config.component === "Android"
        ? "h-20 w-20 opacity-40 md:h-28 md:w-28"
        : "h-14 w-14 opacity-40 md:h-20 md:w-20";

    return (
      <div
        class="floating-icon pointer-events-none absolute"
        style={{
          top: `${config.y}%`,
          left: `${config.x}%`,
          animation: `${animationType} ${config.speed}s ease-in-out ${config.delay}s infinite`,
        }}
      >
        <IconComponent class={iconSize} />
      </div>
    );
  },
);
