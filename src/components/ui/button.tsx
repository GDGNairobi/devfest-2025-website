import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ButtonProps } from "~/lib/types";

export const Button = component$<ButtonProps>((props) => {
  const {
    variant = "primary",
    size = "medium",
    class: className = "",
    onClick$,
    href,
    disabled = false,
    type = "button",
  } = props;

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:scale-105",
    secondary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-md hover:shadow-lg transform hover:scale-105",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    text: "text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} class={classes}>
        <Slot />
      </Link>
    );
  }

  const buttonProps = {
    type,
    class: classes,
    disabled,
    ...(onClick$ && { onClick$ }),
  };

  return (
    <button {...buttonProps}>
      <Slot />
    </button>
  );
});
