"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Sliders,
  Palette,
  LayoutGrid,
  Sticker,
  RotateCcw,
  Check,
  Eye,
  Heart,
  Star,
  Smile,
  QrCode,
  Layers,
} from "lucide-react";

export type FramePreset = "classic" | "polaroid" | "y2k" | "film";
export type ColorPreset = "pink" | "lavender" | "cream" | "green" | "yellow";
export type LayoutPreset = 2 | 3 | 4;

interface CustomizationMockupProps {
  className?: string;
}

export const CustomizationMockup: React.FC<CustomizationMockupProps> = ({
  className = "",
}) => {
  // Interactive preview state
  const [selectedColor, setSelectedColor] = useState<ColorPreset>("pink");
  const [selectedFrame, setSelectedFrame] = useState<FramePreset>("classic");
  const [selectedLayout, setSelectedLayout] = useState<LayoutPreset>(3);
  const [activeStickers, setActiveStickers] = useState<string[]>(["♥", "✦"]);
  const [focusedSticker, setFocusedSticker] = useState<string | null>("♥");

  // Color mapping
  const colorStyles: Record<
    ColorPreset,
    { bg: string; text: string; border: string; hex: string; name: string }
  > = {
    pink: {
      bg: "bg-[#FFE0E8]",
      text: "text-coral-dark",
      border: "border-coral/30",
      hex: "#FFE0E8",
      name: "Blush Pink",
    },
    lavender: {
      bg: "bg-[#EEDCFA]",
      text: "text-pastel-purple-text",
      border: "border-purple-300/40",
      hex: "#EEDCFA",
      name: "Soft Lavender",
    },
    cream: {
      bg: "bg-[#FFF9F7]",
      text: "text-amber-800",
      border: "border-amber-200",
      hex: "#FFF9F7",
      name: "Warm Cream",
    },
    green: {
      bg: "bg-[#DDF3E8]",
      text: "text-pastel-green-text",
      border: "border-emerald-300/40",
      hex: "#DDF3E8",
      name: "Mint Fresh",
    },
    yellow: {
      bg: "bg-[#FFF0B8]",
      text: "text-pastel-yellow-text",
      border: "border-yellow-300/50",
      hex: "#FFF0B8",
      name: "Butter Yellow",
    },
  };

  // Frame preset styling for preview strip container
  const getFramePreviewClass = () => {
    switch (selectedFrame) {
      case "polaroid":
        return "bg-white border-8 border-b-[28px] border-white shadow-md rounded-xs";
      case "y2k":
        return "bg-gradient-to-b from-[#FFE0E8] via-white to-[#EEDCFA] border-2 border-coral/40 p-2 rounded-xl shadow-lg ring-1 ring-coral/20";
      case "film":
        return "bg-[#1A1819] border-x-[12px] border-y-8 border-[#1A1819] p-2 rounded-sm shadow-md text-white";
      case "classic":
      default:
        return "bg-white border border-border-primary/80 p-2.5 rounded-xl shadow-md";
    }
  };

  // Frame options metadata
  const frameOptions: { id: FramePreset; name: string; previewBg: string }[] = [
    { id: "classic", name: "Classic", previewBg: "bg-white border-gray-300" },
    { id: "polaroid", name: "Polaroid", previewBg: "bg-white border-b-4 border-gray-400" },
    { id: "y2k", name: "Y2K", previewBg: "bg-gradient-to-r from-pink-200 to-purple-200 border-pink-400" },
    { id: "film", name: "Film", previewBg: "bg-gray-900 border-gray-700" },
  ];

  // Toggle sticker in preview
  const toggleSticker = (sticker: string) => {
    if (activeStickers.includes(sticker)) {
      setActiveStickers(activeStickers.filter((s) => s !== sticker));
      if (focusedSticker === sticker) setFocusedSticker(null);
    } else {
      setActiveStickers([...activeStickers, sticker]);
      setFocusedSticker(sticker);
    }
  };

  // Reset to default
  const handleReset = () => {
    setSelectedColor("pink");
    setSelectedFrame("classic");
    setSelectedLayout(3);
    setActiveStickers(["♥", "✦"]);
    setFocusedSticker("♥");
  };

  return (
    <div className={`relative w-full max-w-[560px] mx-auto ${className}`}>
      {/* Decorative floating elements behind editor */}
      <div className="absolute -top-4 -right-3 z-0 text-coral/40 text-xl animate-pulse pointer-events-none select-none">
        ✦
      </div>
      <div className="absolute -bottom-4 -left-4 z-0 text-pastel-purple-text/50 text-lg pointer-events-none select-none">
        ♥
      </div>
      <div className="absolute -z-10 top-1/2 -left-8 w-28 h-28 bg-pastel-yellow/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -z-10 -bottom-6 -right-6 w-36 h-36 bg-pastel-pink/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -z-10 -top-6 left-1/3 w-32 h-32 bg-pastel-blue/40 rounded-full blur-2xl pointer-events-none" />

      {/* MAIN EDITOR OUTER CARD */}
      <div className="sync-mockup-panel relative z-10 bg-white rounded-[22px] border border-border-primary/70 shadow-[0_10px_35px_rgba(50,25,35,0.07)] p-4 sm:p-5 flex flex-col justify-between min-h-[350px] sm:min-h-[370px] -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
        {/* TOP EDITOR HEADER */}
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-border-soft">
          {/* Header Left Title */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-pastel-pink text-coral flex items-center justify-center">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-primary-text tracking-tight">
              Customize your booth
            </span>
          </div>

          {/* Header Right Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-pink/80 border border-coral/20 text-coral-dark text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
            <span>LIVE PREVIEW</span>
          </div>
        </div>

        {/* EDITOR MAIN WORKSPACE (2 COLUMNS: LEFT = PREVIEW, RIGHT = CONTROLS) */}
        <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch flex-1">
          {/* LEFT/MAIN: PHOTO BOOTH LIVE PREVIEW CONTAINER (7/12 cols) */}
          <div className="col-span-7 flex flex-col items-center justify-between p-3 rounded-xl bg-[#FFF9F7] border border-border-soft relative overflow-hidden min-h-[250px]">
            {/* Live Frame Strip Preview Box */}
            <div
              className={`w-full max-w-[210px] transition-all duration-300 flex flex-col justify-between ${getFramePreviewClass()}`}
            >
              {/* Photo Strip Header / Watermark inside preview */}
              <div className="flex items-center justify-between mb-1.5 px-1 text-[8px] font-bold text-primary-text/70 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 text-coral fill-coral" />
                  TWO HEARTS
                </span>
                <span className="font-mono text-[7.5px] opacity-75">2026</span>
              </div>

              {/* Photo Frames Stack based on selectedLayout */}
              <div
                className={`space-y-1.5 p-1.5 rounded-lg transition-colors duration-300 ${colorStyles[selectedColor].bg} border ${colorStyles[selectedColor].border}`}
              >
                {Array.from({ length: selectedLayout }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-md overflow-hidden aspect-[4/3] flex items-center justify-center border shadow-xs transition-transform duration-200 ${
                      selectedFrame === "film"
                        ? "bg-[#292326] border-white/20"
                        : "bg-white/80 border-black/5"
                    }`}
                  >
                    {/* Frame Gradient / Artwork Placeholder */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${
                        idx % 3 === 0
                          ? "from-pastel-pink/60 via-white to-pastel-purple/50"
                          : idx % 3 === 1
                          ? "from-pastel-yellow/60 via-white to-pastel-pink/50"
                          : "from-pastel-blue/60 via-white to-pastel-green/50"
                      }`}
                    />

                    {/* Corner Crosshairs */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-primary-text/30" />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-primary-text/30" />
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-primary-text/30" />
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-primary-text/30" />

                    {/* Photo Illustration Graphic */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-1">
                      <div className="w-6 h-6 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-coral shadow-xs">
                        {idx === 0 ? (
                          <Sparkles className="w-3 h-3 text-coral" />
                        ) : idx === 1 ? (
                          <Heart className="w-3 h-3 text-coral fill-coral" />
                        ) : (
                          <Star className="w-3 h-3 text-pastel-yellow-text fill-pastel-yellow" />
                        )}
                      </div>
                      <span className="text-[7.5px] font-bold text-primary-text/80 mt-0.5 tracking-tight">
                        {idx === 0
                          ? "Alex & Sam"
                          : idx === 1
                          ? "NYC ➔ London"
                          : "Sweet Memory"}
                      </span>
                    </div>

                    {/* Active Floating Stickers Overlay inside Photo Frame */}
                    {idx === 0 && activeStickers.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {activeStickers.map((stk, sIdx) => {
                          const isFocused = focusedSticker === stk;
                          return (
                            <div
                              key={sIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFocusedSticker(stk);
                              }}
                              className={`absolute cursor-pointer transition-transform duration-200 pointer-events-auto ${
                                sIdx === 0
                                  ? "top-1 right-1.5"
                                  : sIdx === 1
                                  ? "bottom-1 left-1.5"
                                  : "top-1 left-2"
                              } ${isFocused ? "scale-125 z-30" : "scale-100 opacity-90"}`}
                            >
                              <span className="text-xs sm:text-sm drop-shadow-md select-none">
                                {stk}
                              </span>
                              {/* Selection Outline handle to signal interactive editor mockup */}
                              {isFocused && (
                                <div className="absolute -inset-1 border border-dashed border-coral rounded-xs pointer-events-none animate-pulse" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Photo Strip Bottom Footer & QR code */}
              <div className="pt-1.5 pb-0.5 px-1 flex items-center justify-between text-[7.5px] font-medium text-primary-text/70">
                <span className="font-mono tracking-tighter">PARIS PHOTOBOOTH</span>
                <span className="inline-flex items-center gap-0.5 opacity-80">
                  <QrCode className="w-2.5 h-2.5 text-primary-text/80" />
                </span>
              </div>
            </div>

            {/* Drag Handle Indicator Pill on Preview */}
            <div className="mt-2 text-[9px] font-medium text-muted-text flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-border-soft shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Live output synced</span>
            </div>
          </div>

          {/* RIGHT: COMPACT CUSTOMIZATION CONTROLS PANEL (5/12 cols) */}
          <div className="col-span-5 flex flex-col justify-between space-y-2.5 sm:space-y-3 pl-0.5">
            {/* 1. COLOR CONTROL */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-text tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <Palette className="w-3 h-3 text-coral" />
                  COLOR
                </span>
                <span className="text-[9px] text-primary-text font-medium">
                  {colorStyles[selectedColor].name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-0.5">
                {(["pink", "lavender", "cream", "green", "yellow"] as ColorPreset[]).map(
                  (cKey) => {
                    const isSelected = selectedColor === cKey;
                    return (
                      <button
                        key={cKey}
                        onClick={() => setSelectedColor(cKey)}
                        title={colorStyles[cKey].name}
                        className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full transition-all duration-200 cursor-pointer ${
                          colorStyles[cKey].bg
                        } ${colorStyles[cKey].border} border flex items-center justify-center ${
                          isSelected
                            ? "ring-2 ring-coral ring-offset-1 scale-110 shadow-xs"
                            : "hover:scale-105 opacity-85 hover:opacity-100"
                        }`}
                      >
                        {isSelected && (
                          <Check className={`w-2.5 h-2.5 stroke-3 ${colorStyles[cKey].text}`} />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* 2. FRAME CONTROL */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-text tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-coral" />
                  FRAME
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-0.5">
                {frameOptions.map((fOpt) => {
                  const isSelected = selectedFrame === fOpt.id;
                  return (
                    <button
                      key={fOpt.id}
                      onClick={() => setSelectedFrame(fOpt.id)}
                      className={`px-1.5 py-1 rounded-md text-[10px] font-semibold transition-all duration-200 flex items-center gap-1 border cursor-pointer ${
                        isSelected
                          ? "bg-pastel-pink/60 border-coral text-coral-dark shadow-2xs"
                          : "bg-white border-border-soft text-secondary-text hover:border-coral/40 hover:text-primary-text"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-xs shrink-0 ${fOpt.previewBg}`}
                      />
                      <span className="truncate">{fOpt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. STICKER CONTROL */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-text tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <Sticker className="w-3 h-3 text-coral" />
                  STICKERS
                </span>
              </div>
              <div className="flex items-center gap-1 pt-0.5">
                {["♥", "✦", "★", "♡", ":)"].map((stk) => {
                  const isActive = activeStickers.includes(stk);
                  return (
                    <button
                      key={stk}
                      onClick={() => toggleSticker(stk)}
                      className={`w-6 h-6 rounded-md text-xs font-bold transition-all duration-200 flex items-center justify-center border cursor-pointer ${
                        isActive
                          ? "bg-pastel-purple text-pastel-purple-text border-purple-300 shadow-2xs scale-105"
                          : "bg-white border-border-soft text-secondary-text hover:border-coral/40 hover:bg-pastel-pink/30"
                      }`}
                    >
                      {stk}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. LAYOUT CONTROL */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-text tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <LayoutGrid className="w-3 h-3 text-coral" />
                  LAYOUT
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-0.5">
                {([2, 3, 4] as LayoutPreset[]).map((lCount) => {
                  const isSelected = selectedLayout === lCount;
                  return (
                    <button
                      key={lCount}
                      onClick={() => setSelectedLayout(lCount)}
                      className={`py-1 px-1 rounded-md text-[10px] font-semibold transition-all duration-200 flex items-center justify-center gap-0.5 border cursor-pointer ${
                        isSelected
                          ? "bg-pastel-pink/60 border-coral text-coral-dark shadow-2xs"
                          : "bg-white border-border-soft text-secondary-text hover:border-coral/40 hover:text-primary-text"
                      }`}
                    >
                      <span>{lCount}-Photo</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM EDITOR FOOTER CONTROLS */}
        <div className="pt-3 mt-3 border-t border-border-soft flex items-center justify-between text-[11px]">
          <button
            onClick={handleReset}
            className="text-muted-text hover:text-coral transition-colors duration-200 font-medium flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-secondary-text hidden sm:inline">
              Preset saved
            </span>
            <div className="px-2.5 py-1 rounded-md bg-coral text-white text-[10px] font-bold shadow-2xs flex items-center gap-1 cursor-default">
              <Eye className="w-3 h-3" />
              <span>Full Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
