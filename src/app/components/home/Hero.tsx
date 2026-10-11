"use client";

import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Zap,
  Camera,
  Mic,
  Video,
  Sparkles,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import gsap from "gsap";

/* Internal Hero Visual Component */
const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-4 lg:py-6 select-none">
      {/* Decorative Soft Pastel Glow Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-110 sm:h-110 rounded-full bg-linear-to-tr from-pastel-pink/50 via-pastel-purple/40 to-pastel-blue/50 blur-3xl -z-10 opacity-80 pointer-events-none" />
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
                Malar (Chennai)
              </span>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="relative aspect-3/4 rounded-2xl bg-linear-to-b from-blush-primary via-blush-soft to-lavender overflow-hidden border border-border-soft flex flex-col items-center justify-center">
              {/* <div className="absolute inset-0 bg-[radial-gradient(var(--coral-pink)_1px,transparent_1px)] bg-size-[12px_12px] opacity-15 pointer-events-none" /> */}

              {/* Viewfinder Corner Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-coral/40 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-coral/40 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-coral/40 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-coral/40 rounded-br-sm" />

              {/* Stylized Remote Feed Illustration */}
              {/* <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-tr from-pastel-pink to-white p-1 shadow-xs mb-2">
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
              </div> */}
              <Image
                src="/images/hero-1.png"
                alt="Hero background"
                width={800}
                height={600}
                className="object-cover aspect-3/4 object-center h-full w-full rounded-sm"
              />

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
                Vinoth (Kerala)
              </span>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="relative aspect-3/4 rounded-2xl bg-linear-to-b from-lavender via-lavender-blue to-blush-primary overflow-hidden border border-border-soft flex flex-col items-center justify-center">
              {/* <div className="absolute inset-0 bg-[radial-gradient(var(--accent-purple-text)_1px,transparent_1px)] bg-size-[12px_12px] opacity-15 pointer-events-none" /> */}

              {/* Viewfinder Corner Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-pastel-purple-text/40 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-pastel-purple-text/40 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-pastel-purple-text/40 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-pastel-purple-text/40 rounded-br-sm" />

              {/* Stylized Remote Feed Illustration */}
              {/* <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-tr from-pastel-purple to-white p-1 shadow-xs mb-2">
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
              </div> */}
               <Image
                src="/images/hero-2.png"
                alt="Hero background"
                width={800}
                height={600}
                className="object-cover aspect-3/4 object-center h-full w-full rounded-sm"
              />


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

        {/* OVERLAPPING RESULT CARD */}
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

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
      )
        .fromTo(
          ".hero-headline-line",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.4",
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          "#hero-supporting-info",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".hero-cam-card-1",
          { opacity: 0, scale: 0.92, rotate: -6 },
          {
            opacity: 1,
            scale: 1,
            rotate: -2,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.9",
        )
        .fromTo(
          ".hero-cam-card-2",
          { opacity: 0, scale: 0.92, rotate: 6 },
          {
            opacity: 1,
            scale: 1,
            rotate: 2,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.7",
        )
        .fromTo(
          ".hero-result-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        );

      gsap.to(".hero-cam-card-1", {
        y: -5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });

      gsap.to(".hero-cam-card-2", {
        y: 5,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });

      gsap.to(".hero-sync-badge", {
        y: -3,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-6 sm:pt-10 pb-16 lg:pt-12 overflow-hidden bg-cream"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT SIDE: Text & CTAs (~45% Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 z-10">
            <div className="hero-eyebrow">
              <Badge
                variant="pink"
                icon={<Heart className="w-3 h-3 text-coral fill-coral" />}
              >
                PHOTO BOOTH, JUST TOGETHER
              </Badge>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-primary-text tracking-tight leading-none flex flex-col">
              <span className="hero-headline-line block">Two People.</span>
              <span className="hero-headline-line block">Two Cameras.</span>
              <span className="hero-headline-line block text-coral">
                One Photo.
              </span>
            </h1>

            <p className="hero-description text-secondary-text text-sm sm:text-base leading-relaxed max-w-md">
              Take photos together from anywhere, even when you&apos;re miles
              apart. Sync your cameras, capture fun moments, and create memories
              that feel like you were together.
            </p>

            <div className="hero-cta-group flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1">
              <Button
                variant="primary"
                size="lg"
                href="#create"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Create a Room
              </Button>
              <Button variant="secondary" size="lg" href="#join">
                Join a Room
              </Button>
            </div>

            <div
              id="hero-supporting-info"
              className="pt-2 flex items-center gap-3 text-xs font-medium text-muted-text select-none"
            >
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3 h-3 text-success" />
                100% Free
              </span>
              <span className="text-subtle-text">•</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-success" />
                Private &amp; Secure
              </span>
              <span className="text-subtle-text">•</span>
              <span>No Registration</span>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Visual (~55% Desktop) */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
};
