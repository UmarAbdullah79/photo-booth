"use client";

import React from "react";
import { Check, Heart, Sparkles, Layers, Image as ImageIcon } from "lucide-react";

export type ShootMode = 4 | 6;

interface FlexibleShootCardProps {
  shootMode: ShootMode;
  onSelectMode: (mode: ShootMode) => void;
  photosTakenCount: number;
}

export const FlexibleShootCard: React.FC<FlexibleShootCardProps> = ({
  shootMode,
  onSelectMode,
  photosTakenCount,
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#FFF2F5] via-[#FFF7F9] to-[#FCEEF3] rounded-3xl p-4 sm:p-5 border border-border-primary/80 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* LEFT: Heading, Description & Milestone Badge */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-pastel-pink border border-coral/30 flex items-center justify-center text-coral">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-primary-text flex items-center gap-1.5">
              <span>Flexible Shoot: Choose 4 or 6 Photos</span>
              <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
            You can finish early with 4 photos for the classic Life4Cut strip,
            or shoot all 6 photos for a 2×3 studio collage.
          </p>

          {/* Milestone Badge */}
          <div className="pt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-coral/25 text-coral-dark shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>4-Photo milestone unlocks vertical Life4Cut preview</span>
            </span>

            {photosTakenCount >= 4 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>Unlocked!</span>
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: Functional Selection Toggle (4 Photos vs 6 Photos) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Option: 4 Photos */}
          <button
            type="button"
            onClick={() => onSelectMode(4)}
            className={`px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-2xs ${
              shootMode === 4
                ? "bg-coral text-white border-coral shadow-md shadow-coral/20 scale-[1.02]"
                : "bg-white text-secondary-text border-border-primary hover:text-coral hover:border-coral/50"
            }`}
            aria-pressed={shootMode === 4}
            aria-label="Select 4 photos mode"
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                shootMode === 4
                  ? "border-white bg-white text-coral"
                  : "border-secondary-text"
              }`}
            >
              {shootMode === 4 && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div className="text-left">
              <span className="block leading-none">4 Photos</span>
              <span
                className={`text-[10px] font-medium block mt-0.5 ${
                  shootMode === 4 ? "text-white/90" : "text-muted-text"
                }`}
              >
                Life4Cut Strip
              </span>
            </div>
          </button>

          {/* Option: 6 Photos */}
          <button
            type="button"
            onClick={() => onSelectMode(6)}
            className={`px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-2xs ${
              shootMode === 6
                ? "bg-coral text-white border-coral shadow-md shadow-coral/20 scale-[1.02]"
                : "bg-white text-secondary-text border-border-primary hover:text-coral hover:border-coral/50"
            }`}
            aria-pressed={shootMode === 6}
            aria-label="Select 6 photos mode"
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                shootMode === 6
                  ? "border-white bg-white text-coral"
                  : "border-secondary-text"
              }`}
            >
              {shootMode === 6 && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div className="text-left">
              <span className="block leading-none">6 Photos</span>
              <span
                className={`text-[10px] font-medium block mt-0.5 ${
                  shootMode === 6 ? "text-white/90" : "text-muted-text"
                }`}
              >
                2×3 Collage
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
