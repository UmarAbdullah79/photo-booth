"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Heart, LogOut, Sparkles } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Container } from "@/app/components/ui/Container";
import { HostCameraCard } from "./HostCameraCard";
import { CenterWaitingCard } from "./CenterWaitingCard";
import { PartnerCameraCard } from "./PartnerCameraCard";
import { AVSettingsBar } from "./AVSettingsBar";
import { LeaveRoomModal } from "./LeaveRoomModal";

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
    // Navigate to room ready or create setup
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
          {/* 2. PAGE INTRODUCTION */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            {/* Badges Row: STEP 3 & Room Code */}
            <div className="anim-top-badge flex flex-wrap items-center justify-center gap-2 mb-3">
              <Badge
                variant="pink"
                uppercase
                className="px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest shadow-2xs"
              >
                <span className="text-coral mr-1">♥</span>
                VIRTUAL BOOTH STEP 3 — WAITING ROOM
              </Badge>

              {/* Room Code Badge */}
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

            {/* Heading */}
            <h1 className="anim-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-primary-text leading-[1.15] mb-2 sm:mb-3">
              Almost there! <span className="text-coral inline-block">💕</span>
            </h1>

            {/* Subtitle */}
            <p className="anim-subtitle text-xs sm:text-sm md:text-base text-secondary-text max-w-lg mx-auto leading-relaxed mb-3">
              We&apos;re getting both cameras ready before entering the booth
              together <span className="inline-block">✨</span>
            </p>

            {/* Small decorative label */}
            <div className="anim-preview-label inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/70 border border-coral/25 text-[11px] font-semibold text-coral-dark shadow-2xs">
              <Sparkles className="w-3 h-3 text-coral" />
              <span>Preview: Partner Joins &amp; Hearts Connect 💕</span>
            </div>
          </div>

          {/* 3, 4, 5, 6. MAIN WAITING ROOM LAYOUT */}
          {/* Desktop: Balanced 3-column layout | Mobile: Stacked vertically */}
          <div className="anim-three-cols grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch mb-6 sm:mb-8">
            {/* 1. Host camera card (Left on Desktop, 1st on Mobile) */}
            <div className="flex flex-col h-full order-1">
              <HostCameraCard
                filterActive={filterActive}
                onCameraStateChange={setIsCameraActive}
                onDeviceNameChange={setDeviceName}
              />
            </div>

            {/* 2. Central waiting animation (Center on Desktop, 2nd on Mobile) */}
            <div className="flex flex-col h-full order-2">
              <CenterWaitingCard
                roomCode={roomCode}
                onCopyCode={handleCopyCode}
              />
            </div>

            {/* 3. Partner camera card (Right on Desktop, 3rd on Mobile) */}
            <div className="flex flex-col h-full order-3">
              <PartnerCameraCard
                roomCode={roomCode}
                partnerName={partnerName}
              />
            </div>
          </div>

          {/* 7. A/V SETTINGS BAR (4th on Mobile) */}
          <div className="anim-av-bar mb-6 sm:mb-8">
            <AVSettingsBar
              filterActive={filterActive}
              onToggleFilter={() => setFilterActive(!filterActive)}
              cameraActive={isCameraActive}
              deviceName={deviceName}
            />
          </div>

          {/* 8. LEAVE WAITING ROOM BUTTON */}
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

            {/* 9. PRIVACY INFORMATION */}
            <p className="text-xs text-muted-text flex items-center justify-center gap-1.5 select-none">
              <span>Private moments are better together</span>
              <Heart className="w-3 h-3 fill-coral/60 text-coral inline" />
            </p>
          </div>
        </Container>
      </main>

      {/* Leave Confirmation Dialog */}
      <LeaveRoomModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirmLeave={handleConfirmLeave}
      />

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
