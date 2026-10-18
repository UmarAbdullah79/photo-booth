"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { PhotoSlot, FILTER_STYLES } from "../types";

interface PhotoCardProps {
  photo: PhotoSlot;
  index: number;
  totalSlots: number;
  onOpenAdjust: (photo: PhotoSlot) => void;
  onOpenRetake: (photo: PhotoSlot) => void;
  onMoveSlot: (currentIndex: number, newIndex: number) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
  isDragging?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  totalSlots,
  onOpenAdjust,
  onOpenRetake,
  onMoveSlot,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { adjustments } = photo;
  const filterStyle = FILTER_STYLES[adjustments.filter] || FILTER_STYLES.normal;

  const transformStyle = {
    transform: `scale(${adjustments.zoom / 100}) translate(${adjustments.panX}px, ${adjustments.panY}px) rotate(${adjustments.rotation}deg)`,
    filter: filterStyle.filterCss,
    transition: "transform 0.2s ease-out, filter 0.2s ease-out",
  };

  const shotNumFormatted = `#${String(index + 1).padStart(2, "0")} SHOT`;

  return (
    <article
      draggable
      onDragStart={(e) => onDragStart(e, photo.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, photo.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white rounded-3xl p-3.5 sm:p-4 border transition-all duration-300 flex flex-col justify-between ${
        isDragging
          ? "opacity-50 scale-95 border-dashed border-coral ring-2 ring-coral/40"
          : "border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1"
      }`}
      aria-label={`Photo card for slot ${index + 1}: ${photo.title}`}
    >
      {/* CARD TOP BAR: Shot Number, Status, Drag Handle */}
      <div className="flex items-center justify-between gap-1 mb-2.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-extrabold bg-pastel-pink text-coral-dark border border-coral/25">
          <span>{shotNumFormatted}</span>
        </span>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Captured</span>
          </span>

          <div
            className="cursor-grab active:cursor-grabbing text-muted-text hover:text-coral p-1 rounded-md"
            title="Drag to reorder photo position"
            aria-label="Drag handle to reorder slot"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* PHOTO THUMBNAIL CONTAINER */}
      <div
        onClick={() => onOpenAdjust(photo)}
        className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-2 border-border-soft group-hover:border-coral/40 cursor-pointer shadow-inner transition-colors"
        title="Click to inspect resolution and adjust framing"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenAdjust(photo);
          }
        }}
      >
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="w-full h-full relative" style={transformStyle}>
            <Image
              src={photo.imageSrc}
              alt={photo.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center gap-2 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 text-primary-text shadow-md flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
            <Maximize2 className="w-3.5 h-3.5 text-coral" />
            <span>Click to Adjust</span>
          </span>
        </div>

        {adjustments.filter !== "normal" && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-xs text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
            {filterStyle.previewBadge}
          </span>
        )}

        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-medium bg-black/60 text-white/90 backdrop-blur-xs">
          {photo.resolution}
        </span>
      </div>

      {/* POSE & SLOT DETAILS */}
      <div className="mt-3 space-y-1">
        <div className="text-[11px] font-medium text-muted-text flex items-center justify-between">
          <span>{photo.frameSlotLabel}</span>
          <span className="text-amber-500 font-bold flex items-center gap-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>100% Sync</span>
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-primary-text truncate group-hover:text-coral transition-colors">
          {photo.title}
        </h3>

        <div className="flex items-center justify-between pt-0.5 text-xs text-secondary-text">
          <div className="flex items-center text-amber-400 text-xs tracking-tighter" aria-label="Rating: 5 out of 5 stars">
            {"★".repeat(photo.rating)}
          </div>
          <span className="text-[11px] text-muted-text font-mono">
            Slot 0{index + 1}
          </span>
        </div>
      </div>

      {/* CARD ACTIONS: Adjust & Retake buttons */}
      <div className="mt-3 pt-3 border-t border-border-soft flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenAdjust(photo)}
          className="flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold text-primary-text bg-cream hover:bg-blush-primary border border-border-soft hover:border-coral/40 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs"
          aria-label={`Adjust framing for ${photo.title}`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-coral" />
          <span>Adjust</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenRetake(photo)}
          className="flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold text-secondary-text hover:text-coral bg-white hover:bg-blush-soft border border-border-soft hover:border-coral/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs"
          aria-label={`Retake photo for slot ${index + 1}`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-coral" />
          <span>Retake</span>
        </button>
      </div>

      {/* ACCESSIBLE REORDER CONTROLS FOR MOBILE AND KEYBOARD */}
      <div className="mt-2 pt-2 border-t border-dashed border-border-soft flex items-center justify-between text-[11px] text-muted-text">
        <span className="text-[10px] font-medium">Reorder slot:</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveSlot(index, index - 1)}
            className="px-2 py-0.5 rounded-md bg-cream hover:bg-blush-primary border border-border-soft text-secondary-text hover:text-coral disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-0.5"
            aria-label={`Move ${photo.title} to the left`}
            title="Move photo left"
          >
            <ChevronLeft className="w-3 h-3" />
            <span className="hidden xs:inline text-[10px]">Left</span>
          </button>
          <button
            type="button"
            disabled={index === totalSlots - 1}
            onClick={() => onMoveSlot(index, index + 1)}
            className="px-2 py-0.5 rounded-md bg-cream hover:bg-blush-primary border border-border-soft text-secondary-text hover:text-coral disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-0.5"
            aria-label={`Move ${photo.title} to the right`}
            title="Move photo right"
          >
            <span className="hidden xs:inline text-[10px]">Right</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
