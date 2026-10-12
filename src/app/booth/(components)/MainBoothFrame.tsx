"use client";

import React, { RefObject } from "react";
import { Camera, Heart, Sparkles, User, Users } from "lucide-react";

export type FrameTheme = "haru-pastel" | "classic-pink" | "romantic-white";
export type FilterTheme = "haru-warm" | "soft-glow" | "natural";
export type LayoutTheme = "split" | "side-by-side";

interface MainBoothFrameProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraActive: boolean;
  onStartCamera: () => void;
  frameTheme: FrameTheme;
  filterTheme: FilterTheme;
  layoutTheme: LayoutTheme;
  countdown: number | null;
  isFlashing: boolean;
  hostName?: string;
  partnerName?: string;
}

export const MainBoothFrame: React.FC<MainBoothFrameProps> = ({
  videoRef,
  cameraActive,
  onStartCamera,
  frameTheme,
  filterTheme,
  layoutTheme,
  countdown,
  isFlashing,
  hostName = "You (Host)",
  partnerName = "Min-ji (Partner)",
}) => {
  // Determine frame styling
  const getFrameContainerClass = () => {
    switch (frameTheme) {
      case "classic-pink":
        return "bg-gradient-to-b from-[#FFF0F4] to-[#FCEEF2] border-4 border-[#F45F7D]/40 shadow-photo";
      case "romantic-white":
        return "bg-white border-4 border-border-primary/90 shadow-elevated";
      case "haru-pastel":
      default:
        return "bg-gradient-to-b from-[#FFFDFD] via-[#FFF5F8] to-[#FCEFF3] border-4 border-[#F5D8E2] shadow-photo";
    }
  };

  // Determine CSS filter styling for Host Video
  const getVideoFilterClass = () => {
    switch (filterTheme) {
      case "haru-warm":
        return "brightness-105 contrast-95 saturate-125 sepia-[0.14]";
      case "soft-glow":
        return "brightness-110 contrast-90 saturate-115";
      case "natural":
      default:
        return "brightness-100 contrast-100 saturate-100";
    }
  };

  const getFilterLabel = () => {
    switch (filterTheme) {
      case "haru-warm":
        return "Haru Warm · 70%";
      case "soft-glow":
        return "Soft Glow · Bloom 50%";
      case "natural":
      default:
        return "Natural Clean Tone";
    }
  };

  return (
    <div
      className={`relative w-full rounded-3xl sm:rounded-4xl p-3 sm:p-5 md:p-6 transition-all duration-300 ${getFrameContainerClass()}`}
    >
      {/* SHUTTER FLASH OVERLAY */}
      {isFlashing && (
        <div
          className="absolute inset-0 z-50 bg-white rounded-3xl sm:rounded-4xl pointer-events-none animate-out fade-out duration-500"
          aria-hidden="true"
        />
      )}

      {/* COUNTDOWN OVERLAY */}
      {countdown !== null && (
        <div
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs rounded-3xl sm:rounded-4xl flex flex-col items-center justify-center text-white pointer-events-none animate-in fade-in duration-200"
          aria-live="assertive"
        >
          <div className="text-6xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(244,95,125,0.7)] animate-bounce">
            {countdown === 0 ? "SMILE! 💕" : countdown}
          </div>
          <p className="text-sm sm:text-base font-bold text-pastel-pink mt-2 drop-shadow-md">
            Get ready for the flash!
          </p>
        </div>
      )}

      {/* TOP HEADER: Title, Special Edition Badge, Date & Location Metadata */}
      <div className="mb-3 sm:mb-4 px-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-coral/15 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-primary-text tracking-tight font-serif flex items-center gap-1.5">
            <span>Two Hearts Haru Film</span>
            <Heart className="w-3.5 h-3.5 fill-coral text-coral inline" />
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pastel-pink text-coral-dark border border-coral/30 tracking-wider uppercase">
            Special Edition
          </span>
        </div>

        {/* Date and Location Metadata */}
        <div className="text-[10px] sm:text-[11px] font-mono text-secondary-text tracking-wider uppercase flex items-center gap-2">
          <span>OCT 12, 2026</span>
          <span>·</span>
          <span>SEOUL × TOKYO</span>
          <span>·</span>
          <span className="font-bold text-coral">FRAME #01</span>
        </div>
      </div>

      {/* DUAL CAMERA VIEWPORTS: Side-by-Side (Desktop) & Stacked (Mobile) */}
      <div
        className={`relative grid gap-3 sm:gap-4 items-stretch ${
          layoutTheme === "side-by-side"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {/* LEFT PANEL: YOU (HOST) */}
        <div className="relative aspect-4/3 sm:aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-2 border-white shadow-inner flex items-center justify-center">
          {/* Actual Camera Video */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover -scale-x-100 transition-all duration-300 ${
              cameraActive
                ? "opacity-100"
                : "opacity-0 absolute pointer-events-none"
            } ${getVideoFilterClass()}`}
          />

          {/* Warm Tint Overlay when Haru Warm filter active */}
          {cameraActive && filterTheme === "haru-warm" && (
            <div
              className="absolute inset-0 bg-gradient-to-tr from-rose-400/10 via-amber-200/10 to-pink-300/15 pointer-events-none mix-blend-soft-light"
              aria-hidden="true"
            />
          )}

          {/* TOP OVERLAYS (HOST) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-white/95 text-primary-text backdrop-blur-md shadow-2xs">
              <User className="w-3 h-3 text-coral" />
              <span>YOU (HOST)</span>
            </span>

            {cameraActive ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>LIVE</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/90 text-white backdrop-blur-xs">
                <span>STANDBY</span>
              </span>
            )}
          </div>

          {/* Camera Status Label */}
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-xs">
              {cameraActive ? "30 FPS · 720p" : "Camera Idle"}
            </span>
          </div>

          {/* BOTTOM OVERLAYS (HOST) */}
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-pastel-pink text-coral-dark border border-coral/30 shadow-2xs">
              <Heart className="w-2.5 h-2.5 fill-coral text-coral" />
              <span>{hostName}</span>
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium text-white/95 bg-black/50 backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{getFilterLabel()}</span>
            </span>
          </div>

          {/* FALLBACK: Camera Standby UI */}
          {!cameraActive && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E2429] to-[#1C171A] flex flex-col items-center justify-center text-center p-4 text-white">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-coral mb-2">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                Host Camera Standby
              </h4>
              <p className="text-[11px] text-white/70 max-w-xs mb-2.5">
                Enable camera to preview your smile before snapping photos.
              </p>
              <button
                type="button"
                onClick={onStartCamera}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-coral text-white hover:bg-coral-hover active:bg-coral-dark shadow-xs transition-colors"
              >
                Turn On Camera
              </button>
            </div>
          )}
        </div>

        {/* CENTRAL VERTICAL DIVIDER WITH HEART ICON (Desktop Centered) */}
        <div
          className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border-2 border-coral/40 shadow-sm items-center justify-center text-coral"
          aria-hidden="true"
        >
          <Heart className="w-4 h-4 fill-coral animate-pulse" />
        </div>

        {/* RIGHT PANEL: PARTNER */}
        <div className="relative aspect-4/3 sm:aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFDFD] via-[#FFF6F8] to-[#FCEEF3] border-2 border-white shadow-inner flex flex-col items-center justify-center p-4 text-center">
          {/* TOP OVERLAYS (PARTNER) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-pastel-purple/80 text-pastel-purple-text backdrop-blur-md shadow-2xs">
              <Users className="w-3 h-3 text-pastel-purple-text" />
              <span>PARTNER</span>
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-secondary-text bg-white/80 border border-border-soft">
              Stream Slot 02
            </span>
          </div>

          {/* Aesthetic Partner Placeholder Silhouette */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pastel-pink/90 border-2 border-white shadow-xs flex items-center justify-center text-coral mb-2">
            <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-primary-text mb-0.5">
            Waiting for {partnerName}
          </h4>

          <p className="text-[11px] text-secondary-text max-w-xs mb-2 leading-relaxed">
            Partner video stream will dock automatically once joined.
          </p>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-border-soft text-[10px] text-muted-text shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
            <span>Awaiting peer connection</span>
          </div>

          {/* BOTTOM OVERLAYS (PARTNER) */}
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-secondary-text border border-border-soft shadow-2xs">
              <Heart className="w-2.5 h-2.5 text-pastel-purple-text inline" />
              <span>{partnerName}</span>
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium text-secondary-text bg-white/80 border border-border-soft">
              <span>{getFilterLabel()}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
