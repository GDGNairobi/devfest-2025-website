import { component$ } from "@builder.io/qwik";

interface ChromeIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const ChromeIcon = component$<ChromeIconProps>(
  ({ class: className, width = "56", height = "56" }) => {
    return (
      <svg
        role="img"
        width={width}
        height={height}
        class={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          "--chrome-red": "#EA4335",
          "--chrome-yellow": "#FBBC04",
          "--chrome-green": "#34A853",
          "--chrome-blue": "#4285F4",
        }}
      >
        <title>Google Chrome</title>
        <defs>
          <radialGradient id="chrome-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:var(--chrome-blue)" />
            <stop offset="100%" style="stop-color:#1a73e8" />
          </radialGradient>
        </defs>
        <path
          d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0z"
          fill="var(--chrome-red)"
        />
        <path
          d="M1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
          fill="var(--chrome-green)"
        />
        <path
          d="M15.273 7.636a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364z"
          fill="var(--chrome-yellow)"
        />
        <circle cx="12" cy="12" r="4.364" fill="url(#chrome-center)" />
      </svg>
    );
  },
);
