import React from "react";

export type BadgeVariant =
  | "pink"
  | "purple"
  | "yellow"
  | "green"
  | "blue"
  | "cream";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  uppercase?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "pink",
  children,
  icon,
  uppercase = true,
  className = "",
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    pink: "bg-pastel-pink text-coral-dark",
    purple: "bg-pastel-purple text-pastel-purple-text",
    yellow: "bg-pastel-yellow text-pastel-yellow-text",
    green: "bg-pastel-green text-pastel-green-text",
    blue: "bg-pastel-blue text-pastel-blue-text",
    cream: "bg-blush-primary text-coral",
  };

  const transformClass = uppercase ? "uppercase tracking-wider" : "";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${transformClass} ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
