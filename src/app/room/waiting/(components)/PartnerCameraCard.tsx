"use client";

import React from "react";
import { Camera, Heart, Sparkles, Loader2 } from "lucide-react";

interface PartnerCameraCardProps {
  roomCode?: string;
  partnerName?: string;
}

export const PartnerCameraCard: React.FC<PartnerCameraCardProps> = ({
  roomCode = "A7K92P",
  partnerName = "Min-ji",
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card relative flex flex-col justify-between">
      {/* Top Header Information Row */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {/* Label: PERSON 2 (PARTNER) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-purple/70 text-pastel-purple-text text-[11px] font-bold tracking-wide">
            <Heart className="w-3 h-3 fill-pastel-purple-text text-pastel-purple-text" />
            <span>PERSON 2 (PARTNER)</span>
          </div>

          {/* Status: Connecting... */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
            <span>Awaiting Entry</span>
          </div>
        </div>

        {/* Partner Name Label & Channel Status */}
        <div className="flex items-center justify-between text-[11px] text-secondary-text px-0.5">
          <span className="font-medium text-primary-text">
            Guest: {partnerName}
          </span>
          <span className="text-muted-text text-[11px]">
            Channel Standby
          </span>
        </div>
      </div>

      {/* Camera Viewfinder Viewport (Placeholder) */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-b from-[#FFFDFD] via-[#FFF6F8] to-[#FCEEF3] border border-border-primary/80 flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-inner">
        {/* Soft Pink Circular Background with Camera Icon */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-pastel-pink border-2 border-white shadow-sm flex items-center justify-center text-coral">
            <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          {/* Pulsing decorative mini-heart badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-coral/30 flex items-center justify-center text-coral shadow-xs">
            <Heart className="w-3 h-3 fill-coral animate-pulse" />
          </div>
        </div>

        {/* Main Message */}
        <h4 className="text-sm sm:text-base font-bold text-primary-text mb-1 max-w-xs">
          Waiting for {partnerName}&apos;s camera...
        </h4>

        {/* Supporting Text */}
        <p className="text-xs text-secondary-text max-w-xs mb-3.5 leading-relaxed">
          They&apos;ll appear here automatically once they enter room{" "}
          <strong className="text-primary-text font-mono font-bold tracking-wider">
            {roomCode}
          </strong>
          .
        </p>

        {/* Subtle Animated Loading Dots */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-soft text-xs text-secondary-text shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
          <span className="text-[11px] font-medium ml-1">Standby for stream</span>
        </div>

        {/* Bottom Label: Connecting heart 02... ♡ */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-secondary-text shadow-xs border border-border-soft backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-pastel-purple-text" />
            <span>Connecting heart 02... ♡</span>
          </div>
        </div>
      </div>

      {/* Matching bottom footer */}
      <div className="mt-3 pt-2 border-t border-border-soft flex items-center justify-between text-xs">
        <span className="text-[11px] text-secondary-text font-medium">
          Camera Preview Slot 02
        </span>
        <span className="text-[11px] text-muted-text font-mono">
          #PARTNER-CAM
        </span>
      </div>
    </div>
  );
};
