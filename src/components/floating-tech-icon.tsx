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

/**
 * Configuration interface for floating icon positioning and animation.
 */
export interface FloatingIconConfig {
  /** Name of the icon component to render */
  component: string;
  /** Accessible label for the icon */
  label: string;
  /** Horizontal position as percentage (0-100) */
  x: number;
  /** Vertical position as percentage (0-100) */
  y: number;
  /** Animation start delay in seconds */
  delay: number;
  /** Animation duration/speed in seconds */
  speed: number;
  /** Type of floating animation to apply */
  animationType?: "float" | "float-alt" | "float-bounce";
}

/**
 * Map of icon names to their respective components.
 */
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

/**
 * FloatingTechIcon renders animated technology icons with configurable positioning.
 *
 * Features:
 * - Absolute positioning based on percentage coordinates
 * - Three animation types: float, float-alt, float-bounce
 * - Configurable animation speed and delay for staggered effects
 * - Responsive sizing (smaller on mobile, larger on desktop)
 * - Special larger sizing for Android icon
 * - Semi-transparent (40% opacity) for background effect
 * - Pointer events disabled (doesn't interfere with user interaction)
 * - Falls back to GoogleIcon if component name not found
 *
 * Supported Icons:
 * - Firebase, Google Cloud, Google Developers
 * - TensorFlow, Flutter, Angular, Android
 * - Gemini, Gemma, Chrome
 * - Code, Terminal, Google, Vertex AI
 *
 * Animation Types:
 * - float: Gentle vertical floating
 * - float-alt: Alternative floating pattern
 * - float-bounce: Bouncing float effect
 *
 * Sizing:
 * - Default: h-14 w-14 (mobile), h-20 w-20 (desktop)
 * - Android: h-20 w-20 (mobile), h-28 w-28 (desktop)
 *
 * @component
 *
 * @param props - Component properties
 * @param props.config - Icon configuration object
 *
 * @example
 * ```tsx
 * const config = {
 *   component: "Firebase",
 *   label: "Firebase",
 *   x: 20,
 *   y: 30,
 *   delay: 0,
 *   speed: 3,
 *   animationType: "float"
 * };
 * <FloatingTechIcon config={config} />
 * ```
 *
 * @accessibility
 * - Icons are decorative (pointer-events-none, low opacity)
 * - Label property available for context
 * - Does not interfere with interactive elements
 *
 * @performance
 * - CSS animations for GPU acceleration
 * - Absolute positioning avoids layout recalculations
 * - pointer-events-none prevents unnecessary event handling
 * - Staggered delays prevent animation clustering
 */
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
