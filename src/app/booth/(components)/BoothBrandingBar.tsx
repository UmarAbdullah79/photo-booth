"use client";

import React, { useState } from "react";
import { Heart, QrCode, Sparkles, Smile } from "lucide-react";

export const BoothBrandingBar: React.FC = () => {
  const [kimchiBurst, setKimchiBurst] = useState(false);

  const handleSayKimchi = () => {
    setKimchiBurst(true);
    setTimeout(() => setKimchiBurst(false), 1500);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-border-primary/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      {/* LEFT: Digital Strip Branding & Frame Details */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-pastel-pink/80 border border-coral/30 flex items-center justify-center text-coral shadow-2xs shrink-0">
          <Heart className="w-4 h-4 fill-coral" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-primary-text leading-tight">
              Two Hearts Digital Strip
            </h3>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cream border border-border-soft text-coral">
              Frame #01
            </span>
          </div>
          <p className="text-[11px] text-muted-text mt-0.5">
            Synchronized memories captured together across any distance ♡
          </p>
        </div>
      </div>

      {/* RIGHT: Say Kimchi! Button & QR Digital Strip Pass */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Decorative Say Kimchi! Button */}
        <button
          type="button"
          onClick={handleSayKimchi}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs ${
            kimchiBurst
              ? "bg-coral text-white scale-105 shadow-md shadow-coral/25"
              : "bg-pastel-pink text-coral-dark hover:bg-coral hover:text-white border border-coral/30"
          }`}
          aria-label="Say Kimchi decorative cheer"
        >
          <Smile className="w-3.5 h-3.5" />
          <span>{kimchiBurst ? "Kimchi~! ✌️💕" : "Say Kimchi! ✌️"}</span>
        </button>

        {/* Decorative QR Pass Icon & Label */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cream border border-border-soft text-[11px] font-medium text-secondary-text shadow-2xs"
          title="Digital Strip Pass"
        >
          <QrCode className="w-3.5 h-3.5 text-coral" />
          <span className="hidden sm:inline font-mono">Digital Strip Pass</span>
        </div>
      </div>
    </div>
  );
};
