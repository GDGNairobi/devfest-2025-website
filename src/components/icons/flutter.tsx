import { component$ } from "@builder.io/qwik";

interface FlutterIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const FlutterIcon = component$<FlutterIconProps>(
  ({ class: className, width = "56", height = "56" }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 317"
        class={className}
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="flutter-a"
            x1="3.9517088%"
            x2="75.8970734%"
            y1="26.9930287%"
            y2="52.9192657%"
          >
            <stop offset="0%" stop-color="#000" />
            <stop offset="100%" stop-color="#000" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g>
          <polygon
            fill="#47C5FB"
            points="157.665785 0.000549356223 0.000549356223 157.665785 48.8009614 206.466197 255.267708 0.000549356223"
          />
          <polygon
            fill="#47C5FB"
            points="156.567183 145.396793 72.1487107 229.815265 121.132608 279.530905 169.842267 230.820839 255.267818 145.396793"
          />
          <polygon
            fill="#00569E"
            points="121.133047 279.531124 156.567183 314.965369 255.267818 216.264734 169.842267 230.821277"
          />
          <polygon
            fill="#00B5F8"
            points="157.665785 0.000549356223 0.000549356223 157.665785 48.8009614 206.466197 255.267708 0.000549356223"
          />
          <polygon
            fill-opacity=".85"
            fill="url(#flutter-a)"
            points="121.133047 279.531124 156.567183 314.965369 255.267818 216.264734 169.842267 230.821277"
          />
        </g>
      </svg>
    );
  },
);
