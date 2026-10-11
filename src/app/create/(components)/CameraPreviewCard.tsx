"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Camera,
  CameraOff,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Heart,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export type CameraStatus =
  | "idle" // not requested yet
  | "requesting" // loading permissions
  | "active" // streaming video
  | "denied" // user or browser blocked
  | "unavailable" // no camera hardware or track failed
  | "error"; // other stream error

export type LightingMode = "auto" | "warm";

export interface CameraPreviewCardProps {
  nickname: string;
  lighting: LightingMode;
  onLightingChange: (mode: LightingMode) => void;
  micEnabled: boolean;
  onMicToggle: (enabled: boolean) => void;
  onCameraStateChange?: (isActive: boolean) => void;
}

export const CameraPreviewCard: React.FC<CameraPreviewCardProps> = ({
  nickname,
  lighting,
  onLightingChange,
  micEnabled,
  onMicToggle,
  onCameraStateChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  // Stop all active tracks and reset stream
  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore cleanup errors
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Notify parent of camera readiness
  useEffect(() => {
    onCameraStateChange?.(cameraStatus === "active");
  }, [cameraStatus, onCameraStateChange]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, [stopTracks]);

  // Enumerate devices once permission has been granted
  const refreshDevices = useCallback(async () => {
    if (!navigator?.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      setAvailableDevices(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch {
      // ignore enumeration errors
    }
  }, [selectedDeviceId]);

  // Request or start camera stream
  const startCamera = useCallback(
    async (deviceId?: string) => {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setCameraStatus("unavailable");
        setErrorMessage("Camera access is not supported by your current browser.");
        return;
      }

      setCameraStatus("requesting");
      setErrorMessage("");

      // Stop previous tracks before creating a new stream
      stopTracks();

      try {
        const constraints: MediaStreamConstraints = {
          video: deviceId
            ? { deviceId: { exact: deviceId }, width: { ideal: 1280 }, height: { ideal: 720 } }
            : { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: micEnabled,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        // Verify that video track is genuinely live
        const videoTracks = stream.getVideoTracks();
        if (videoTracks.length === 0 || videoTracks[0].readyState !== "live") {
          throw new Error("No live video track returned.");
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch {
            // Autoplay could throw if not user initiated, but controls are explicit
          }
        }

        setCameraStatus("active");
        refreshDevices();
      } catch (err: unknown) {
        stopTracks();
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            setCameraStatus("denied");
            setErrorMessage(
              "Camera permission was denied. Please allow camera access in your browser's site settings or address bar icon to preview."
            );
            return;
          }
          if (
            err.name === "NotFoundError" ||
            err.name === "DevicesNotFoundError" ||
            err.name === "OverconstrainedError"
          ) {
            setCameraStatus("unavailable");
            setErrorMessage("No functional camera was found on your device.");
            return;
          }
        }

        setCameraStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while starting your camera."
        );
      }
    },
    [micEnabled, stopTracks, refreshDevices]
  );

  // Toggle camera on / off intentionally
  const handleToggleCamera = () => {
    if (cameraStatus === "active") {
      stopTracks();
      setCameraStatus("idle");
    } else {
      startCamera(selectedDeviceId || undefined);
    }
  };

  // Switch camera when device is selected from dropdown
  const handleDeviceChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (cameraStatus === "active") {
      startCamera(deviceId);
    }
  };

  // Synchronize microphone track state with micEnabled prop
  useEffect(() => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = micEnabled;
        });
      } else if (micEnabled && cameraStatus === "active") {
        // If mic was off and audio tracks were not acquired yet, try to add audio
        navigator.mediaDevices
          ?.getUserMedia({ audio: true })
          .then((audioStream) => {
            if (streamRef.current) {
              audioStream.getAudioTracks().forEach((track) => {
                streamRef.current?.addTrack(track);
              });
            }
          })
          .catch(() => {
            onMicToggle(false);
          });
      }
    }
  }, [micEnabled, cameraStatus, onMicToggle]);

  const displayName = nickname.trim() || "Host (You)";

  return (
    <div className="w-full">
      {/* Scrapbook Polaroid-style Outer Card */}
      <div className="relative bg-white rounded-3xl p-3.5 sm:p-5 sm:pb-6 border border-border-primary shadow-[0_12px_36px_rgba(41,35,38,0.08)] transition-all duration-300">
        {/* Subtle scrapbook corner tape decoration */}
        <div
          className="absolute -top-3 left-8 w-16 h-6 bg-pastel-pink/70 border border-coral/20 rounded-xs -rotate-3 pointer-events-none shadow-xs z-20 backdrop-blur-xs flex items-center justify-center text-[10px] text-coral font-medium"
          aria-hidden="true"
        >
          host cam
        </div>

        {/* Camera Viewfinder Viewport */}
        <div className="relative w-full aspect-4/3 xs:aspect-[4/3] max-h-95 sm:max-h-105 rounded-2xl overflow-hidden bg-[#241C20] flex items-center justify-center shadow-inner">
          {/* Real Live Video Element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover -scale-x-100 transition-all duration-300 ${
              cameraStatus === "active" ? "opacity-100" : "opacity-0 absolute pointer-events-none"
            } ${
              lighting === "warm"
                ? "brightness-105 contrast-95 saturate-125 sepia-[0.22]"
                : "brightness-100 contrast-100 saturate-100"
            }`}
          />

          {/* Warm romantic color grading overlay when Warm filter is active */}
          {cameraStatus === "active" && lighting === "warm" && (
            <div
              className="absolute inset-0 bg-linear-to-tr from-rose-500/10 via-amber-300/10 to-pink-400/15 pointer-events-none mix-blend-soft-light"
              aria-hidden="true"
            />
          )}

          {/* OVERLAY: Top Status Pill (Live / Standby) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
            {cameraStatus === "active" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-primary-text backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE PREVIEW
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-secondary-text backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                STANDBY
              </span>
            )}
          </div>

          {/* OVERLAY: Top Right Lighting Tag */}
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-black/50 text-white/95 backdrop-blur-md border border-white/10">
              {lighting === "warm" ? (
                <>
                  <Heart className="w-3 h-3 fill-rose-300 text-rose-300 inline" />
                  <span>Warm Romantic</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-amber-200 inline" />
                  <span>Natural Auto</span>
                </>
              )}
            </span>
          </div>

          {/* OVERLAY: Bottom Left Host Label Sticker */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-pastel-pink text-coral-dark shadow-sm -rotate-1 border border-coral/30 backdrop-blur-xs">
              <span className="max-w-35 sm:max-w-45 truncate">{displayName}</span>
              <span className="text-[10px] opacity-80">(Host) ♡</span>
            </div>
          </div>

          {/* OVERLAY: Bottom Right Brand Watermark */}
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none text-right">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/75 font-mono drop-shadow-sm">
              Miles Apart · CAM 01
            </span>
          </div>

          {/* STATE: Idle Placeholder (Camera Not Active Yet) */}
          {cameraStatus === "idle" && (
            <div className="absolute bg-[url(/images/create-hero-1.png)] bg-center bg-cover backdrop-blur-2xl inset-0 flex flex-col items-center justify-center text-center bg-linear-to-b from-[#FFF5F7] via-[#FFF8F9] to-[#FCEFF3] z-5">
              <div className="bg-black/50 absolute w-full h-full -z-10"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-border-primary shadow-sm flex items-center justify-center mb-3 text-coral relative">
                <Camera className="w-7 h-7" />
                <span className="absolute -top-1.5 -right-1.5 text-xs text-coral">♥</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Camera is in Standby
              </h3>
              <p className="text-xs text-white/90 max-w-xs mb-4 leading-relaxed">
                Click below to preview your camera before stepping into the room.
              </p>
              <button
                type="button"
                onClick={handleToggleCamera}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-coral text-white hover:bg-coral-hover active:bg-coral-dark shadow-xs hover:shadow-md hover:shadow-coral/20 transition-all duration-200"
              >
                <Camera className="w-4 h-4" />
                Turn On Camera
              </button>
              <span className="text-[10px] text-white/90 mt-2.5">
                (Camera access is optional to create a room)
              </span>
            </div>
          )}

          {/* STATE: Requesting / Loading State */}
          {cameraStatus === "requesting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-primary-text/90 text-white z-5 backdrop-blur-xs">
              <RefreshCw className="w-8 h-8 text-coral animate-spin mb-3" />
              <p className="text-sm font-semibold text-white">Connecting camera...</p>
              <p className="text-xs text-white/70 max-w-xs mt-1">
                Please tap &quot;Allow&quot; if prompted by your browser.
              </p>
            </div>
          )}

          {/* STATE: Permission Denied */}
          {cameraStatus === "denied" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-linear-to-b from-[#FFF5F7] to-[#FCEEF2] z-5">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-2.5">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-primary-text mb-1">
                Camera Permission Blocked
              </h3>
              <p className="text-xs text-secondary-text max-w-xs mb-3.5 leading-relaxed">
                {errorMessage || "Camera was blocked. Click the lock or camera icon in your browser URL bar to allow access."}
              </p>
              <button
                type="button"
                onClick={() => startCamera(selectedDeviceId || undefined)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-coral text-coral hover:bg-blush-primary transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </button>
            </div>
          )}

          {/* STATE: Unavailable / Error */}
          {(cameraStatus === "unavailable" || cameraStatus === "error") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-[#FFF8F9] z-5">
              <CameraOff className="w-10 h-10 text-muted-text mb-2" />
              <h3 className="text-sm font-bold text-primary-text mb-1">
                Camera Not Available
              </h3>
              <p className="text-xs text-secondary-text max-w-xs mb-3.5 leading-relaxed">
                {errorMessage || "Unable to start video feed. You can still create and enter your room!"}
              </p>
              <button
                type="button"
                onClick={() => startCamera(selectedDeviceId || undefined)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-coral text-white hover:bg-coral-hover transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Camera
              </button>
            </div>
          )}
        </div>

        {/* Polaroid Scrapbook Caption Bar */}
        <div className="mt-3 sm:mt-3.5 px-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-secondary-text font-medium text-[11px] sm:text-xs">
            <span className="text-coral">♡</span>
            <span>Miles Apart · Step inside &amp; smile together</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-muted-text font-mono hidden xs:inline-block">
            #ROOM-PREVIEW
          </div>
        </div>
      </div>

      {/* QUICK INLINE CONTROLS (Camera toggle & Quick settings right under preview) */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 px-1">
        {/* Toggle On/Off Button */}
        <button
          type="button"
          onClick={handleToggleCamera}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            cameraStatus === "active"
              ? "bg-white text-secondary-text border-border-primary hover:border-coral/50 hover:text-coral"
              : "bg-coral text-white border-coral hover:bg-coral-hover"
          }`}
          aria-label={cameraStatus === "active" ? "Turn camera off" : "Turn camera on"}
        >
          {cameraStatus === "active" ? (
            <>
              <CameraOff className="w-3.5 h-3.5 text-coral" />
              <span>Turn Off Cam</span>
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5" />
              <span>Turn On Cam</span>
            </>
          )}
        </button>

        {/* Camera Switcher Dropdown (if multiple devices) */}
        {availableDevices.length > 1 && cameraStatus === "active" && (
          <div className="relative inline-flex items-center">
            <select
              value={selectedDeviceId}
              onChange={(e) => handleDeviceChange(e.target.value)}
              className="appearance-none bg-white border border-border-primary text-secondary-text text-xs rounded-full py-1.5 pl-3 pr-7 hover:border-coral/40 focus:outline-none focus:ring-1 focus:ring-coral text-ellipsis max-w-42.5"
              aria-label="Select camera device"
            >
              {availableDevices.map((device, idx) => (
                <option key={device.deviceId || idx} value={device.deviceId}>
                  {device.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-text absolute right-2 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};
