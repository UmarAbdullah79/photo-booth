"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Container } from "@/app/components/ui/Container";
import {
  Sparkles,
  ArrowLeft,
  Check,
  Copy,
  Heart,
  Layers,
  Move,
  Plus,
  RotateCcw,
  Eye,
  Users,
  Palette,
  Radio,
} from "lucide-react";
import {
  SessionMode,
  PhotoSlot,
  FrameTheme,
  DEFAULT_PHOTOS_4,
  BONUS_SLOTS_2,
} from "../types";
import { CompletionHero } from "./CompletionHero";
import { PhotoCard } from "./PhotoCard";
import { PhotoAdjustmentModal } from "./PhotoAdjustmentModal";
import { RetakePhotoModal } from "./RetakePhotoModal";
import { FinalStripPreviewModal } from "./FinalStripPreviewModal";

interface PhotoPreviewClientProps {
  initialMode?: SessionMode;
  initialRoomCode?: string;
  initialHostName?: string;
  initialPartnerName?: string;
}

export default function PhotoPreviewClient({
  initialMode = 4,
  initialRoomCode = "A7K92P",
  initialHostName = "Alex",
  initialPartnerName = "Minji",
}: PhotoPreviewClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const [sessionMode, setSessionMode] = useState<SessionMode>(initialMode);
  const [roomCode, setRoomCode] = useState<string>(initialRoomCode);
  const [hostName, setHostName] = useState<string>(initialHostName);
  const [partnerName, setPartnerName] = useState<string>(initialPartnerName);
  const [copiedCode, setCopiedCode] = useState(false);

  const [selectedFrame] = useState<FrameTheme>("haru-pastel");

  const [photos, setPhotos] = useState<PhotoSlot[]>(() => {
    if (initialMode === 6) {
      return [...DEFAULT_PHOTOS_4, ...BONUS_SLOTS_2];
    }
    return DEFAULT_PHOTOS_4;
  });

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [adjustingPhoto, setAdjustingPhoto] = useState<PhotoSlot | null>(null);
  const [retakePhoto, setRetakePhoto] = useState<PhotoSlot | null>(null);
  const [isRetakeModalOpen, setIsRetakeModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCode = sessionStorage.getItem("two_hearts_room_code");
      const storedNick = sessionStorage.getItem("two_hearts_host_nickname");
      if (storedCode) setRoomCode(storedCode);
      if (storedNick) setHostName(storedNick);
    }
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".anim-status-header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".anim-completion-hero",
          { opacity: 0, y: 16, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.25"
        )
        .fromTo(
          ".anim-shots-review",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.3"
        )
        .fromTo(
          ".anim-bonus-section",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".anim-actions-panel",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.25"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleCopyCode = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(roomCode);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleUpgradeToSix = () => {
    if (sessionMode === 6) return;
    setSessionMode(6);
    setPhotos((prev) => {
      if (prev.length >= 6) return prev;
      return [...prev, ...BONUS_SLOTS_2];
    });
    showToast("Session upgraded to 6-Shot Korean Collage! ✨");
  };

  const handleMoveSlot = (currentIndex: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= sessionMode) return;
    const activeSlice = photos.slice(0, sessionMode);
    const updated = [...activeSlice];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(newIndex, 0, moved);

    const renumbered = updated.map((item, idx) => ({
      ...item,
      slotNumber: idx + 1,
    }));

    setPhotos(renumbered);
    showToast(`Moved #${currentIndex + 1} to #${newIndex + 1}`);
  };

  const handleReorderSlots = (reordered: PhotoSlot[]) => {
    setPhotos(reordered);
    showToast("Photo strip slots reordered! ✨");
  };

  const handleOpenAdjust = (photo: PhotoSlot) => {
    setAdjustingPhoto(photo);
  };

  const handleSaveAdjustments = (updated: PhotoSlot) => {
    setPhotos((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    showToast(`Saved adjustments for ${updated.title} 💕`);
  };

  const handleOpenRetake = (photo: PhotoSlot) => {
    setRetakePhoto(photo);
    setIsRetakeModalOpen(true);
  };

  const handleOpenRetakeChooser = () => {
    setRetakePhoto(photos[0] || null);
    setIsRetakeModalOpen(true);
  };

  const handleReplaceImage = (slotId: string, newImageSrc: string) => {
    setPhotos((prev) =>
      prev.map((item) => {
        if (item.id === slotId) {
          return {
            ...item,
            imageSrc: newImageSrc,
          };
        }
        return item;
      })
    );
    showToast("Photo successfully replaced! ✨");
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    const currentPhotos = photos.slice(0, sessionMode);
    const sourceIndex = currentPhotos.findIndex((p) => p.id === draggedId);
    const targetIndex = currentPhotos.findIndex((p) => p.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const updated = [...currentPhotos];
      const [movedItem] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, movedItem);

      const renumbered = updated.map((item, idx) => ({
        ...item,
        slotNumber: idx + 1,
      }));

      handleReorderSlots(renumbered);
    }
    setDraggedId(null);
  };

  const isFour = sessionMode === 4;
  const currentPhotos = photos.slice(0, sessionMode);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark py-4 sm:py-8 relative overflow-hidden"
    >
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

      <Container
        size="default"
        className="max-w-6xl px-3 sm:px-6 space-y-5 sm:space-y-7"
      >
        {/* 1. SESSION STATUS HEADER */}
        <header className="anim-status-header w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 border border-border-primary shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                href="/room/booth"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary-text hover:text-coral hover:bg-blush-primary border border-border-soft transition-all duration-200"
                aria-label="Back to Photo Booth"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Booth Studio</span>
              </Link>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide bg-pastel-pink text-coral-dark border border-coral/30 shadow-2xs"
                role="status"
              >
                <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>
                  {isFour
                    ? "4-SHOT MILESTONE · 4/4 PHOTOS CAPTURED!"
                    : "6-SHOT MILESTONE · 6/6 PHOTOS CAPTURED!"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-pastel-purple text-pastel-purple-text border border-purple-200">
                <Layers className="w-3 h-3 text-purple-600" />
                <span>
                  {isFour
                    ? "Classic 4-Cut Strip Ready"
                    : "6-Photo Studio Collage Ready"}
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-cream border border-border-soft text-secondary-text">
                <Heart className="w-2.5 h-2.5 text-coral fill-coral" />
                <span>Haru Pastel Pink Frame</span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cream hover:bg-blush-primary border border-border-soft text-primary-text transition-colors"
                title="Click to copy room code"
                aria-label={`Room code: ${roomCode}. Click to copy.`}
              >
                <span className="text-[10px] text-coral font-sans font-semibold">
                  ROOM:
                </span>
                <span className="tracking-wider">{roomCode}</span>
                {copiedCode ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-text" />
                )}
              </button>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-pastel-green text-pastel-green-text border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>100% Synced</span>
              </div>
            </div>
          </div>
        </header>

        {/* 2. COMPLETION HERO SECTION */}
        <div className="anim-completion-hero">
          <CompletionHero
            mode={sessionMode}
            hostName={hostName}
            partnerName={partnerName}
            onOpenPreview={() => setIsPreviewModalOpen(true)}
          />
        </div>

        {/* 3. SYNCHRONIZED SHOTS REVIEW */}
        <section aria-labelledby="review-section-heading" className="anim-shots-review w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1 border-b border-border-soft">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2
                  id="review-section-heading"
                  className="text-lg sm:text-xl font-extrabold text-primary-text tracking-tight"
                >
                  Synchronized Shots Review
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pastel-pink text-coral-dark border border-coral/30">
                  {currentPhotos.length} of {sessionMode} Completed
                </span>
              </div>

              <p className="text-xs sm:text-sm text-secondary-text max-w-2xl">
                Click any photo thumbnail to inspect resolution, adjust framing, or
                swap pose order before printing.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-border-primary text-secondary-text shadow-2xs self-start sm:self-auto shrink-0">
              <Move className="w-3.5 h-3.5 text-coral" />
              <span>Drag &amp; drop to reorder strip slots</span>
            </div>
          </div>

          <div
            className={
              isFour
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            }
          >
            {currentPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                totalSlots={currentPhotos.length}
                onOpenAdjust={handleOpenAdjust}
                onOpenRetake={handleOpenRetake}
                onMoveSlot={handleMoveSlot}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={draggedId === photo.id}
              />
            ))}
          </div>
        </section>

        {/* 4. BONUS UPGRADE CARD */}
        {sessionMode === 4 && (
          <section
            aria-labelledby="bonus-upgrade-heading"
            className="anim-bonus-section relative w-full rounded-3xl bg-linear-to-r from-[#FFF0F4] via-[#FCEFF4] to-[#FFE0E8] p-5 sm:p-7 border border-coral/30 shadow-card overflow-hidden"
          >
            <div
              className="absolute -top-12 -right-12 w-48 h-48 bg-coral/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-2 text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-coral text-white shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BONUS SLOTS</span>
                </div>
                <h3
                  id="bonus-upgrade-heading"
                  className="text-lg sm:text-xl font-black text-primary-text"
                >
                  Want more memories in this session?
                </h3>
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  You can keep shooting 2 more frames to upgrade this to a wide
                  6-photo Korean booth collage! Both partners remain connected.
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  type="button"
                  onClick={handleUpgradeToSix}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                  <span>+2 Shots (Upgrade to 6)</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 5. SESSION ACTIONS PANEL */}
        <section
          aria-labelledby="session-actions-heading"
          className="anim-actions-panel w-full bg-white rounded-3xl p-5 sm:p-7 border border-border-primary shadow-elevated"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pastel-pink text-coral-dark">
                  <Users className="w-3.5 h-3.5 text-coral" />
                  <span>
                    {hostName} &amp; {partnerName}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Both Ready · Room {roomCode}</span>
                </span>
              </div>

              <h3
                id="session-actions-heading"
                className="text-base sm:text-lg font-extrabold text-primary-text"
              >
                Session Actions &amp; Next Steps
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text max-w-xl">
                {isFour
                  ? "All 4 frames captured! You can retake any slot, continue shooting to 6 frames, or open the full 4-cut styling strip editor."
                  : "All 6 studio frames captured! Fine-tune order or open your 2×3 Korean collage editor."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={handleOpenRetakeChooser}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-secondary-text hover:text-coral bg-cream hover:bg-blush-primary border border-border-soft hover:border-coral/40 transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <RotateCcw className="w-4 h-4 text-coral" />
                <span>Retake a Photo</span>
              </button>

              {isFour && (
                <button
                  type="button"
                  onClick={handleUpgradeToSix}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-coral-dark bg-pastel-pink hover:bg-blush-soft border border-coral/30 hover:border-coral transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-coral" />
                  <span>Keep Shooting to 6 Photos</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {isFour
                    ? "View Preview & Style 4-Cut Strip ✨"
                    : "View Preview & Style 6-Photo Collage ✨"}
                </span>
              </button>

              <Link
                href="/room/preview-edit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-coral bg-pastel-pink hover:bg-coral hover:text-white border border-coral/40 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Palette className="w-4 h-4" />
                <span>Open Strip Editor &amp; Export →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. SESSION INFORMATION BAR */}
        <footer
          aria-label="Session status and metadata"
          className="w-full bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 border border-border-primary text-xs text-secondary-text shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-primary-text">
                <span className="w-2 h-2 rounded-full bg-coral inline-block" />
                <span>Room Code:</span>
                <span className="font-mono font-bold text-coral">{roomCode}</span>
              </span>

              <span className="text-border-primary hidden sm:inline">|</span>

              <span className="inline-flex items-center gap-1 font-medium">
                <Heart className="w-3 h-3 text-coral fill-coral" />
                <span>Frame:</span>
                <span className="font-semibold text-primary-text">Haru Pastel Pink Frame</span>
              </span>

              <span className="text-border-primary hidden sm:inline">|</span>

              <span className="inline-flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>Filter:</span>
                <span className="font-semibold text-primary-text">Warm Seoul Glow</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted-text">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Local Frontend Session Active · Ready to Style</span>
            </div>
          </div>
        </footer>
      </Container>

      {/* MODAL 1: PHOTO ADJUSTMENT MODAL */}
      <PhotoAdjustmentModal
        isOpen={adjustingPhoto !== null}
        photo={adjustingPhoto}
        onClose={() => setAdjustingPhoto(null)}
        onSave={handleSaveAdjustments}
      />

      {/* MODAL 2: RETAKE PHOTO MODAL */}
      <RetakePhotoModal
        isOpen={isRetakeModalOpen}
        photo={retakePhoto}
        allPhotos={photos.slice(0, sessionMode)}
        onClose={() => {
          setIsRetakeModalOpen(false);
          setRetakePhoto(null);
        }}
        onSelectPhotoToRetake={(id) => {
          const target = photos.find((p) => p.id === id);
          if (target) setRetakePhoto(target);
        }}
        onReplaceImage={handleReplaceImage}
      />

      {/* MODAL 3: FINAL STRIP / COLLAGE PREVIEW MODAL */}
      <FinalStripPreviewModal
        isOpen={isPreviewModalOpen}
        mode={sessionMode}
        photos={photos}
        roomCode={roomCode}
        initialFrameTheme={selectedFrame}
        onClose={() => setIsPreviewModalOpen(false)}
      />

      {/* FLOATING NOTIFICATION TOAST */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-primary-text/95 text-white text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Sparkles className="w-4 h-4 text-coral shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
