"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Container } from "@/app/components/ui/Container";
import { BoothHeader } from "./BoothHeader";
import {
  MainBoothFrame,
  FrameTheme,
  FilterTheme,
  LayoutTheme,
} from "./MainBoothFrame";
import { BoothBrandingBar } from "./BoothBrandingBar";
import { FlexibleShootCard, ShootMode } from "./FlexibleShootCard";
import { BoothSettingsToolbar } from "./BoothSettingsToolbar";
import { PhotoCounterProgress } from "./PhotoCounterProgress";
import { ShutterButton } from "./ShutterButton";
import { PhotoStripModal } from "./PhotoStripModal";
import { PoseInspirationModal } from "./PoseInspirationModal";
import { SessionInfoBar } from "./SessionInfoBar";
import { Lightbulb, Sparkles } from "lucide-react";

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

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, [stopTracks]);

  // Request or start camera stream
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
    } catch {
      setCameraActive(false);
      showToast("Camera access standby (Simulation snapshot available)");
    }
  }, []);

  // Start camera on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // Mic Track Toggle
  const handleToggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      const next = !micActive;
      audioTracks.forEach((track) => (track.enabled = next));
      setMicActive(next);
    } else {
      setMicActive(!micActive);
    }
  };

  // Trigger Flash Effect
  const triggerFlash = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 450);
  }, []);

  // Capture Frame onto Canvas
  const captureFrame = useCallback((): string => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      if (video && cameraActive && video.videoWidth > 0) {
        // Draw real camera mirrored
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        // Beautiful fallback demo photo gradient canvas
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "#FFF5F8");
        grad.addColorStop(0.5, "#FFE8F0");
        grad.addColorStop(1, "#FCEEF3");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative watermark
        ctx.fillStyle = "#F45F7D";
        ctx.font = "bold 26px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Two Hearts Haru Film ♡", canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = "#70676B";
        ctx.font = "16px sans-serif";
        ctx.fillText(
          `Shot #${capturedPhotos.length + 1} · Oct 12, 2026`,
          canvas.width / 2,
          canvas.height / 2 + 15
        );
      }

      // Add delicate stamp
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(20, canvas.height - 45, 170, 30);
      ctx.fillStyle = "#C93E5C";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`MILES APART · ${roomCode}`, 30, canvas.height - 25);
    }

    return canvas.toDataURL("image/jpeg", 0.92);
  }, [cameraActive, capturedPhotos.length, roomCode]);

  // Main Shutter Snap Handler
  const handleSnap = useCallback(() => {
    if (isCapturing || capturedPhotos.length >= shootMode) return;

    setIsCapturing(true);
    let remaining = timerDuration;
    setCountdown(remaining);

    const countdownInterval = setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        clearInterval(countdownInterval);
        setCountdown(0);

        // Flash screen
        triggerFlash();

        // Capture photo
        const snapshot = captureFrame();
        setCapturedPhotos((prev) => {
          const next = [...prev, snapshot];
          // Check milestone notifications
          if (next.length === 4) {
            showToast("4 Shots complete! You can preview your Life4Cut strip ✨");
          } else if (next.length === shootMode) {
            showToast("All shots complete! Click Preview to see your collage 💕");
          }
          return next;
        });

        // Reset capture state
        setTimeout(() => {
          setCountdown(null);
          setIsCapturing(false);
        }, 500);
      }
    }, 1000);
  }, [isCapturing, capturedPhotos.length, shootMode, timerDuration, triggerFlash, captureFrame]);

  // Space Key Shortcut Support (Section 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const target = e.target as HTMLElement;
        const isInput =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable;

        if (!isInput && !isCapturing && capturedPhotos.length < shootMode) {
          e.preventDefault();
          handleSnap();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSnap, isCapturing, capturedPhotos.length, shootMode]);

  // Retake Last Photo
  const handleRetakeLast = () => {
    setCapturedPhotos((prev) => prev.slice(0, prev.length - 1));
    showToast("Last photo removed. Ready for retake!");
  };

  // Retake All Photos
  const handleRetakeAll = () => {
    setCapturedPhotos([]);
    setPreviewModalMode(null);
    showToast("All shots cleared. Ready to start fresh!");
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
        ".anim-header-bar",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".anim-booth-frame",
          { opacity: 0, scale: 0.98, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          ".anim-branding-bar",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".anim-mode-card",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".anim-settings-toolbar",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".anim-progress-card",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".anim-shutter",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6 },
          "-=0.3"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const currentShotNum = Math.min(capturedPhotos.length + 1, shootMode);

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
      <main className="flex-1 py-4 sm:py-7 lg:py-10 relative overflow-hidden">
        {/* Soft Ambient Background Glows */}
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
          {/* 1. NAVIGATION & SESSION HEADER BAR */}
          <div className="anim-header-bar">
            <BoothHeader
              roomCode={roomCode}
              currentShot={currentShotNum}
              totalShots={shootMode}
            />
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
          <div className="anim-branding-bar">
            <BoothBrandingBar />
          </div>

          {/* 4. FLEXIBLE SHOOTING MODE (4 vs 6 PHOTOS) */}
          <div className="anim-mode-card">
            <FlexibleShootCard
              shootMode={shootMode}
              onSelectMode={setShootMode}
              photosTakenCount={capturedPhotos.length}
            />
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

          {/* 6. SESSION PHOTO COUNTER & PROGRESS CARD */}
          <div className="anim-progress-card">
            <PhotoCounterProgress
              shootMode={shootMode}
              capturedPhotos={capturedPhotos}
              onOpenFourPreview={() => setPreviewModalMode(4)}
              onOpenSixPreview={() => setPreviewModalMode(6)}
              onRetakeLastPhoto={handleRetakeLast}
            />
          </div>

          {/* 7. MAIN SHUTTER BUTTON */}
          <div className="anim-shutter">
            <ShutterButton
              currentShotNumber={currentShotNum}
              totalShots={shootMode}
              isCapturing={isCapturing}
              countdown={countdown}
              onSnap={handleSnap}
              disabled={isCapturing}
            />
          </div>

          {/* 10. POSE INSPIRATION FLOATING/QUICK BUTTON */}
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

          {/* 12. SESSION INFORMATION FOOTER ROW */}
          <div>
            <SessionInfoBar />
          </div>
        </Container>
      </main>

      {/* 8 & 9. PHOTO STRIP / COLLAGE PREVIEW MODAL */}
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

      {/* 10. POSE INSPIRATION MODAL */}
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
