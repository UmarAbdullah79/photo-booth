"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CameraIllustration } from "@/components/home/CameraIllustration";
import { ArrowRight, Check, ShieldCheck, Lock, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

      tl.fromTo(
        ".cta-illustration-wrap",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".cta-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".cta-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".cta-buttons",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".cta-reassurance",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="final-cta"
      background="blush-primary"
      spacing="normal"
      className="py-14 sm:py-20 lg:py-24 relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle background atmosphere details */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-pastel-pink/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-pastel-purple/30 rounded-full blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="w-full relative z-10">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 max-w-xl mx-auto">
            {/* 1. TOP ILLUSTRATION */}
            <div className="cta-illustration-wrap">
              <CameraIllustration />
            </div>

            {/* 2. HEADING */}
            <h2 className="cta-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-md sm:max-w-lg mx-auto">
              Ready to take a photo <br className="hidden xs:inline" />
              together?
            </h2>

            {/* 3. DESCRIPTION */}
            <p className="cta-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-[500px] mx-auto">
              Join thousands of couples, besties, and family members capturing
              unforgettable moments together — no matter how far apart.
            </p>

            {/* 4. PRIMARY + SECONDARY BUTTONS */}
            <div className="cta-buttons flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-3.5 pt-1 w-full xs:w-auto">
              <Button
                variant="primary"
                size="md"
                href="/create"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full xs:w-auto px-6"
              >
                Create a Free Room
              </Button>

              <Button
                variant="secondary"
                size="md"
                href="/join"
                className="w-full xs:w-auto px-5"
              >
                Enter 6-Digit Code
              </Button>
            </div>

            {/* 5. REASSURANCE ROW */}
            <div className="cta-reassurance pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] sm:text-xs text-muted-text font-medium select-none">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-pink text-coral flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-3" />
                </span>
                <span>100% Free Photo Booth</span>
              </span>

              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-green text-pastel-green-text flex items-center justify-center shrink-0">
                  <Lock className="w-2.5 h-2.5 stroke-2.5 text-pastel-green-text" />
                </span>
                <span>Private &amp; Encrypted</span>
              </span>

              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-purple text-pastel-purple-text flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-2.5 h-2.5 stroke-2.5 text-pastel-purple-text" />
                </span>
                <span>No Registration Required</span>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
