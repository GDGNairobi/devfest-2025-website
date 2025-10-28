import { component$ } from "@builder.io/qwik";

interface AngularIconProps {
  class?: string;
  width?: string;
  height?: string;
}

export const AngularIcon = component$<AngularIconProps>(
  ({ class: className, width = "56", height = "56" }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 272"
        class={className}
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M0.0996108949,45.522179 L125.908171,0.697276265 L255.103502,44.7252918 L234.185214,211.175097 L125.908171,271.140856 L19.3245136,211.971984 L0.0996108949,45.522179 Z"
            fill="#E23237"
          />
          <path
            d="M255.103502,44.7252918 L125.908171,0.697276265 L125.908171,271.140856 L234.185214,211.274708 L255.103502,44.7252918 L255.103502,44.7252918 Z"
            fill="#B52E31"
          />
          <path
            d="M126.107393,32.2659443 L126.107393,32.2659443 L54.8338273,211.073085 L54.8338273,211.073085 L83.8396459,211.073085 L83.8396459,211.073085 L97.9043226,165.727113 L154.310461,165.727113 L168.375138,211.073085 L197.381351,211.073085 L126.207004,32.2659443 L126.107393,32.2659443 Z M126.306616,88.0044901 L145.224904,138.084859 L107.388328,138.084859 L126.306616,88.0044901 L126.306616,88.0044901 Z"
            fill="#FFF"
          />
        </g>
      </svg>
    );
  },
);
