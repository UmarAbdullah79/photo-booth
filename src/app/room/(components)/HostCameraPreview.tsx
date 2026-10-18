"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  RefreshCw,
  AlertCircle,
  Heart,
  Sparkles,
} from "lucide-react";

interface HostCameraPreviewProps {
  roomCode: string;
  hostNickname?: string;
}

type CameraState = "idle" | "requesting" | "active" | "denied" | "unavailable";

export const HostCameraPreview: React.FC<HostCameraPreviewProps> = ({
  roomCode,
  hostNickname = "You",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Stop all media tracks safely
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
  }, []);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, [stopTracks]);

  // Request camera and microphone access
  const startCamera = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setCameraState("unavailable");
      setErrorMessage("Camera access is not supported by this browser.");
      return;
    }

    setCameraState("requesting");
    setErrorMessage("");
    stopTracks();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // autoplay restriction handled
        }
      }

      setCameraState("active");
    } catch (err: unknown) {
      stopTracks();
      if (err instanceof DOMException) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setCameraState("denied");
          setErrorMessage(
            "Camera permission was blocked. Please tap allow in your browser address bar to preview your camera."
          );
          return;
        }
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          setCameraState("unavailable");
          setErrorMessage("No functional camera device was found.");
          return;
        }
      }
      setCameraState("idle");
      setErrorMessage(
        err instanceof Error ? err.message : "Unable to access camera."
      );
    }
  }, [stopTracks]);

  // Auto-request camera on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // Toggle Video Track
  const handleToggleCamera = () => {
    if (cameraState === "active") {
      stopTracks();
      setCameraState("idle");
    } else {
      startCamera();
    }
  };

  // Toggle Audio Track
  const handleToggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      const nextMicState = !micEnabled;
      audioTracks.forEach((track) => {
        track.enabled = nextMicState;
      });
      setMicEnabled(nextMicState);
    } else {
      setMicEnabled(!micEnabled);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-3.5 sm:p-5 border border-border-primary shadow-card relative">
      {/* Scrapbook corner tag */}
      <div
        className="absolute -top-3 left-6 px-2.5 py-0.5 bg-pastel-pink/90 border border-coral/25 rounded-md text-[10px] sm:text-[11px] font-bold text-coral-dark -rotate-2 shadow-2xs backdrop-blur-xs flex items-center gap-1 z-20"
        aria-hidden="true"
      >
        <Sparkles className="w-2.5 h-2.5 text-coral" />
        <span>PHOTO BOOTH VIEW</span>
      </div>

      {/* Viewfinder Frame Container */}
      <div className="relative w-full aspect-4/3 max-h-95 sm:max-h-100 rounded-2xl overflow-hidden bg-[#241C20] flex items-center justify-center shadow-inner">
        {/* Real Live Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover -scale-x-100 transition-opacity duration-300 ${
            cameraState === "active" ? "opacity-100" : "opacity-0 absolute pointer-events-none"
          }`}
        />

        {/* TOP OVERLAYS */}
        {/* Top Left: LIVE indicator or Standby */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
          {cameraState === "active" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-primary-text backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white/90 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>STANDBY</span>
            </div>
          )}
        </div>

        {/* Top Right: "Waiting for partner ♡" status */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-black/55 text-white/95 backdrop-blur-md border border-white/10">
            <Heart className="w-3 h-3 fill-rose-300 text-rose-300 animate-pulse" />
            <span>Waiting for partner ♡</span>
          </div>
        </div>

        {/* BOTTOM OVERLAYS */}
        {/* Bottom Left: "You (Host)" label */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-pastel-pink text-coral-dark shadow-xs -rotate-1 border border-coral/30 backdrop-blur-xs">
            <span>{hostNickname} (Host)</span>
            <span className="text-[10px] text-coral">♥</span>
          </div>
        </div>

        {/* Bottom Right: Room Code Stamp */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono font-bold text-white/80 drop-shadow-sm">
            ROOM · {roomCode}
          </span>
        </div>

        {/* FALLBACK STATE: Idle / Camera Off */}
        {cameraState === "idle" && (
          <div className="absolute inset-0 bg-linear-to-b from-[#2A2328] to-[#1C171A] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-2.5 text-coral">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Host Camera is Off
            </h3>
            <p className="text-xs text-white/70 max-w-xs mb-3.5">
              Click below to turn on your camera before your partner arrives.
            </p>
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-coral text-white hover:bg-coral-hover active:bg-coral-dark shadow-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Turn On Camera</span>
            </button>
          </div>
        )}

        {/* FALLBACK STATE: Requesting */}
        {cameraState === "requesting" && (
          <div className="absolute inset-0 bg-[#241C20]/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <RefreshCw className="w-7 h-7 text-coral animate-spin mb-2.5" />
            <p className="text-xs sm:text-sm font-semibold text-white">
              Starting camera...
            </p>
            <p className="text-[11px] text-white/70 mt-1">
              Tap &quot;Allow&quot; if prompted by your browser
            </p>
          </div>
        )}

        {/* FALLBACK STATE: Permission Denied */}
        {cameraState === "denied" && (
          <div className="absolute inset-0 bg-linear-to-b from-[#2E2429] to-[#1F171A] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <div className="w-11 h-11 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
              Camera Access Denied
            </h3>
            <p className="text-[11px] text-white/70 max-w-xs mb-3 leading-relaxed">
              {errorMessage || "Please enable camera permissions in your browser address bar to preview."}
            </p>
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-primary-text hover:bg-cream transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-coral" />
              <span>Retry Permission</span>
            </button>
          </div>
        )}

        {/* FALLBACK STATE: Hardware Unavailable */}
        {cameraState === "unavailable" && (
          <div className="absolute inset-0 bg-[#241C20] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <CameraOff className="w-9 h-9 text-white/50 mb-2" />
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
              Camera Not Found
            </h3>
            <p className="text-[11px] text-white/70 max-w-xs mb-3">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coral text-white hover:bg-coral-hover transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar: Camera & Mic toggles matching Stitch design */}
      <div className="mt-3.5 pt-2 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          {/* Camera Control Icon Button */}
          <button
            type="button"
            onClick={handleToggleCamera}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
              cameraState === "active"
                ? "bg-white border-border-primary text-secondary-text hover:text-coral hover:border-coral/50 shadow-2xs"
                : "bg-coral text-white border-coral hover:bg-coral-hover shadow-xs"
            }`}
            aria-label={cameraState === "active" ? "Turn off camera" : "Turn on camera"}
            title={cameraState === "active" ? "Turn Off Camera" : "Turn On Camera"}
          >
            {cameraState === "active" ? (
              <Camera className="w-4 h-4" />
            ) : (
              <CameraOff className="w-4 h-4" />
            )}
          </button>

          {/* Microphone Control Icon Button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
              micEnabled
                ? "bg-white border-border-primary text-secondary-text hover:text-coral hover:border-coral/50 shadow-2xs"
                : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 shadow-2xs"
            }`}
            aria-label={micEnabled ? "Mute microphone" : "Unmute microphone"}
            title={micEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {micEnabled ? (
              <Mic className="w-4 h-4" />
            ) : (
              <MicOff className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Camera Status Label */}
        <div className="text-right">
          <span className="text-[11px] font-medium text-secondary-text">
            {cameraState === "active" ? "Camera active" : "Camera standby"}
          </span>
          <span className="text-[11px] text-muted-text block">
            Mic: {micEnabled ? "On" : "Muted"}
          </span>
        </div>
      </div>
    </div>
  );
};
