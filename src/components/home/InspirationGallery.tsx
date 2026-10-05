"use client";

import React, { useState, useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { GalleryFilters, GalleryCategory } from "@/components/home/GalleryFilters";
import { Sparkles } from "lucide-react";
import gsap from "gsap";

export const InspirationGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gallery-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".gallery-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".gallery-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".gallery-filters",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".photo-strip",
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <Section
      id="gallery"
      background="lavender"
      spacing="normal"
      className="py-24 sm:py-28 lg:py-32 transition-colors duration-500"
    >
      <div ref={sectionRef} className="w-full">
        <Container size="default">
          {/* Left-Aligned Header with Right-Aligned Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            {/* Left Header Content */}
            <div className="max-w-xl space-y-3">
              <div className="gallery-eyebrow">
                <Badge
                  variant="pink"
                  icon={<Sparkles className="w-3 h-3 text-coral" />}
                >
                  INSPIRATION GALLERY
                </Badge>
              </div>

              <h2 className="gallery-heading text-3xl sm:text-4xl font-bold tracking-tight text-primary-text leading-tight">
                Real moments, made together
              </h2>

              <p className="gallery-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-lg">
                Authentic, real-life moments captured together — from silly faces
                and birthday laughs to long-distance besties and lovers.
              </p>
            </div>

            {/* Right Category Filter Pills */}
            <div className="gallery-filters shrink-0">
              <GalleryFilters
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>

          {/* EXACTLY 4 TALL VERTICAL PHOTO-BOOTH STRIPS (Side-by-Side on Desktop, 2x2 on Mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 items-start max-w-5xl mx-auto">
            {/* STRIP 1: Classic Soft White / Pink */}
            <PhotoStrip
              stripNumber={1}
              variant="classic"
              category={activeCategory}
              title="TWO HEARTS BOOTH"
              caption="SMILES FROM ANYWHERE"
              rotationClass="-rotate-1"
              offsetClass="mt-0"
            />

            {/* STRIP 2: Warm Cream / Y2K Nostalgic */}
            <PhotoStrip
              stripNumber={2}
              variant="warm"
              category={activeCategory}
              title="Y2K RETRO GLOW"
              caption="REAL MEMORIES • P2P"
              rotationClass="rotate-[0.5deg]"
              offsetClass="mt-2 sm:mt-2.5"
            />

            {/* STRIP 3: Dark Charcoal Photo Booth */}
            <PhotoStrip
              stripNumber={3}
              variant="dark"
              category={activeCategory}
              title="FLASH MEMORIES"
              caption="300DPI HQ PRINT"
              rotationClass="-rotate-[0.5deg]"
              offsetClass="mt-0.5 sm:mt-1"
            />

            {/* STRIP 4: Soft Blush Pink */}
            <PhotoStrip
              stripNumber={4}
              variant="blush"
              category={activeCategory}
              title="TOGETHER AGAIN"
              caption="FOREVER STRIP • 2026"
              rotationClass="rotate-1"
              offsetClass="mt-2.5 sm:mt-3"
            />
          </div>
        </Container>
      </div>
    </Section>
  );
};
