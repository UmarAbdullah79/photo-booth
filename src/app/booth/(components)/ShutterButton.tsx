"use client";

import React from "react";
import { Camera, Loader2, Sparkles } from "lucide-react";

interface ShutterButtonProps {
  currentShotNumber: number;
  totalShots: number;
  isCapturing: boolean;
  countdown: number | null;
  onSnap: () => void;
  disabled: boolean;
}

export const ShutterButton: React.FC<ShutterButtonProps> = ({
  currentShotNumber,
  totalShots,
  isCapturing,
  countdown,
  onSnap,
  disabled,
}) => {
  const isComplete = currentShotNumber > totalShots;

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-2 sm:py-3">
      {/* BIG CIRCULAR SHUTTER BUTTON */}
      <div className="relative group">
        {/* Soft pulse halo ring */}
        <div
          className={`absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-coral/40 via-pastel-pink/50 to-coral-hover/40 blur-md pointer-events-none transition-all duration-300 ${
            disabled || isCapturing ? "opacity-0" : "opacity-80 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onSnap}
          disabled={disabled || isCapturing || isComplete}
          className={`relative w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 rounded-full border-4 border-white shadow-photo flex flex-col items-center justify-center transition-all duration-200 select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-coral/40 ${
            disabled || isComplete
              ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
              : isCapturing
              ? "bg-gradient-to-tr from-coral-dark to-coral text-white scale-95 shadow-inner"
              : "bg-gradient-to-tr from-coral via-coral-hover to-[#FF7092] text-white hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-coral/30 cursor-pointer"
          }`}
          aria-label={
            isCapturing
              ? `Counting down: ${countdown} seconds`
              : isComplete
              ? "All photos captured"
              : `Snap Photo ${currentShotNumber} of ${totalShots}`
          }
        >
          {isCapturing ? (
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight animate-ping">
                {countdown}
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-1 opacity-90">
                Posing...
              </span>
            </div>
          ) : isComplete ? (
            <div className="flex flex-col items-center justify-center p-2">
              <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 mb-1" />
              <span className="text-xs sm:text-sm font-extrabold uppercase">
                Complete!
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-black tracking-tight uppercase leading-none">
                SNAP PHOTO
              </span>
              <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest mt-1 opacity-95">
                ({currentShotNumber}/{totalShots})
              </span>
            </div>
          )}
        </button>
      </div>

      {/* SUPPORTING TEXT & SPACE KEY SHORTCUT */}
      <div className="mt-3.5 space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-primary-text">
          {isComplete
            ? "You've captured all shots for this session! Preview below ✨"
            : `Take up to ${totalShots} synchronized shots. The next photo advances the count.`}
        </p>

        <p className="text-[11px] text-muted-text flex items-center justify-center gap-1.5 select-none">
          <kbd className="px-2 py-0.5 rounded-md bg-white border border-border-primary text-[10px] font-mono font-bold text-secondary-text shadow-2xs">
            SPACE
          </kbd>
          <span>shortcut enabled · Shutter advances automatically</span>
        </p>
      </div>
    </div>
  );
};
