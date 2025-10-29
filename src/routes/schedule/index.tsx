import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

// Redirect to day 1 by default
export const useRedirect = routeLoader$(({ redirect }) => {
  throw redirect(302, "/schedule/day-1");
});

export default component$(() => {
  // This component won't be rendered due to redirect
  return <div />;
});
