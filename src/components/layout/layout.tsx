import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <Header />
      <main class="flex-1 pt-16">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
