"use client";

import React, { useState } from "react";
import { Lock, Clock, HelpCircle, Heart, X } from "lucide-react";

export const PrivacyNotice: React.FC = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-xl mx-auto py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-secondary-text">
          {/* 1. Private room */}
          <div className="inline-flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>Private room</span>
          </div>

          <span className="text-border-primary hidden sm:inline">·</span>

          {/* 2. Waiting for partner */}
          <div className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-muted-text shrink-0" />
            <span>Waiting for partner</span>
          </div>

          <span className="text-border-primary hidden sm:inline">·</span>

          {/* 3. Need help? */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="inline-flex items-center gap-1.5 font-medium text-secondary-text hover:text-coral transition-colors underline-offset-2 hover:underline focus:outline-none"
          >
            <HelpCircle className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>Need help?</span>
          </button>
        </div>
      </div>

      {/* Need Help Modal */}
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-border-primary shadow-elevated text-left animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
              aria-label="Close help"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blush-primary flex items-center justify-center text-coral">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-primary-text">
                How to Join &amp; Connect ♡
              </h3>
            </div>

            <div className="space-y-3 text-xs text-secondary-text leading-relaxed">
              <div className="p-3 bg-cream rounded-2xl border border-border-soft">
                <p className="font-bold text-primary-text mb-1">
                  1. Share your 6-character room code
                </p>
                <p>
                  Send your room code or copy the invitation link to your partner
                  via text or your favorite messaging app.
                </p>
              </div>

              <div className="p-3 bg-cream rounded-2xl border border-border-soft">
                <p className="font-bold text-primary-text mb-1">
                  2. Keep this tab open
                </p>
                <p>
                  As soon as your partner enters the code on their device, both of
                  your booths will wake up together!
                </p>
              </div>

              <div className="p-3 bg-cream rounded-2xl border border-border-soft">
                <p className="font-bold text-primary-text mb-1">
                  3. Camera Check
                </p>
                <p>
                  Ensure your camera is active and lighting looks comfortable for
                  capturing your memories together.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="mt-5 w-full h-10 rounded-full font-bold text-xs text-white bg-coral hover:bg-coral-hover transition-colors flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Got it, thanks!</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
