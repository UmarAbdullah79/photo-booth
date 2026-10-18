"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Heart,
  LogOut,
  Sparkles,
  UserPlus,
  Camera,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Container } from "@/app/components/ui/Container";
import { HostCameraCard } from "./HostCameraCard";
import { AVSettingsBar } from "./AVSettingsBar";

interface WaitingRoomClientProps {
  initialCode?: string;
  partnerName?: string;
}

export default function WaitingRoomClient({
  initialCode,
  partnerName = "Min-ji",
}: WaitingRoomClientProps) {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  // Demonstration room code
  const [roomCode, setRoomCode] = useState<string>(initialCode || "A7K92P");
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>("FaceTime HD Camera");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync stored room code if available in session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("two_hearts_room_code");
      if (stored && !initialCode) {
        setRoomCode(stored);
      }
    }
  }, [initialCode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2200);
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(roomCode);
      }
      showToast("Room code copied to clipboard! 💕");
    } catch {
      showToast("Room code copied! 💕");
    }
  };

  const handleConfirmLeave = () => {
    setIsLeaveModalOpen(false);
    router.push("/room/ready");
  };

  // GSAP Entrance Animations
  useEffect(() => {
    if (!pageRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".anim-top-badge",
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 }
      )
        .fromTo(
          ".anim-heading",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".anim-subtitle",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          ".anim-preview-label",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.4 },
          "-=0.3"
        )
        .fromTo(
          ".anim-three-cols",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          ".anim-av-bar",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".anim-leave-footer",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
      <main className="flex-1 py-6 sm:py-10 lg:py-14 relative overflow-hidden">
        {/* Soft Ambient Background Glows */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-80 sm:w-160 h-80 sm:h-120 bg-pastel-pink/30 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-pastel-purple/20 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-2/3 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-pastel-yellow/15 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <Container size="default" className="max-w-6xl px-4 sm:px-6">
          {/* PAGE INTRODUCTION */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="anim-top-badge flex flex-wrap items-center justify-center gap-2 mb-3">
              <Badge
                variant="pink"
                uppercase
                className="px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest shadow-2xs"
              >
                <span className="text-coral mr-1">♥</span>
                VIRTUAL BOOTH STEP 3 — WAITING ROOM
              </Badge>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-primary text-xs font-mono font-bold text-coral-dark hover:border-coral/50 shadow-2xs transition-colors"
                title="Click to copy room code"
              >
                <span className="text-[10px] text-muted-text font-sans uppercase">
                  Room:
                </span>
                <span className="tracking-widest">{roomCode}</span>
                <span className="text-[10px] text-coral font-sans font-medium">
                  Copy
                </span>
              </button>
            </div>

            <h1 className="anim-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-primary-text leading-[1.15] mb-2 sm:mb-3">
              Almost there! <span className="text-coral inline-block">💕</span>
            </h1>

            <p className="anim-subtitle text-xs sm:text-sm md:text-base text-secondary-text max-w-lg mx-auto leading-relaxed mb-3">
              We&apos;re getting both cameras ready before entering the booth
              together <span className="inline-block">✨</span>
            </p>

            <div className="anim-preview-label inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/70 border border-coral/25 text-[11px] font-semibold text-coral-dark shadow-2xs">
              <Sparkles className="w-3 h-3 text-coral" />
              <span>Preview: Partner Joins &amp; Hearts Connect 💕</span>
            </div>
          </div>

          {/* MAIN WAITING ROOM 3-COLUMN LAYOUT */}
          <div className="anim-three-cols grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch mb-6 sm:mb-8">
            {/* 1. Host camera card (Left on Desktop) */}
            <div className="flex flex-col h-full order-1">
              <HostCameraCard
                filterActive={filterActive}
                onCameraStateChange={setIsCameraActive}
                onDeviceNameChange={setDeviceName}
              />
            </div>

            {/* 2. Central waiting animation (Center on Desktop) */}
            <div className="flex flex-col h-full order-2">
              <div className="w-full h-full bg-linear-to-b from-[#FFF2F5] via-[#FFF7F9] to-[#FCEEF3] rounded-3xl p-5 sm:p-6 border border-border-primary/80 shadow-card relative flex flex-col items-center justify-between text-center overflow-hidden">
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 bg-pastel-pink/50 rounded-full blur-2xl pointer-events-none -z-0"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-8 -right-8 w-36 h-36 bg-pastel-purple/30 rounded-full blur-xl pointer-events-none -z-0"
                  aria-hidden="true"
                />

                {/* Floating hearts */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
                  <span
                    className="absolute top-5 left-6 text-coral/40 text-sm animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    ♥
                  </span>
                  <span
                    className="absolute top-12 right-6 text-coral/30 text-xs animate-pulse"
                    style={{ animationDuration: "2.5s" }}
                  >
                    ♡
                  </span>
                  <span
                    className="absolute bottom-16 left-8 text-pastel-purple-text/40 text-xs animate-pulse"
                    style={{ animationDuration: "3.5s" }}
                  >
                    ♥
                  </span>
                  <span
                    className="absolute bottom-8 right-8 text-coral/35 text-sm animate-bounce"
                    style={{ animationDuration: "4s" }}
                  >
                    ♡
                  </span>
                </div>

                {/* Connection line & badge */}
                <div className="relative z-10 w-full pt-1">
                  <div className="w-full max-w-50 mx-auto mb-2 flex items-center justify-center relative">
                    <svg
                      className="w-full h-10 text-coral/50 overflow-visible"
                      viewBox="0 0 200 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M 10 20 Q 100 -5 190 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 5"
                        fill="none"
                      />
                      <circle cx="10" cy="20" r="4" fill="#F45F7D" />
                      <circle cx="190" cy="20" r="4" fill="#EEDCFA" />
                    </svg>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-coral/30 shadow-xs flex items-center justify-center text-coral">
                      <Heart className="w-4 h-4 fill-coral animate-pulse" />
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-coral/20 text-xs font-bold text-coral-dark shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Synchronized Booth Link</span>
                  </div>
                </div>

                {/* Main Waiting Heading */}
                <div className="relative z-10 my-4 sm:my-5 space-y-2 max-w-xs">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight flex items-center justify-center gap-1.5">
                    <span>Waiting for Partner...</span>
                    <Heart className="w-4 h-4 fill-coral text-coral inline shrink-0" />
                  </h3>

                  <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                    Share your room code with your bestie or special someone!
                  </p>

                  <div className="pt-1.5">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-border-primary text-xs font-mono font-bold text-primary-text shadow-2xs hover:border-coral/50 hover:bg-blush-primary/50 transition-colors focus:outline-none"
                      title="Click to copy room code"
                    >
                      <span className="text-[10px] text-coral font-sans font-semibold">CODE:</span>
                      <span className="tracking-widest text-sm text-primary-text">{roomCode}</span>
                      <span className="text-[10px] text-muted-text underline font-sans ml-1">Copy</span>
                    </button>
                  </div>
                </div>

                {/* Bottom button */}
                <div className="relative z-10 w-full pt-2">
                  <button
                    type="button"
                    className="w-full h-11 sm:h-12 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 select-none pointer-events-auto"
                    aria-label="Waiting for guest"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                    </span>
                    <span>Waiting for guest...</span>
                    <UserPlus className="w-4 h-4 ml-0.5 opacity-90" />
                  </button>

                  <p className="text-[11px] text-muted-text mt-2 text-center">
                    Both cameras will wake up together when your friend arrives
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Partner camera card (Right on Desktop) */}
            <div className="flex flex-col h-full order-3">
              <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card relative flex flex-col justify-between h-full">
                <div className="mb-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-purple/70 text-pastel-purple-text text-[11px] font-bold tracking-wide">
                      <Heart className="w-3 h-3 fill-pastel-purple-text text-pastel-purple-text" />
                      <span>PERSON 2 (PARTNER)</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
                      <span>Awaiting Entry</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-secondary-text px-0.5">
                    <span className="font-medium text-primary-text">
                      Guest: {partnerName}
                    </span>
                    <span className="text-muted-text text-[11px]">
                      Channel Standby
                    </span>
                  </div>
                </div>

                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-b from-[#FFFDFD] via-[#FFF6F8] to-[#FCEEF3] border border-border-primary/80 flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-inner">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-pastel-pink border-2 border-white shadow-sm flex items-center justify-center text-coral">
                      <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-coral/30 flex items-center justify-center text-coral shadow-xs">
                      <Heart className="w-3 h-3 fill-coral animate-pulse" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-primary-text mb-1 max-w-xs">
                    Waiting for {partnerName}&apos;s camera...
                  </h4>

                  <p className="text-xs text-secondary-text max-w-xs mb-3.5 leading-relaxed">
                    They&apos;ll appear here automatically once they enter room{" "}
                    <strong className="text-primary-text font-mono font-bold tracking-wider">
                      {roomCode}
                    </strong>
                    .
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-soft text-xs text-secondary-text shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                    <span className="text-[11px] font-medium ml-1">Standby for stream</span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-secondary-text shadow-xs border border-border-soft backdrop-blur-xs">
                      <Sparkles className="w-3 h-3 text-pastel-purple-text" />
                      <span>Connecting heart 02... ♡</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border-soft flex items-center justify-between text-xs">
                  <span className="text-[11px] text-secondary-text font-medium">
                    Camera Preview Slot 02
                  </span>
                  <span className="text-[11px] text-muted-text font-mono">
                    #PARTNER-CAM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* A/V SETTINGS BAR */}
          <div className="anim-av-bar mb-6 sm:mb-8">
            <AVSettingsBar
              filterActive={filterActive}
              onToggleFilter={() => setFilterActive(!filterActive)}
              cameraActive={isCameraActive}
              deviceName={deviceName}
            />
          </div>

          {/* LEAVE WAITING ROOM BUTTON */}
          <div className="anim-leave-footer flex flex-col items-center justify-center text-center gap-3 py-2">
            <button
              type="button"
              onClick={() => setIsLeaveModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-coral transition-colors font-medium underline-offset-4 hover:underline py-1 px-3 rounded-full hover:bg-white/60 focus:outline-none"
              aria-label="Leave Waiting Room"
            >
              <LogOut className="w-3.5 h-3.5 text-muted-text" />
              <span>Leave Waiting Room</span>
            </button>

            <p className="text-xs text-muted-text flex items-center justify-center gap-1.5 select-none">
              <span>Private moments are better together</span>
              <Heart className="w-3 h-3 fill-coral/60 text-coral inline" />
            </p>
          </div>
        </Container>
      </main>

      {/* Leave Confirmation Dialog */}
      {isLeaveModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsLeaveModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-center animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setIsLeaveModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-primary-text mb-1.5">
              Leave Waiting Room?
            </h3>

            <p className="text-xs text-secondary-text max-w-xs mx-auto mb-5 leading-relaxed">
              Are you sure you want to step out? Your camera preview will be stopped,
              and you can re-enter anytime using your room code.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsLeaveModalOpen(false)}
                className="w-full sm:flex-1 h-10 rounded-full font-bold text-xs text-secondary-text bg-cream border border-border-primary hover:bg-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLeave}
                className="w-full sm:flex-1 h-10 rounded-full font-bold text-xs text-white bg-coral hover:bg-coral-hover active:bg-coral-dark transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Leave Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-primary-text/95 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Heart className="w-3.5 h-3.5 fill-coral text-coral shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
