"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Badge } from "@/app/components/ui/Badge";
import { Container } from "@/app/components/ui/Container";
import {
  CameraPreviewCard,
  LightingMode,
} from "@/app/create/(components)/CameraPreviewCard";
import { NicknameForm } from "@/app/create/(components)/NicknameForm";
import { DeviceSettings } from "@/app/create/(components)/DeviceSettings";
import { CameraTipsAccordion } from "@/app/create/(components)/CameraTipsAccordion";
import { createRoom, RoomCreationResult } from "@/lib/roomService";
import {
  ArrowRight,
  Heart,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
} from "lucide-react";

export default function CreateRoomClient() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  // Form & Camera state
  const [nickname, setNickname] = useState("");
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  const [lighting, setLighting] = useState<LightingMode>("auto");
  const [micEnabled, setMicEnabled] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Submission & service state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<RoomCreationResult | null>(
    null,
  );

  // Nickname validation logic
  const validateNickname = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) {
      return "Please enter a nickname before creating a room ♡";
    }
    if (trimmed.length > 20) {
      return "Nickname must be 20 characters or fewer";
    }
    return "";
  };

  const handleNicknameChange = (val: string) => {
    setNickname(val);
    if (nicknameTouched) {
      setNicknameError(validateNickname(val));
    }
  };

  const handleNicknameBlur = () => {
    setNicknameTouched(true);
    setNicknameError(validateNickname(nickname));
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

      tl.fromTo(
        ".anim-badge",
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
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
          ".anim-card",
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(
          ".anim-form-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".anim-tips",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Submit Handler
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    setNicknameTouched(true);
    const err = validateNickname(nickname);
    if (err) {
      setNicknameError(err);
      return;
    }

    setNicknameError("");
    setIsSubmitting(true);
    setServiceStatus(null);

    try {
      const result = await createRoom({
        hostNickname: nickname.trim(),
        cameraReady: isCameraActive,
        micReady: micEnabled,
        lightingPreference: lighting,
      });

      setServiceStatus(result);

      if (result.status === "success") {
        // Save session data for lobby
        if (typeof window !== "undefined") {
          sessionStorage.setItem("two_hearts_host_nickname", nickname.trim());
          sessionStorage.setItem("two_hearts_room_id", result.data.roomId);
          sessionStorage.setItem("two_hearts_room_code", result.data.roomCode);
        }
        // Navigate to room lobby if route exists
        router.push(`/room/${result.data.roomId}`);
      }
    } catch (err: unknown) {
      setServiceStatus({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to create room.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = nickname.trim().length > 0 && nickname.length <= 20;

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        {/* Soft Ambient Background Glows */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-85 sm:w-150 h-85 sm:h-112.5 bg-pastel-pink/35 rounded-full blur-3xl pointer-events-none -z-10"
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

        <Container size="narrow" className="max-w-xl sm:max-w-2xl px-4 sm:px-6">
          {/* 2. Badge: ROOM SETUP · STEP 1 */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="anim-badge mb-3">
              <Badge
                variant="pink"
                uppercase
                className="px-3.5 py-1 text-[11px] sm:text-xs font-bold tracking-widest shadow-2xs"
              >
                <span className="text-coral mr-1">♥</span>
                ROOM SETUP · STEP 1
              </Badge>
            </div>

            {/* 3. Heading */}
            <h1 className="anim-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-primary-text leading-[1.12] mb-2 sm:mb-3">
              Create Your Room{" "}
              <span className="text-coral inline-block">♡</span>
            </h1>

            {/* 4. Subtitle */}
            <p className="anim-subtitle text-xs sm:text-sm md:text-base text-secondary-text max-w-md mx-auto leading-relaxed">
              Get your camera ready before inviting your favorite person.
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleCreateRoom} className="space-y-5 sm:space-y-6">
            {/* 5. Photo-Booth-Style Camera Preview Card */}
            <div className="anim-card">
              <CameraPreviewCard
                nickname={nickname}
                lighting={lighting}
                onLightingChange={setLighting}
                micEnabled={micEnabled}
                onMicToggle={setMicEnabled}
                onCameraStateChange={setIsCameraActive}
              />
            </div>

            {/* 6. Nickname Form */}
            <div className="anim-form-item bg-white rounded-3xl p-4 sm:p-5 border border-border-primary/80 shadow-card">
              <NicknameForm
                value={nickname}
                onChange={handleNicknameChange}
                error={nicknameError}
                touched={nicknameTouched}
                onBlur={handleNicknameBlur}
                disabled={isSubmitting}
              />
            </div>

            {/* 7. Device Settings (Camera, Mic, Lighting) */}
            <div className="anim-form-item">
              <DeviceSettings
                micEnabled={micEnabled}
                onMicToggle={setMicEnabled}
                lighting={lighting}
                onLightingChange={setLighting}
                disabled={isSubmitting}
              />
            </div>

            {/* SERVICE STATUS NOTIFICATION BANNER (Graceful Service Boundary) */}
            {serviceStatus && (
              <div
                className={`anim-form-item rounded-2xl p-4 sm:p-5 border text-left transition-all ${
                  serviceStatus.status === "success"
                    ? "bg-pastel-green/40 border-pastel-green text-pastel-green-text"
                    : serviceStatus.status === "backend_unavailable"
                      ? "bg-[#FFF4E8] border-amber-200 text-amber-900"
                      : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  {serviceStatus.status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : serviceStatus.status === "backend_unavailable" ? (
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}

                  <div className="text-xs sm:text-sm">
                    <p className="font-bold mb-1">
                      {serviceStatus.status === "success"
                        ? "Room Created Successfully! ♡"
                        : serviceStatus.status === "backend_unavailable"
                          ? "Room Setup Ready (Backend Service Pending)"
                          : "Unable to Create Room"}
                    </p>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {serviceStatus.status === "success"
                        ? `Your 6-digit room code is ${serviceStatus.data.roomCode}. Redirecting to your booth lobby...`
                        : serviceStatus.status === "backend_unavailable"
                          ? serviceStatus.details || serviceStatus.message
                          : serviceStatus.message}
                    </p>

                    {serviceStatus.status === "backend_unavailable" && (
                      <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-amber-800">
                        <span>
                          Host: <strong>{nickname.trim()}</strong>
                        </span>
                        <span>·</span>
                        <span>
                          Camera: {isCameraActive ? "Ready (Live)" : "Standby"}
                        </span>
                        <span>·</span>
                        <span>
                          Filter:{" "}
                          {lighting === "warm" ? "Warm Romantic" : "Auto"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 8. Prominent Full-Width Coral-Pink Button */}
            <div className="anim-form-item pt-1">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full h-13 sm:h-14 rounded-full font-bold text-sm sm:text-base text-white bg-coral hover:bg-coral-hover active:bg-coral-dark disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg hover:shadow-coral/25 active:translate-y-0 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 select-none focus:outline-none focus-visible:ring-3 focus-visible:ring-coral/40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Preparing Your Booth...</span>
                  </>
                ) : (
                  <>
                    <span>Create Room</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-muted-text mt-2.5 flex items-center justify-center gap-1.5 select-none">
                <span>Free private room</span>
                <span>·</span>
                <span>No account required</span>
                <span>·</span>
                <Heart className="w-3 h-3 text-coral fill-coral/30" />
              </p>
            </div>

            {/* 9. Expandable "Booth Camera Tips & Permissions" Section */}
            <div className="anim-tips pt-2">
              <CameraTipsAccordion />
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
}
