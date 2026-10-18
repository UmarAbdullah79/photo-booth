import React from "react";

export type SectionBackground =
  | "cream"
  | "blush-primary"
  | "blush-soft"
  | "lavender"
  | "lavender-blue"
  | "white";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  spacing?: "hero" | "normal" | "compact" | "none";
  children: React.ReactNode;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  background = "cream",
  spacing = "normal",
  children,
  className = "",
  id,
  ...props
}) => {
  const bgClasses: Record<SectionBackground, string> = {
    cream: "bg-[#FFF9F7]",
    "blush-primary": "bg-[#FFF0F3]",
    "blush-soft": "bg-[#FCEFF4]",
    lavender: "bg-[#F7F2FB]",
    "lavender-blue": "bg-[#F2F4FC]",
    white: "bg-white",
  };

  const spacingClasses = {
    hero: "pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32",
    normal: "py-16 sm:py-24 lg:py-32",
    compact: "py-12 sm:py-16 lg:py-20",
    none: "py-0",
  };

  return (
    <section
      id={id}
      className={`w-full transition-colors duration-500 relative overflow-hidden ${bgClasses[background]} ${spacingClasses[spacing]} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
};
