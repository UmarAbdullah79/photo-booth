import React from "react";
import { Heart, Sparkles, Camera, Zap } from "lucide-react";

export type GalleryVariant =
  | "classic"
  | "strip"
  | "dark"
  | "pastel"
  | "polaroid";

export interface GalleryItem {
  id: string;
  category: "couples" | "besties" | "y2k";
  variant: GalleryVariant;
  title: string;
  location?: string;
  date?: string;
  gradient: string;
  sticker?: string;
  rotation?: "slight-left" | "slight-right" | "none";
}

export interface GalleryCardProps {
  item: GalleryItem;
  className?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  className = "",
}) => {
  const rotationClass =
    item.rotation === "slight-left"
      ? "rotate-slight-left hover:rotate-0"
      : item.rotation === "slight-right"
      ? "rotate-slight-right hover:rotate-0"
      : "";

  // VARIANT 1: CLASSIC WHITE FRAME
  if (item.variant === "classic") {
    return (
      <div
        className={`gallery-card group bg-white rounded-2xl p-3 border border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${rotationClass} ${className}`.trim()}
      >
        <div
          className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-gradient-to-tr ${item.gradient} p-3 flex flex-col justify-between border border-border-soft`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-primary-text border border-border-soft backdrop-blur-xs">
              TWO HEARTS BOOTH
            </span>
            {item.sticker && (
              <span className="text-sm drop-shadow-xs">{item.sticker}</span>
            )}
          </div>

          {/* Center Graphic */}
          <div className="flex items-center justify-center py-2">
            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white drop-shadow-xs" />
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="flex items-center justify-between text-[9px] text-white/90 font-medium z-10">
            <span>● SYNCED</span>
            <span>{item.date || "2026"}</span>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h4 className="text-xs font-semibold text-primary-text leading-snug">
              {item.title}
            </h4>
            {item.location && (
              <p className="text-[10px] text-secondary-text">{item.location}</p>
            )}
          </div>
          <Heart className="w-3.5 h-3.5 text-coral fill-coral/20 group-hover:fill-coral transition-colors" />
        </div>
      </div>
    );
  }

  // VARIANT 2: PHOTO BOOTH STRIP (3 STACKED FRAMES)
  if (item.variant === "strip") {
    return (
      <div
        className={`gallery-card group bg-white rounded-2xl p-3 border border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${rotationClass} ${className}`.trim()}
      >
        <div className="bg-cream rounded-xl p-2 space-y-2 border border-border-soft mb-2">
          {/* Frame 1 */}
          <div
            className={`aspect-[16/9] rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center p-2 relative overflow-hidden`}
          >
            <span className="text-xs font-bold text-white tracking-widest opacity-80">
              FRAME 01
            </span>
            {item.sticker && (
              <span className="absolute top-1 right-1.5 text-xs">
                {item.sticker}
              </span>
            )}
          </div>
          {/* Frame 2 */}
          <div className="aspect-[16/9] rounded-lg bg-gradient-to-r from-blush-primary to-pastel-pink flex items-center justify-center p-2">
            <Heart className="w-4 h-4 text-coral fill-coral" />
          </div>
          {/* Frame 3 */}
          <div className="aspect-[16/9] rounded-lg bg-gradient-to-r from-lavender to-pastel-purple flex items-center justify-center p-2">
            <Sparkles className="w-4 h-4 text-pastel-purple-text" />
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-xs font-semibold text-primary-text">
          <span>{item.title}</span>
          <span className="text-[10px] text-coral font-bold uppercase tracking-wider">
            STRIP
          </span>
        </div>
      </div>
    );
  }

  // VARIANT 3: DARK BOOTH FRAME
  if (item.variant === "dark") {
    return (
      <div
        className={`gallery-card group bg-primary-text rounded-2xl p-3 border border-primary-text shadow-photo hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 text-white ${rotationClass} ${className}`.trim()}
      >
        <div
          className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-gradient-to-br ${item.gradient} p-3 flex flex-col justify-between border border-white/10`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-xs">
              DARK BOOTH
            </span>
            <Zap className="w-3.5 h-3.5 text-coral fill-coral" />
          </div>

          <div className="flex items-center justify-center">
            <span className="text-2xl drop-shadow-md">
              {item.sticker || "🌙"}
            </span>
          </div>

          <div className="text-[9px] font-mono text-white/70 tracking-widest">
            {item.date || "HQ EXPORT"}
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div>
            <h4 className="text-xs font-semibold text-white">{item.title}</h4>
            {item.location && (
              <p className="text-[10px] text-subtle-text">{item.location}</p>
            )}
          </div>
          <Heart className="w-3.5 h-3.5 text-coral fill-coral" />
        </div>
      </div>
    );
  }

  // VARIANT 4: PASTEL DUAL FRAME CARD
  if (item.variant === "pastel") {
    return (
      <div
        className={`gallery-card group bg-pastel-yellow/60 rounded-2xl p-3 border border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${rotationClass} ${className}`.trim()}
      >
        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
          <div
            className={`aspect-square rounded-lg bg-gradient-to-tr ${item.gradient} p-2 flex items-center justify-center border border-white`}
          >
            <span className="text-lg">{item.sticker || "🌸"}</span>
          </div>
          <div className="aspect-square rounded-lg bg-white p-2 flex flex-col items-center justify-center text-center border border-border-soft">
            <Heart className="w-4 h-4 text-coral fill-coral mb-0.5" />
            <span className="text-[9px] font-bold text-primary-text">
              2 CAM
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-semibold text-primary-text">
            {item.title}
          </h4>
          <span className="text-[10px] text-pastel-yellow-text font-bold">
            Y2K
          </span>
        </div>
      </div>
    );
  }

  // VARIANT 5: POLAROID STYLE
  return (
    <div
      className={`gallery-card group bg-white rounded-2xl p-3 pb-4 border border-border-primary shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${rotationClass} ${className}`.trim()}
    >
      <div
        className={`aspect-[4/3] rounded-xl bg-gradient-to-tr ${item.gradient} mb-3 p-3 flex flex-col justify-between border border-border-soft relative overflow-hidden`}
      >
        <span className="text-[9px] font-semibold text-white/90 bg-black/20 px-2 py-0.5 rounded-full w-max">
          POLAROID
        </span>
        {item.sticker && (
          <span className="absolute bottom-2 right-2 text-xl">
            {item.sticker}
          </span>
        )}
      </div>

      <div className="text-center px-1">
        <h4 className="text-xs font-semibold text-primary-text">
          {item.title}
        </h4>
        {item.location && (
          <p className="text-[10px] text-secondary-text mt-0.5">
            {item.location}
          </p>
        )}
      </div>
    </div>
  );
};
