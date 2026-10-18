"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Check,
  Copy,
  Heart,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  ZoomIn,
  Move,
  X,
  Share2,
  Download,
  QrCode,
  Layers,
  Palette,
  Sticker,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  PlusCircle,
  Maximize2,
} from "lucide-react";

/* =========================================================================
   1. TYPES & DATA MODELS
   ========================================================================= */

type LayoutMode = "3-cut" | "4-cut" | "6-grid";
type FrameColorId = "cream" | "pink" | "butter" | "lilac" | "noir";
type FilterId =
  | "original"
  | "warm"
  | "pastel"
  | "retro"
  | "vintage"
  | "monochrome";
type StickerId = "ribbon" | "sparkle" | "bear" | "kiss";

interface PhotoSlot {
  id: string;
  slotNumber: number;
  title: string;
  imageSrc: string;
  zoom: number; // 100 to 200
  panX: number; // -50 to 50
  panY: number; // -50 to 50
}

interface FrameColorOption {
  id: FrameColorId;
  name: string;
  swatchHex: string;
  bgHex: string;
  borderHex: string;
  frameBgClass: string;
  frameBorderClass: string;
  headerTextClass: string;
  footerTextClass: string;
}

interface FilterOption {
  id: FilterId;
  name: string;
  cssFilter: string;
  desc: string;
}

interface StickerOption {
  id: StickerId;
  name: string;
  emoji: string;
  defaultPositionClass: string;
  xPercent: number; // For canvas export
  yPercent: number; // For canvas export
}

/* =========================================================================
   2. CONFIGURATION & DEMONSTRATION DATA
   ========================================================================= */

const DEMO_SHARE_BASE_URL = "https://twoheartsbooth.app/strip";

const AVAILABLE_PROJECT_IMAGES = [
  { src: "/images/hero-1.png", label: "Two Hearts Candid (Cam 01)" },
  { src: "/images/hero-2.png", label: "Playful Wink (Cam 02)" },
  { src: "/images/create-hero-1.png", label: "Sweet Couple Moment (Studio)" },
];

