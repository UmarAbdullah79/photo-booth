"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Camera,
  CheckCircle2,
  Film,
  ArrowRight,
} from "lucide-react";
import { SessionMode } from "../types";

interface CompletionHeroProps {
  mode: SessionMode;
  hostName: string;
  partnerName: string;
  onOpenPreview: () => void;
}

export const CompletionHero: React.FC<CompletionHeroProps> = ({
  mode,
  hostName,
  partnerName,
  onOpenPreview,
}) => {
  const isFour = mode === 4;

  return (
    <section
      aria-labelledby="completion-heading"
      className="relative w-full rounded-3xl bg-linear-to-br from-[#FFF0F4] via-[#FCEFF4] to-[#F7F2FB] p-6 sm:p-8 lg:p-10 border border-border-soft shadow-card overflow-hidden"
    >
      {/* Decorative background light blurs */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 bg-pastel-pink/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-64 h-64 bg-pastel-purple/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Heading, Celebratory copy, Badges */}
        <div className="lg:col-span-7 space-y-4 text-left">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-coral/30 text-xs font-bold text-coral-dark shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span>SESSION MILESTONE COMPLETED</span>
            <span className="text-secondary-text">·</span>
            <span className="text-primary-text">
              {isFour ? "4 of 4 Ready" : "6 of 6 Ready"}
            </span>
          </div>

          {/* Main Hero Heading */}
          <h1
            id="completion-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-text tracking-tight"
          >
            {isFour ? "4 Photos Captured!" : "6 Photos Captured!"}{" "}
            <span className="inline-block text-coral animate-pulse">💖</span>
          </h1>

          {/* Celebratory Message */}
          <p className="text-sm sm:text-base text-secondary-text leading-relaxed max-w-xl">
            Yay! <span className="font-bold text-primary-text">{hostName}</span>{" "}
            &amp;{" "}
            <span className="font-bold text-primary-text">{partnerName}</span>{" "}
            have successfully captured all{" "}
            {isFour ? "4 synchronized frames" : "6 synchronized frames"} across
            the distance. Review your poses, inspect framing, or swap strip
            order below before saving!
          </p>

          {/* Feature / Status Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Strip/Collage Readiness Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-coral border border-coral/30 shadow-2xs">
              <Film className="w-3.5 h-3.5 text-coral" />
              <span>
                {isFour
                  ? "Life4Cut Strip Ready"
                  : "2×3 Korean Collage Ready"}
              </span>
            </div>

            {/* Quality Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-secondary-text border border-border-primary shadow-2xs">
              <Camera className="w-3.5 h-3.5 text-purple-500" />
              <span>HD 1080p Synchronized</span>
            </div>

            {/* Session Completion Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Synced · Ready to Style</span>
            </div>
          </div>

          {/* Quick link to New Preview & Edit Page */}
          <div className="pt-2">
            <Link
              href="/room/preview-edit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white text-coral border border-coral/40 hover:bg-blush-primary hover:border-coral transition-all shadow-xs group"
            >
              <span>Go to Photo Strip Review &amp; Editor</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Decorative Polaroid & Scrapbook Graphics */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            {/* Scrapbook card backing */}
            <div className="relative bg-white rounded-3xl p-4 border border-border-primary shadow-elevated transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Cute Washi Tape at Top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pastel-pink/90 border border-coral/30 rounded-xs shadow-2xs transform -rotate-2"
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-coral font-bold tracking-widest uppercase">
                  TWO HEARTS
                </div>
              </div>

              {/* Photo Collage Preview Mockup */}
              <div className="mt-2 grid grid-cols-2 gap-2 bg-[#FFF9F7] p-2.5 rounded-2xl border border-border-soft">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-2xs border border-white">
                  <Image
                    src="/images/hero-1.png"
                    alt="Photo Booth sample thumbnail 1"
                    fill
                    sizes="(max-width: 768px) 150px, 180px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-xs text-[9px] font-bold bg-black/60 text-white font-mono">
                    #01
                  </span>
                </div>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-2xs border border-white">
                  <Image
                    src="/images/hero-2.png"
                    alt="Photo Booth sample thumbnail 2"
                    fill
                    sizes="(max-width: 768px) 150px, 180px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-xs text-[9px] font-bold bg-black/60 text-white font-mono">
                    #02
                  </span>
                </div>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-2xs border border-white">
                  <Image
                    src="/images/create-hero-1.png"
                    alt="Photo Booth sample thumbnail 3"
                    fill
                    sizes="(max-width: 768px) 150px, 180px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-xs text-[9px] font-bold bg-black/60 text-white font-mono">
                    #03
                  </span>
                </div>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-2xs border border-white">
                  <Image
                    src="/images/hero-1.png"
                    alt="Photo Booth sample thumbnail 4"
                    fill
                    sizes="(max-width: 768px) 150px, 180px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-xs text-[9px] font-bold bg-black/60 text-white font-mono">
                    #04
                  </span>
                </div>
              </div>

              {/* Bottom Scrapbook Tag */}
              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-coral">
                  <Heart className="w-3.5 h-3.5 fill-coral" />
                  <span>Haru Film Milestone</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenPreview}
                  className="text-xs font-bold text-coral-dark hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Quick View</span>
                  <Sparkles className="w-3 h-3 text-coral" />
                </button>
              </div>

              {/* Heart Sticker Accent */}
              <div
                className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-pastel-pink border-2 border-white shadow-md flex items-center justify-center text-coral text-base font-bold animate-bounce"
                style={{ animationDuration: "3s" }}
                aria-hidden="true"
              >
                💕
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
