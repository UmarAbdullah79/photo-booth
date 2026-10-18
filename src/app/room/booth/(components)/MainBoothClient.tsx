"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Container } from "@/app/components/ui/Container";
import {
  MainBoothFrame,
  FrameTheme,
  FilterTheme,
  LayoutTheme,
} from "./MainBoothFrame";
import { BoothSettingsToolbar } from "./BoothSettingsToolbar";
import { PhotoStripModal } from "./PhotoStripModal";
import { PoseInspirationModal } from "./PoseInspirationModal";
import {
  Clock,
  Heart,
  Lock,
  Sparkles,
  Copy,
  Check,
  Smile,
  QrCode,
  Layers,
  RotateCcw,
  Eye,
  Camera,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

export type ShootMode = 4 | 6;

interface MainBoothClientProps {
  initialRoomCode?: string;
}

export default function MainBoothClient({
  initialRoomCode,
}: MainBoothClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Session & Demo room code
  const [roomCode, setRoomCode] = useState<string>(initialRoomCode || "A7K92P");
  const [seconds, setSeconds] = useState(145);
  const [copiedCode, setCopiedCode] = useState(false);
  const [kimchiBurst, setKimchiBurst] = useState(false);

  // Camera stream state
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(true);

  // Settings State
  const [shootMode, setShootMode] = useState<ShootMode>(6);
  const [layoutTheme, setLayoutTheme] = useState<LayoutTheme>("split");
  const [frameTheme, setFrameTheme] = useState<FrameTheme>("haru-pastel");
  const [filterTheme, setFilterTheme] = useState<FilterTheme>("haru-warm");
  const [timerDuration, setTimerDuration] = useState<number>(3);

  // Capture & Progress State
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  // Modals State
  const [isPoseModalOpen, setIsPoseModalOpen] = useState<boolean>(false);
  const [previewModalMode, setPreviewModalMode] = useState<4 | 6 | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timer
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
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSayKimchi = () => {
    setKimchiBurst(true);
    setTimeout(() => setKimchiBurst(false), 1500);
  };

  // Load session code if stored
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("two_hearts_room_code");
      if (stored && !initialRoomCode) {
        setRoomCode(stored);
      }
    }
  }, [initialRoomCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Safe Media Tracks Cleanup
  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, [stopTracks]);

  const startCamera = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      showToast("Camera access not supported by browser");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // autoplay handled
        }
      }
      setCameraActive(true);
      showToast("Camera connected! ♡");
    } catch {
      setCameraActive(false);
      showToast("Camera preview in demo mode");
    }
  }, []);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const handleToggleMic = () => {
    setMicActive(!micActive);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => {
        t.enabled = !micActive;
      });
    }
    showToast(!micActive ? "Microphone unmuted" : "Microphone muted");
  };

  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 250);
  };

  // Shutter Snapshot
  const handleSnap = useCallback(() => {
    if (isCapturing || capturedPhotos.length >= shootMode) return;

    setIsCapturing(true);
    let currentCount = timerDuration;
    setCountdown(currentCount);

    const timer = setInterval(() => {
      currentCount -= 1;
      if (currentCount > 0) {
        setCountdown(currentCount);
      } else {
        clearInterval(timer);
        setCountdown(null);
        triggerFlash();

        const demoShots = [
          "/images/hero-1.png",
          "/images/hero-2.png",
          "/images/create-hero-1.png",
          "/images/hero-1.png",
          "/images/hero-2.png",
          "/images/create-hero-1.png",
        ];

        const nextShot = demoShots[capturedPhotos.length % demoShots.length];
        setCapturedPhotos((prev) => [...prev, nextShot]);
        setIsCapturing(false);

        const newCount = capturedPhotos.length + 1;
        showToast(`Shot #${newCount} captured! 💕`);

        if (newCount === shootMode) {
          setTimeout(() => {
            setPreviewModalMode(shootMode);
          }, 800);
        }
      }
    }, 1000);
  }, [isCapturing, capturedPhotos.length, shootMode, timerDuration]);

  // Spacebar hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isCapturing && capturedPhotos.length < shootMode) {
        const target = e.target as HTMLElement;
        if (target && ["INPUT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
        e.preventDefault();
        handleSnap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSnap, isCapturing, capturedPhotos.length, shootMode]);

  const handleRetakeLast = () => {
    if (capturedPhotos.length === 0) return;
    setCapturedPhotos((prev) => prev.slice(0, prev.length - 1));
    showToast("Last photo removed. Ready to retake!");
  };

  const handleRetakeAll = () => {
    setCapturedPhotos([]);
    setPreviewModalMode(null);
    showToast("Session reset. Ready to snap from shot #1!");
  };

  // Entrance animations
  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".anim-header-bar", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(".anim-booth-frame", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.65 }, "-=0.25")
        .fromTo(".anim-branding-bar", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .fromTo(".anim-mode-card", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
        .fromTo(".anim-settings-toolbar", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
        .fromTo(".anim-progress-card", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(".anim-shutter", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.55 }, "-=0.25");
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const currentShotNum = Math.min(capturedPhotos.length + 1, shootMode);
  const currentCount = capturedPhotos.length;
  const progressPercent = Math.min(100, Math.round((currentCount / shootMode) * 100));
  const markers = Array.from({ length: shootMode }, (_, i) => i + 1);
  const isComplete = currentShotNum > shootMode;

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
      <main className="flex-1 py-4 sm:py-6 lg:py-8 relative overflow-hidden">
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-80 sm:w-160 h-80 sm:h-120 bg-pastel-pink/35 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-pastel-purple/25 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-2/3 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-pastel-yellow/20 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <Container size="default" className="max-w-5xl px-3 sm:px-6 space-y-4 sm:space-y-6">
          {/* 1. BOOTH HEADER */}
          <div className="anim-header-bar w-full bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-border-primary/80 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-coral text-white shadow-2xs animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>LIVE BOOTH</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-pastel-green text-pastel-green-text border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Booth Active</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cream border border-border-soft text-secondary-text">
                  <Clock className="w-3 h-3 text-coral" />
                  <span>{formatTime(seconds)}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cream hover:bg-blush-primary border border-border-soft text-primary-text transition-colors"
                  title="Click to copy room code"
                  aria-label={`Room code: ${roomCode}. Click to copy.`}
                >
                  <span className="text-[10px] text-coral font-sans font-semibold">ROOM:</span>
                  <span className="tracking-wider">{roomCode}</span>
                  {copiedCode ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-text" />
                  )}
                </button>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-border-soft text-secondary-text hidden xs:inline-flex">
                  <Lock className="w-3 h-3 text-coral" />
                  <span>Private Room</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-pastel-pink text-coral-dark border border-coral/30 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-coral" />
                  <span>
                    SHOT {currentShotNum}/{shootMode}
                  </span>
                </span>
              </div>
            </div>

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

          {/* 2. MAIN PHOTO BOOTH FRAME */}
          <div className="anim-booth-frame">
            <MainBoothFrame
              videoRef={videoRef}
              cameraActive={cameraActive}
              onStartCamera={startCamera}
              frameTheme={frameTheme}
              filterTheme={filterTheme}
              layoutTheme={layoutTheme}
              countdown={countdown}
              isFlashing={isFlashing}
            />
          </div>

          {/* 3. PHOTO BOOTH BRANDING BAR */}
          <div className="anim-branding-bar w-full bg-white rounded-2xl p-3 sm:p-4 border border-border-primary/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pastel-pink/80 border border-coral/30 flex items-center justify-center text-coral shadow-2xs shrink-0">
                <Heart className="w-4 h-4 fill-coral" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-primary-text leading-tight">
                    Two Hearts Digital Strip
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cream border border-border-soft text-coral">
                    Frame #01
                  </span>
                </div>
                <p className="text-[11px] text-muted-text mt-0.5">
                  Synchronized memories captured together across any distance ♡
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSayKimchi}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs ${
                  kimchiBurst
                    ? "bg-coral text-white scale-105 shadow-md shadow-coral/25"
                    : "bg-pastel-pink text-coral-dark hover:bg-coral hover:text-white border border-coral/30"
                }`}
                aria-label="Say Kimchi decorative cheer"
              >
                <Smile className="w-3.5 h-3.5" />
                <span>{kimchiBurst ? "Kimchi~! ✌️💕" : "Say Kimchi! ✌️"}</span>
              </button>

              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cream border border-border-soft text-[11px] font-medium text-secondary-text shadow-2xs"
                title="Digital Strip Pass"
              >
                <QrCode className="w-3.5 h-3.5 text-coral" />
                <span className="hidden sm:inline font-mono">Digital Strip Pass</span>
              </div>
            </div>
          </div>

          {/* 4. FLEXIBLE SHOOTING MODE (4 vs 6 PHOTOS) */}
          <div className="anim-mode-card w-full bg-gradient-to-b from-[#FFF2F5] via-[#FFF7F9] to-[#FCEEF3] rounded-3xl p-4 sm:p-5 border border-border-primary/80 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-pastel-pink border border-coral/30 flex items-center justify-center text-coral">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-primary-text flex items-center gap-1.5">
                    <span>Flexible Shoot: Choose 4 or 6 Photos</span>
                    <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  You can finish early with 4 photos for the classic Life4Cut strip,
                  or shoot all 6 photos for a 2×3 studio collage.
                </p>

                <div className="pt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-coral/25 text-coral-dark shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>4-Photo milestone unlocks vertical Life4Cut preview</span>
                  </span>

                  {capturedPhotos.length >= 4 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      <span>Unlocked!</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShootMode(4)}
                  className={`px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-2xs ${
                    shootMode === 4
                      ? "bg-coral text-white border-coral shadow-md shadow-coral/20 scale-[1.02]"
                      : "bg-white text-secondary-text border-border-primary hover:text-coral hover:border-coral/50"
                  }`}
                  aria-pressed={shootMode === 4}
                  aria-label="Select 4 photos mode"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      shootMode === 4
                        ? "border-white bg-white text-coral"
                        : "border-secondary-text"
                    }`}
                  >
                    {shootMode === 4 && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="text-left">
                    <span className="block leading-none">4 Photos</span>
                    <span
                      className={`text-[10px] font-medium block mt-0.5 ${
                        shootMode === 4 ? "text-white/90" : "text-muted-text"
                      }`}
                    >
                      Life4Cut Strip
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShootMode(6)}
                  className={`px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-2xs ${
                    shootMode === 6
                      ? "bg-coral text-white border-coral shadow-md shadow-coral/20 scale-[1.02]"
                      : "bg-white text-secondary-text border-border-primary hover:text-coral hover:border-coral/50"
                  }`}
                  aria-pressed={shootMode === 6}
                  aria-label="Select 6 photos mode"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      shootMode === 6
                        ? "border-white bg-white text-coral"
                        : "border-secondary-text"
                    }`}
                  >
                    {shootMode === 6 && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="text-left">
                    <span className="block leading-none">6 Photos</span>
                    <span
                      className={`text-[10px] font-medium block mt-0.5 ${
                        shootMode === 6 ? "text-white/90" : "text-muted-text"
                      }`}
                    >
                      2×3 Collage
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 5. PHOTO BOOTH SETTINGS TOOLBAR */}
          <div className="anim-settings-toolbar">
            <BoothSettingsToolbar
              layoutTheme={layoutTheme}
              onChangeLayout={setLayoutTheme}
              frameTheme={frameTheme}
              onChangeFrame={setFrameTheme}
              filterTheme={filterTheme}
              onChangeFilter={setFilterTheme}
              timerDuration={timerDuration}
              onChangeTimer={setTimerDuration}
              cameraActive={cameraActive}
              onToggleCamera={cameraActive ? stopTracks : startCamera}
              micActive={micActive}
              onToggleMic={handleToggleMic}
              onTestFlash={triggerFlash}
            />
          </div>

          {/* 6. PHOTO COUNTER & PROGRESS CARD */}
          <div className="anim-progress-card w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-coral" />
                <h3 className="text-sm sm:text-base font-extrabold text-primary-text">
                  Session Photo Counter:{" "}
                  <span className="text-coral">
                    {currentCount} of {shootMode} Taken
                  </span>
                </h3>
              </div>

              {currentCount > 0 && (
                <button
                  type="button"
                  onClick={handleRetakeLast}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-blush-primary border border-border-soft transition-colors"
                  title="Retake last photo"
                >
                  <RotateCcw className="w-3 h-3 text-coral" />
                  <span>Retake Last</span>
                </button>
              )}
            </div>

            <div className="w-full h-3 rounded-full bg-cream border border-border-soft overflow-hidden mb-4 relative">
              <div
                className="h-full bg-gradient-to-r from-coral to-coral-hover rounded-full transition-all duration-300 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-4">
              {markers.map((num) => {
                const isTaken = currentCount >= num;
                const isCurrentTarget = currentCount + 1 === num;
                const thumbnail = capturedPhotos[num - 1];

                return (
                  <div
                    key={num}
                    className={`relative rounded-2xl p-2 flex flex-col items-center justify-center border transition-all duration-200 ${
                      isTaken
                        ? "bg-pastel-pink/60 border-coral/40 text-coral-dark shadow-2xs"
                        : isCurrentTarget
                        ? "bg-white border-2 border-coral shadow-sm scale-105"
                        : "bg-cream border-border-soft text-muted-text"
                    }`}
                  >
                    {thumbnail ? (
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-1.5 border border-coral/30 shadow-inner">
                        <img
                          src={thumbnail}
                          alt={`Shot ${num} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-current flex items-center justify-center mb-1 text-xs font-mono font-bold">
                        {isTaken ? <Check className="w-4 h-4 text-coral" /> : num}
                      </div>
                    )}

                    <span className="text-[10px] font-bold">
                      {isTaken ? (
                        `Shot ${num} ✓`
                      ) : isCurrentTarget ? (
                        <span className="text-coral flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
                          Next
                        </span>
                      ) : (
                        `Shot ${num}`
                      )}
                    </span>

                    {num === 4 && (
                      <span
                        className="absolute -top-1.5 -right-1 text-[11px] text-coral drop-shadow-xs"
                        title="4-Shot Life4Cut Milestone"
                      >
                        ★
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-soft">
              <div className="text-xs text-secondary-text">
                {currentCount < 4 ? (
                  <span className="flex items-center gap-1.5 text-muted-text">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Capture {4 - currentCount} more shots to unlock Life4Cut strip preview</span>
                  </span>
                ) : currentCount < shootMode ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>4 shots ready! You can finish early or continue to shot {shootMode}.</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-coral font-bold">
                    <Heart className="w-3.5 h-3.5 fill-coral" />
                    <span>All {shootMode} shots complete! Ready to view preview.</span>
                  </span>
                )}
              </div>

              {currentCount >= 4 && shootMode === 4 && (
                <button
                  type="button"
                  onClick={() => setPreviewModalMode(4)}
                  className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview 4 Photos (Finish Early) ✨</span>
                </button>
              )}

              {currentCount >= 6 && shootMode === 6 && (
                <button
                  type="button"
                  onClick={() => setPreviewModalMode(6)}
                  className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Complete (6/6) → View Preview ✨</span>
                </button>
              )}

              {currentCount >= 4 && shootMode === 6 && currentCount < 6 && (
                <button
                  type="button"
                  onClick={() => setPreviewModalMode(4)}
                  className="px-3.5 py-1.5 rounded-full font-bold text-xs text-coral-dark bg-pastel-pink hover:bg-coral hover:text-white border border-coral/30 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Finish Early with 4 Photos ✨</span>
                </button>
              )}
            </div>
          </div>

          {/* 7. SHUTTER BUTTON */}
          <div className="anim-shutter w-full flex flex-col items-center justify-center text-center py-2 sm:py-3">
            <div className="relative group">
              <div
                className={`absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-coral/40 via-pastel-pink/50 to-coral-hover/40 blur-md pointer-events-none transition-all duration-300 ${
                  isCapturing ? "opacity-0" : "opacity-80 group-hover:opacity-100"
                }`}
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={handleSnap}
                disabled={isCapturing || isComplete}
                className={`relative w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 rounded-full border-4 border-white shadow-photo flex flex-col items-center justify-center transition-all duration-200 select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-coral/40 ${
                  isComplete
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : isCapturing
                    ? "bg-gradient-to-tr from-coral-dark to-coral text-white scale-95 shadow-inner"
                    : "bg-gradient-to-tr from-coral via-coral-hover to-[#FF7092] text-white hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-coral/30 cursor-pointer"
                }`}
                aria-label={
                  isCapturing
                    ? `Counting down: ${countdown} seconds`
                    : isComplete
                    ? "All photos captured"
                    : `Snap Photo ${currentShotNum} of ${shootMode}`
                }
              >
                {isCapturing ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight animate-ping">
                      {countdown}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-1 opacity-90">
                      Posing...
                    </span>
                  </div>
                ) : isComplete ? (
                  <div className="flex flex-col items-center justify-center p-2">
                    <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 mb-1" />
                    <span className="text-xs sm:text-sm font-extrabold uppercase">
                      Complete!
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1">
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-black tracking-tight uppercase leading-none">
                      SNAP PHOTO
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest mt-1 opacity-95">
                      ({currentShotNum}/{shootMode})
                    </span>
                  </div>
                )}
              </button>
            </div>

            <div className="mt-3.5 space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-primary-text">
                {isComplete
                  ? "You've captured all shots for this session! Preview below ✨"
                  : `Take up to ${shootMode} synchronized shots. The next photo advances the count.`}
              </p>

              <p className="text-[11px] text-muted-text flex items-center justify-center gap-1.5 select-none">
                <kbd className="px-2 py-0.5 rounded-md bg-white border border-border-primary text-[10px] font-mono font-bold text-secondary-text shadow-2xs">
                  SPACE
                </kbd>
                <span>shortcut enabled · Shutter advances automatically</span>
              </p>
            </div>
          </div>

          {/* 8. POSE INSPIRATION QUICK BUTTON */}
          <div className="flex items-center justify-center pt-2">
            <button
              type="button"
              onClick={() => setIsPoseModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-blush-primary border border-border-primary hover:border-coral/40 text-secondary-text hover:text-coral transition-colors flex items-center gap-2 shadow-2xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Pose Inspiration Cards (8) 💡</span>
            </button>
          </div>

          {/* 9. SESSION INFO FOOTER */}
          <div className="w-full max-w-4xl mx-auto py-3 px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-secondary-text text-center">
              <div className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>Local session active</span>
              </div>

              <span className="text-border-primary hidden sm:inline">·</span>

              <div className="inline-flex items-center gap-1.5 font-medium">
                <Camera className="w-3.5 h-3.5 text-muted-text shrink-0" />
                <span>Camera preview capture ready</span>
              </div>

              <span className="text-border-primary hidden sm:inline">·</span>

              <div className="inline-flex items-center gap-1.5 font-medium text-muted-text">
                <Heart className="w-3.5 h-3.5 fill-coral/50 text-coral shrink-0" />
                <span>No server photo storage · Direct in-browser memories</span>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* PHOTO STRIP PREVIEW MODAL */}
      {previewModalMode !== null && (
        <PhotoStripModal
          isOpen={previewModalMode !== null}
          mode={previewModalMode}
          photos={capturedPhotos}
          frameTheme={frameTheme}
          onClose={() => setPreviewModalMode(null)}
          onRetakeAll={handleRetakeAll}
        />
      )}

      {/* POSE INSPIRATION MODAL */}
      <PoseInspirationModal
        isOpen={isPoseModalOpen}
        onClose={() => setIsPoseModalOpen(false)}
      />

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-primary-text/95 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Sparkles className="w-4 h-4 text-coral shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
