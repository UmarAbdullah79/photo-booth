import React from "react";
import { Card } from "@/components/ui/Card";

export interface HowItWorksCardProps {
  step: string;
  title: string;
  description: string;
  supportingItem: string;
  icon: React.ReactNode;
  supportingIcon?: React.ReactNode;
  iconBgStyle: string;
  className?: string;
}

export const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  step,
  title,
  description,
  supportingItem,
  icon,
  supportingIcon,
  iconBgStyle,
  className = "",
}) => {
  return (
    <Card
      variant="default"
      padding="none"
      className={`how-it-works-card h-full flex flex-col p-5 sm:p-6 border border-border-primary bg-white rounded-2xl shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${className}`.trim()}
    >
      {/* Top Bar: Pastel Icon Container + Step Label */}
      <div className="flex items-center justify-between mb-4">
        {/* Pastel Icon Box - Perfectly centered */}
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBgStyle}`}
        >
          {icon}
        </div>

        {/* Step Label */}
        <span className="text-xs font-bold tracking-wider uppercase text-muted-text bg-cream px-2 py-0.5 rounded-full border border-border-soft">
          {step}
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="space-y-2 mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-primary-text leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
          {description}
        </p>
      </div>

      {/* Spacer to push supporting item to exact bottom across cards */}
      <div className="mt-auto pt-4 border-t border-border-soft flex items-center justify-between">
        <span className="text-xs font-semibold text-coral flex items-center gap-1.5 leading-none">
          {supportingIcon && (
            <span className="inline-flex shrink-0 items-center justify-center">
              {supportingIcon}
            </span>
          )}
          <span>{supportingItem}</span>
        </span>
      </div>
    </Card>
  );
};
