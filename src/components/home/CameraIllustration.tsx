"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CameraIllustrationProps {
  className?: string;
}

export const CameraIllustration: React.FC<CameraIllustrationProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Slow, subtle, floating loop (y: 0 -> -4px -> 0 over 3.5 seconds)
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
      {/* Subtle floating sparkles & hearts around camera */}
      <span className="absolute -top-2.5 -left-3 text-coral/60 text-xs animate-pulse">
        ♥
      </span>
      <span className="absolute -top-3 -right-3.5 text-pastel-purple-text/70 text-sm">
        ✦
      </span>
      <span className="absolute -bottom-1 -right-3 text-pastel-yellow-text/80 text-xs">
        ★
      </span>

      {/* 68x68px Custom Cute Pastel Camera SVG Illustration */}
      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white p-2 border-2 border-coral/30 shadow-[0_8px_25px_rgba(244,95,125,0.15)] flex items-center justify-center relative overflow-hidden">
        {/* Soft pastel background fill */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE0E8] via-[#FFF0F3] to-[#EEDCFA]" />

        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-xs"
        >
          {/* Camera Body */}
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

          {/* Top Camera Viewfinder Notch */}
          <path
            d="M16 14L18.5 10C19.2 8.9 20.4 8.2 21.7 8.2H26.3C27.6 8.2 28.8 8.9 29.5 10L32 14H16Z"
            fill="#E94E70"
            stroke="#C93E5C"
            strokeWidth="1.5"
          />

          {/* Flash Light / Sensor */}
          <circle cx="13" cy="19" r="2.5" fill="#FFE0E8" />
          <circle cx="13" cy="19" r="1" fill="#FFFFFF" />

          {/* Shutter Button */}
          <rect x="31" y="11" width="5" height="3" rx="1.5" fill="#FFE0E8" />

          {/* Outer Lens Ring */}
          <circle
            cx="24"
            cy="27"
            r="8.5"
            fill="#FFFFFF"
            stroke="#C93E5C"
            strokeWidth="2"
          />

          {/* Inner Lens Glass */}
          <circle cx="24" cy="27" r="5.5" fill="#292326" />
          <circle cx="22.5" cy="25.5" r="1.8" fill="#FFFFFF" opacity="0.9" />

          {/* Heart Detail inside Lens */}
          <path
            d="M24 28.5C24 28.5 22 27.2 22 26.2C22 25.5 22.5 25 23.2 25C23.6 25 23.9 25.2 24 25.4C24.1 25.2 24.4 25 24.8 25C25.5 25 26 25.5 26 26.2C26 27.2 24 28.5 24 28.5Z"
            fill="#F45F7D"
          />
        </svg>
      </div>
    </div>
  );
};
