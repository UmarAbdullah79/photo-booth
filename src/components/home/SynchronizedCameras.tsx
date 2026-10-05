"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CameraSyncMockup } from "@/components/home/CameraSyncMockup";
import { Check, Zap, Sparkles, Video, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SynchronizedCameras: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Handle prefers-reduced-motion gracefully
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

      // Left Column Reveal Stagger
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

        // Right Product Panel Reveal
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
          {/* Desktop Two-Column Layout (Left: ~44%, Right: ~56%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Text Content & Checklist (~44% Desktop = 5/12 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 lg:space-y-6 z-10">
              {/* Eyebrow Badge */}
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

              {/* Main Heading */}
              <h2 className="sync-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-lg">
                Live side-by-side cameras with synchronized shutter
              </h2>

              {/* Description Paragraph */}
              <p className="sync-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-120">
                Forget awkward three-second delay screenshots. Our WebRTC engine
                synchronizes the flash down to the millisecond, so both of you
                press the shutter at exactly the same beat.
              </p>

              {/* Compact Feature Checklist */}
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

            {/* RIGHT COLUMN: Camera Synchronization Product Mockup (~56% Desktop = 7/12 cols) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
              <CameraSyncMockup />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