const INITIAL_PHOTOS: PhotoSlot[] = [
  {
    id: "slot-1",
    slotNumber: 1,
    title: "Kimchi Smile ✌️",
    imageSrc: "/images/hero-1.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
  {
    id: "slot-2",
    slotNumber: 2,
    title: "Cheek Heart 💖",
    imageSrc: "/images/hero-2.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
  {
    id: "slot-3",
    slotNumber: 3,
    title: "Wink & Peace ✨",
    imageSrc: "/images/create-hero-1.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
  {
    id: "slot-4",
    slotNumber: 4,
    title: "Together Forever 🧸",
    imageSrc: "/images/hero-1.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
  {
    id: "slot-5",
    slotNumber: 5,
    title: "Matching Hearts 💕",
    imageSrc: "/images/hero-2.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
  {
    id: "slot-6",
    slotNumber: 6,
    title: "Cute Surprise 🌷",
    imageSrc: "/images/create-hero-1.png",
    zoom: 100,
    panX: 0,
    panY: 0,
  },
];

const FRAME_COLORS: FrameColorOption[] = [
  {
    id: "cream",
    name: "Haru Cream",
    swatchHex: "#FFF9F4",
    bgHex: "#FFF9F4",
    borderHex: "#EFE2D8",
    frameBgClass: "bg-[#FFF9F4]",
    frameBorderClass: "border-[#EFE2D8]",
    headerTextClass: "text-[#3D3236]",
    footerTextClass: "text-[#85777D]",
  },
  {
    id: "pink",
    name: "Pink",
    swatchHex: "#FFF0F4",
    bgHex: "#FFF0F4",
    borderHex: "#FAD2E1",
    frameBgClass: "bg-[#FFF0F4]",
    frameBorderClass: "border-[#FAD2E1]",
    headerTextClass: "text-[#C93E5C]",
    footerTextClass: "text-[#966E7C]",
  },
  {
    id: "butter",
    name: "Butter",
    swatchHex: "#FFFBEA",
    bgHex: "#FFFBEA",
    borderHex: "#FDE68A",
    frameBgClass: "bg-[#FFFBEA]",
    frameBorderClass: "border-[#FDE68A]",
    headerTextClass: "text-[#8A6D0B]",
    footerTextClass: "text-[#A8881E]",
  },
  {
    id: "lilac",
    name: "Lilac",
    swatchHex: "#F7F2FB",
    bgHex: "#F7F2FB",
    borderHex: "#E5D7F2",
    frameBgClass: "bg-[#F7F2FB]",
    frameBorderClass: "border-[#E5D7F2]",
    headerTextClass: "text-[#673078]",
    footerTextClass: "text-[#856C91]",
  },
  {
    id: "noir",
    name: "Noir",
    swatchHex: "#1F1A1D",
    bgHex: "#1F1A1D",
    borderHex: "#3D3036",
    frameBgClass: "bg-[#1F1A1D]",
    frameBorderClass: "border-[#3D3036]",
    headerTextClass: "text-[#FFE8F0]",
    footerTextClass: "text-[#B8A8AF]",
  },
];

const PHOTO_FILTERS: FilterOption[] = [
  {
    id: "original",
    name: "Original",
    cssFilter: "none",
    desc: "Clean & Natural",
  },
  {
    id: "warm",
    name: "Warm Glow",
    cssFilter: "sepia(0.2) saturate(1.2) brightness(1.05)",
    desc: "Golden Hour Glow",
  },
  {
    id: "pastel",
    name: "Soft Pastel",
    cssFilter: "contrast(1.05) brightness(1.04) saturate(1.22) hue-rotate(345deg)",
    desc: "Blush & Dreamy",
  },
  {
    id: "retro",
    name: "Retro 90s",
    cssFilter: "sepia(0.35) contrast(1.1) brightness(0.96) saturate(0.9)",
    desc: "Vintage Film Tone",
  },
  {
    id: "vintage",
    name: "Vintage Film",
    cssFilter: "contrast(1.15) brightness(1.05) saturate(0.85) sepia(0.15)",
    desc: "Nostalgic Camera",
  },
  {
    id: "monochrome",
    name: "Mono Chrome",
    cssFilter: "grayscale(1) contrast(1.2) brightness(1.02)",
    desc: "Classic Seoul B&W",
  },
];

const STICKER_OPTIONS: StickerOption[] = [
  {
    id: "ribbon",
    name: "Ribbon",
    emoji: "🎀",
    defaultPositionClass: "top-2 left-3",
    xPercent: 0.12,
    yPercent: 0.08,
  },
  {
    id: "sparkle",
    name: "Sparkle",
    emoji: "✨",
    defaultPositionClass: "top-3 right-4",
    xPercent: 0.88,
    yPercent: 0.09,
  },
  {
    id: "bear",
    name: "Bear",
    emoji: "🧸",
    defaultPositionClass: "bottom-14 left-3",
    xPercent: 0.15,
    yPercent: 0.9,
  },
  {
    id: "kiss",
    name: "Kiss",
    emoji: "💋",
    defaultPositionClass: "bottom-16 right-4",
    xPercent: 0.85,
    yPercent: 0.89,
  },
];

/* =========================================================================
   3. REDESIGNED PREVIEW & EDIT PAGE
   ========================================================================= */

export default function PreviewAndEditPage() {
  const router = useRouter();

  // Demonstration Session Data
  const [roomCode] = useState<string>("A7K92P");
  const [partnerName] = useState<string>("Minji (Tokyo)");
  const [hostName] = useState<string>("Alex (Seoul)");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Editor Customization State (Single Source of Truth)
  const [layout, setLayout] = useState<LayoutMode>("4-cut");
  const [frameColor, setFrameColor] = useState<FrameColorId>("pink");
  const [activeFilterId, setActiveFilterId] = useState<FilterId>("original");
  const [appliedStickers, setAppliedStickers] = useState<StickerId[]>([
    "sparkle",
    "ribbon",
  ]);
  const [photos, setPhotos] = useState<PhotoSlot[]>(INITIAL_PHOTOS);

  // Modal States
  const [adjustingPhoto, setAdjustingPhoto] = useState<PhotoSlot | null>(null);
  const [adjustZoom, setAdjustZoom] = useState<number>(100);
  const [adjustPanX, setAdjustPanX] = useState<number>(0);
  const [adjustPanY, setAdjustPanY] = useState<number>(0);

  const [retakeTargetId, setRetakeTargetId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState<boolean>(false);
  const [isRedoModalOpen, setIsRedoModalOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // QR Code & Feedback Toast State
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const shareUrl = `${DEMO_SHARE_BASE_URL}/${roomCode}`;

  // Generate QR Code for Share Modal
  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: "#292326",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch(() => setQrCodeDataUrl(""));
  }, [shareUrl]);

  // Sync adjustment values when photo modal opens
  useEffect(() => {
    if (adjustingPhoto) {
      setAdjustZoom(adjustingPhoto.zoom);
      setAdjustPanX(adjustingPhoto.panX);
      setAdjustPanY(adjustingPhoto.panY);
    }
  }, [adjustingPhoto]);

  // Toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleCopyCode = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(roomCode);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      showToast(`Copied room code: ${roomCode}`);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyShareLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2000);
      showToast("Link copied to clipboard! 💕");
    } catch {
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Miles Apart · Two Hearts Photo Strip",
          text: `Check out our Two Hearts photo booth strip from room ${roomCode}! 💕`,
          url: shareUrl,
        });
        showToast("Shared successfully! ✨");
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyShareLink();
    }
  };

  // Layout Slot Calculations
  const getSlotCount = (mode: LayoutMode): number => {
    switch (mode) {
      case "3-cut":
        return 3;
      case "6-grid":
        return 6;
      case "4-cut":
      default:
        return 4;
    }
  };

  const activeSlotCount = getSlotCount(layout);
  const displayPhotos = photos.slice(0, activeSlotCount);
  const activeFrame =
    FRAME_COLORS.find((f) => f.id === frameColor) || FRAME_COLORS[1];
  const activeFilter =
    PHOTO_FILTERS.find((f) => f.id === activeFilterId) || PHOTO_FILTERS[0];

  // Sticker Toggle
  const handleToggleSticker = (id: StickerId) => {
    setAppliedStickers((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed sticker");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Added sticker ✨");
        return [...prev, id];
      }
    });
  };

  // Accessible Left / Right Photo Reordering
  const handleMovePhoto = (currentIndex: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= displayPhotos.length) return;

    const updated = [...photos];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(newIndex, 0, moved);

    const reindexed = updated.map((p, idx) => ({
      ...p,
      slotNumber: idx + 1,
    }));

    setPhotos(reindexed);
    showToast(`Moved #${currentIndex + 1} to #${newIndex + 1}`);
  };

  // Save Framing Adjustments
  const handleSaveAdjustments = () => {
    if (!adjustingPhoto) return;
    setPhotos((prev) =>
      prev.map((item) =>
        item.id === adjustingPhoto.id
          ? {
              ...item,
              zoom: adjustZoom,
              panX: adjustPanX,
              panY: adjustPanY,
            }
          : item
      )
    );
    setAdjustingPhoto(null);
    showToast(`Saved framing for #${adjustingPhoto.slotNumber} ✨`);
  };

  // Replace / Retake Photo Image
  const handleReplaceImage = (targetId: string, newSrc: string) => {
    setPhotos((prev) =>
      prev.map((item) =>
        item.id === targetId ? { ...item, imageSrc: newSrc } : item
      )
    );
    setRetakeTargetId(null);
    if (adjustingPhoto && adjustingPhoto.id === targetId) {
      setAdjustingPhoto((prev) => (prev ? { ...prev, imageSrc: newSrc } : null));
    }
    showToast("Photo updated with new shot 💕");
  };

  // Reset All Customizations
  const handleConfirmRedoAll = () => {
    setPhotos(INITIAL_PHOTOS);
    setLayout("4-cut");
    setFrameColor("pink");
    setActiveFilterId("original");
    setAppliedStickers(["sparkle", "ribbon"]);
    setIsRedoModalOpen(false);
    showToast("All customizations reset to defaults!");
  };

  /* =========================================================================
     CLIENT-SIDE HIGH-RESOLUTION PNG GENERATOR
     Renders the exact customized photo strip onto an HTML5 Canvas and downloads.
     ========================================================================= */
  const handleDownloadPhotoStrip = async () => {
    try {
      setIsDownloading(true);
      showToast("Rendering photo strip... 🎨");

      const isGrid = layout === "6-grid";
      const canvas = document.createElement("canvas");

      const canvasWidth = isGrid ? 1000 : 700;
      const canvasHeight =
        layout === "3-cut" ? 1750 : layout === "4-cut" ? 2200 : 1500;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // 1. Frame paper background & border
      ctx.fillStyle = activeFrame.bgHex;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.lineWidth = 14;
      ctx.strokeStyle = activeFrame.borderHex;
      ctx.strokeRect(7, 7, canvasWidth - 14, canvasHeight - 14);

      // 2. Haru Film Header
      ctx.textAlign = "center";
      ctx.fillStyle =
        frameColor === "noir"
          ? "#FFE8F0"
          : frameColor === "pink"
          ? "#C93E5C"
          : "#292326";
      ctx.font = "bold 32px Georgia, serif";
      ctx.fillText("TWO HEARTS HARU FILM ♡", canvasWidth / 2, 75);

      ctx.fillStyle = frameColor === "noir" ? "#B8A8AF" : "#85777D";
      ctx.font = "bold 16px monospace";
      ctx.fillText(
        `${hostName} × ${partnerName} · OCT 18, 2026`,
        canvasWidth / 2,
        105
      );

      // 3. Header Divider
      ctx.strokeStyle = activeFrame.borderHex;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 125);
      ctx.lineTo(canvasWidth - 40, 125);
      ctx.stroke();

      const headerOffset = 145;
      const footerHeight = 160;
      const usableHeight = canvasHeight - headerOffset - footerHeight;

      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      if (!isGrid) {
        // Vertical Strip (3 or 4 photos)
        const photoCount = displayPhotos.length;
        const gap = 20;
        const totalGaps = gap * (photoCount - 1);
        const photoHeight = (usableHeight - totalGaps) / photoCount;
        const photoWidth = canvasWidth - 100;
        const startX = 50;

        for (let i = 0; i < photoCount; i++) {
          const p = displayPhotos[i];
          const y = headerOffset + i * (photoHeight + gap);

          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(startX - 6, y - 6, photoWidth + 12, photoHeight + 12);

          try {
            const img = await loadImage(p.imageSrc);
            ctx.save();
            ctx.beginPath();
            ctx.rect(startX, y, photoWidth, photoHeight);
            ctx.clip();

            if (activeFilter.cssFilter !== "none") {
              ctx.filter = activeFilter.cssFilter;
            }

            const scale = p.zoom / 100;
            ctx.translate(
              startX + photoWidth / 2 + p.panX * 2,
              y + photoHeight / 2 + p.panY * 2
            );
            ctx.scale(scale, scale);

            const imgAspect = img.width / img.height;
            const targetAspect = photoWidth / photoHeight;
            let drawW = photoWidth;
            let drawH = photoHeight;
            if (imgAspect > targetAspect) {
              drawW = photoHeight * imgAspect;
            } else {
              drawH = photoWidth / imgAspect;
            }

            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();
          } catch {
            ctx.fillStyle = "#FCEFF4";
            ctx.fillRect(startX, y, photoWidth, photoHeight);
          }

          // Slot number tag
          ctx.fillStyle = "rgba(0,0,0,0.65)";
          ctx.fillRect(startX + photoWidth - 45, y + photoHeight - 28, 38, 22);
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 13px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`0${i + 1}`, startX + photoWidth - 26, y + photoHeight - 12);
        }
      } else {
        // 6-Grid (2 Columns × 3 Rows)
        const cols = 2;
        const rows = 3;
        const gap = 16;
        const photoWidth = (canvasWidth - 100 - gap) / cols;
        const photoHeight = (usableHeight - gap * (rows - 1)) / rows;
        const startX = 50;

        for (let i = 0; i < displayPhotos.length; i++) {
          const p = displayPhotos[i];
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = startX + col * (photoWidth + gap);
          const y = headerOffset + row * (photoHeight + gap);

          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(x - 5, y - 5, photoWidth + 10, photoHeight + 10);

          try {
            const img = await loadImage(p.imageSrc);
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, photoWidth, photoHeight);
            ctx.clip();

            if (activeFilter.cssFilter !== "none") {
              ctx.filter = activeFilter.cssFilter;
            }

            const scale = p.zoom / 100;
            ctx.translate(
              x + photoWidth / 2 + p.panX * 2,
              y + photoHeight / 2 + p.panY * 2
            );
            ctx.scale(scale, scale);

            const imgAspect = img.width / img.height;
            const targetAspect = photoWidth / photoHeight;
            let drawW = photoWidth;
            let drawH = photoHeight;
            if (imgAspect > targetAspect) {
              drawW = photoHeight * imgAspect;
            } else {
              drawH = photoWidth / imgAspect;
            }

            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();
          } catch {
            ctx.fillStyle = "#FCEFF4";
            ctx.fillRect(x, y, photoWidth, photoHeight);
          }

          ctx.fillStyle = "rgba(0,0,0,0.65)";
          ctx.fillRect(x + photoWidth - 42, y + photoHeight - 26, 36, 20);
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 12px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`0${i + 1}`, x + photoWidth - 24, y + photoHeight - 12);
        }
      }

      // 4. Stickers
      ctx.font = "36px sans-serif";
      appliedStickers.forEach((stkId) => {
        const stk = STICKER_OPTIONS.find((s) => s.id === stkId);
        if (stk) {
          ctx.fillText(
            stk.emoji,
            canvasWidth * stk.xPercent,
            canvasHeight * stk.yPercent
          );
        }
      });

      // 5. Footer Branding & Barcode
      const footerY = canvasHeight - 110;
      ctx.strokeStyle = activeFrame.borderHex;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, footerY);
      ctx.lineTo(canvasWidth - 40, footerY);
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle =
        frameColor === "noir"
          ? "#FFE8F0"
          : frameColor === "pink"
          ? "#C93E5C"
          : "#292326";
      ctx.font = "bold 20px Georgia, serif";
      ctx.fillText("Miles Apart, United in Heart ♡", canvasWidth / 2, footerY + 36);

      const barcodeY = footerY + 52;
      const barPattern = [2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1];
      let barX = canvasWidth / 2 - 90;
      ctx.fillStyle = frameColor === "noir" ? "#FFE8F0" : "#292326";
      barPattern.forEach((w) => {
        ctx.fillRect(barX, barcodeY, w, 22);
        barX += w + 4;
      });

      ctx.fillStyle = frameColor === "noir" ? "#B8A8AF" : "#85777D";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`ROOM-${roomCode} · #HARU-FILM`, canvasWidth / 2, barcodeY + 40);

      // Trigger download
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "miles-apart-photo-strip.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setIsDownloading(false);
      showToast("Photo strip downloaded! 🎁");
    } catch {
      setIsDownloading(false);
      showToast("Download failed. Please try again.");
    }
  };

  /* Helper to render the single strip for both live preview & expand modal */
  const renderPhotoStripContent = (isModal: boolean = false) => (
    <div
      className={`relative w-full ${
        layout === "6-grid"
          ? isModal
            ? "max-w-xl"
            : "max-w-sm sm:max-w-md"
          : isModal
          ? "max-w-sm sm:max-w-md"
          : "max-w-[280px] sm:max-w-[320px]"
      } rounded-3xl p-4 sm:p-5 border-4 shadow-xl transition-all duration-300 mx-auto ${
        activeFrame.frameBgClass
      } ${activeFrame.frameBorderClass}`}
    >
      {/* Top Haru Branding */}
      <div className="text-center pb-2.5 mb-2 border-b border-current/20">
        <div
          className={`font-serif font-black text-sm sm:text-base tracking-widest uppercase ${activeFrame.headerTextClass}`}
        >
          Two Hearts Haru Film ♡
        </div>
        <div
          className={`text-[9px] font-mono mt-0.5 tracking-wider ${activeFrame.footerTextClass}`}
        >
          {hostName} × {partnerName} · OCT 18, 2026
        </div>
      </div>

      {/* Decorative Stickers */}
      {appliedStickers.map((stickerId) => {
        const opt = STICKER_OPTIONS.find((s) => s.id === stickerId);
        if (!opt) return null;
        return (
          <div
            key={opt.id}
            className={`absolute ${opt.defaultPositionClass} z-20 pointer-events-none select-none text-2xl drop-shadow-md animate-bounce`}
            style={{ animationDuration: "3.5s" }}
            aria-hidden="true"
          >
            {opt.emoji}
          </div>
        );
      })}

      {/* Photos Layout */}
      {layout === "6-grid" ? (
        <div className="grid grid-cols-2 gap-2 py-1 relative z-10">
          {displayPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => !isModal && setAdjustingPhoto(photo)}
              className={`relative aspect-4/3 rounded-xl overflow-hidden bg-[#241C20] border-2 border-white shadow-xs ${
                !isModal ? "cursor-pointer hover:ring-2 hover:ring-[#F45F7D]/50 transition-all" : ""
              }`}
              title={!isModal ? "Click to adjust framing or retake" : undefined}
            >
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <div
                  className="w-full h-full relative transition-transform duration-200"
                  style={{
                    transform: `scale(${photo.zoom / 100}) translate(${photo.panX}px, ${photo.panY}px)`,
                    filter: activeFilter.cssFilter,
                  }}
                >
                  <Image
                    src={photo.imageSrc}
                    alt={photo.title}
                    fill
                    sizes={isModal ? "280px" : "180px"}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="absolute bottom-1 right-1.5 px-1 py-0.2 rounded-xs text-[9px] font-mono font-bold bg-black/60 text-white">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5 py-1 relative z-10">
          {displayPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => !isModal && setAdjustingPhoto(photo)}
              className={`relative aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-2 border-white shadow-xs ${
                !isModal ? "cursor-pointer hover:ring-2 hover:ring-[#F45F7D]/50 transition-all" : ""
              }`}
              title={!isModal ? "Click to adjust framing or retake" : undefined}
            >
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <div
                  className="w-full h-full relative transition-transform duration-200"
                  style={{
                    transform: `scale(${photo.zoom / 100}) translate(${photo.panX}px, ${photo.panY}px)`,
                    filter: activeFilter.cssFilter,
                  }}
                >
                  <Image
                    src={photo.imageSrc}
                    alt={photo.title}
                    fill
                    sizes={isModal ? "400px" : "280px"}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-bold bg-black/60 text-white">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer Branding & Stylized Barcode */}
      <div className="pt-3 mt-2 border-t border-current/20 text-center space-y-1">
        <div
          className={`flex items-center justify-center gap-1.5 text-xs font-bold ${activeFrame.headerTextClass}`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Miles Apart, United in Heart</span>
          <Heart className="w-3.5 h-3.5 fill-current" />
        </div>

        <div className="flex items-center justify-center gap-3 pt-1">
          <div
            className="flex items-center gap-[2px] h-3.5 opacity-70"
            aria-hidden="true"
          >
            <span className="w-[1px] h-full bg-current" />
            <span className="w-[2px] h-full bg-current" />
            <span className="w-[1px] h-full bg-current" />
            <span className="w-[3px] h-full bg-current" />
            <span className="w-[1px] h-full bg-current" />
            <span className="w-[2px] h-full bg-current" />
            <span className="w-[1px] h-full bg-current" />
            <span className="w-[3px] h-full bg-current" />
          </div>
          <span
            className={`text-[9px] font-mono tracking-widest ${activeFrame.footerTextClass}`}
          >
            ROOM-{roomCode} · #HARU-FILM
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-[#292326] py-4 sm:py-6 px-3 sm:px-6 selection:bg-[#FFE0E8] selection:text-[#C93E5C]">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* =================================================================
            1. COMPACT SESSION HEADER
            ================================================================= */}
        <header className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE0E8] text-[#C93E5C] border border-[#F45F7D]/20">
                <Sparkles className="w-3 h-3 text-[#F45F7D]" />
                Photo Editor
              </span>
              <span className="text-xs text-[#968B90]">·</span>
              <span className="text-xs font-semibold text-[#70676B]">
                With {partnerName}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#292326] tracking-tight">
              Two Hearts Photo Strip Editor 💕
            </h1>
          </div>

          {/* Session badges & Back Button */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/room/preview"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#70676B] hover:text-[#F45F7D] bg-[#FFF9F7] hover:bg-[#FFF0F3] border border-[#EEDFE4] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FFF9F7] hover:bg-[#FFF0F3] border border-[#EEDFE4] text-[#292326] transition-colors"
              title="Click to copy room code"
            >
              <span className="text-[10px] text-[#F45F7D] font-sans font-semibold">
                ROOM:
              </span>
              <span>{roomCode}</span>
              {copiedCode ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-[#968B90]" />
              )}
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold bg-[#DDF3E8] text-[#2E6B4F]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Ready</span>
            </span>
          </div>
        </header>

        {/* =================================================================
            2. BALANCED TWO-COLUMN EDITOR LAYOUT
            ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===============================================================
              LEFT COLUMN: SINGLE PRIMARY PHOTO STRIP PREVIEW
              =============================================================== */}
          <section
            aria-label="Primary Photo Strip Preview"
            className="lg:col-span-5 w-full flex flex-col items-center lg:sticky lg:top-4 space-y-3"
          >
            <div className="w-full max-w-[320px] flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#70676B] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#F45F7D]" />
                <span>Primary Preview</span>
              </span>

              <button
                type="button"
                onClick={() => setIsExpandModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F45F7D] hover:text-[#C93E5C] transition-colors bg-[#FFF0F3] hover:bg-[#FFE0E8] px-2 py-0.5 rounded-full border border-[#F45F7D]/20"
                title="Open larger preview"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Expand</span>
              </button>
            </div>

            {/* The single live strip preview */}
            {renderPhotoStripContent(false)}

            {/* Preview caption note */}
            <p className="text-[11px] text-[#968B90] text-center">
              Click any photo in the strip or list below to adjust zoom &amp; pan
            </p>
          </section>

          {/* ===============================================================
              RIGHT COLUMN: COMPACT EDITING CONTROLS
              =============================================================== */}
          <section
            aria-label="Editing Controls"
            className="lg:col-span-7 space-y-4"
          >
            {/* 1. PHOTO LAYOUT SELECTOR */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-extrabold text-[#292326] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F45F7D]" />
                  <span>Photo Layout</span>
                </h2>
                <span className="text-[11px] font-mono text-[#70676B]">
                  {activeSlotCount} Photos
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "3-cut" as LayoutMode,
                    title: "3 Photos",
                    desc: "Vertical",
                  },
                  {
                    id: "4-cut" as LayoutMode,
                    title: "4 Photos",
                    desc: "Classic Life4Cut",
                  },
                  {
                    id: "6-grid" as LayoutMode,
                    title: "6 Photos",
                    desc: "2×3 Grid",
                  },
                ].map((item) => {
                  const isSelected = layout === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setLayout(item.id);
                        showToast(`Switched to ${item.title}`);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-[#FFF0F3] border-[#F45F7D] ring-2 ring-[#F45F7D]/20 shadow-2xs"
                          : "bg-[#FFF9F7] border-[#EEDFE4] hover:bg-[#FFF0F3]/50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-xs font-bold text-[#292326]">
                          {item.title}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-[#F45F7D]" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#70676B] mt-0.5">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. FRAME PAPER COLOR */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-extrabold text-[#292326] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#F45F7D]" />
                  <span>Frame Paper Color</span>
                </h2>
                <span className="text-[11px] font-semibold text-[#F45F7D]">
                  {activeFrame.name}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {FRAME_COLORS.map((colorOpt) => {
                  const isSelected = frameColor === colorOpt.id;
                  return (
                    <button
                      key={colorOpt.id}
                      type="button"
                      onClick={() => setFrameColor(colorOpt.id)}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? "bg-[#FFF0F3] border-[#F45F7D] ring-2 ring-[#F45F7D]/20 shadow-2xs"
                          : "bg-[#FFF9F7] border-[#EEDFE4] hover:bg-[#FFF0F3]/40"
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full border border-gray-300 shadow-2xs flex items-center justify-center"
                        style={{ backgroundColor: colorOpt.swatchHex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              colorOpt.id === "noir"
                                ? "text-white"
                                : "text-[#F45F7D]"
                            }`}
                          />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-[#292326] truncate w-full">
                        {colorOpt.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. PHOTO FILTERS */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-extrabold text-[#292326] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#F45F7D]" />
                  <span>Photo Filters</span>
                </h2>
                <span className="text-[11px] font-semibold text-[#F45F7D]">
                  {activeFilter.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PHOTO_FILTERS.map((filt) => {
                  const isSelected = activeFilterId === filt.id;
                  return (
                    <button
                      key={filt.id}
                      type="button"
                      onClick={() => {
                        setActiveFilterId(filt.id);
                        showToast(`Applied filter: ${filt.name}`);
                      }}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#FFF0F3] border-[#F45F7D] ring-2 ring-[#F45F7D]/20 shadow-2xs"
                          : "bg-[#FFF9F7] border-[#EEDFE4] hover:bg-[#FFF0F3]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#292326]">
                          {filt.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-[#F45F7D]" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#70676B] mt-0.5 truncate">
                        {filt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. DECORATIVE STICKERS */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-extrabold text-[#292326] flex items-center gap-2">
                  <Sticker className="w-4 h-4 text-[#F45F7D]" />
                  <span>Decorative Stickers</span>
                </h2>
                <span className="text-[11px] font-mono text-[#70676B]">
                  {appliedStickers.length} of {STICKER_OPTIONS.length} active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STICKER_OPTIONS.map((stk) => {
                  const isApplied = appliedStickers.includes(stk.id);
                  return (
                    <button
                      key={stk.id}
                      type="button"
                      onClick={() => handleToggleSticker(stk.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isApplied
                          ? "bg-[#FFE0E8] border-[#F45F7D] text-[#C93E5C] font-bold shadow-2xs"
                          : "bg-[#FFF9F7] border-[#EEDFE4] text-[#70676B] hover:bg-[#FFF0F3]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{stk.emoji}</span>
                        <span className="text-xs">{stk.name}</span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                          isApplied
                            ? "bg-[#F45F7D] text-white"
                            : "bg-[#EEDFE4] text-[#70676B]"
                        }`}
                      >
                        {isApplied ? "On" : "Add"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. INDIVIDUAL PHOTO MANAGEMENT & FRAMING */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EEDFE4] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-extrabold text-[#292326] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#F45F7D]" />
                  <span>Photo Management &amp; Order</span>
                </h2>
                <span className="text-[11px] text-[#70676B]">
                  Adjust or reorder
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-2.5 rounded-xl bg-[#FFF9F7] border border-[#EEDFE4] flex items-center gap-2.5 hover:border-[#F45F7D]/40 transition-colors"
                  >
                    {/* Thumbnail with filter */}
                    <div
                      onClick={() => setAdjustingPhoto(photo)}
                      className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/10 shrink-0 cursor-pointer border border-white shadow-2xs"
                      title="Adjust framing"
                    >
                      <Image
                        src={photo.imageSrc}
                        alt={photo.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                        style={{ filter: activeFilter.cssFilter }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#968B90]">
                        <span>#{String(idx + 1).padStart(2, "0")} SHOT</span>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePhoto(idx, idx - 1)}
                            className="p-1 rounded hover:bg-white text-[#70676B] hover:text-[#F45F7D] disabled:opacity-20 disabled:pointer-events-none"
                            title="Move left/up"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === displayPhotos.length - 1}
                            onClick={() => handleMovePhoto(idx, idx + 1)}
                            className="p-1 rounded hover:bg-white text-[#70676B] hover:text-[#F45F7D] disabled:opacity-20 disabled:pointer-events-none"
                            title="Move right/down"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-[#292326] truncate">
                        {photo.title}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <button
                          type="button"
                          onClick={() => setAdjustingPhoto(photo)}
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold text-[#F45F7D] bg-white border border-[#F45F7D]/30 hover:bg-[#FFF0F3] transition-colors"
                        >
                          Adjust
                        </button>
                        <button
                          type="button"
                          onClick={() => setRetakeTargetId(photo.id)}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#70676B] bg-white border border-[#EEDFE4] hover:bg-[#FFF0F3] transition-colors"
                        >
                          Retake
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* =================================================================
            3. UNIFIED ACTION AREA (Beneath Main Editor - NO DUPLICATES)
            ================================================================= */}
        <section
          aria-label="Download and Sharing Actions"
          className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-[#EEDFE4] shadow-xs space-y-3"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Primary Coral Download Button */}
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadPhotoStrip}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full font-black text-sm text-white bg-[#F45F7D] hover:bg-[#E94E70] active:bg-[#C93E5C] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading
                  ? "Rendering Photo Strip..."
                  : "Download Photo Strip 🎁"}
              </span>
            </button>

            {/* Share Memory Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#F45F7D] bg-[#FFF0F3] hover:bg-[#FFE0E8] border border-[#F45F7D]/30 transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Memory 💕</span>
            </button>

            {/* Retake a Photo */}
            <button
              type="button"
              onClick={() => setRetakeTargetId(displayPhotos[0]?.id || "slot-1")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#70676B] hover:text-[#292326] bg-[#FFF9F7] hover:bg-[#FFF0F3] border border-[#EEDFE4] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-4 h-4 text-[#F45F7D]" />
              <span>Retake a Photo</span>
            </button>
          </div>

          {/* Secondary Utilities Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EEDFE4]/60 text-xs text-[#70676B]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRedoModalOpen(true)}
                className="hover:text-[#F45F7D] transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3 text-[#F45F7D]" />
                <span>Reset Customizations</span>
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => router.push("/create")}
                className="hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3 h-3 text-emerald-600" />
                <span>Start New Room</span>
              </button>
            </div>

            <div className="text-[11px] text-[#968B90]">
              Output: miles-apart-photo-strip.png
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          MODAL: EXPAND PREVIEW MODAL
          ===================================================================== */}
      {isExpandModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="expand-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsExpandModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 border border-[#EEDFE4] shadow-xl my-auto space-y-4 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EEDFE4]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3
                  id="expand-modal-title"
                  className="text-base font-extrabold text-[#292326]"
                >
                  Full Photo Strip Preview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExpandModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FFF9F7] flex items-center justify-center text-[#70676B] hover:text-[#F45F7D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-res rendered strip in modal */}
            <div className="py-2 flex justify-center">
              {renderPhotoStripContent(true)}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EEDFE4]">
              <button
                type="button"
                onClick={() => setIsExpandModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#70676B] hover:bg-[#FFF9F7]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpandModalOpen(false);
                  handleDownloadPhotoStrip();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#F45F7D] hover:bg-[#E94E70] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: SHARE MEMORY & QR CODE MODAL
          ===================================================================== */}
      {isShareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[#EEDFE4] shadow-xl my-auto text-center space-y-4"
          >
            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF9F7] border border-[#EEDFE4] flex items-center justify-center text-[#70676B] hover:text-[#F45F7D] transition-colors"
              aria-label="Close share modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFE0E8] text-[#C93E5C]">
              <Heart className="w-3 h-3 fill-[#F45F7D]" />
              <span>TWO HEARTS SHARE ♡</span>
            </div>

            <div>
              <h3
                id="share-modal-title"
                className="text-lg sm:text-xl font-black text-[#292326]"
              >
                Share Your Memory 💕
              </h3>
              <p className="text-xs text-[#70676B] mt-0.5">
                Share this photo booth memory with your favorite person.
              </p>
            </div>

            {/* QR Code in Center */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="p-3 bg-white rounded-2xl border-2 border-[#EEDFE4] shadow-xs inline-block">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Two Hearts Share QR Code"
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-[#FFF9F7] text-xs text-[#968B90]">
                    Generating QR...
                  </div>
                )}
              </div>
              <span className="text-[11px] font-mono text-[#968B90] mt-1.5">
                Scan with phone camera to open strip
              </span>
            </div>

            {/* Share link input */}
            <div className="flex items-center rounded-xl bg-[#FFF9F7] border border-[#EEDFE4] p-1.5 text-xs text-left">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent px-2 text-[#70676B] font-mono text-[11px] outline-none"
              />
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-3 py-1 rounded-lg font-bold text-xs bg-white text-[#F45F7D] border border-[#EEDFE4] hover:bg-[#FFF0F3] transition-colors shrink-0"
              >
                {copiedShareLink ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Modal actions */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleNativeShare}
                className="py-2.5 px-4 rounded-full text-xs font-bold text-[#F45F7D] bg-[#FFF0F3] hover:bg-[#FFE0E8] border border-[#F45F7D]/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsShareModalOpen(false);
                  handleDownloadPhotoStrip();
                }}
                className="py-2.5 px-4 rounded-full text-xs font-bold text-white bg-[#F45F7D] hover:bg-[#E94E70] transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: PHOTO ADJUSTMENT / FRAMING MODAL
          ===================================================================== */}
      {adjustingPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setAdjustingPhoto(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 border border-[#EEDFE4] shadow-xl my-auto space-y-4 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EEDFE4]">
              <div>
                <h3 className="text-base font-extrabold text-[#292326]">
                  Adjust Framing · #{adjustingPhoto.slotNumber}
                </h3>
                <p className="text-xs text-[#70676B]">{adjustingPhoto.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setAdjustingPhoto(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F7] flex items-center justify-center text-[#70676B] hover:text-[#F45F7D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] border-4 border-white shadow-md">
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                  <div
                    className="w-full h-full relative"
                    style={{
                      transform: `scale(${adjustZoom / 100}) translate(${adjustPanX}px, ${adjustPanY}px)`,
                      filter: activeFilter.cssFilter,
                    }}
                  >
                    <Image
                      src={adjustingPhoto.imageSrc}
                      alt={adjustingPhoto.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Framing guides */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#968B90] mt-1.5">
                Scale: {adjustZoom}% · Pan X: {adjustPanX}px · Pan Y: {adjustPanY}px
              </span>
            </div>

            <div className="space-y-3 bg-[#FFF9F7] p-3.5 rounded-2xl border border-[#EEDFE4]">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#292326]">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5 text-[#F45F7D]" />
                    <span>Zoom Scale</span>
                  </span>
                  <span className="font-mono text-[#F45F7D]">{adjustZoom}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustZoom((prev) => Math.max(100, prev - 10))}
                    className="w-7 h-7 rounded-lg bg-white border border-[#EEDFE4] text-xs font-bold"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    step="5"
                    value={adjustZoom}
                    onChange={(e) => setAdjustZoom(Number(e.target.value))}
                    className="w-full accent-[#F45F7D] h-1.5 rounded-lg bg-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setAdjustZoom((prev) => Math.min(200, prev + 10))}
                    className="w-7 h-7 rounded-lg bg-white border border-[#EEDFE4] text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#292326]">
                  <span className="flex items-center gap-1">
                    <Move className="w-3.5 h-3.5 text-[#F45F7D]" />
                    <span>Horizontal Position</span>
                  </span>
                  <span className="font-mono text-[#F45F7D]">{adjustPanX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="2"
                  value={adjustPanX}
                  onChange={(e) => setAdjustPanX(Number(e.target.value))}
                  className="w-full accent-[#F45F7D] h-1.5 rounded-lg bg-gray-200"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#292326]">
                  <span className="flex items-center gap-1">
                    <Move className="w-3.5 h-3.5 text-[#F45F7D] rotate-90" />
                    <span>Vertical Position</span>
                  </span>
                  <span className="font-mono text-[#F45F7D]">{adjustPanY}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="2"
                  value={adjustPanY}
                  onChange={(e) => setAdjustPanY(Number(e.target.value))}
                  className="w-full accent-[#F45F7D] h-1.5 rounded-lg bg-gray-200"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAdjustZoom(100);
                    setAdjustPanX(0);
                    setAdjustPanY(0);
                  }}
                  className="text-xs text-[#70676B] hover:text-[#F45F7D] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Framing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRetakeTargetId(adjustingPhoto.id)}
                  className="text-xs text-[#F45F7D] font-bold hover:underline"
                >
                  Swap Photo Image →
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EEDFE4]">
              <button
                type="button"
                onClick={() => setAdjustingPhoto(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#70676B] hover:bg-[#FFF9F7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAdjustments}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#F45F7D] hover:bg-[#E94E70]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: RETAKE / SWAP IMAGE MODAL
          ===================================================================== */}
      {retakeTargetId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setRetakeTargetId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 border border-[#EEDFE4] shadow-xl my-auto space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EEDFE4]">
              <h3 className="text-base font-extrabold text-[#292326]">
                Swap Photo for Slot
              </h3>
              <button
                type="button"
                onClick={() => setRetakeTargetId(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F7] flex items-center justify-center text-[#70676B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#70676B]">
              Select an available photo from your project booth gallery:
            </p>

            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_PROJECT_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => handleReplaceImage(retakeTargetId, img.src)}
                  className="p-2.5 rounded-xl bg-[#FFF9F7] hover:bg-[#FFF0F3] border border-[#EEDFE4] hover:border-[#F45F7D] flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/10 shrink-0 border border-white">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#292326]">
                      {img.label}
                    </p>
                    <span className="text-[10px] text-[#968B90]">
                      Click to apply to slot
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setRetakeTargetId(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#70676B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: REDO ALL / RESET CONFIRMATION MODAL
          ===================================================================== */}
      {isRedoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsRedoModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl p-5 border border-[#EEDFE4] shadow-xl my-auto text-center space-y-3"
          >
            <h3 className="text-base font-extrabold text-[#292326]">
              Reset all customizations?
            </h3>
            <p className="text-xs text-[#70676B]">
              This will reset the layout, frame color, filters, stickers, and framing to default values.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsRedoModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#70676B] bg-[#FFF9F7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRedoAll}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-rose-600 hover:bg-rose-700"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FLOATING NOTIFICATION TOAST
          ===================================================================== */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#292326]/95 text-white text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Sparkles className="w-4 h-4 text-[#F45F7D] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
