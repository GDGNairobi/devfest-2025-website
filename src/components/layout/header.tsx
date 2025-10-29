import { $, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { GoogleDevelopersIcon } from "~/components/icons";
import type { NavItem } from "~/lib/types";

export const Header = component$(() => {
  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const closeMenu = $(() => {
    isMenuOpen.value = false;
  });

  const handleKeyDown = $((event: KeyboardEvent) => {
    if (event.key === "Escape" && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  });

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Speakers", href: "/speakers" },
    { label: "Schedule", href: "/schedule" },
    { label: "Sponsors", href: "/sponsors" },
  ];

  return (
    <header class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div class="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            class="flex items-center space-x-3"
            aria-label="DevFest Nairobi 2025 Home"
          >
            <GoogleDevelopersIcon class="h-10 w-10" aria-hidden="true" />
            <div class="hidden sm:block" aria-hidden="true">
              <span class="text-xl font-bold text-gray-900">
                DevFest Nairobi
              </span>
              <span class="block text-sm text-gray-600">2025</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div class="hidden items-center space-x-8 md:flex" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                class="font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div class="hidden items-center space-x-4 md:flex">
            <Link
              href="https://store.devfestnairobi.com"
              target="_blank"
              rel="noopener noreferrer"
              class="transform rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Get DevFest Nairobi merchandise"
            >
              🛍️ Get Merch
            </Link>
            <Link
              href="https://gdg.community.dev/events/details/google-gdg-nairobi-presents-devfest-nairobi-day-two/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Register for DevFest Nairobi 2025"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick$={toggleMenu}
            onKeyDown$={handleKeyDown}
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset md:hidden"
            aria-expanded={isMenuOpen.value}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen.value ? "Close menu" : "Open menu"}
            type="button"
          >
            {/* Hamburger icon */}
            <svg
              class={`${isMenuOpen.value ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close icon */}
            <svg
              class={`${isMenuOpen.value ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          class={`md:hidden ${isMenuOpen.value ? "block" : "hidden"}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div class="space-y-1 border-t border-gray-200 bg-white px-2 pt-2 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                class="block rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                onClick$={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div class="space-y-2 border-t border-gray-200 pt-4">
              <Link
                href="https://store.devfestnairobi.com"
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-full bg-yellow-400 px-3 py-2 text-center font-semibold text-black hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-inset"
                aria-label="Get DevFest Nairobi merchandise"
              >
                🛍️ Get Merch
              </Link>
              <Link
                href="https://gdg.community.dev/events/details/google-gdg-nairobi-presents-devfest-nairobi-day-two/"
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-full bg-blue-600 px-3 py-2 text-center font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                aria-label="Register for DevFest Nairobi 2025"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});
