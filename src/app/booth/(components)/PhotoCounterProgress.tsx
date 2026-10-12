"use client";

import React from "react";
import { Check, Heart, Sparkles, RotateCcw, Eye } from "lucide-react";
import { ShootMode } from "./FlexibleShootCard";

interface PhotoCounterProgressProps {
  shootMode: ShootMode;
  capturedPhotos: string[];
  onOpenFourPreview: () => void;
  onOpenSixPreview: () => void;
  onRetakeLastPhoto: () => void;
}

export const PhotoCounterProgress: React.FC<PhotoCounterProgressProps> = ({
  shootMode,
  capturedPhotos,
  onOpenFourPreview,
  onOpenSixPreview,
  onRetakeLastPhoto,
}) => {
  const currentCount = capturedPhotos.length;
  const progressPercent = Math.min(100, Math.round((currentCount / shootMode) * 100));

  const markers = Array.from({ length: shootMode }, (_, i) => i + 1);

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card">
      {/* TOP: Header Title & Count Label */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-coral" />
          <h3 className="text-sm sm:text-base font-extrabold text-primary-text">
            Session Photo Counter:{" "}
            <span className="text-coral">
              {currentCount} of {shootMode} Taken
            </span>
          </h3>
        </div>

        {/* Retake last shot button if photos exist */}
        {currentCount > 0 && (
          <button
            type="button"
            onClick={onRetakeLastPhoto}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-blush-primary border border-border-soft transition-colors"
            title="Retake last photo"
          >
            <RotateCcw className="w-3 h-3 text-coral" />
            <span>Retake Last</span>
          </button>
        )}
      </div>

      {/* DYNAMIC PROGRESS BAR */}
      <div className="w-full h-3 rounded-full bg-cream border border-border-soft overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-coral to-coral-hover rounded-full transition-all duration-300 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 animate-pulse" />
        </div>
      </div>

      {/* INDIVIDUAL SHOT MARKERS */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-4">
        {markers.map((num) => {
          const isTaken = currentCount >= num;
          const isCurrentTarget = currentCount + 1 === num;
          const thumbnail = capturedPhotos[num - 1];

          return (
            <div
              key={num}
              className={`relative rounded-2xl p-2 flex flex-col items-center justify-center border transition-all duration-200 ${
                isTaken
                  ? "bg-pastel-pink/60 border-coral/40 text-coral-dark shadow-2xs"
                  : isCurrentTarget
                  ? "bg-white border-2 border-coral shadow-sm scale-105"
                  : "bg-cream border-border-soft text-muted-text"
              }`}
            >
              {/* Thumbnail preview if shot taken */}
              {thumbnail ? (
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-1.5 border border-coral/30 shadow-inner">
                  <img
                    src={thumbnail}
                    alt={`Shot ${num} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-current flex items-center justify-center mb-1 text-xs font-mono font-bold">
                  {isTaken ? <Check className="w-4 h-4 text-coral" /> : num}
                </div>
              )}

              <span className="text-[10px] font-bold">
                {isTaken ? (
                  `Shot ${num} ✓`
                ) : isCurrentTarget ? (
                  <span className="text-coral flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
                    Next
                  </span>
                ) : (
                  `Shot ${num}`
                )}
              </span>

              {/* 4-Photo Milestone Indicator Star */}
              {num === 4 && (
                <span
                  className="absolute -top-1.5 -right-1 text-[11px] text-coral drop-shadow-xs"
                  title="4-Shot Life4Cut Milestone"
                >
                  ★
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* MILESTONE ACTION BUTTONS: 4-PHOTO STRIP & 6-PHOTO COLLAGE */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-soft">
        <div className="text-xs text-secondary-text">
          {currentCount < 4 ? (
            <span className="flex items-center gap-1.5 text-muted-text">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Capture {4 - currentCount} more shots to unlock Life4Cut strip preview</span>
            </span>
          ) : currentCount < shootMode ? (
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>4 shots ready! You can finish early or continue to shot {shootMode}.</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-coral font-bold">
              <Heart className="w-3.5 h-3.5 fill-coral" />
              <span>All {shootMode} shots complete! Ready to view preview.</span>
            </span>
          )}
        </div>

        {/* Action Button: Preview 4 Photos */}
        {currentCount >= 4 && shootMode === 4 && (
          <button
            type="button"
            onClick={onOpenFourPreview}
            className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <Eye className="w-4 h-4" />
            <span>Preview 4 Photos (Finish Early) ✨</span>
          </button>
        )}

        {/* Action Button: Preview 6 Photos */}
        {currentCount >= 6 && shootMode === 6 && (
          <button
            type="button"
            onClick={onOpenSixPreview}
            className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <Eye className="w-4 h-4" />
            <span>Preview Complete (6/6) → View Preview ✨</span>
          </button>
        )}

        {/* If in 6-photo mode and 4 or 5 photos taken: user can also finish early with 4 */}
        {currentCount >= 4 && shootMode === 6 && currentCount < 6 && (
          <button
            type="button"
            onClick={onOpenFourPreview}
            className="px-3.5 py-1.5 rounded-full font-bold text-xs text-coral-dark bg-pastel-pink hover:bg-coral hover:text-white border border-coral/30 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Finish Early with 4 Photos ✨</span>
          </button>
        )}
      </div>
    </div>
  );
};
