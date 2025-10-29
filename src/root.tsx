import { component$, isDev, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // Initialize Web Vitals tracking on the client side (dev mode only or on-demand)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    // Only track in development mode or when ?debug=vitals is in URL
    if (typeof window !== "undefined") {
      const isDebugMode = new URLSearchParams(window.location.search).has(
        "debug",
      );

      // Enable tracking in dev mode or with ?debug query param
      if (isDev || isDebugMode) {
        const { initWebVitals, reportCLSAttribution, reportLCPAttribution } =
          await import("./lib/web-vitals");

        // Initialize standard Web Vitals tracking
        initWebVitals();

        // Enable detailed CLS attribution reporting (shows which elements cause shifts)
        reportCLSAttribution();

        // Enable detailed LCP attribution reporting (shows which element is the LCP)
        reportLCPAttribution();
      }
    }
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        {/* Optimized font loading for better LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical font for hero text - improves LCP */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
