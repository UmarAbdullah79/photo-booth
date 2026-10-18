"use client";

import React from "react";
import { Heart, Sparkles, UserPlus } from "lucide-react";

interface CenterWaitingCardProps {
  roomCode?: string;
  onCopyCode?: () => void;
}

export const CenterWaitingCard: React.FC<CenterWaitingCardProps> = ({
  roomCode = "A7K92P",
  onCopyCode,
}) => {
  return (
    <div className="w-full h-full bg-linear-to-b from-[#FFF2F5] via-[#FFF7F9] to-[#FCEEF3] rounded-3xl p-5 sm:p-6 border border-border-primary/80 shadow-card relative flex flex-col items-center justify-between text-center overflow-hidden">
      {/* Decorative ambient glows */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 bg-pastel-pink/50 rounded-full blur-2xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 -right-8 w-36 h-36 bg-pastel-purple/30 rounded-full blur-xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Floating Decorative Hearts (CSS animations respecting prefers-reduced-motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
        <span
          className="absolute top-5 left-6 text-coral/40 text-sm animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          ♥
        </span>
        <span
          className="absolute top-12 right-6 text-coral/30 text-xs animate-pulse"
          style={{ animationDuration: "2.5s" }}
        >
          ♡
        </span>
        <span
          className="absolute bottom-16 left-8 text-pastel-purple-text/40 text-xs animate-pulse"
          style={{ animationDuration: "3.5s" }}
        >
          ♥
        </span>
        <span
          className="absolute bottom-8 right-8 text-coral/35 text-sm animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          ♡
        </span>
      </div>

      {/* TOP: Heart Connection Badge & Dotted Curved Line */}
      <div className="relative z-10 w-full pt-1">
        {/* Dotted Connection Graphic */}
        <div className="w-full max-w-50 mx-auto mb-2 flex items-center justify-center relative">
          <svg
            className="w-full h-10 text-coral/50 overflow-visible"
            viewBox="0 0 200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Dotted curved connection line */}
            <path
              d="M 10 20 Q 100 -5 190 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 5"
              fill="none"
            />
            {/* Left and right camera anchor circles */}
            <circle cx="10" cy="20" r="4" fill="#F45F7D" />
            <circle cx="190" cy="20" r="4" fill="#EEDCFA" />
          </svg>

          {/* Central Pulsing Heart Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-coral/30 shadow-xs flex items-center justify-center text-coral">
            <Heart className="w-4 h-4 fill-coral animate-pulse" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-coral/20 text-xs font-bold text-coral-dark shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Synchronized Booth Link</span>
        </div>
      </div>

      {/* CENTER: Main Waiting Heading & Text */}
      <div className="relative z-10 my-4 sm:my-5 space-y-2 max-w-xs">
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight flex items-center justify-center gap-1.5">
          <span>Waiting for Partner...</span>
          <Heart className="w-4 h-4 fill-coral text-coral inline shrink-0" />
        </h3>

        <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
          Share your room code with your bestie or special someone!
        </p>

        {/* Room Code Badge Chip */}
        <div className="pt-1.5">
          <button
            type="button"
            onClick={onCopyCode}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-border-primary text-xs font-mono font-bold text-primary-text shadow-2xs hover:border-coral/50 hover:bg-blush-primary/50 transition-colors focus:outline-none"
            title="Click to copy room code"
            aria-label={`Room code: ${roomCode}. Click to copy.`}
          >
            <span className="text-[10px] text-coral font-sans font-semibold">CODE:</span>
            <span className="tracking-widest text-sm text-primary-text">{roomCode}</span>
            <span className="text-[10px] text-muted-text underline font-sans ml-1">Copy</span>
          </button>
        </div>
      </div>

      {/* BOTTOM: Prominent Rounded Status Button */}
      <div className="relative z-10 w-full pt-2">
        <div className="w-full">
          <button
            type="button"
            className="w-full h-11 sm:h-12 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 select-none pointer-events-auto"
            aria-label="Waiting for guest"
          >
            {/* Animated Waiting Indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span>Waiting for guest...</span>
            <UserPlus className="w-4 h-4 ml-0.5 opacity-90" />
          </button>

          <p className="text-[11px] text-muted-text mt-2 text-center">
            Both cameras will wake up together when your friend arrives
          </p>
        </div>
      </div>
    </div>
  );
};
