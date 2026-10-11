"use client";

import React, { useState, useEffect, useRef } from "react";
import { Section } from "@/app/components/ui/Section";
import { Container } from "@/app/components/ui/Container";
import { Badge } from "@/app/components/ui/Badge";
import { Heart, Sparkles, Camera, CheckCircle2 } from "lucide-react";
import gsap from "gsap";

export type GalleryCategory = "all" | "couples" | "besties" | "y2k";
export type StripVariant = "classic" | "warm" | "dark" | "blush";

interface PhotoFrameData {
  gradient: string;
  sticker?: string;
  label?: string;
  tag?: string;
}

/* Category Filters Bar Component */
const GalleryFilters: React.FC<{
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
}> = ({ activeCategory, onSelectCategory }) => {
  const categories: { id: GalleryCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "couples", label: "Couples" },
    { id: "besties", label: "Besties" },
    { id: "y2k", label: "Y2K Vibes" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`h-7 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral cursor-pointer ${
              isActive
                ? "bg-coral text-white shadow-xs hover:bg-coral-hover"
                : "bg-white/80 text-secondary-text border border-border-primary hover:text-coral hover:bg-blush-primary hover:border-coral/40"
            }`}
            aria-pressed={isActive}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

/* Photo Strip Component */
const PhotoStrip: React.FC<{
  stripNumber: number;
  variant: StripVariant;
  category: GalleryCategory;
  title: string;
  caption: string;
  rotationClass?: string;
  offsetClass?: string;
  className?: string;
}> = ({
  stripNumber,
  variant,
  category,
  title,
  caption,
  rotationClass = "",
  offsetClass = "",
  className = "",
}) => {
  const getFramesData = (): PhotoFrameData[] => {
    if (category === "couples") {
      return [
        {
          gradient: "from-[#FFE0E8] via-[#FFF0F3] to-[#F7F2FB]",
          sticker: "💖",
          label: "NYC ➔ London",
          tag: "Synced 0.02s",
        },
        {
          gradient: "from-[#F45F7D]/20 via-[#FFE0E8] to-[#FFF0F3]",
          sticker: "✨",
          label: "Anniversary Flash",
        },
        {
          gradient: "from-[#FFF0F3] to-[#EEDCFA]",
          sticker: "💌",
          label: "Late Night Call",
        },
        {
          gradient: "from-[#FFE0E8] to-[#FFF0B8]",
          sticker: "💕",
          label: "One Shared Photo",
        },
      ];
    }

    if (category === "besties") {
      return [
        {
          gradient: "from-[#EEDCFA] via-[#F2F4FC] to-[#DDF3E8]",
          sticker: "🎉",
          label: "BFF Birthday",
          tag: "Live P2P",
        },
        {
          gradient: "from-[#DDF3E8] to-[#E2F0FA]",
          sticker: "☕",
          label: "Coffee Catchup",
        },
        {
          gradient: "from-[#FFF0B8] to-[#FFE0E8]",
          sticker: "🥳",
          label: "Squad Laughs",
        },
        {
          gradient: "from-[#E2F0FA] to-[#EEDCFA]",
          sticker: "⭐",
          label: "Bestie Memories",
        },
      ];
    }

    if (category === "y2k") {
      return [
        {
          gradient: "from-[#FFF0B8] via-[#FFE0E8] to-[#EEDCFA]",
          sticker: "🌸",
          label: "Y2K Glow Cam",
          tag: "Retro Filter",
        },
        {
          gradient: "from-[#E2F0FA] via-[#EEDCFA] to-[#FFF0B8]",
          sticker: "💫",
          label: "Cyber Hearts",
        },
        {
          gradient: "from-[#FFE0E8] to-[#7E3A94]/20",
          sticker: "🎀",
          label: "Flash Sticker",
        },
        {
          gradient: "from-[#FFF0B8] to-[#DDF3E8]",
          sticker: "✦",
          label: "Nostalgia 2000s",
        },
      ];
    }

    switch (variant) {
      case "classic":
        return [
          {
            gradient: "from-[#FFE0E8] via-[#FFF0F3] to-[#F7F2FB]",
            sticker: "💖",
            label: "Alex & Sam",
            tag: "Live Sync",
          },
          {
            gradient: "from-[#FFF0F3] to-[#E2F0FA]",
            sticker: "✨",
            label: "Silly Faces",
          },
          {
            gradient: "from-[#E2F0FA] to-[#FFE0E8]",
            sticker: "💌",
            label: "One Photo",
          },
          {
            gradient: "from-[#FFE0E8] to-[#DDF3E8]",
            sticker: "🌸",
            label: "Sweet Moments",
          },
        ];
      case "warm":
        return [
          {
            gradient: "from-[#FFF0B8] via-[#FFE0E8] to-[#EEDCFA]",
            sticker: "✨",
            label: "Y2K Retro",
            tag: "Warm Glow",
          },
          {
            gradient: "from-[#EEDCFA] to-[#FFF0B8]",
            sticker: "🎉",
            label: "Bestie Reunion",
          },
          {
            gradient: "from-[#FFF0B8] to-[#DDF3E8]",
            sticker: "⭐",
            label: "Laugh Together",
          },
          {
            gradient: "from-[#DDF3E8] to-[#FFE0E8]",
            sticker: "💫",
            label: "P2P Connected",
          },
        ];
      case "dark":
        return [
          {
            gradient: "from-[#292326] via-[#7E3A94] to-[#F45F7D]",
            sticker: "🌙",
            label: "Midnight Call",
            tag: "300DPI HQ",
          },
          {
            gradient: "from-[#7E3A94] via-[#292326] to-[#C93E5C]",
            sticker: "🔥",
            label: "Flash Photo",
          },
          {
            gradient: "from-[#292326] to-[#58A77F]/40",
            sticker: "⚡",
            label: "Real Time",
          },
          {
            gradient: "from-[#C93E5C] to-[#292326]",
            sticker: "💖",
            label: "Forever Strip",
          },
        ];
      case "blush":
      default:
        return [
          {
            gradient: "from-[#FFE0E8] via-[#E2F0FA] to-[#FFF0F3]",
            sticker: "💕",
            label: "Long Distance",
            tag: "Synced 0.02s",
          },
          {
            gradient: "from-[#FFF0F3] to-[#EEDCFA]",
            sticker: "☕",
            label: "Coffee Moment",
          },
          {
            gradient: "from-[#EEDCFA] to-[#FFF0B8]",
            sticker: "🥳",
            label: "Birthday Smile",
          },
          {
            gradient: "from-[#FFF0B8] to-[#FFE0E8]",
            sticker: "🎀",
            label: "Shared Memory",
          },
        ];
    }
  };

  const frames = getFramesData();

  const stripTheme = {
    classic: {
      outer: "bg-white text-primary-text border-border-primary shadow-photo",
      innerBg: "bg-[#FFF9F7] border border-border-soft",
      captionText: "text-coral-dark font-bold",
      brandBadge: "bg-blush-primary text-coral",
    },
    warm: {
      outer:
        "bg-[#FFF8E6] text-primary-text border border-pastel-yellow-text/20 shadow-photo",
      innerBg: "bg-[#FFFCEF] border border-pastel-yellow-text/15",
      captionText: "text-pastel-yellow-text font-bold",
      brandBadge: "bg-pastel-yellow text-pastel-yellow-text",
    },
    dark: {
      outer:
        "bg-[#1F1A1C] text-white border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
      innerBg: "bg-[#292326] border border-white/10",
      captionText: "text-white font-bold",
      brandBadge: "bg-white/10 text-coral",
    },
    blush: {
      outer:
        "bg-[#FFF0F4] text-primary-text border border-coral/20 shadow-photo",
      innerBg: "bg-[#FFF7F9] border border-coral/15",
      captionText: "text-coral font-bold",
      brandBadge: "bg-pastel-pink text-coral-dark",
    },
  }[variant];

  return (
    <div
      className={`photo-strip group relative w-full max-w-[250px] mx-auto rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated ${stripTheme.outer} ${rotationClass} ${offsetClass} ${className}`.trim()}
    >
      <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-current/10 px-0.5">
        <div className="flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-coral fill-coral" />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            STRIP 0{stripNumber}
          </span>
        </div>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${stripTheme.brandBadge}`}
        >
          TWO HEARTS
        </span>
      </div>

      <div className={`p-2 rounded-xl space-y-2.5 ${stripTheme.innerBg}`}>
        {frames.map((frame, idx) => (
          <div
            key={idx}
            className="group/frame relative aspect-[4/3] rounded-lg overflow-hidden border border-black/5 shadow-xs flex flex-col justify-between p-2.5 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${frame.gradient}`}
            />
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/60" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/60" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-white/60" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/60" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-white/80 text-primary-text backdrop-blur-xs">
                {frame.label || `SHOT 0${idx + 1}`}
              </span>
              {frame.sticker && (
                <span className="text-sm drop-shadow-xs">{frame.sticker}</span>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-center my-auto">
              <div className="w-7 h-7 rounded-full bg-white/40 backdrop-blur-xs border border-white/50 flex items-center justify-center">
                {idx % 2 === 0 ? (
                  <Camera className="w-3.5 h-3.5 text-primary-text/80" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-coral" />
                )}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8px] font-medium opacity-90">
              <span className="inline-flex items-center gap-0.5 text-primary-text/80">
                <CheckCircle2 className="w-2 h-2 text-success" />
                <span>{frame.tag || "LIVE"}</span>
              </span>
              <span className="text-primary-text/70 font-mono">2026</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 px-1 text-center space-y-0.5">
        <h4
          className={`text-xs uppercase tracking-wider ${stripTheme.captionText}`}
        >
          {title}
        </h4>
        <p className="text-[9px] opacity-75 font-mono tracking-tight">
          {caption}
        </p>
      </div>
    </div>
  );
};

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
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".gallery-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".gallery-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".gallery-filters",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".photo-strip",
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 },
          "-=0.3",
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
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
                Authentic, real-life moments captured together — from silly
                faces and birthday laughs to long-distance besties and lovers.
              </p>
            </div>

            <div className="gallery-filters shrink-0">
              <GalleryFilters
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 items-start max-w-5xl mx-auto">
            <PhotoStrip
              stripNumber={1}
              variant="classic"
              category={activeCategory}
              title="TWO HEARTS BOOTH"
              caption="SMILES FROM ANYWHERE"
              rotationClass="-rotate-1"
              offsetClass="mt-0"
            />

            <PhotoStrip
              stripNumber={2}
              variant="warm"
              category={activeCategory}
              title="Y2K RETRO GLOW"
              caption="REAL MEMORIES • P2P"
              rotationClass="rotate-[0.5deg]"
              offsetClass="mt-2 sm:mt-2.5"
            />

            <PhotoStrip
              stripNumber={3}
              variant="dark"
              category={activeCategory}
              title="FLASH MEMORIES"
              caption="300DPI HQ PRINT"
              rotationClass="-rotate-[0.5deg]"
              offsetClass="mt-0.5 sm:mt-1"
            />

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
