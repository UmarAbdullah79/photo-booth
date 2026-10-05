"use client";

import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HowItWorksCard } from "@/components/layout/HowItWorksCard";
import {
  Link2,
  Share2,
  Download,
  RefreshCcw,
  Video,
  Sparkles,
  Heart,
} from "lucide-react";
import gsap from "gsap";

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".how-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".how-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".how-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".how-it-works-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.14 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stepsData = [
    {
      step: "01 / FREE",
      title: "Create or join a room",
      description:
        "Get a link and start a room or join one. No sign-up, no fuss.",
      supportingItem: "Instant code sharing",
      icon: <Link2 className="w-4 h-4" />,
      iconBgStyle: "bg-pastel-pink text-coral-dark",
      supportingIcon: <Share2 className="w-3.5 h-3.5" />,
    },
    {
      step: "02 / FREE",
      title: "Connect your cameras",
      description:
        "See each other live side-by-side in real-time, no app or video call required.",
      supportingItem: "Ultra-low-latency P2P sync",
      icon: <Video className="w-4 h-4" />,
      iconBgStyle: "bg-pastel-purple text-pastel-purple-text",
      supportingIcon: <RefreshCcw className="w-3.5 h-3.5" />,
    },
    {
      step: "03 / FREE",
      title: "Capture together",
      description:
        "Hit sync, laugh a little. The 2-shot feels better, and you can do it from anywhere.",
      supportingItem: "Printable 300DPI strips",
      icon: <Sparkles className="w-4 h-4" />,
      iconBgStyle: "bg-pastel-green text-pastel-green-text",
      supportingIcon: <Download className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <Section
      id="how-it-works"
      background="cream"
      spacing="normal"
      className="py-15 transition-colors duration-500"
    >
      <div ref={sectionRef} className="w-full">
        <Container size="default">
          {/* Centered Section Top Header */}
          <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-3 mb-10 sm:mb-12">
            {/* Eyebrow */}
            <div className="how-eyebrow">
              <Badge
                variant="cream"
                icon={<Heart className="w-3 h-3 text-coral fill-coral" />}
              >
                EASY AS 1, 2, 3
              </Badge>
            </div>

            {/* Heading */}
            <h2 className="how-heading text-3xl sm:text-4xl font-bold tracking-tight text-primary-text leading-tight">
              How it works
            </h2>

            {/* Description */}
            <p className="how-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-lg">
              No signups, no complicated downloads. Open a room, paste the link,
              turn on your camera, and start making memories.
            </p>
          </div>

          {/* 3 Equal-Height Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {stepsData.map((item, index) => (
              <HowItWorksCard
                key={index}
                step={item.step}
                title={item.title}
                description={item.description}
                supportingItem={item.supportingItem}
                icon={item.icon}
                iconBgStyle={item.iconBgStyle}
                supportingIcon={item.supportingIcon}
              />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
};
