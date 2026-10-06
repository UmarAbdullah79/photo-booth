"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CustomizationMockup } from "@/components/home/CustomizationMockup";
import { Check, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CustomizationSection: React.FC = () => {
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

      // LEFT COLUMN: Visual Editor Mockup Reveal (Fade in, scale 0.97 -> 1, y 25 -> 0)
      tl.fromTo(
        ".custom-mockup-container",
        { opacity: 0, y: 25, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      )

        // RIGHT COLUMN: Sequential Text Reveal (Eyebrow -> Heading -> Description -> Checklist)
        .fromTo(
          ".custom-eyebrow",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          ".custom-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".custom-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".custom-checklist-item",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "Authentic date-stamped camera frames",
    "QR codes and custom footer texts",
    "Seasonal / festival themes",
    "Y2K-inspired stickers and doodles",
  ];

  return (
    <Section
      id="endless-customization"
      background="blush-soft"
      spacing="normal"
      className="py-16 sm:py-24 lg:py-28 relative overflow-hidden transition-colors duration-500"
    >
      <div ref={sectionRef} className="w-full">
        <Container size="default">
          {/* Desktop Two-Column Layout (LEFT: Visual ~54-58%, RIGHT: Text ~42-46%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Large Customization / Editor Product Mockup (~58% Desktop = 7/12 cols) */}
            <div className="custom-mockup-container lg:col-span-7 w-full flex items-center justify-center lg:justify-start order-2 lg:order-1">
              <CustomizationMockup />
            </div>

            {/* RIGHT COLUMN: Text Content & Feature Checklist (~42% Desktop = 5/12 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 lg:space-y-6 z-10 order-1 lg:order-2">
              {/* Eyebrow Badge */}
              <div className="custom-eyebrow">
                <Badge
                  variant="purple"
                  icon={
                    <Sparkles className="w-3.5 h-3.5 text-pastel-purple-text" />
                  }
                >
                  ENDLESS CUSTOMIZATION
                </Badge>
              </div>

              {/* Main Heading */}
              <h2 className="custom-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-lg">
                Authentic Korean frames, Y2K doodles &amp; stickers
              </h2>

              {/* Description Paragraph */}
              <p className="custom-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-md">
                Recreate the real Hangout and Snapchat photobooth experience
                right in your browser. Choose a classic frame, pastel colors,
                fun stickers, and Y2K-inspired decorations.
              </p>

              {/* Compact Feature Checklist */}
              <ul className="pt-1 space-y-2.5 sm:space-y-3 w-full">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="custom-checklist-item flex items-center gap-3 text-xs sm:text-sm font-medium text-primary-text"
                  >
                    <span className="w-5 h-5 rounded-full bg-pastel-pink text-coral flex items-center justify-center shrink-0 border border-coral/20">
                      <Check className="w-3 h-3 stroke-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
