import { component$ } from "@builder.io/qwik";

interface FirebaseIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const FirebaseIcon = component$<FirebaseIconProps>(
  ({ class: className, width = "56", height = "56" }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 351"
        class={className}
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="firebase-a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="17.5" />
            <feOffset dx="0" dy="0" result="shadowOffsetOuter1" />
            <feColorMatrix
              in="shadowOffsetOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
            />
          </filter>
          <path
            id="firebase-b"
            d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188L1.253 280.732z"
          />
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            fill="#FFC24A"
            d="M0 282.998l2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951L0 282.998z"
          />
          <use fill="#FFA712" fill-rule="evenodd" href="#firebase-b" />
          <use filter="url(#firebase-a)" href="#firebase-b" />
          <path
            fill="#F4BD62"
            d="M135.005 150.38l32.955-33.75-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 87.287v2.86l32.584 60.233z"
          />
          <path
            fill="#FFA50E"
            d="M.005 282.974L33.99 89.512l69.037-89.512L.005 282.974z"
          />
          <path
            fill="#F6820C"
            d="M139.121 347.551l116.275-64.847-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L.254 282.16l115.608 64.184a24.126 24.126 0 0 0 23.259.207"
          />
          <path
            fill="#FDE068"
            d="M254.354 282.16L221.402 79.218l-1.03-11.447c-1.065-6.447-8.988-8.918-13.468-4.34L1.286 282.16l114.176 64.847a24.126 24.126 0 0 0 23.259.207l115.633-64.854z"
          />
          <path
            fill="#FCCA3F"
            d="M139.12 345.64a24.126 24.126 0 0 1-23.258-.207L.931 282.015l-.93.31 115.607 64.184a24.126 24.126 0 0 0 23.259.207l116.275-64.847-.285-1.752-115.737 65.524z"
          />
          <path
            fill="#EEAB37"
            d="M254.354 282.16L221.402 79.218c-1.039-6.398-8.888-8.927-13.468-4.34L.254 282.16l115.608 64.184a24.126 24.126 0 0 0 23.259.207l115.233-64.391z"
          />
        </g>
      </svg>
    );
  },
);
