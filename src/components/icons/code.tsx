import { component$ } from "@builder.io/qwik";

interface CodeIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const CodeIcon = component$<CodeIconProps>(
  ({ class: className, width = "56", height = "56" }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 256"
        class={className}
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Code brackets and symbols */}
          {/* Left angle bracket < */}
          <path
            d="M90 60 L40 128 L90 196"
            fill="none"
            stroke="#4285F4"
            stroke-width="16"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          {/* Right angle bracket > */}
          <path
            d="M166 60 L216 128 L166 196"
            fill="none"
            stroke="#34A853"
            stroke-width="16"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          {/* Forward slash / */}
          <line
            x1="150"
            y1="40"
            x2="106"
            y2="216"
            stroke="#FBBC04"
            stroke-width="14"
            stroke-linecap="round"
          />

          {/* Decorative dots */}
          <circle cx="128" cy="128" r="8" fill="#EA4335" opacity="0.8" />
          <circle cx="95" cy="105" r="5" fill="#4285F4" opacity="0.6" />
          <circle cx="161" cy="105" r="5" fill="#34A853" opacity="0.6" />
          <circle cx="95" cy="151" r="5" fill="#FBBC04" opacity="0.6" />
          <circle cx="161" cy="151" r="5" fill="#EA4335" opacity="0.6" />
        </g>
      </svg>
    );
  },
);
