"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, ShieldCheck, Video, Smartphone, HelpCircle } from "lucide-react";

export const CameraTipsAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white/80 rounded-2xl border border-border-primary/80 overflow-hidden shadow-xs transition-all duration-300">
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="camera-tips-content"
        className="w-full min-h-[50px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-blush-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-pastel-pink text-coral flex items-center justify-center shrink-0 text-xs">
            💡
          </span>
          <span className="text-xs sm:text-sm font-bold text-primary-text">
            Booth Camera Tips &amp; Permissions
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-secondary-text">
          <span className="text-[11px] text-muted-text hidden xs:inline">
            {isOpen ? "Hide tips" : "Need help?"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-coral transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Accordion Collapsible Content */}
      {isOpen && (
        <div
          id="camera-tips-content"
          role="region"
          aria-labelledby="camera-tips-heading"
          className="px-4 sm:px-6 pb-5 pt-1 border-t border-border-soft space-y-4 text-xs sm:text-[13px] text-secondary-text animate-in fade-in-50 duration-200"
        >
          {/* Tip 1: Granting Permissions */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-md bg-rose-50 text-coral flex items-center justify-center shrink-0 mt-0.5">
              <Video className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-primary-text mb-0.5">
                How to Enable Camera &amp; Mic Access
              </p>
              <p className="text-secondary-text leading-relaxed">
                When prompted by your browser, tap <strong className="text-primary-text">&ldquo;Allow&rdquo;</strong>. If accidentally denied, tap the <strong className="text-primary-text">Lock / Tune</strong> icon in your browser URL bar, enable Camera and Microphone, and tap &ldquo;Try Again&rdquo;.
              </p>
            </div>
          </div>

          {/* Tip 2: Mobile Browsers */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-md bg-pastel-purple/50 text-pastel-purple-text flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-primary-text mb-0.5">
                Best Mobile Experience (iOS &amp; Android)
              </p>
              <p className="text-secondary-text leading-relaxed">
                On iPhone, open this page in <strong className="text-primary-text">Safari</strong> or Chrome. On Android, use <strong className="text-primary-text">Chrome</strong>. Make sure other video apps like Instagram, FaceTime, or Zoom aren&apos;t actively holding your camera open in the background.
              </p>
            </div>
          </div>

          {/* Tip 3: Lighting & Angle */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-md bg-pastel-yellow text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-primary-text mb-0.5">
                Perfect Lighting for Photo Strips
              </p>
              <p className="text-secondary-text leading-relaxed">
                Face toward a soft window or lamp for bright, romantic couple photos. Toggle the <strong className="text-primary-text">Warm Romantic</strong> filter above for a vintage K-photo-booth blush glow!
              </p>
            </div>
          </div>

          {/* Tip 4: Privacy & Security */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-md bg-pastel-green text-pastel-green-text flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-primary-text mb-0.5">
                100% Private &amp; Encrypted
              </p>
              <p className="text-secondary-text leading-relaxed">
                Your live stream is peer-to-peer and visible only to the person with your private 6-digit room code. We never record or save your video without both participants clicking Snap!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
