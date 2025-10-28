import { component$ } from "@builder.io/qwik";

interface DevFestIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const DevFestIcon = component$<DevFestIconProps>(
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
        <defs>
          <linearGradient
            id="devfest-grad1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#4285F4" />
            <stop offset="33%" stop-color="#34A853" />
            <stop offset="66%" stop-color="#FBBC04" />
            <stop offset="100%" stop-color="#EA4335" />
          </linearGradient>
        </defs>
        <g>
          {/* Rocket shape for DevFest */}
          <path
            d="M128 20 L140 50 L160 45 L150 70 L175 75 L160 95 L180 110 L155 115 L145 140 L128 120 L111 140 L101 115 L76 110 L96 95 L81 75 L106 70 L96 45 L116 50 L128 20 Z"
            fill="url(#devfest-grad1)"
            opacity="0.9"
          />

          {/* Center circle */}
          <circle cx="128" cy="95" r="25" fill="#4285F4" />
          <circle cx="128" cy="95" r="15" fill="#FFF" opacity="0.9" />

          {/* Bottom flames */}
          <ellipse
            cx="128"
            cy="155"
            rx="20"
            ry="30"
            fill="#EA4335"
            opacity="0.8"
          />
          <ellipse
            cx="128"
            cy="165"
            rx="15"
            ry="25"
            fill="#FBBC04"
            opacity="0.8"
          />
          <ellipse
            cx="128"
            cy="175"
            rx="10"
            ry="20"
            fill="#FFF"
            opacity="0.7"
          />

          {/* Side decorations */}
          <circle cx="90" cy="95" r="8" fill="#34A853" opacity="0.7" />
          <circle cx="166" cy="95" r="8" fill="#FBBC04" opacity="0.7" />
          <circle cx="105" cy="70" r="6" fill="#EA4335" opacity="0.6" />
          <circle cx="151" cy="70" r="6" fill="#4285F4" opacity="0.6" />
        </g>
      </svg>
    );
  },
);
