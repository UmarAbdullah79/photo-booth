/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Heart,
  Sparkles,
  Link2,
  Share2,
  QrCode,
  X,
  Lock,
  Clock,
  HelpCircle,
  Bell,
  Camera,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Container } from "@/app/components/ui/Container";
import { HostCameraPreview } from "./HostCameraPreview";

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

  // Session demonstration state
  const [roomCode, setRoomCode] = useState<string>(initialCode || "A7K92P");
  const [hostNickname, setHostNickname] = useState<string>(initialNickname || "You");
  const [invitationUrl, setInvitationUrl] = useState<string>("");
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Card copy states
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shared, setShared] = useState(false);

  // QR code state
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrCopied, setQrCopied] = useState(false);

  // Waiting panel chime state
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [isPlayingChime, setIsPlayingChime] = useState(false);

  // Retrieve stored session data or initialize demo defaults
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

  // Generate QR code when modal opens
  useEffect(() => {
    if (!isQRModalOpen || !invitationUrl) return;

    QRCode.toDataURL(invitationUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: "#292326",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating QR code:", err));
  }, [isQRModalOpen, invitationUrl]);

  // GSAP Entry Animations
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback below
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  };

  const handleCopyCode = async () => {
    await copyToClipboard(roomCode);
    setCopiedCode(true);
    showToast("Room code copied to clipboard! ♡");
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleCopyLink = async () => {
    await copyToClipboard(invitationUrl);
    setCopiedLink(true);
    showToast("Invitation link copied to clipboard! ♡");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Join my Two Hearts Photo Booth",
          text: `Join my photo booth room using code ${roomCode} 💕`,
          url: invitationUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    await copyToClipboard(invitationUrl);
    setShared(true);
    showToast("Link copied! Share it with your photo partner 💕");
    setTimeout(() => setShared(false), 2000);
  };

  // Play romantic chime using Web Audio API
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

  const characters = (roomCode || "A7K92P").slice(0, 6).split("");

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-cream selection:bg-blush-secondary selection:text-coral-dark py-6 sm:py-10 px-4"
    >
      <Container size="default" className="space-y-6 sm:space-y-8">
        {/* Navigation / Back Bar */}
        <div className="anim-header flex items-center justify-between">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-white/80 transition-all border border-transparent hover:border-border-soft"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Camera Setup</span>
          </Link>

          <Badge variant="green" className="gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Room Created &amp; Live</span>
          </Badge>
        </div>

        {/* Page Title & Intro */}
        <div className="anim-header text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/80 border border-coral/25 text-xs font-bold text-coral-dark">
            <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
            <span>STEP 2 OF 3 · INVITE YOUR PARTNER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-text tracking-tight">
            Your Room is Ready! 💕
          </h1>

          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
            Share this 6-character room code with your friend. Both cameras will
            wake up together as soon as they enter!
          </p>
        </div>

        {/* 6-Character Room Code Card */}
        <div className="anim-code-card w-full max-w-xl mx-auto">
          <div
            role="button"
            tabIndex={0}
            onClick={handleCopyCode}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopyCode();
              }
            }}
            aria-label={`Room code: ${roomCode}. Click or tap to copy.`}
            className="group relative bg-white rounded-3xl p-4 sm:p-6 border border-border-primary shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-3 focus-visible:ring-coral/40"
          >
            {/* Scrapbook corner stickers */}
            <div
              className="absolute -top-2.5 left-6 px-2.5 py-0.5 bg-pastel-pink/90 border border-coral/25 rounded-md text-[10px] sm:text-[11px] font-bold text-coral-dark -rotate-2 shadow-2xs backdrop-blur-xs flex items-center gap-1"
              aria-hidden="true"
            >
              <Heart className="w-2.5 h-2.5 fill-coral text-coral" />
              <span>ROOM CODE</span>
            </div>

            <div
              className="absolute -top-2.5 right-6 px-2 py-0.5 bg-white border border-border-soft rounded-full text-[10px] text-muted-text font-medium shadow-2xs flex items-center gap-1 group-hover:text-coral transition-colors"
              aria-hidden="true"
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>TAP TO COPY</span>
            </div>

            {/* 6 Individual Character Tiles */}
            <div className="pt-2 sm:pt-3 pb-1">
              <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
                {characters.map((char, index) => (
                  <div
                    key={index}
                    className="w-10 h-13 xs:w-11 xs:h-14 sm:w-14 sm:h-18 rounded-xl sm:rounded-2xl bg-linear-to-b from-[#FFFDFD] to-[#FFF5F7] border-2 border-border-primary/90 flex flex-col items-center justify-center shadow-xs group-hover:border-coral/60 group-hover:shadow-sm group-hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-primary-text font-mono tracking-tight">
                      {char}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/30 mt-0.5 sm:mt-1 group-hover:bg-coral transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Copy Feedback / Instruction bar */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 text-xs text-secondary-text font-medium">
              {copiedCode ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-green text-pastel-green-text font-semibold text-xs animate-in fade-in zoom-in-95 duration-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied to clipboard! 💕</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-muted-text group-hover:text-coral transition-colors">
                  <Copy className="w-3.5 h-3.5 inline" />
                  <span>Click anywhere on this card to copy the code</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sharing Action Buttons */}
        <div className="anim-sharing w-full max-w-xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Copy Code */}
            <button
              type="button"
              onClick={handleCopyCode}
              className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] ${
                copiedCode
                  ? "bg-pastel-green border-emerald-300 text-emerald-800"
                  : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
              }`}
              aria-label="Copy Room Code"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-coral shrink-0" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] ${
                copiedLink
                  ? "bg-pastel-green border-emerald-300 text-emerald-800"
                  : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
              }`}
              aria-label="Copy Invitation Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 text-coral shrink-0" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] ${
                shared
                  ? "bg-pastel-pink border-coral/40 text-coral-dark"
                  : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
              }`}
              aria-label="Share Room Invitation"
            >
              <Share2 className="w-4 h-4 text-coral shrink-0" />
              <span>{shared ? "Shared! ♡" : "Share"}</span>
            </button>

            {/* QR Code */}
            <button
              type="button"
              onClick={() => setIsQRModalOpen(true)}
              className="h-11 sm:h-12 px-3 rounded-2xl border border-border-primary bg-white text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98]"
              aria-label="View QR Code"
            >
              <QrCode className="w-4 h-4 text-coral shrink-0" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

        {/* Two-Column Area: Waiting Panel + Host Camera Preview */}
        <div className="anim-panels grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Waiting Status Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full h-full bg-linear-to-b from-[#FFF2F5] via-[#FFF6F8] to-[#FCEEF3] rounded-3xl p-5 sm:p-7 border border-border-primary/80 shadow-card flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-48 h-48 bg-pastel-pink/60 rounded-full blur-2xl pointer-events-none -z-0"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-pastel-purple/30 rounded-full blur-2xl pointer-events-none -z-0"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-5">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-soft text-xs font-bold text-coral-dark shadow-2xs">
                    <User className="w-3.5 h-3.5 text-coral" />
                    <span>Room Host: {hostNickname}</span>
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

                {/* Side-by-side frame previews */}
                <div className="py-2">
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-border-primary/90 shadow-2xs">
                    <div className="flex items-center justify-center -mt-5 mb-2.5">
                      <span className="px-3 py-0.5 bg-pastel-yellow border border-amber-200/80 rounded-xs text-[10px] font-mono text-amber-900 font-semibold shadow-2xs -rotate-1">
                        two hearts booth · preview strip
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
                          Sound: {chimeEnabled ? "Enabled" : "Muted"}
                        </span>
                        {chimeEnabled && (
                          <button
                            type="button"
                            onClick={playChimeSound}
                            disabled={isPlayingChime}
                            className="text-[11px] text-coral hover:text-coral-dark font-medium underline inline-flex items-center gap-1"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{isPlayingChime ? "Playing..." : "Test sound"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={chimeEnabled}
                    onClick={handleToggleChime}
                    aria-label="Toggle chime notification sound"
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 shrink-0 ${
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
          </div>

            {/* RIGHT COLUMN: HOST CAMERA PREVIEW */}
            <div className="flex flex-col h-full">
              <HostCameraPreview roomCode={roomCode} hostNickname={hostNickname} />
            </div>
          </div>

        {/* Demo Fast-Forward to Booth Shortcut */}
        <div className="anim-footer text-center pt-2">
          <button
            type="button"
            onClick={() => router.push("/room/waiting")}
            className="text-xs text-muted-text hover:text-coral transition-colors underline underline-offset-4"
          >
            Partner joined? Continue to Waiting Room →
          </button>
        </div>

        {/* Privacy Notice Row */}
        <footer className="anim-footer w-full max-w-xl mx-auto py-2">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-secondary-text">
            <div className="inline-flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-coral shrink-0" />
              <span>Private room</span>
            </div>

            <span className="text-border-primary hidden sm:inline">·</span>

            <div className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-muted-text shrink-0" />
              <span>Waiting for partner</span>
            </div>

            <span className="text-border-primary hidden sm:inline">·</span>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center gap-1.5 font-medium text-secondary-text hover:text-coral transition-colors underline-offset-2 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5 text-coral shrink-0" />
              <span>Need help?</span>
            </button>
          </div>
        </footer>
      </Container>

      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsQRModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-center animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setIsQRModalOpen(false)}
              aria-label="Close QR Code Dialog"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral hover:bg-blush-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-blush-primary border border-coral/20 flex items-center justify-center text-coral mb-2.5">
                <QrCode className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-primary-text flex items-center gap-1.5">
                <span>Scan to Join Booth</span>
                <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
              </h2>
              <p className="text-xs text-secondary-text mt-1 max-w-xs">
                Open camera on another phone or tablet to join this booth room.
              </p>
            </div>

            <div className="my-4 p-3 bg-linear-to-b from-[#FFFDFD] to-[#FFF5F7] rounded-2xl border border-border-primary/80 inline-block shadow-inner">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for room code ${roomCode}`}
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-xl object-contain bg-white p-2 border border-border-soft"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-xs text-muted-text">
                  Generating QR Code...
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/70 border border-coral/25 text-xs font-mono font-bold text-coral-dark">
                <span>CODE:</span>
                <span className="tracking-widest text-sm">{roomCode}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={async () => {
                  await copyToClipboard(invitationUrl);
                  setQrCopied(true);
                  setTimeout(() => setQrCopied(false), 2000);
                }}
                className="w-full h-11 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                {qrCopied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Link Copied! ♡</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Invitation Link</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-muted-text">
                Temporary frontend demonstration link
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-primary-text text-white text-xs sm:text-sm font-semibold shadow-elevated backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Sparkles className="w-4 h-4 text-coral shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
