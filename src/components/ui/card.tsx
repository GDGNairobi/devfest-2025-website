import { component$, Slot } from "@builder.io/qwik";
import type { CardProps } from "~/lib/types";

export const Card = component$<CardProps>((props) => {
  const { class: className = "", elevated = false, onClick$ } = props;

  const baseClasses =
    "bg-white rounded-xl border border-gray-200 transition-all duration-200";
  const elevatedClasses = elevated
    ? "shadow-lg hover:shadow-xl"
    : "shadow-sm hover:shadow-md";
  const clickableClasses = onClick$ ? "cursor-pointer hover:scale-105" : "";

  const classes = `${baseClasses} ${elevatedClasses} ${clickableClasses} ${className}`;

  const cardProps = {
    class: classes,
    ...(onClick$ && { onClick$ }),
  };

  return (
    <div {...cardProps}>
      <Slot />
    </div>
  );
});
