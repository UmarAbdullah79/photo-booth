/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, CheckCircle2, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Container } from "@/app/components/ui/Container";
import { RoomCodeCard } from "./RoomCodeCard";
import { SharingButtons } from "./SharingButtons";
import { QRCodeModal } from "./QRCodeModal";
import { WaitingPanel } from "./WaitingPanel";
import { HostCameraPreview } from "./HostCameraPreview";
import { PrivacyNotice } from "./PrivacyNotice";

interface RoomReadyClientProps {
  initialCode?: string;
  initialNickname?: string;
}

export default function RoomReadyClient({
  initialCode,
  initialNickname,
}: RoomReadyClientProps) {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  // Sample frontend demonstration data
  const [roomCode, setRoomCode] = useState<string>(initialCode || "A7K92P");
  const [hostNickname, setHostNickname] = useState<string>(initialNickname || "You");
  const [invitationUrl, setInvitationUrl] = useState<string>("");
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Retrieve any stored session data or initialize demo defaults
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCode = sessionStorage.getItem("two_hearts_room_code");
      const storedNick = sessionStorage.getItem("two_hearts_host_nickname");

      if (storedCode && !initialCode) {
        setRoomCode(storedCode);
      }
      if (storedNick && !initialNickname) {
        setHostNickname(storedNick);
      }

      const activeCode = storedCode || initialCode || "A7K92P";
      const origin = window.location.origin;
      setInvitationUrl(`${origin}/join?code=${activeCode}`);
      setInvitationUrl(`${origin}/join-room?code=${activeCode}`);
    }
  }, [initialCode, initialNickname]);

  // Keep invitation URL synced if code changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      // setInvitationUrl(`${origin}/join?code=${roomCode}`);
      setInvitationUrl(`${origin}/join-room?code=${roomCode}`);
    }
  }, [roomCode]);

  // Toast feedback helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2500);
  };

  // GSAP Entrance Animations
  useEffect(() => {
    if (!pageRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".anim-back", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4 })
        .fromTo(
          ".anim-badge",
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          ".anim-heading",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".anim-subtitle",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4",
        )
        .fromTo(
          ".anim-code-card",
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(
          ".anim-sharing",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4",
        )
        .fromTo(
          ".anim-columns",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(".anim-privacy", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/create");
    }
  };

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
      <main className="flex-1 py-6 sm:py-10 lg:py-14 relative overflow-hidden">
        {/* Soft Ambient Background Glows */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-80 sm:w-160 h-80 sm:h-120 bg-pastel-pink/30 rounded-full blur-3xl pointer-events-none -z-10"
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

        <Container size="default" className="max-w-5xl px-4 sm:px-6">
          {/* 1. BACK BUTTON */}
          <div className="anim-back flex items-center justify-between mb-4 sm:mb-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-secondary-text bg-white/90 hover:bg-white hover:text-coral border border-border-primary rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              aria-label="Go back to setup"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Setup</span>
            </button>

            {/* Host Ready Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Host Ready! ♡</span>
            </div>
          </div>

          {/* 2. PAGE INTRODUCTION */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            {/* Badge: ROOM READY · STEP 2 */}
            <div className="anim-badge mb-3">
              <Badge
                variant="pink"
                uppercase
                className="px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest shadow-2xs"
              >
                <span className="text-coral mr-1">♥</span>
                ROOM READY · STEP 2
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="anim-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-primary-text leading-[1.15] mb-2 sm:mb-3">
              Your Room is Ready <span className="text-coral inline-block">💕</span>
            </h1>

            {/* Subtitle */}
            <p className="anim-subtitle text-xs sm:text-sm md:text-base text-secondary-text max-w-lg mx-auto leading-relaxed">
              Share this code with your photo partner to join the booth{" "}
              <span className="inline-block">✨</span>
            </p>
          </div>

          {/* 3. ROOM CODE CARD */}
          <div className="anim-code-card mb-4 sm:mb-5">
            <RoomCodeCard
              code={roomCode}
              onCopied={() => showToast("Room code copied to clipboard! ♡")}
            />
          </div>

          {/* 4. SHARING BUTTONS */}
          <div className="anim-sharing mb-8 sm:mb-10">
            <SharingButtons
              code={roomCode}
              invitationUrl={invitationUrl}
              onOpenQRCode={() => setIsQRModalOpen(true)}
              onNotify={showToast}
            />
          </div>

          {/* 5 & 6. TWO-COLUMN LAYOUT (Stacked on Mobile, Side-by-Side on Desktop) */}
          <div className="anim-columns grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 items-stretch mb-8 sm:mb-10">
            {/* LEFT COLUMN: WAITING PANEL */}
            <div className="flex flex-col h-full">
              <WaitingPanel hostNickname={hostNickname} />
            </div>

            {/* RIGHT COLUMN: HOST CAMERA PREVIEW */}
            <div className="flex flex-col h-full">
              <HostCameraPreview roomCode={roomCode} hostNickname={hostNickname} />
            </div>
          </div>

          {/* 7. PRIVACY INFORMATION */}
          <div className="anim-privacy">
            <PrivacyNotice />
          </div>
        </Container>
      </main>

      {/* QR Code Modal Dialog */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        invitationUrl={invitationUrl}
        code={roomCode}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-primary-text/95 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
