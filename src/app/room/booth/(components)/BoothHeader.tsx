"use client";

import React, { useEffect, useState } from "react";
import { Clock, Heart, Lock, Sparkles, Copy, Check } from "lucide-react";

interface BoothHeaderProps {
  roomCode: string;
  currentShot: number;
  totalShots: number;
}

export const BoothHeader: React.FC<BoothHeaderProps> = ({
  roomCode,
  currentShot,
  totalShots,
}) => {
  const [seconds, setSeconds] = useState(145); // e.g. starts at 02:25
  const [copied, setCopied] = useState(false);

  // Active session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(roomCode);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-border-primary/80 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* LEFT GROUP: Badges & Timer */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* LIVE BOOTH badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-coral text-white shadow-2xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>LIVE BOOTH</span>
          </span>

          {/* Booth Active Status */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-pastel-green text-pastel-green-text border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Booth Active</span>
          </span>

          {/* Session Duration */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cream border border-border-soft text-secondary-text">
            <Clock className="w-3 h-3 text-coral" />
            <span>{formatTime(seconds)}</span>
          </span>
        </div>

        {/* CENTER / RIGHT GROUP: Room Identifier, Private Badge, Shot Counter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Room Identifier */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cream hover:bg-blush-primary border border-border-soft text-primary-text transition-colors"
            title="Click to copy room code"
            aria-label={`Room code: ${roomCode}. Click to copy.`}
          >
            <span className="text-[10px] text-coral font-sans font-semibold">ROOM:</span>
            <span className="tracking-wider">{roomCode}</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3 text-muted-text" />
            )}
          </button>

          {/* Private Room Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-border-soft text-secondary-text hidden xs:inline-flex">
            <Lock className="w-3 h-3 text-coral" />
            <span>Private Room</span>
          </span>

          {/* Current Shot Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-pastel-pink text-coral-dark border border-coral/30 shadow-2xs">
            <Sparkles className="w-3 h-3 text-coral" />
            <span>
              SHOT {currentShot}/{totalShots}
            </span>
          </span>
        </div>
      </div>

      {/* Visual Demonstration Notice */}
      <div className="mt-2 pt-2 border-t border-border-soft/60 flex items-center justify-between text-[10px] sm:text-[11px] text-muted-text">
        <span className="flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 text-coral fill-coral inline" />
          <span>Two Hearts Synchronized Booth · Session in Progress</span>
        </span>
        <span className="font-mono text-muted-text hidden sm:inline">
          Demo Channel · Peer Preview Standby
        </span>
      </div>
    </div>
  );
};
