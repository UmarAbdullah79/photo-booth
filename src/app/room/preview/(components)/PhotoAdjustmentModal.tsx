"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  RotateCcw,
  Move,
  Sparkles,
  Check,
  Crop,
} from "lucide-react";
import {
  PhotoSlot,
  PhotoAdjustments,
  INITIAL_ADJUSTMENTS,
  FILTER_STYLES,
  FilterType,
} from "../types";

interface PhotoAdjustmentModalProps {
  isOpen: boolean;
  photo: PhotoSlot | null;
  onClose: () => void;
  onSave: (updatedPhoto: PhotoSlot) => void;
}

export const PhotoAdjustmentModal: React.FC<PhotoAdjustmentModalProps> = ({
  isOpen,
  photo,
  onClose,
  onSave,
}) => {
  const [adjustments, setAdjustments] = useState<PhotoAdjustments>(
    INITIAL_ADJUSTMENTS
  );
  const [aspectPreset, setAspectPreset] = useState<"4:3" | "1:1" | "3:4">("4:3");

  useEffect(() => {
    if (photo) {
      setAdjustments({ ...photo.adjustments });
    }
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !photo) return null;

  const handleZoomChange = (val: number) => {
    setAdjustments((prev) => ({
      ...prev,
      zoom: Math.min(200, Math.max(100, val)),
    }));
  };

  const handlePanXChange = (val: number) => {
    setAdjustments((prev) => ({
      ...prev,
      panX: Math.min(60, Math.max(-60, val)),
    }));
  };

  const handlePanYChange = (val: number) => {
    setAdjustments((prev) => ({
      ...prev,
      panY: Math.min(60, Math.max(-60, val)),
    }));
  };

  const handleRotationChange = (val: number) => {
    setAdjustments((prev) => ({
      ...prev,
      rotation: Math.min(15, Math.max(-15, val)),
    }));
  };

  const handleFilterSelect = (filter: FilterType) => {
    setAdjustments((prev) => ({ ...prev, filter }));
  };

  const handleReset = () => {
    setAdjustments({ ...INITIAL_ADJUSTMENTS });
  };

  const handleSave = () => {
    onSave({
      ...photo,
      adjustments: { ...adjustments },
    });
    onClose();
  };

  const activeFilter =
    FILTER_STYLES[adjustments.filter] || FILTER_STYLES.normal;

  const previewTransform = {
    transform: `scale(${adjustments.zoom / 100}) translate(${adjustments.panX}px, ${adjustments.panY}px) rotate(${adjustments.rotation}deg)`,
    filter: activeFilter.filterCss,
    transition: "transform 0.15s ease-out, filter 0.2s ease",
  };

  const getAspectClass = () => {
    switch (aspectPreset) {
      case "1:1":
        return "aspect-square";
      case "3:4":
        return "aspect-3/4";
      case "4:3":
      default:
        return "aspect-4/3";
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adjust-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-7 border border-border-primary shadow-elevated my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between pb-3 border-b border-border-soft shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-extrabold bg-pastel-pink text-coral-dark border border-coral/30">
              #{String(photo.slotNumber).padStart(2, "0")} SHOT
            </span>
            <div>
              <h2
                id="adjust-modal-title"
                className="text-base sm:text-lg font-extrabold text-primary-text"
              >
                Framing &amp; Styling Adjustments
              </h2>
              <p className="text-xs text-secondary-text">{photo.title}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral hover:bg-blush-primary transition-colors focus:outline-none"
            aria-label="Close adjustment modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          <div className="flex flex-col items-center">
            <div
              className={`relative w-full max-w-md ${getAspectClass()} rounded-2xl overflow-hidden bg-[#20191D] border-4 border-white shadow-photo`}
            >
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-full relative" style={previewTransform}>
                  <Image
                    src={photo.imageSrc}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Viewfinder Corner Guides */}
              <div
                className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-white/60 rounded-tl-xs pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-white/60 rounded-tr-xs pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-white/60 rounded-bl-xs pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-white/60 rounded-br-xs pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 text-white/90 backdrop-blur-xs flex items-center gap-1.5">
                <span>Zoom: {adjustments.zoom}%</span>
                <span>·</span>
                <span>
                  Pan: {adjustments.panX},{adjustments.panY}
                </span>
                <span>·</span>
                <span>Filter: {activeFilter.previewBadge}</span>
              </div>
            </div>

            <p className="text-[11px] text-muted-text mt-2 text-center">
              Fine-tune scale and framing to align with your partner&apos;s pose.
            </p>
          </div>

          {/* CONTROLS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream/70 rounded-2xl p-4 border border-border-soft">
            <div className="space-y-2 bg-white rounded-xl p-3 border border-border-soft">
              <div className="flex items-center justify-between text-xs font-bold text-primary-text">
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-coral" />
                  <span>Zoom Scale</span>
                </span>
                <span className="font-mono text-coral">
                  {adjustments.zoom}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleZoomChange(adjustments.zoom - 10)}
                  className="w-7 h-7 rounded-lg bg-cream border border-border-soft flex items-center justify-center text-xs font-bold text-secondary-text hover:text-coral hover:bg-blush-primary"
                  aria-label="Zoom out"
                >
                  -
                </button>
                <input
                  type="range"
                  min="100"
                  max="200"
                  step="5"
                  value={adjustments.zoom}
                  onChange={(e) => handleZoomChange(Number(e.target.value))}
                  className="w-full accent-coral h-1.5 rounded-lg bg-gray-200 cursor-pointer"
                  aria-label="Zoom level"
                />
                <button
                  type="button"
                  onClick={() => handleZoomChange(adjustments.zoom + 10)}
                  className="w-7 h-7 rounded-lg bg-cream border border-border-soft flex items-center justify-center text-xs font-bold text-secondary-text hover:text-coral hover:bg-blush-primary"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2 bg-white rounded-xl p-3 border border-border-soft">
              <div className="flex items-center justify-between text-xs font-bold text-primary-text">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-coral" />
                  <span>Rotation &amp; Tilt</span>
                </span>
                <span className="font-mono text-coral">
                  {adjustments.rotation}°
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-text">-15°</span>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="1"
                  value={adjustments.rotation}
                  onChange={(e) => handleRotationChange(Number(e.target.value))}
                  className="w-full accent-coral h-1.5 rounded-lg bg-gray-200 cursor-pointer"
                  aria-label="Rotation angle"
                />
                <span className="text-[10px] text-muted-text">+15°</span>
              </div>
            </div>

            <div className="space-y-2 bg-white rounded-xl p-3 border border-border-soft">
              <div className="flex items-center justify-between text-xs font-bold text-primary-text">
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-coral" />
                  <span>Horizontal Pan (X)</span>
                </span>
                <span className="font-mono text-coral">
                  {adjustments.panX}px
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-text">Left</span>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="2"
                  value={adjustments.panX}
                  onChange={(e) => handlePanXChange(Number(e.target.value))}
                  className="w-full accent-coral h-1.5 rounded-lg bg-gray-200 cursor-pointer"
                  aria-label="Horizontal position"
                />
                <span className="text-[10px] text-muted-text">Right</span>
              </div>
            </div>

            <div className="space-y-2 bg-white rounded-xl p-3 border border-border-soft">
              <div className="flex items-center justify-between text-xs font-bold text-primary-text">
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-coral rotate-90" />
                  <span>Vertical Pan (Y)</span>
                </span>
                <span className="font-mono text-coral">
                  {adjustments.panY}px
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-text">Up</span>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="2"
                  value={adjustments.panY}
                  onChange={(e) => handlePanYChange(Number(e.target.value))}
                  className="w-full accent-coral h-1.5 rounded-lg bg-gray-200 cursor-pointer"
                  aria-label="Vertical position"
                />
                <span className="text-[10px] text-muted-text">Down</span>
              </div>
            </div>
          </div>

          {/* QUICK FILTERS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-primary-text">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                <span>Color Tone Filter</span>
              </span>
              <span className="text-muted-text text-[11px]">
                Active: {activeFilter.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {(Object.keys(FILTER_STYLES) as FilterType[]).map((fKey) => {
                const isSelected = adjustments.filter === fKey;
                const fMeta = FILTER_STYLES[fKey];

                return (
                  <button
                    key={fKey}
                    type="button"
                    onClick={() => handleFilterSelect(fKey)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all duration-200 flex flex-col items-center gap-1 ${
                      isSelected
                        ? "bg-pastel-pink border-coral text-coral-dark shadow-2xs font-bold"
                        : "bg-white border-border-soft hover:border-coral/40 text-secondary-text"
                    }`}
                  >
                    <span>{fMeta.name}</span>
                    {isSelected && (
                      <Check className="w-3 h-3 text-coral" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ASPECT RATIOS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-primary-text">
              <span className="flex items-center gap-1.5">
                <Crop className="w-3.5 h-3.5 text-coral" />
                <span>Slot Framing Presets</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "Classic 4:3 (Korean Life4Cut)", value: "4:3" as const },
                { label: "Square 1:1 (Insta Cut)", value: "1:1" as const },
                { label: "Portrait 3:4 (Studio)", value: "3:4" as const },
              ].map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setAspectPreset(preset.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    aspectPreset === preset.value
                      ? "bg-coral text-white border-coral shadow-2xs"
                      : "bg-white text-secondary-text border-border-soft hover:bg-blush-primary"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="pt-3 border-t border-border-soft flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-blush-primary border border-border-soft transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Adjustments</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-secondary-text hover:text-primary-text bg-white border border-border-soft hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-full text-xs font-bold text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
