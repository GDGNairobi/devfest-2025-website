import { component$ } from "@builder.io/qwik";

interface TerminalIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const TerminalIcon = component$<TerminalIconProps>(
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
          {/* Terminal window */}
          <rect
            x="20"
            y="40"
            width="216"
            height="176"
            rx="12"
            fill="#1E293B"
            opacity="0.95"
          />

          {/* Window header */}
          <rect x="20" y="40" width="216" height="32" rx="12" fill="#334155" />
          <circle cx="40" cy="56" r="6" fill="#EF4444" />
          <circle cx="60" cy="56" r="6" fill="#F59E0B" />
          <circle cx="80" cy="56" r="6" fill="#10B981" />

          {/* Terminal prompt and cursor */}
          <text
            x="35"
            y="105"
            font-family="monospace"
            font-size="18"
            fill="#10B981"
          >
            &gt;
          </text>
          <rect x="50" y="90" width="10" height="20" fill="#10B981">
            <animate
              attributeName="opacity"
              values="1;0;1"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Code lines */}
          <line
            x1="35"
            y1="130"
            x2="120"
            y2="130"
            stroke="#60A5FA"
            stroke-width="3"
            opacity="0.8"
          />
          <line
            x1="35"
            y1="150"
            x2="180"
            y2="150"
            stroke="#A78BFA"
            stroke-width="3"
            opacity="0.8"
          />
          <line
            x1="35"
            y1="170"
            x2="90"
            y2="170"
            stroke="#F472B6"
            stroke-width="3"
            opacity="0.8"
          />
          <line
            x1="35"
            y1="190"
            x2="150"
            y2="190"
            stroke="#34D399"
            stroke-width="3"
            opacity="0.8"
          />
        </g>
      </svg>
    );
  },
);
