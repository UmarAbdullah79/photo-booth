"use client";

import React, { useState } from "react";
import {
  Bell,
  Camera,
  Heart,
  Sparkles,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";

interface WaitingPanelProps {
  hostNickname?: string;
}

export const WaitingPanel: React.FC<WaitingPanelProps> = ({
  hostNickname = "You",
}) => {
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [isPlayingChime, setIsPlayingChime] = useState(false);

  // Soft romantic chime using Web Audio API
  const playChimeSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      setIsPlayingChime(true);
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.8);

      // Note 2: A5 (880 Hz) harmonic
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 1.2);

      setTimeout(() => setIsPlayingChime(false), 1200);
    } catch {
      setIsPlayingChime(false);
    }
  };

  const handleToggleChime = () => {
    const nextState = !chimeEnabled;
    setChimeEnabled(nextState);
    if (nextState) {
      playChimeSound();
    }
  };

  return (
    <div className="w-full h-full bg-linear-to-b from-[#FFF2F5] via-[#FFF6F8] to-[#FCEEF3] rounded-3xl p-5 sm:p-7 border border-border-primary/80 shadow-card flex flex-col justify-between relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 bg-pastel-pink/60 rounded-full blur-2xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-pastel-purple/30 rounded-full blur-2xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-5">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Badge: "Room Host: You" */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-soft text-xs font-bold text-coral-dark shadow-2xs">
            <User className="w-3.5 h-3.5 text-coral" />
            <span>Room Host: {hostNickname}</span>
          </div>

          {/* Subtle Live Radar Pulse Status */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-coral/20 text-[11px] font-semibold text-secondary-text shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
            </span>
            <span>Waiting for partner...</span>
          </div>
        </div>

        {/* Heading & Status Text */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Heart className="w-4 h-4 fill-coral text-coral" />
            <p className="text-xs font-bold uppercase tracking-wider text-coral">
              Waiting for your friend to join...
            </p>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight leading-snug">
            The booth wakes up together! ✨
          </h2>
          <p className="text-xs sm:text-sm text-secondary-text mt-2 leading-relaxed">
            Keep this browser tab open. Share your room code with your favorite
            person and get ready to capture memories together.
          </p>
        </div>

        {/* Photo-Booth-Inspired CSS Illustration Strip */}
        <div className="py-2">
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-border-primary/90 shadow-2xs">
            {/* Scrapbook washi tape header */}
            <div className="flex items-center justify-center -mt-5 mb-2.5">
              <span className="px-3 py-0.5 bg-pastel-yellow border border-amber-200/80 rounded-xs text-[10px] font-mono text-amber-900 font-semibold shadow-2xs -rotate-1">
                two hearts booth · preview strip
              </span>
            </div>

            {/* Two Side-by-Side Photo Frames */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Frame 1: Host Frame */}
              <div className="relative aspect-4/3 rounded-xl bg-linear-to-b from-[#FFFDFD] to-[#FFF5F7] border-2 border-coral/30 p-2 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blush-primary border border-coral/30 flex items-center justify-center text-coral mb-1 shadow-2xs">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-primary-text truncate max-w-full px-1">
                  You (Host)
                </span>
                <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Ready
                </span>
              </div>

              {/* Frame 2: Partner Frame (Waiting State) */}
              <div className="relative aspect-4/3 rounded-xl bg-linear-to-b from-white to-[#F7F2FB] border-2 border-dashed border-pastel-purple-text/40 p-2 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pastel-purple/50 border border-purple-200 flex items-center justify-center text-purple-600 mb-1 animate-pulse">
                  <Heart className="w-4 h-4 fill-purple-300 text-purple-600" />
                </div>
                <span className="text-[11px] font-bold text-secondary-text truncate max-w-full px-1">
                  Partner
                </span>
                <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-pastel-purple/70 text-purple-900">
                  <Sparkles className="w-2.5 h-2.5 text-purple-500" />
                  Waiting to join...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toggle Row */}
      <div className="relative z-10 pt-4 mt-2 border-t border-border-primary/60">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white border border-border-primary flex items-center justify-center text-coral shadow-2xs shrink-0">
              {chimeEnabled ? (
                <Bell className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-muted-text" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-primary-text leading-tight">
                Chime will play when guest enters room
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-muted-text">
                  Sound notification: {chimeEnabled ? "Enabled" : "Muted"}
                </span>
                {chimeEnabled && (
                  <button
                    type="button"
                    onClick={playChimeSound}
                    disabled={isPlayingChime}
                    className="text-[11px] text-coral hover:text-coral-dark font-medium underline inline-flex items-center gap-1 focus:outline-none"
                    aria-label="Test chime notification sound"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isPlayingChime ? "Playing..." : "Test sound"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={chimeEnabled}
            onClick={handleToggleChime}
            aria-label="Toggle chime notification sound"
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral shrink-0 ${
              chimeEnabled ? "bg-coral" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                chimeEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
