import gsap from "gsap";

/**
 * Premium, subtle GSAP animation helpers for Two Hearts Photo Booth
 * Designed for smooth, soft motion with proper context cleanup.
 */

// Default ease curve recommended in specs
export const EASE_SMOOTH = "power2.out";
export const EASE_EXPO = "expo.out";
export const EASE_ELEGANT = "power3.out";

export interface FadeUpOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

export const animateFadeUp = (
  targets: gsap.TweenTarget,
  options: FadeUpOptions = {}
) => {
  if (typeof window === "undefined") return;

  const {
    y = 30,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    ease = EASE_SMOOTH,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
    }
  );
};

export const animateStaggerReveal = (
  elements: gsap.TweenTarget,
  options: FadeUpOptions = {}
) => {
  return animateFadeUp(elements, {
    stagger: options.stagger ?? 0.12,
    duration: options.duration ?? 0.8,
    ease: options.ease ?? EASE_ELEGANT,
    ...options,
  });
};

export const animateFloat = (
  target: gsap.TweenTarget,
  amplitude: number = 8,
  duration: number = 3.5
) => {
  if (typeof window === "undefined") return;

  return gsap.to(target, {
    y: `-=${amplitude}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.easeInOut",
  });
};

export const animateImageReveal = (
  target: gsap.TweenTarget,
  delay: number = 0
) => {
  if (typeof window === "undefined") return;

  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.96, rotate: -2 },
    {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.85,
      delay,
      ease: EASE_EXPO,
    }
  );
};
