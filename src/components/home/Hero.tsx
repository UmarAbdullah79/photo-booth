"use client";

import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ArrowRight, Heart, ShieldCheck, Zap } from "lucide-react";
import gsap from "gsap";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use GSAP context for proper React cleanup & strict mode safety
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left column stagger entrance
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
        // Right visual cards entrance
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

      // Subtle float animation loop for camera cards
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
        delay: 0.4,
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
        {/* Desktop 45% / 55% Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT SIDE: Text & CTAs (~45% Desktop = 5/12 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 z-10">
            {/* Eyebrow Badge */}
            <div className="hero-eyebrow">
              <Badge
                variant="pink"
                icon={<Heart className="w-3 h-3 text-coral fill-coral" />}
              >
                PHOTO BOOTH, JUST TOGETHER
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl font-bold text-primary-text tracking-tight leading-none flex flex-col">
              <span className="hero-headline-line block">Two People.</span>
              <span className="hero-headline-line block">Two Cameras.</span>
              <span className="hero-headline-line block text-coral">
                One Photo.
              </span>
            </h1>

            {/* Short Paragraph Description */}
            <p className="hero-description text-secondary-text text-sm sm:text-base leading-relaxed max-w-md">
              Take photos together from anywhere, even when you&apos;re miles
              apart. Sync your cameras, capture fun moments, and create memories
              that feel like you were together.
            </p>

            {/* CTA Buttons Group */}
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

            {/* Supporting Muted Info Row */}
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

          {/* RIGHT SIDE: Hero Visual Composition (~55% Desktop = 7/12 cols) */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
};
