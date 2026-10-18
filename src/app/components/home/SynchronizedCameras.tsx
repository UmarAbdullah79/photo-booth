"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/app/components/ui/Section";
import { Container } from "@/app/components/ui/Container";
import { Badge } from "@/app/components/ui/Badge";
import {
  Check,
  Zap,
  Sparkles,
  Camera,
  Heart,
  Volume2,
  Sliders,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Camera Sync Mockup Internal Component */
const CameraSyncMockup: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center select-none py-2 lg:py-4">
      {/* Background Soft Glow Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-108 sm:h-108 rounded-full bg-gradient-to-tr from-pastel-pink/40 via-pastel-purple/30 to-pastel-blue/40 blur-3xl -z-10 opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Decorative Accessories */}
      <div
        className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pastel-pink shadow-card text-xs font-semibold text-primary-text backdrop-blur-xs"
        aria-hidden="true"
      >
        <Heart className="w-3.5 h-3.5 text-coral fill-coral" />
        <span className="text-[11px]">Millisecond Flash Sync</span>
      </div>

      <div
        className="absolute -bottom-3 -left-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-border-primary shadow-card text-xs font-semibold text-secondary-text backdrop-blur-xs"
        aria-hidden="true"
      >
        <Sparkles className="w-3.5 h-3.5 text-coral" />
        <span className="text-[11px]">1080p Zero-Compression</span>
      </div>

      {/* MAIN WHITE PRODUCT PANEL CONTAINER */}
      <div className="sync-mockup-panel relative w-full max-w-[560px] bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-border-primary/80 shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:shadow-photo group rotate-subtle-left">
        {/* PRODUCT HEADER BAR */}
        <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-border-soft/70 mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF605C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-xs font-bold text-primary-text tracking-tight ml-1 sm:ml-2">
              Two Hearts Live Studio
            </span>
            <span className="text-[10px] font-semibold text-muted-text px-1.5 py-0.5 rounded bg-cream border border-border-soft hidden sm:inline-block">
              WebRTC P2P
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pastel-green text-pastel-green-text text-[10px] sm:text-xs font-bold tracking-wider uppercase border border-success/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span>LIVE SYNC</span>
          </div>
        </div>

        {/* CAMERA PREVIEWS CONTAINER */}
        <div className="relative my-2 sm:my-3">
          {/* CENTRAL SYNCHRONIZATION INDICATOR BADGE */}
          <div className="sync-center-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="relative bg-white rounded-full p-1.5 sm:p-2 border-2 border-coral/30 shadow-photo flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5">
              <span className="absolute inset-0 rounded-full border border-coral animate-ping opacity-35 pointer-events-none" />

              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pastel-pink flex items-center justify-center text-coral shrink-0">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-coral" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] sm:text-xs font-extrabold text-coral tracking-wider uppercase">
                  SYNCED
                </span>
                <span className="text-[9px] text-muted-text font-medium">
                  0.00s LAG
                </span>
              </div>
            </div>
          </div>

          {/* TWO SIDE-BY-SIDE CAMERA PREVIEWS */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 items-stretch">
            {/* LEFT CAMERA PREVIEW */}
            <div className="sync-cam-preview relative aspect-[3.5/4] sm:aspect-[4/4.4] rounded-2xl bg-gradient-to-b from-blush-primary via-blush-soft to-pastel-pink/30 border border-border-primary/60 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-coral/40 rounded-tl-xs pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-coral/40 rounded-tr-xs pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-coral/40 rounded-bl-xs pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-coral/40 rounded-br-xs pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-1">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 border border-border-primary/70 text-[9px] sm:text-[10px] font-bold text-primary-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                  <span>LEFT CAM</span>
                </div>
                <span className="text-[9px] font-semibold text-secondary-text bg-white/75 px-1.5 py-0.5 rounded-md border border-border-soft">
                  ALEX
                </span>
              </div>

              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-pastel-pink via-white to-blush-primary p-1 shadow-xs border border-coral/20 flex items-center justify-center mb-1.5">
                  <div className="w-full h-full rounded-full bg-blush-primary flex items-center justify-center text-coral text-lg sm:text-2xl font-bold">
                    🌸
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-primary-text">
                  NYC Camera
                </span>
                <span className="text-[9px] text-muted-text font-medium">
                  Ready to Capture
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-1 border-t border-coral/10">
                <div className="flex items-center gap-1 text-[9px] text-secondary-text font-medium">
                  <Volume2 className="w-2.5 h-2.5 text-coral" />
                  <span className="hidden sm:inline">Audio Sync</span>
                </div>
                <span className="text-[9px] font-mono text-muted-text">
                  1080p HQ
                </span>
              </div>
            </div>

            {/* RIGHT CAMERA PREVIEW */}
            <div className="sync-cam-preview relative aspect-[3.5/4] sm:aspect-[4/4.4] rounded-2xl bg-gradient-to-b from-lavender via-lavender-blue to-pastel-purple/30 border border-border-primary/60 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-pastel-purple-text/40 rounded-tl-xs pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-pastel-purple-text/40 rounded-tr-xs pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-pastel-purple-text/40 rounded-bl-xs pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-pastel-purple-text/40 rounded-br-xs pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-1">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 border border-border-primary/70 text-[9px] sm:text-[10px] font-bold text-primary-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span>RIGHT CAM</span>
                </div>
                <span className="text-[9px] font-semibold text-pastel-purple-text bg-white/75 px-1.5 py-0.5 rounded-md border border-border-soft">
                  YOU
                </span>
              </div>

              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-pastel-purple via-white to-lavender p-1 shadow-xs border border-pastel-purple/30 flex items-center justify-center mb-1.5">
                  <div className="w-full h-full rounded-full bg-lavender flex items-center justify-center text-pastel-purple-text text-lg sm:text-2xl font-bold">
                    ✨
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-primary-text">
                  London Camera
                </span>
                <span className="text-[9px] text-muted-text font-medium">
                  Live Viewfinder
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-1 border-t border-pastel-purple/20">
                <div className="flex items-center gap-1 text-[9px] text-secondary-text font-medium">
                  <Sliders className="w-2.5 h-2.5 text-pastel-purple-text" />
                  <span className="hidden sm:inline">Light Active</span>
                </div>
                <span className="text-[9px] font-mono text-muted-text">
                  60 FPS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SHUTTER CONTROL PANEL */}
        <div className="mt-3.5 sm:mt-4 pt-3 border-t border-border-soft/70 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs text-secondary-text font-medium">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="hidden sm:inline">Auto Selfie Timer:</span>
            <span className="font-bold text-primary-text">3s Flash</span>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-coral/20 animate-ping opacity-30 pointer-events-none" />

            <button
              type="button"
              aria-label="Synchronized Shutter Trigger"
              className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-pastel-pink border-2 border-coral p-1 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-300 group/btn cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-coral group-hover/btn:bg-coral-hover flex items-center justify-center text-white shadow-xs transition-colors">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20" />
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs text-secondary-text font-medium">
            <span className="hidden sm:inline text-muted-text">Strip:</span>
            <span className="px-2 py-0.5 rounded-full bg-pastel-yellow text-pastel-yellow-text font-bold text-[10px] sm:text-xs">
              4 Shots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SynchronizedCameras: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".sync-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".sync-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".sync-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".sync-checklist-item",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          ".sync-mockup-panel",
          { opacity: 0, y: 25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.7",
        )
        .fromTo(
          ".sync-cam-preview",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".sync-center-badge",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "Automatic camera synchronization",
    "Automatic selfie countdown",
    "Remote selfie-ready light sync",
    "Capture without video-call compression",
  ];

  return (
    <Section
      id="zero-lag-precision"
      background="lavender-blue"
      spacing="normal"
      className="py-15 relative overflow-hidden transition-colors duration-500"
    >
      <div ref={sectionRef} className="w-full">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Text Content & Checklist (~44% Desktop) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 lg:space-y-6 z-10">
              <div className="sync-eyebrow">
                <Badge
                  variant="green"
                  icon={
                    <Zap className="w-3.5 h-3.5 text-pastel-green-text fill-pastel-green-text" />
                  }
                >
                  ZERO-LAG PRECISION
                </Badge>
              </div>

              <h2 className="sync-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-lg">
                Live side-by-side cameras with synchronized shutter
              </h2>

              <p className="sync-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-120">
                Forget awkward three-second delay screenshots. Our WebRTC engine
                synchronizes the flash down to the millisecond, so both of you
                press the shutter at exactly the same beat.
              </p>

              <ul className="pt-1 space-y-2.5 sm:space-y-3 w-full">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="sync-checklist-item flex items-center gap-3 text-xs sm:text-sm font-medium text-primary-text"
                  >
                    <span className="w-5 h-5 rounded-full bg-pastel-pink text-coral flex items-center justify-center shrink-0 border border-coral/20">
                      <Check className="w-3 h-3 stroke-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Camera Synchronization Product Mockup (~56% Desktop) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
              <CameraSyncMockup />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
