"use client";

import React, { useEffect, useRef } from "react";
import { Section } from "@/app/components/ui/Section";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, Check, Lock, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Internal Camera Illustration Component */
const CameraIllustration: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const anim = gsap.to(containerRef.current, {
      y: -4,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <span className="absolute -top-2.5 -left-3 text-coral/60 text-xs animate-pulse">
        ♥
      </span>
      <span className="absolute -top-3 -right-3.5 text-pastel-purple-text/70 text-sm">
        ✦
      </span>
      <span className="absolute -bottom-1 -right-3 text-pastel-yellow-text/80 text-xs">
        ★
      </span>

      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white p-2 border-2 border-coral/30 shadow-[0_8px_25px_rgba(244,95,125,0.15)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE0E8] via-[#FFF0F3] to-[#EEDCFA]" />

        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-xs"
        >
          <rect
            x="6"
            y="14"
            width="36"
            height="26"
            rx="7"
            fill="#F45F7D"
            stroke="#C93E5C"
            strokeWidth="2"
          />

          <path
            d="M16 14L18.5 10C19.2 8.9 20.4 8.2 21.7 8.2H26.3C27.6 8.2 28.8 8.9 29.5 10L32 14H16Z"
            fill="#E94E70"
            stroke="#C93E5C"
            strokeWidth="1.5"
          />

          <circle cx="13" cy="19" r="2.5" fill="#FFE0E8" />
          <circle cx="13" cy="19" r="1" fill="#FFFFFF" />

          <rect x="31" y="11" width="5" height="3" rx="1.5" fill="#FFE0E8" />

          <circle
            cx="24"
            cy="27"
            r="8.5"
            fill="#FFFFFF"
            stroke="#C93E5C"
            strokeWidth="2"
          />

          <circle cx="24" cy="27" r="5.5" fill="#292326" />
          <circle cx="22.5" cy="25.5" r="1.8" fill="#FFFFFF" opacity="0.9" />

          <path
            d="M24 28.5C24 28.5 22 27.2 22 26.2C22 25.5 22.5 25 23.2 25C23.6 25 23.9 25.2 24 25.4C24.1 25.2 24.4 25 24.8 25C25.5 25 26 25.5 26 26.2C26 27.2 24 28.5 24 28.5Z"
            fill="#F45F7D"
          />
        </svg>
      </div>
    </div>
  );
};

export const FinalCTA: React.FC = () => {
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
        ".cta-illustration-wrap",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".cta-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".cta-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".cta-buttons",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".cta-reassurance",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
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
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-pastel-pink/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-pastel-purple/30 rounded-full blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="w-full relative z-10">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 max-w-xl mx-auto">
            <div className="cta-illustration-wrap">
              <CameraIllustration />
            </div>

            <h2 className="cta-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-md sm:max-w-lg mx-auto">
              Ready to take a photo <br className="hidden xs:inline" />
              together?
            </h2>

            <p className="cta-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-[500px] mx-auto">
              Join thousands of couples, besties, and family members capturing
              unforgettable moments together — no matter how far apart.
            </p>

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
