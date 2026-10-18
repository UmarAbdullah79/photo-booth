"use client";

import React from "react";
import { X, Heart, RotateCcw, Sparkles } from "lucide-react";
import { FrameTheme } from "./MainBoothFrame";

interface PhotoStripModalProps {
  isOpen: boolean;
  mode: 4 | 6;
  photos: string[];
  frameTheme: FrameTheme;
  onClose: () => void;
  onRetakeAll: () => void;
}

export const PhotoStripModal: React.FC<PhotoStripModalProps> = ({
  isOpen,
  mode,
  photos,
  frameTheme,
  onClose,
  onRetakeAll,
}) => {
  if (!isOpen) return null;

  const displayPhotos = photos.slice(0, mode);

  const getFrameBg = () => {
    switch (frameTheme) {
      case "classic-pink":
        return "bg-[#FFF0F4] border-[#F45F7D]/40 text-coral-dark";
      case "romantic-white":
        return "bg-white border-border-primary text-primary-text";
      case "haru-pastel":
      default:
        return "bg-[#FFF6F9] border-[#F5D8E2] text-primary-text";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="strip-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl p-4 sm:p-6 border border-border-primary shadow-elevated text-center my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
          aria-label="Close preview modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pastel-pink text-coral-dark mb-1.5">
            <Sparkles className="w-3 h-3 text-coral" />
            <span>
              {mode === 4
                ? "Life4Cut Classic Photo Strip"
                : "2×3 Studio Photo Collage"}
            </span>
          </div>

          <h3 id="strip-modal-title" className="text-lg sm:text-xl font-bold text-primary-text">
            {mode === 4
              ? "Your 4-Photo Strip Preview 💕"
              : "Your Complete 6-Photo Collage 💕"}
          </h3>
          <p className="text-xs text-secondary-text mt-0.5">
            Captured together across the miles · Two Hearts Booth
          </p>
        </div>

        {/* PHOTO STRIP / COLLAGE FRAME CONTAINER */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 bg-cream rounded-2xl border border-border-soft shadow-inner">
          <div
            className={`w-full max-w-xs mx-auto rounded-2xl p-3 sm:p-4 border-4 shadow-photo transition-colors ${getFrameBg()}`}
          >
            {/* Scrapbook Top Washi Header */}
            <div className="text-center pb-2 mb-1 border-b border-coral/20">
              <span className="font-serif font-black text-xs sm:text-sm tracking-wider uppercase">
                Two Hearts Haru Film
              </span>
              <div className="text-[9px] font-mono text-muted-text mt-0.5">
                OCT 12, 2026 · SEOUL × TOKYO
              </div>
            </div>

            {/* 4-PHOTO MODE: Classic Vertical Life4Cut Strip */}
            {mode === 4 && (
              <div className="space-y-2.5 py-1">
                {displayPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#241C20] border-2 border-white shadow-2xs"
                  >
                    <img
                      src={photo}
                      alt={`Captured strip photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-white/80 bg-black/40 px-1 rounded-xs">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 6-PHOTO MODE: 2×3 Studio Collage */}
            {mode === 6 && (
              <div className="grid grid-cols-2 gap-2 py-1">
                {displayPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#241C20] border-2 border-white shadow-2xs"
                  >
                    <img
                      src={photo}
                      alt={`Captured collage photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-white/80 bg-black/40 px-1 rounded-xs">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Scrapbook Bottom Footer Branding */}
            <div className="pt-3 mt-1 text-center border-t border-coral/20">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-coral">
                <Heart className="w-3 h-3 fill-coral" />
                <span>Miles Apart, United in Heart</span>
                <Heart className="w-3 h-3 fill-coral" />
              </div>
              <p className="text-[9px] font-mono text-muted-text mt-0.5">
                #TWO-HEARTS-BOOTH · DIGITAL STRIP PASS
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions: Retake All & Close */}
        <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onRetakeAll}
            className="w-full sm:w-auto px-4 py-2 rounded-full font-bold text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake All Photos</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full font-bold text-xs text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-xs transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
