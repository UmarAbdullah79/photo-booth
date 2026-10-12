"use client";

import React, { useState } from "react";
import { Check, Copy, Heart, Sparkles } from "lucide-react";

interface RoomCodeCardProps {
  code: string;
  onCopied?: () => void;
}

export const RoomCodeCard: React.FC<RoomCodeCardProps> = ({
  code,
  onCopied,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is blocked
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const characters = (code || "A7K92P").slice(0, 6).split("");

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Outer Clickable Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCopy();
          }
        }}
        aria-label={`Room code: ${code}. Click or tap to copy.`}
        className="group relative bg-white rounded-3xl p-4 sm:p-6 border border-border-primary shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-3 focus-visible:ring-coral/40"
      >
        {/* Scrapbook corner stickers */}
        <div
          className="absolute -top-2.5 left-6 px-2.5 py-0.5 bg-pastel-pink/90 border border-coral/25 rounded-md text-[10px] sm:text-[11px] font-bold text-coral-dark -rotate-2 shadow-2xs backdrop-blur-xs flex items-center gap-1"
          aria-hidden="true"
        >
          <Heart className="w-2.5 h-2.5 fill-coral text-coral" />
          <span>ROOM CODE</span>
        </div>

        <div
          className="absolute -top-2.5 right-6 px-2 py-0.5 bg-white border border-border-soft rounded-full text-[10px] text-muted-text font-medium shadow-2xs flex items-center gap-1 group-hover:text-coral transition-colors"
          aria-hidden="true"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>TAP TO COPY</span>
        </div>

        {/* 6 Individual Character Tiles */}
        <div className="pt-2 sm:pt-3 pb-1">
          <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
            {characters.map((char, index) => (
              <div
                key={index}
                className="w-10 h-13 xs:w-11 xs:h-14 sm:w-14 sm:h-18 rounded-xl sm:rounded-2xl bg-linear-to-b from-[#FFFDFD] to-[#FFF5F7] border-2 border-border-primary/90 flex flex-col items-center justify-center shadow-xs group-hover:border-coral/60 group-hover:shadow-sm group-hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-primary-text font-mono tracking-tight">
                  {char}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-coral/30 mt-0.5 sm:mt-1 group-hover:bg-coral transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Copy Feedback / Instruction bar */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 text-xs text-secondary-text font-medium">
          {copied ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-green text-pastel-green-text font-semibold text-xs animate-in fade-in zoom-in-95 duration-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied to clipboard! 💕</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-muted-text group-hover:text-coral transition-colors">
              <Copy className="w-3.5 h-3.5 inline" />
              <span>Click anywhere on this card to copy the code</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
