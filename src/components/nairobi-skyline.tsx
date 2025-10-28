import { component$ } from "@builder.io/qwik";

export const NaiobiSkyline = component$(() => {
  return (
    <div class="pointer-events-none absolute right-0 bottom-0 left-0 z-1">
      <svg
        viewBox="0 0 1200 300"
        class="h-auto w-full opacity-30"
        style="height: 200px;"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* KICC Tower - Iconic cylindrical tower */}
        <g transform="translate(550, 50)">
          {/* Main cylindrical tower */}
          <rect
            x="0"
            y="0"
            width="60"
            height="150"
            fill="#E5E7EB"
            stroke="#374151"
            stroke-width="3"
          />
          {/* Conference center top */}
          <path
            d="M -8 0 L 68 0 L 60 -15 L 0 -15 Z"
            fill="#D1D5DB"
            stroke="#374151"
            stroke-width="3"
          />
          {/* Helipad circle */}
          <circle
            cx="30"
            cy="-8"
            r="10"
            fill="#F3F4F6"
            stroke="#374151"
            stroke-width="2"
          />
        </g>

        {/* UAP Tower (Old Mutual Tower) - Tall modern building */}
        <g transform="translate(400, 70)">
          <rect
            x="0"
            y="0"
            width="45"
            height="130"
            fill="#E5E7EB"
            stroke="#374151"
            stroke-width="3"
          />
          <rect
            x="8"
            y="-8"
            width="30"
            height="8"
            fill="#D1D5DB"
            stroke="#374151"
            stroke-width="2"
          />
        </g>

        {/* Times Tower - Historic building */}
        <g transform="translate(680, 90)">
          <rect
            x="0"
            y="0"
            width="40"
            height="110"
            fill="#E5E7EB"
            stroke="#374151"
            stroke-width="3"
          />
          <polygon
            points="0,0 20,-15 40,0"
            fill="#D1D5DB"
            stroke="#374151"
            stroke-width="2"
          />
        </g>

        {/* Teleposta Towers */}
        <g transform="translate(780, 110)">
          <rect
            x="0"
            y="0"
            width="35"
            height="90"
            fill="#E5E7EB"
            stroke="#4B5563"
            stroke-width="2"
          />
          <rect
            x="40"
            y="0"
            width="35"
            height="90"
            fill="#E5E7EB"
            stroke="#4B5563"
            stroke-width="2"
          />
        </g>

        {/* Smaller buildings for depth - Left side */}
        <g transform="translate(250, 130)">
          <rect
            x="0"
            y="0"
            width="30"
            height="70"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            stroke-width="2"
          />
        </g>
        <g transform="translate(290, 150)">
          <rect
            x="0"
            y="0"
            width="25"
            height="50"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            stroke-width="2"
          />
        </g>

        {/* Smaller buildings for depth - Right side */}
        <g transform="translate(880, 140)">
          <rect
            x="0"
            y="0"
            width="28"
            height="60"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            stroke-width="2"
          />
        </g>
        <g transform="translate(920, 120)">
          <rect
            x="0"
            y="0"
            width="32"
            height="80"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            stroke-width="2"
          />
        </g>

        {/* Ground line */}
        <line
          x1="0"
          y1="200"
          x2="1200"
          y2="200"
          stroke="#9CA3AF"
          stroke-width="3"
          opacity="0.5"
        />
      </svg>
    </div>
  );
});
