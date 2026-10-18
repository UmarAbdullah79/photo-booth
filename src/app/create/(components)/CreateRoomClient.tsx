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
import { createRoom, RoomCreationResult } from "@/lib/roomService";
import {
  ArrowRight,
  Heart,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  Mic,
  MicOff,
  ChevronDown,
  ShieldCheck,
  Video,
  Smartphone,
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
  const [tipsOpen, setTipsOpen] = useState(false);

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
        if (typeof window !== "undefined") {
          sessionStorage.setItem("two_hearts_host_nickname", nickname.trim());
          sessionStorage.setItem("two_hearts_room_id", result.data.roomId);
          sessionStorage.setItem("two_hearts_room_code", result.data.roomCode);
        }
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
  const trimmedNickname = nickname.trim();
  const currentLength = nickname.length;

  return (
    <div
      ref={pageRef}
      className="flex-1 flex flex-col bg-cream text-primary-text selection:bg-pastel-pink selection:text-coral-dark"
    >
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
          {/* Badge: ROOM SETUP · STEP 1 */}
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

            {/* Heading */}
            <h1 className="anim-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-primary-text leading-[1.12] mb-2 sm:mb-3">
              Create Your Room{" "}
              <span className="text-coral inline-block">♡</span>
            </h1>

            {/* Subtitle */}
            <p className="anim-subtitle text-xs sm:text-sm md:text-base text-secondary-text max-w-md mx-auto leading-relaxed">
              Get your camera ready before inviting your favorite person.
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleCreateRoom} className="space-y-5 sm:space-y-6">
            {/* Camera Preview Card */}
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

            {/* Nickname Input Card */}
            <div className="anim-form-item bg-white rounded-3xl p-4 sm:p-5 border border-border-primary/80 shadow-card">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="nickname-input"
                    className="text-xs sm:text-sm font-bold text-primary-text flex items-center gap-1.5"
                  >
                    <span>What&apos;s your nickname?</span>
                    <Heart className="w-3.5 h-3.5 text-coral fill-coral/30" />
                  </label>
                  <span
                    className={`text-[11px] font-mono transition-colors ${
                      currentLength >= 20
                        ? "text-coral font-bold"
                        : currentLength > 15
                        ? "text-amber-600 font-medium"
                        : "text-muted-text"
                    }`}
                    aria-live="polite"
                  >
                    {currentLength}/20
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="nickname-input"
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      if (e.target.value.length <= 20) {
                        handleNicknameChange(e.target.value);
                      }
                    }}
                    onBlur={handleNicknameBlur}
                    disabled={isSubmitting}
                    maxLength={20}
                    placeholder="e.g. Min-ji, Tyler, Sunwoo"
                    autoComplete="nickname"
                    className={`w-full h-12 sm:h-13 px-4.5 text-sm sm:text-base rounded-2xl bg-white border transition-all duration-200 outline-none placeholder:text-subtle-text text-primary-text shadow-xs ${
                      nicknameError && nicknameTouched
                        ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-200/50"
                        : trimmedNickname.length > 0
                        ? "border-coral/50 focus:border-coral focus:ring-3 focus:ring-coral/15"
                        : "border-border-primary focus:border-coral focus:ring-3 focus:ring-coral/15"
                    } disabled:bg-gray-100 disabled:opacity-60`}
                    aria-invalid={Boolean(nicknameError && nicknameTouched)}
                    aria-describedby="nickname-feedback"
                  />

                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {trimmedNickname.length > 0 ? (
                      <span className="text-coral text-xs sm:text-sm animate-pulse">♥</span>
                    ) : (
                      <span className="text-muted-text/50 text-xs">✦</span>
                    )}
                  </div>
                </div>

                <div id="nickname-feedback" className="mt-1.5 min-h-[20px] px-1 text-xs">
                  {nicknameError && nicknameTouched ? (
                    <p className="flex items-center gap-1.5 text-rose-500 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{nicknameError}</span>
                    </p>
                  ) : trimmedNickname.length > 0 ? (
                    <p className="flex items-center gap-1.5 text-emerald-600 font-medium animate-fadeIn">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Looks lovely, {trimmedNickname}! Ready to take photos ♡</span>
                    </p>
                  ) : (
                    <p className="text-muted-text text-[11px]">
                      Your partner or friends will see this name on your photo strips.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Device Settings (Mic, Lighting Filter) */}
            <div className="anim-form-item bg-[#FFF9F7] sm:bg-white rounded-2xl p-3.5 sm:p-4 border border-border-primary/80 shadow-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <div className="text-left">
                    <span className="block text-xs font-bold text-primary-text">
                      Audio / Mic
                    </span>
                    <span className="block text-[11px] text-muted-text">
                      {micEnabled ? "Enabled in booth" : "Muted by default"}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                      micEnabled
                        ? "bg-pastel-green/70 text-pastel-green-text border-pastel-green hover:bg-pastel-green"
                        : "bg-white text-secondary-text border-border-primary hover:border-coral/40 hover:text-coral"
                    }`}
                    aria-pressed={micEnabled}
                    aria-label={micEnabled ? "Disable microphone" : "Enable microphone"}
                  >
                    {micEnabled ? (
                      <>
                        <Mic className="w-4 h-4 text-emerald-600" />
                        <span>Mic On</span>
                      </>
                    ) : (
                      <>
                        <MicOff className="w-4 h-4 text-muted-text" />
                        <span>Muted</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="hidden sm:block w-px h-8 bg-border-primary" aria-hidden="true" />

                <div className="flex items-center justify-between sm:justify-end gap-2.5">
                  <div className="text-left sm:text-right">
                    <span className="block text-xs font-bold text-primary-text">
                      Booth Filter
                    </span>
                    <span className="block text-[11px] text-muted-text">
                      Visual preview effect
                    </span>
                  </div>

                  <div
                    className="inline-flex rounded-xl p-1 bg-[#FFF0F3] border border-border-primary/60 shrink-0"
                    role="group"
                    aria-label="Lighting effect options"
                  >
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setLighting("auto")}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                        lighting === "auto"
                          ? "bg-white text-primary-text shadow-xs font-semibold"
                          : "text-secondary-text hover:text-coral"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Auto</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setLighting("warm")}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                        lighting === "warm"
                          ? "bg-coral text-white shadow-xs font-semibold"
                          : "text-secondary-text hover:text-coral"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Warm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Status Notification Banner */}
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
                          Host: <strong>{trimmedNickname}</strong>
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

            {/* Create Room Button */}
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

            {/* Accordion: Booth Camera Tips */}
            <div className="anim-tips pt-2">
              <div className="w-full bg-white/80 rounded-2xl border border-border-primary/80 overflow-hidden shadow-xs transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setTipsOpen(!tipsOpen)}
                  aria-expanded={tipsOpen}
                  className="w-full min-h-[50px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-blush-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-pastel-pink text-coral flex items-center justify-center shrink-0 text-xs">
                      💡
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-primary-text">
                      Booth Camera Tips &amp; Permissions
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                    <span className="text-[11px] text-muted-text hidden xs:inline">
                      {tipsOpen ? "Hide tips" : "Need help?"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-coral transition-transform duration-300 ${
                        tipsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {tipsOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-border-soft space-y-4 text-xs sm:text-[13px] text-secondary-text animate-in fade-in-50 duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-rose-50 text-coral flex items-center justify-center shrink-0 mt-0.5">
                        <Video className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-text mb-0.5">
                          How to Enable Camera &amp; Mic Access
                        </p>
                        <p className="text-secondary-text leading-relaxed">
                          When prompted by your browser, tap <strong className="text-primary-text">&ldquo;Allow&rdquo;</strong>. If accidentally denied, tap the Lock icon in your browser URL bar, enable permissions, and tap &ldquo;Try Again&rdquo;.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-pastel-purple/50 text-pastel-purple-text flex items-center justify-center shrink-0 mt-0.5">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-text mb-0.5">
                          Best Mobile Experience (iOS &amp; Android)
                        </p>
                        <p className="text-secondary-text leading-relaxed">
                          On iPhone, open this page in <strong className="text-primary-text">Safari</strong> or Chrome. On Android, use <strong className="text-primary-text">Chrome</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-pastel-yellow text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-text mb-0.5">
                          Perfect Lighting for Photo Strips
                        </p>
                        <p className="text-secondary-text leading-relaxed">
                          Face toward a soft window or lamp for bright, romantic couple photos. Toggle the <strong className="text-primary-text">Warm</strong> filter above for a blush glow!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-pastel-green text-pastel-green-text flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-text mb-0.5">
                          100% Private &amp; Encrypted
                        </p>
                        <p className="text-secondary-text leading-relaxed">
                          Your live stream is peer-to-peer and visible only to the person with your private 6-digit room code.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
}
