"use client";

import React from "react";
import {
  Heart,
  Camera,
  Mic,
  Video,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
} from "lucide-react";

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-4 lg:py-6 select-none">
      {/* Decorative Soft Pastel Glow Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-110 sm:h-110 rounded-full bg-gradient-to-tr from-pastel-pink/50 via-pastel-purple/40 to-pastel-blue/50 blur-3xl -z-10 opacity-80 pointer-events-none" />
      <div className="absolute -top-6 right-10 w-24 h-24 rounded-full bg-pastel-yellow/40 blur-2xl -z-10 pointer-events-none" />

      {/* Main Composition Box */}
      <div className="relative w-full max-w-xl px-2 sm:px-4">
        {/* Floating Sync Status Badge Top Center */}
        <div className="hero-sync-badge absolute -top-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-border-primary shadow-card backdrop-blur-sm text-xs font-semibold text-primary-text">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-success">SYNCED</span>
          <span className="text-muted-text font-normal">| 0.02s Lag</span>
          <Heart className="w-3 h-3 text-coral fill-coral ml-0.5" />
        </div>

        {/* Two Camera Cards Container */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 pt-4 pb-12 items-center">
          {/* CAMERA CARD 01 (Left) */}
          <div className="hero-cam-card-1 relative group bg-white rounded-3xl p-2.5 sm:p-3.5 border border-border-primary shadow-photo transform -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out z-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-primary-text uppercase">
                  CAM 01
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pastel-pink text-coral-dark">
                ALEX
              </span>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-b from-blush-primary via-blush-soft to-lavender overflow-hidden border border-border-soft flex flex-col items-center justify-center p-3">
              {/* Subtle Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(var(--coral-pink)_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

              {/* Viewfinder Corner Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-coral/40 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-coral/40 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-coral/40 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-coral/40 rounded-br-sm" />

              {/* Stylized Remote Feed Illustration */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-pastel-pink to-white p-1 shadow-xs mb-2">
                  <div className="w-full h-full rounded-full bg-blush-primary flex items-center justify-center border border-coral/20">
                    <span className="text-xl sm:text-2xl font-bold text-coral">
                      ✨
                    </span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary-text">
                  New York, NY
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-secondary-text bg-white/80 px-2 py-0.5 rounded-full mt-1 border border-border-primary">
                  <CheckCircle2 className="w-2.5 h-2.5 text-success" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Floating Heart Sticker */}
              <div className="absolute top-3 right-3 bg-white/90 p-1 rounded-full shadow-xs border border-pastel-pink">
                <Heart className="w-3 h-3 text-coral fill-coral" />
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-blush-primary flex items-center justify-center text-coral">
                  <Mic className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-full bg-blush-primary flex items-center justify-center text-coral">
                  <Video className="w-3 h-3" />
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-coral text-white flex items-center justify-center shadow-xs">
                <Camera className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* CAMERA CARD 02 (Right) */}
          <div className="hero-cam-card-2 relative group bg-white rounded-3xl p-2.5 sm:p-3.5 border border-border-primary shadow-photo transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out z-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-primary-text uppercase">
                  CAM 02
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pastel-purple text-pastel-purple-text">
                SAM
              </span>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-b from-lavender via-lavender-blue to-blush-primary overflow-hidden border border-border-soft flex flex-col items-center justify-center p-3">
              {/* Subtle Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(var(--accent-purple-text)_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

              {/* Viewfinder Corner Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-pastel-purple-text/40 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-pastel-purple-text/40 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-pastel-purple-text/40 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-pastel-purple-text/40 rounded-br-sm" />

              {/* Stylized Remote Feed Illustration */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-pastel-purple to-white p-1 shadow-xs mb-2">
                  <div className="w-full h-full rounded-full bg-lavender flex items-center justify-center border border-pastel-purple-text/20">
                    <span className="text-xl sm:text-2xl font-bold text-pastel-purple-text">
                      💖
                    </span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary-text">
                  London, UK
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-secondary-text bg-white/80 px-2 py-0.5 rounded-full mt-1 border border-border-primary">
                  <CheckCircle2 className="w-2.5 h-2.5 text-success" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Floating Sparkle Sticker */}
              <div className="absolute top-3 left-3 bg-white/90 p-1 rounded-full shadow-xs border border-pastel-purple">
                <Sparkles className="w-3 h-3 text-pastel-purple-text" />
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center text-pastel-purple-text">
                  <Mic className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center text-pastel-purple-text">
                  <Sliders className="w-3 h-3" />
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-coral text-white flex items-center justify-center shadow-xs">
                <Camera className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* OVERLAPPING RESULT CARD: "ONE PHOTO" SYNCHRONIZED STRIP */}
        <div className="hero-result-card absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-xs bg-white rounded-2xl p-3 border-2 border-white shadow-elevated ring-1 ring-border-primary flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center shrink-0 border border-coral/30">
              <Zap className="w-4 h-4 text-coral fill-coral" />
            </div>
            <div>
              <div className="text-xs font-bold text-primary-text flex items-center gap-1">
                <span>One Shared Photo</span>
                <span className="text-xs text-coral font-normal">
                  (Synchronized)
                </span>
              </div>
              <p className="text-xs text-secondary-text">
                2 Remote Cameras ➔ 1 Photo Strip
              </p>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-pastel-yellow text-pastel-yellow-text text-xs font-bold tracking-wide uppercase shrink-0">
            Preview
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="hero-sparkle-1 absolute -top-2 left-4 z-30 text-coral/70 animate-bounce duration-1000">
          ✦
        </div>
        <div className="hero-sparkle-2 absolute bottom-8 right-2 z-30 text-pastel-purple-text/60">
          ★
        </div>
      </div>
    </div>
  );
};
