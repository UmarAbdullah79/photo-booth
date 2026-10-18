"use client";

import React, { useEffect, useRef, useState } from "react";
import { Section } from "@/app/components/ui/Section";
import { Container } from "@/app/components/ui/Container";
import { Badge } from "@/app/components/ui/Badge";
import {
  Check,
  CheckCircle2,
  Download,
  FileText,
  Video,
  Printer,
  Copy,
  Sparkles,
  Heart,
  QrCode,
  Image as ImageIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Internal Export Mockup Component */
const ExportMockup: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative w-full max-w-[480px] mx-auto ${className}`}>
      <div className="absolute -top-3 -right-2 z-0 text-pastel-green-text/40 text-lg animate-pulse pointer-events-none select-none">
        ✦
      </div>
      <div className="absolute -bottom-3 -left-3 z-0 text-coral/40 text-base pointer-events-none select-none">
        ♥
      </div>
      <div className="absolute -z-10 top-1/3 -right-6 w-28 h-28 bg-pastel-green/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -z-10 -bottom-4 -left-6 w-32 h-32 bg-pastel-blue/40 rounded-full blur-2xl pointer-events-none" />

      <div className="export-mockup-card relative z-10 bg-white rounded-[22px] border border-border-primary/70 shadow-[0_10px_35px_rgba(50,25,35,0.07)] p-4 sm:p-5 flex flex-col justify-between min-h-[270px] sm:min-h-[300px] -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out select-none">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-soft">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-pastel-green text-pastel-green-text flex items-center justify-center border border-emerald-300/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary-text leading-tight">
                Your photo is ready
              </span>
              <span className="text-[9.5px] font-mono text-muted-text">
                Session #TH-2026-HQ
              </span>
            </div>
          </div>

          <div className="export-status-badge flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-green text-pastel-green-text border border-emerald-300/40 text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span>Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-center flex-1">
          <div className="export-photo-preview col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-[#FFF9F7] border border-border-soft relative">
            <div className="w-full max-w-[135px] bg-white border border-border-primary/80 rounded-lg p-1.5 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between px-0.5 text-[7px] font-bold text-primary-text/70 uppercase">
                <span className="flex items-center gap-0.5">
                  <Heart className="w-2 h-2 text-coral fill-coral" />
                  TWO HEARTS
                </span>
                <span className="font-mono text-[6.5px]">300 DPI</span>
              </div>

              {[
                {
                  bg: "from-pastel-pink/70 to-pastel-purple/60",
                  icon: Sparkles,
                },
                { bg: "from-pastel-yellow/70 to-pastel-pink/60", icon: Heart },
                {
                  bg: "from-pastel-blue/70 to-pastel-green/60",
                  icon: ImageIcon,
                },
              ].map((item, pIdx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={pIdx}
                    className="relative aspect-[4/3] rounded-md overflow-hidden bg-white border border-black/5 shadow-2xs flex items-center justify-center"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${item.bg}`}
                    />
                    <div className="relative z-10 w-5 h-5 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-coral shadow-2xs">
                      <IconComp className="w-2.5 h-2.5" />
                    </div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-primary-text/30" />
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-primary-text/30" />
                  </div>
                );
              })}

              <div className="pt-0.5 text-center">
                <span className="text-[6.5px] font-mono text-muted-text uppercase tracking-tight block">
                  Print Ready • 4x6 Strip
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-7 flex flex-col justify-between space-y-2.5 pl-0.5">
            <div className="flex flex-wrap items-center gap-1 text-[9px] font-semibold text-secondary-text">
              <span className="px-2 py-0.5 rounded-full bg-pastel-green/60 text-pastel-green-text border border-emerald-300/30">
                300 DPI HQ
              </span>
              <span className="px-2 py-0.5 rounded-full bg-pastel-blue/60 text-pastel-blue-text border border-blue-300/30">
                Print Ready
              </span>
              <span className="px-2 py-0.5 rounded-full bg-pastel-purple/60 text-pastel-purple-text border border-purple-300/30 flex items-center gap-1">
                <Video className="w-2.5 h-2.5" />
                LIVE CLIP
              </span>
            </div>

            <div className="text-[10px] text-muted-text font-medium flex items-center justify-between">
              <span>Full Strip + Animated GIF</span>
              <span className="font-mono text-[9px]">2.4 MB</span>
            </div>

            <button
              onClick={handleDownload}
              className={`w-full py-2.5 px-3.5 rounded-full text-xs font-bold transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                downloaded
                  ? "bg-success text-white scale-[0.99]"
                  : "bg-coral text-white hover:bg-coral-hover active:bg-coral-dark hover:shadow-md hover:shadow-coral/20 hover:-translate-y-0.5"
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-2.5" />
                  <span>Download PNG</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                onClick={handleDownload}
                className="py-1.5 px-2 rounded-full bg-white border border-coral/30 hover:border-coral text-coral-dark text-[10px] font-semibold flex items-center justify-center gap-1 hover:bg-blush-primary transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3 text-coral" />
                <span>PDF Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="py-1.5 px-2 rounded-full bg-white border border-border-soft hover:border-purple-300 text-secondary-text hover:text-pastel-purple-text text-[10px] font-semibold flex items-center justify-center gap-1 hover:bg-pastel-purple/30 transition-colors cursor-pointer"
              >
                <Video className="w-3 h-3 text-pastel-purple-text" />
                <span>Save GIF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2.5 mt-2.5 border-t border-border-soft flex items-center justify-between text-[10.5px]">
          <div className="flex items-center gap-1.5 text-secondary-text">
            <Printer className="w-3 h-3 text-coral" />
            <span className="text-[10px] font-medium hidden sm:inline">
              Instant print &amp; digital backup
            </span>
            <span className="text-[10px] font-medium sm:hidden">
              Print ready
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="px-2 py-0.5 rounded-full bg-blush-primary text-coral-dark hover:bg-pastel-pink transition-colors text-[9.5px] font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-2.5 h-2.5 text-success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
            <div
              className="w-5 h-5 rounded-full bg-pastel-blue text-pastel-blue-text flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              title="Share via QR Code"
            >
              <QrCode className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HighQualitySection: React.FC = () => {
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
        ".hq-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hq-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hq-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hq-checklist-item",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          ".hq-mockup-container",
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ".export-photo-preview",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3",
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5 lg:space-y-6 z-10">
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

              <h2 className="hq-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-primary-text leading-[1.08] max-w-lg">
                Download printable strips and animated live clips
              </h2>

              <p className="hq-description text-sm sm:text-base text-secondary-text leading-relaxed max-w-lg">
                Every session generates both a 300 DPI ready-to-print image and
                a video clip for sharing. Print it at your local photo center,
                post it on your socials, or keep it forever.
              </p>

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

            <div className="hq-mockup-container lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
              <ExportMockup />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
