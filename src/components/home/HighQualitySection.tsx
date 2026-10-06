"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ExportMockup } from "@/components/home/ExportMockup";
import { Check, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HighQualitySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Handle prefers-reduced-motion gracefully
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
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

      // LEFT COLUMN: Sequential Text Reveal (Eyebrow -> Heading -> Description -> Checklist)
      tl.fromTo(
        ".hq-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hq-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hq-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hq-checklist-item",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        )

        // RIGHT COLUMN: Export Product Mockup Reveal
        .fromTo(
          ".hq-mockup-container",
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".export-photo-preview",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "High-resolution PNG & PDF for wallet-size prints",
    "Live-action looping video for Instagram Stories and TikTok",
    "Print-ready photo booth layouts",
    "Download instantly after your session",
  ];

  return (
    <Section
      id="always-high-quality"
      background="lavender"
      spacing="normal"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden transition-colors duration-500"
    >
      <div ref={sectionRef} className="w-full">
        <Container size="default">
          {/* Desktop Two-Column Layout (LEFT: Text ~48-50%, RIGHT: Export Visual ~50-52%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Text Content & Feature Checklist (~50% Desktop = 6/12 cols) */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5 lg:space-y-6 z-10">
              {/* Eyebrow Badge */}
              <div className="hq-eyebrow">
                <Badge
                  variant="green"
                  icon={
                    <CheckCircle2 className="w-3.5 h-3.5 text-pastel-green-text" />
                  }
                >
                  ALWAYS HIGH QUALITY
                </Badge>
              </div>

              {/* Main Heading */}
              <h2 className="hq-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-lg">
                Download printable strips and animated live clips
              </h2>

              {/* Description Paragraph */}
              <p className="hq-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-lg">
                Every session generates both a 300 DPI ready-to-print image and a
                video clip for sharing. Print it at your local photo center, post
                it on your socials, or keep it forever.
              </p>

              {/* Compact Feature Checklist */}
              <ul className="pt-1 space-y-2.5 sm:space-y-3 w-full">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="hq-checklist-item flex items-center gap-3 text-xs sm:text-sm font-medium text-primary-text"
                  >
                    <span className="w-5 h-5 rounded-full bg-pastel-green text-pastel-green-text flex items-center justify-center shrink-0 border border-emerald-300/40">
                      <Check className="w-3 h-3 stroke-3 text-pastel-green-text" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Compact Export / Download Product Mockup (~50% Desktop = 6/12 cols) */}
            <div className="hq-mockup-container lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
              <ExportMockup />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
