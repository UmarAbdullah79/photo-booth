import React from "react";

export type CardVariant = "default" | "elevated" | "photo" | "flat";
export type CardRotation =
  | "none"
  | "slight-left"
  | "slight-right"
  | "subtle-left"
  | "subtle-right";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  rotation?: CardRotation;
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  rotation = "none",
  padding = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "bg-white rounded-2xl sm:rounded-3xl transition-all duration-300";

  const paddingClasses = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
  };

  const variantClasses = {
    default:
      "border border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1",
    elevated:
      "border border-border-primary shadow-elevated hover:-translate-y-1",
    photo:
      "border-4 border-white shadow-photo bg-white ring-1 ring-border-soft hover:-translate-y-1",
    flat: "border border-border-soft bg-white/70",
  };

  const rotationClasses = {
    none: "rotate-0",
    "slight-left": "rotate-slight-left",
    "slight-right": "rotate-slight-right",
    "subtle-left": "rotate-subtle-left",
    "subtle-right": "rotate-subtle-right",
  };

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${rotationClasses[rotation]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
