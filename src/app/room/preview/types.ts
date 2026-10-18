export type SessionMode = 4 | 6;

export type FrameTheme =
  | "haru-pastel"
  | "classic-pink"
  | "romantic-white"
  | "midnight-seoul"
  | "lavender-dream";

export type FilterType =
  | "normal"
  | "warm-haru"
  | "rosy-blush"
  | "vintage-film"
  | "bw-chic"
  | "soft-glow";

export interface PhotoAdjustments {
  zoom: number; // 100 to 200
  panX: number; // -50 to 50
  panY: number; // -50 to 50
  rotation: number; // -15 to 15
  filter: FilterType;
  brightness: number; // 80 to 120
  contrast: number; // 80 to 120
}

export interface PhotoSlot {
  id: string;
  slotNumber: number; // 1 to 4 or 6
  title: string;
  imageSrc: string;
  frameSlotLabel: string;
  resolution: string;
  rating: number;
  syncScore: string;
  adjustments: PhotoAdjustments;
}

export const INITIAL_ADJUSTMENTS: PhotoAdjustments = {
  zoom: 100,
  panX: 0,
  panY: 0,
  rotation: 0,
  filter: "normal",
  brightness: 100,
  contrast: 100,
};

export const POSE_TITLES_4 = [
  "Kimchi Smile ✌️",
  "Cheek Heart 💖",
  "Wink & Peace ✨",
  "Together Forever 🧸",
];

export const POSE_TITLES_6 = [
  "Kimchi Smile ✌️",
  "Cheek Heart 💖",
  "Wink & Peace ✨",
  "Together Forever 🧸",
  "Matching Hearts 💕",
  "Cute Surprise 🌷",
];

export const AVAILABLE_GALLERY_IMAGES = [
  {
    id: "img-hero-1",
    src: "/images/hero-1.png",
    name: "Two Hearts Candid (Cam 01)",
    tag: "Romantic Moment",
  },
  {
    id: "img-hero-2",
    src: "/images/hero-2.png",
    name: "Playful Smile (Cam 02)",
    tag: "Sweet Expression",
  },
  {
    id: "img-create-hero",
    src: "/images/create-hero-1.png",
    name: "Korean Booth Duo (Studio)",
    tag: "Classic Pose",
  },
];

export const DEFAULT_PHOTOS_4: PhotoSlot[] = [
  {
    id: "slot-1",
    slotNumber: 1,
    title: "Kimchi Smile ✌️",
    imageSrc: "/images/hero-1.png",
    frameSlotLabel: "Slot 01 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
  {
    id: "slot-2",
    slotNumber: 2,
    title: "Cheek Heart 💖",
    imageSrc: "/images/hero-2.png",
    frameSlotLabel: "Slot 02 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
  {
    id: "slot-3",
    slotNumber: 3,
    title: "Wink & Peace ✨",
    imageSrc: "/images/create-hero-1.png",
    frameSlotLabel: "Slot 03 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
  {
    id: "slot-4",
    slotNumber: 4,
    title: "Together Forever 🧸",
    imageSrc: "/images/hero-1.png",
    frameSlotLabel: "Slot 04 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
];

export const BONUS_SLOTS_2: PhotoSlot[] = [
  {
    id: "slot-5",
    slotNumber: 5,
    title: "Matching Hearts 💕",
    imageSrc: "/images/hero-2.png",
    frameSlotLabel: "Slot 05 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
  {
    id: "slot-6",
    slotNumber: 6,
    title: "Cute Surprise 🌷",
    imageSrc: "/images/create-hero-1.png",
    frameSlotLabel: "Slot 06 · Cam 01 + 02",
    resolution: "1920 × 1440 HD",
    rating: 5,
    syncScore: "100% Synced",
    adjustments: { ...INITIAL_ADJUSTMENTS },
  },
];

export const FILTER_STYLES: Record<
  FilterType,
  { name: string; filterCss: string; previewBadge: string }
> = {
  normal: {
    name: "Natural Clean",
    filterCss: "none",
    previewBadge: "Original",
  },
  "warm-haru": {
    name: "Warm Haru",
    filterCss: "sepia(0.18) saturate(1.15) brightness(1.04) hue-rotate(-5deg)",
    previewBadge: "Warm Glow",
  },
  "rosy-blush": {
    name: "Rosy Blush",
    filterCss:
      "contrast(1.05) brightness(1.03) saturate(1.22) hue-rotate(345deg)",
    previewBadge: "Soft Pink",
  },
  "vintage-film": {
    name: "Vintage Film",
    filterCss: "sepia(0.35) contrast(1.1) brightness(0.96) saturate(0.9)",
    previewBadge: "90s Film",
  },
  "bw-chic": {
    name: "B&W Seoul",
    filterCss: "grayscale(1) contrast(1.2) brightness(1.02)",
    previewBadge: "Monochrome",
  },
  "soft-glow": {
    name: "Dreamy Glow",
    filterCss: "brightness(1.08) contrast(0.95) saturate(1.1)",
    previewBadge: "Pastel Dream",
  },
};
