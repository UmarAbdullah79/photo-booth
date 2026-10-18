"use client";

import React from "react";
import { X, Lightbulb, Heart } from "lucide-react";

interface PoseInspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PoseCard {
  title: string;
  emoji: string;
  subtitle: string;
  tip: string;
  badge: string;
}

const POSES: PoseCard[] = [
  {
    title: "Heart Hands",
    emoji: "🫶",
    subtitle: "Classic Romantic",
    tip: "Bring both hands together to form a delicate heart right at the lens.",
    badge: "Must Try ♡",
  },
  {
    title: "Double Peace",
    emoji: "✌️",
    subtitle: "Playful & Fun",
    tip: "Classic Tokyo/Seoul photobooth V-sign tilt with an adorable smile.",
    badge: "Haru Classic",
  },
  {
    title: "Cheek to Cheek",
    emoji: "🥰",
    subtitle: "Intimate & Sweet",
    tip: "Lean toward the frame edge as if leaning on your partner across the split screen.",
    badge: "Couples Fav",
  },
  {
    title: "Matching Poses",
    emoji: "👯",
    subtitle: "Synchronized",
    tip: "Mirror your partner's pose exactly: touch chin, cross arms, or wink together.",
    badge: "Mirror Effect",
  },
  {
    title: "Cute Surprise",
    emoji: "😲",
    subtitle: "Candid Expression",
    tip: "Cover your mouth with one hand and widen your eyes in playful shock.",
    badge: "Fun & Fresh",
  },
  {
    title: "Mirror Pose",
    emoji: "🪞",
    subtitle: "Symmetric Aesthetic",
    tip: "One person touches their left cheek, the other touches their right cheek.",
    badge: "Aesthetic",
  },
  {
    title: "Finger Hearts",
    emoji: "🫰",
    subtitle: "K-Style Love",
    tip: "Cross thumb and index finger to create a chic mini Korean finger heart.",
    badge: "K-Booth Style",
  },
  {
    title: "Funny Expressions",
    emoji: "🤪",
    subtitle: "Goofy & Genuine",
    tip: "Stick your tongue out slightly or make silly matching faces together.",
    badge: "Laugh Together",
  },
];

export const PoseInspirationModal: React.FC<PoseInspirationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pose-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-center my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
          aria-label="Close pose inspiration"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2 shadow-2xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 id="pose-modal-title" className="text-lg sm:text-xl font-bold text-primary-text flex items-center gap-1.5">
            <span>Pose Inspiration Cards (8)</span>
            <Heart className="w-4 h-4 fill-coral text-coral" />
          </h3>
          <p className="text-xs text-secondary-text mt-1 max-w-sm">
            Try these cute poses with your partner across the synchronized split screen!
          </p>
        </div>

        {/* 8 Pose Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left max-h-[60vh] overflow-y-auto p-1">
          {POSES.map((pose, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-b from-[#FFFDFD] to-[#FFF6F8] rounded-2xl border border-border-primary/80 hover:border-coral/50 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl select-none" role="img" aria-label={pose.title}>
                    {pose.emoji}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-pastel-pink text-coral-dark">
                    {pose.badge}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-primary-text leading-tight mb-0.5">
                  {pose.title}
                </h4>
                <p className="text-[10px] text-coral font-medium mb-1">
                  {pose.subtitle}
                </p>
              </div>

              <p className="text-[10px] text-muted-text leading-relaxed mt-2 pt-1.5 border-t border-border-soft">
                {pose.tip}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Close Action */}
        <div className="mt-5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full font-bold text-xs text-white bg-coral hover:bg-coral-hover transition-colors shadow-xs"
          >
            Got It! Let&apos;s Pose 💕
          </button>
        </div>
      </div>
    </div>
  );
};
