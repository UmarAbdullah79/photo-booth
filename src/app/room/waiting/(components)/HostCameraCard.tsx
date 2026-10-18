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

interface HostCameraCardProps {
  filterActive: boolean;
  onCameraStateChange?: (isActive: boolean) => void;
  onDeviceNameChange?: (name: string) => void;
}

export const HostCameraCard: React.FC<HostCameraCardProps> = ({
  filterActive,
  onCameraStateChange,
  onDeviceNameChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraState, setCameraState] = useState<
    "idle" | "requesting" | "active" | "denied" | "unavailable"
  >("idle");
  const [micActive, setMicActive] = useState<boolean>(true);
  const [deviceName, setDeviceName] = useState<string>("FaceTime HD Camera");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Stop media tracks cleanly
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
      setErrorMessage("Camera access is not supported by your current browser.");
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

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack?.label) {
        setDeviceName(videoTrack.label);
        onDeviceNameChange?.(videoTrack.label);
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // handled
        }
      }

      setCameraState("active");
      onCameraStateChange?.(true);
    } catch (err: unknown) {
      stopTracks();
      onCameraStateChange?.(false);
      if (err instanceof DOMException) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setCameraState("denied");
          setErrorMessage(
            "Camera permission was blocked. Please tap allow in your browser address bar to preview."
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
        err instanceof Error ? err.message : "Unable to start camera preview."
      );
    }
  }, [stopTracks, onCameraStateChange, onDeviceNameChange]);

  // Auto-request on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // Toggle Mic Audio Track
  const handleToggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      const nextState = !micActive;
      audioTracks.forEach((track) => {
        track.enabled = nextState;
      });
      setMicActive(nextState);
    } else {
      setMicActive(!micActive);
    }
  };

  // Toggle Camera Video Track
  const handleToggleCamera = () => {
    if (cameraState === "active") {
      stopTracks();
      setCameraState("idle");
      onCameraStateChange?.(false);
    } else {
      startCamera();
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card relative flex flex-col justify-between">
      {/* Top Header Information Row */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {/* Label: PERSON 1 (YOU) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-pink text-coral-dark text-[11px] font-bold tracking-wide">
            <Heart className="w-3 h-3 fill-coral text-coral" />
            <span>PERSON 1 (YOU)</span>
          </div>

          {/* LIVE indicator (Only when camera is actually active) */}
          {cameraState === "active" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>STANDBY</span>
            </div>
          )}
        </div>

        {/* Device Label & Mic Status */}
        <div className="flex items-center justify-between text-[11px] text-secondary-text px-0.5">
          <span className="truncate max-w-45 sm:max-w-50 font-medium" title={deviceName}>
            {deviceName}
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            {micActive ? (
              <>
                <Mic className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Mic Active</span>
              </>
            ) : (
              <>
                <MicOff className="w-3 h-3 text-rose-500" />
                <span className="text-rose-600">Mic Muted</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Camera Viewfinder Viewport */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#241C20] flex items-center justify-center shadow-inner">
        {/* Real Live Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover -scale-x-100 transition-all duration-300 ${
            cameraState === "active"
              ? "opacity-100"
              : "opacity-0 absolute pointer-events-none"
          } ${
            filterActive
              ? "brightness-105 contrast-95 saturate-120 sepia-[0.12]"
              : "brightness-100 contrast-100 saturate-100"
          }`}
        />

        {/* Soft Romantic Bloom Filter Overlay */}
        {cameraState === "active" && filterActive && (
          <div
            className="absolute inset-0 bg-linear-to-tr from-rose-400/10 via-amber-200/10 to-pink-300/15 pointer-events-none mix-blend-soft-light"
            aria-hidden="true"
          />
        )}

        {/* OVERLAYS: Top Right Filter Label */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-black/60 text-white/95 backdrop-blur-md border border-white/10">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>{filterActive ? "Haru Soft Glow · 65%" : "Natural Filter"}</span>
          </span>
        </div>

        {/* OVERLAYS: Bottom Left Host Label */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-pastel-pink/95 text-coral-dark shadow-xs border border-coral/30 backdrop-blur-xs -rotate-1">
            <Heart className="w-3 h-3 fill-coral text-coral" />
            <span>You (Host) ♡ Camera Ready</span>
          </div>
        </div>

        {/* STATE: Idle Placeholder */}
        {cameraState === "idle" && (
          <div className="absolute inset-0 bg-linear-to-b from-[#2A2328] to-[#1C171A] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-2 text-coral">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Camera Standby</h4>
            <p className="text-xs text-white/70 max-w-xs mb-3">
              Click below to preview your camera before stepping into the booth.
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

        {/* STATE: Requesting */}
        {cameraState === "requesting" && (
          <div className="absolute inset-0 bg-[#241C20]/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <RefreshCw className="w-7 h-7 text-coral animate-spin mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-white">
              Starting camera...
            </p>
            <p className="text-[11px] text-white/70 mt-1">
              Tap &quot;Allow&quot; if prompted by your browser
            </p>
          </div>
        )}

        {/* STATE: Permission Denied */}
        {cameraState === "denied" && (
          <div className="absolute inset-0 bg-linear-to-b from-[#2E2429] to-[#1F171A] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
              Camera Access Denied
            </h4>
            <p className="text-[11px] text-white/70 max-w-xs mb-3 leading-relaxed">
              {errorMessage || "Camera was blocked. Click the lock icon in your URL bar to allow access."}
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

        {/* STATE: Unavailable */}
        {cameraState === "unavailable" && (
          <div className="absolute inset-0 bg-[#241C20] flex flex-col items-center justify-center text-center p-4 z-5 text-white">
            <CameraOff className="w-9 h-9 text-white/50 mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
              Camera Not Found
            </h4>
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

      {/* Quick bottom toggle controls */}
      <div className="mt-3 pt-2 border-t border-border-soft flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleCamera}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
              cameraState === "active"
                ? "bg-white text-secondary-text border-border-primary hover:text-coral"
                : "bg-coral text-white border-coral hover:bg-coral-hover"
            }`}
          >
            {cameraState === "active" ? (
              <>
                <CameraOff className="w-3 h-3 text-coral" />
                <span>Cam Off</span>
              </>
            ) : (
              <>
                <Camera className="w-3 h-3" />
                <span>Cam On</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleMic}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
              micActive
                ? "bg-white text-secondary-text border-border-primary hover:text-coral"
                : "bg-rose-50 text-rose-600 border-rose-200"
            }`}
          >
            {micActive ? (
              <>
                <Mic className="w-3 h-3 text-emerald-600" />
                <span>Mute</span>
              </>
            ) : (
              <>
                <MicOff className="w-3 h-3 text-rose-500" />
                <span>Unmute</span>
              </>
            )}
          </button>
        </div>

        <span className="text-[11px] text-muted-text font-mono">
          #HOST-CAM
        </span>
      </div>
    </div>
  );
};
