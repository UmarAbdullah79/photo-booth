"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Heart,
  Sparkles,
  ArrowLeft,
  Palette,
  ArrowRight,
} from "lucide-react";
import {
  PhotoSlot,
  SessionMode,
  FrameTheme,
  FILTER_STYLES,
} from "../types";

interface FinalStripPreviewModalProps {
  isOpen: boolean;
  mode: SessionMode;
  photos: PhotoSlot[];
  roomCode: string;
  initialFrameTheme?: FrameTheme;
  onClose: () => void;
}

export const FinalStripPreviewModal: React.FC<
  FinalStripPreviewModalProps
> = ({
  isOpen,
  mode,
  photos,
  roomCode,
  initialFrameTheme = "haru-pastel",
  onClose,
}) => {
  const [frameTheme, setFrameTheme] = useState<FrameTheme>(initialFrameTheme);

  useEffect(() => {
    if (initialFrameTheme) {
      setFrameTheme(initialFrameTheme);
    }
  }, [initialFrameTheme, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayPhotos = photos.slice(0, mode);
  const isFour = mode === 4;

  const frameThemesConfig: {
    id: FrameTheme;
    name: string;
    bgClass: string;
    textClass: string;
    subTextClass: string;
    borderClass: string;
    swatchColor: string;
  }[] = [
    {
      id: "haru-pastel",
      name: "Haru Pastel Pink",
      bgClass: "bg-[#FFF2F6]",
      textClass: "text-[#C93E5C]",
      subTextClass: "text-[#966E7C]",
      borderClass: "border-[#FAD2E1]",
      swatchColor: "#FFF0F4",
    },
    {
      id: "classic-pink",
      name: "Coral Sweet",
      bgClass: "bg-[#FFE8EF]",
      textClass: "text-[#B32646]",
      subTextClass: "text-[#9E576B]",
      borderClass: "border-[#F8B4C8]",
      swatchColor: "#FFE0E8",
    },
    {
      id: "romantic-white",
      name: "Studio White",
      bgClass: "bg-white",
      textClass: "text-[#292326]",
      subTextClass: "text-[#8A8186]",
      borderClass: "border-[#E8E1E4]",
      swatchColor: "#FFFFFF",
    },
    {
      id: "lavender-dream",
      name: "Lavender Cloud",
      bgClass: "bg-[#F7F2FB]",
      textClass: "text-[#673078]",
      subTextClass: "text-[#856C91]",
      borderClass: "border-[#E5D7F2]",
      swatchColor: "#EEDCFA",
    },
    {
      id: "midnight-seoul",
      name: "Midnight Seoul",
      bgClass: "bg-[#1C1619]",
      textClass: "text-[#FFE8F0]",
      subTextClass: "text-[#9E9197]",
      borderClass: "border-[#3D3036]",
      swatchColor: "#1C1619",
    },
  ];

  const currentThemeConfig =
    frameThemesConfig.find((t) => t.id === frameTheme) || frameThemesConfig[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-7 border border-border-primary shadow-elevated my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between pb-3 border-b border-border-soft shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pastel-pink text-coral-dark">
              <Sparkles className="w-3 h-3 text-coral" />
              <span>
                {isFour ? "Life4Cut Classic Strip" : "2×3 Korean Studio Collage"}
              </span>
            </span>

            <h2
              id="preview-modal-heading"
              className="text-base sm:text-lg font-extrabold text-primary-text hidden sm:block"
            >
              Photo Booth Styling Preview
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FRAME THEME SELECTOR ROW */}
        <div className="py-2.5 px-1 border-b border-border-soft flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-bold text-secondary-text flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-coral" />
            <span>Frame Color Theme:</span>
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {frameThemesConfig.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFrameTheme(item.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border transition-all ${
                  frameTheme === item.id
                    ? "bg-pastel-pink border-coral text-coral-dark ring-2 ring-coral/30 font-bold"
                    : "bg-cream border-border-soft text-secondary-text hover:bg-blush-soft"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.swatchColor }}
                />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STRIP DISPLAY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-cream/70 rounded-2xl border border-border-soft my-3 flex justify-center">
          <div
            className={`w-full ${
              isFour ? "max-w-xs sm:max-w-sm" : "max-w-md sm:max-w-lg"
            } rounded-3xl p-4 sm:p-6 border-4 shadow-photo transition-colors duration-300 ${
              currentThemeConfig.bgClass
            } ${currentThemeConfig.borderClass}`}
          >
            {/* Top Washi / Brand Header */}
            <div className="text-center pb-3 mb-2 border-b border-current/20">
              <div
                className={`font-serif font-black text-sm sm:text-base tracking-widest uppercase ${currentThemeConfig.textClass}`}
              >
                Two Hearts Haru Film ♡
              </div>
              <div
                className={`text-[10px] font-mono mt-0.5 tracking-wider ${currentThemeConfig.subTextClass}`}
              >
                MILES APART · SEOUL × TOKYO · OCT 18, 2026
              </div>
            </div>

            {/* 4-PHOTO MODE: Vertical Strip */}
            {isFour && (
              <div className="space-y-3 py-1">
                {displayPhotos.map((photo, idx) => {
                  const filter =
                    FILTER_STYLES[photo.adjustments.filter] ||
                    FILTER_STYLES.normal;
                  const itemTransform = {
                    transform: `scale(${photo.adjustments.zoom / 100}) translate(${photo.adjustments.panX}px, ${photo.adjustments.panY}px) rotate(${photo.adjustments.rotation}deg)`,
                    filter: filter.filterCss,
                  };

                  return (
                    <div
                      key={photo.id}
                      className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-2 border-white shadow-sm"
                    >
                      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                        <div
                          className="w-full h-full relative"
                          style={itemTransform}
                        >
                          <Image
                            src={photo.imageSrc}
                            alt={photo.title}
                            fill
                            sizes="300px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-bold bg-black/60 text-white backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 6-PHOTO MODE: 2×3 Collage */}
            {!isFour && (
              <div className="grid grid-cols-2 gap-2.5 py-1">
                {displayPhotos.map((photo, idx) => {
                  const filter =
                    FILTER_STYLES[photo.adjustments.filter] ||
                    FILTER_STYLES.normal;
                  const itemTransform = {
                    transform: `scale(${photo.adjustments.zoom / 100}) translate(${photo.adjustments.panX}px, ${photo.adjustments.panY}px) rotate(${photo.adjustments.rotation}deg)`,
                    filter: filter.filterCss,
                  };

                  return (
                    <div
                      key={photo.id}
                      className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-2 border-white shadow-sm"
                    >
                      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                        <div
                          className="w-full h-full relative"
                          style={itemTransform}
                        >
                          <Image
                            src={photo.imageSrc}
                            alt={photo.title}
                            fill
                            sizes="240px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-bold bg-black/60 text-white backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Footer Branding */}
            <div className="pt-3.5 mt-2 border-t border-current/20 text-center space-y-1">
              <div
                className={`flex items-center justify-center gap-1.5 text-xs font-bold ${currentThemeConfig.textClass}`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Miles Apart, United in Heart</span>
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <div
                  className="flex items-center gap-[2px] h-4 opacity-75"
                  aria-hidden="true"
                >
                  <span className="w-[1px] h-full bg-current" />
                  <span className="w-[2px] h-full bg-current" />
                  <span className="w-[1px] h-full bg-current" />
                  <span className="w-[3px] h-full bg-current" />
                  <span className="w-[1px] h-full bg-current" />
                  <span className="w-[2px] h-full bg-current" />
                  <span className="w-[1px] h-full bg-current" />
                  <span className="w-[2px] h-full bg-current" />
                </div>
                <span
                  className={`text-[9px] font-mono tracking-widest ${currentThemeConfig.subTextClass}`}
                >
                  ROOM-{roomCode} · #HARU-FILM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL BOTTOM CONTROLS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-blush-primary border border-border-soft transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editing</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/room/preview-edit"
              className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold text-white bg-coral hover:bg-coral-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Open Strip Review &amp; Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
