import React from "react";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "pastel";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      icon,
      iconPosition = "right",
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base classes: Pill shape, typography, transition, hover lift
    const baseClasses =
      "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-250 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none";

    // Standard Tailwind size variants
    const sizeClasses = {
      sm: "h-9.5 px-4.5 text-xs tracking-wide gap-1.5",
      md: "h-11 px-5.5 text-xs sm:text-sm gap-2",
      lg: "h-12.5 px-6.5 text-sm sm:text-base gap-2.5",
    };

    // Variant styles using theme tokens
    const variantClasses = {
      primary:
        "bg-coral text-white hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md hover:shadow-coral/25 hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-white text-primary-text border border-coral/40 hover:border-coral hover:text-coral hover:bg-blush-primary shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0",
      pastel:
        "bg-pastel-pink text-coral-dark hover:bg-blush-soft hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "bg-transparent text-secondary-text hover:text-coral hover:bg-blush-primary/60",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`.trim();

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          className={`group ${combinedClasses}`}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`group ${combinedClasses}`}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
