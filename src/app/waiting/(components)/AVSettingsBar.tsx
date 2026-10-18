"use client";

import React, { useState } from "react";
import {
  Settings,
  Sparkles,
  Camera,
  Mic,
  MicOff,
  Check,
  X,
  Volume2,
  Sliders,
} from "lucide-react";

interface AVSettingsBarProps {
  filterActive: boolean;
  onToggleFilter: () => void;
  cameraActive: boolean;
  onToggleCamera?: () => void;
  deviceName?: string;
}

export const AVSettingsBar: React.FC<AVSettingsBarProps> = ({
  filterActive,
  onToggleFilter,
  cameraActive,
  onToggleCamera,
  deviceName = "Default Camera",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [beautyIntensity, setBeautyIntensity] = useState(65);

  const handleRequestMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermissionGranted(true);
      setMicMuted(false);
      // clean up demo request stream
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setMicPermissionGranted(false);
    }
  };

  const handleToggleMicMute = () => {
    if (!micPermissionGranted) {
      handleRequestMic();
    } else {
      setMicMuted(!micMuted);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-border-primary shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* LEFT: Design Reference Badges & Supporting Text */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pastel-pink text-coral-dark border border-coral/20">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                Synced P2P Audio &amp; Video
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-pastel-yellow text-amber-900 border border-amber-300/80">
                <Sparkles className="w-3 h-3 text-amber-600" />
                3-2-1 FLASH READY
              </span>

              <span className="text-[10px] text-muted-text font-medium px-1">
                (Spec Reference)
              </span>
            </div>

            {/* Supporting Text */}
            <p className="text-[11px] sm:text-xs text-muted-text">
              Low latency 14ms · WebRTC direct stream · Studio beauty tone enabled
            </p>

            {/* HONEST FRONTEND STATUS LABELS */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-secondary-text font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    cameraActive ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
                  }`}
                />
                {cameraActive ? "Camera Preview Ready" : "Camera Standby"}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Waiting for Partner
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-muted-text">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                Video Connection Not Started
              </span>
            </div>
          </div>

          {/* RIGHT: Two Functional Frontend Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 pt-2 lg:pt-0 shrink-0">
            {/* Control 1: Filter: Haru Glow */}
            <button
              type="button"
              onClick={onToggleFilter}
              className={`flex-1 sm:flex-initial h-11 px-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
                filterActive
                  ? "bg-pastel-pink border-coral text-coral-dark shadow-coral/15"
                  : "bg-white border-border-primary text-secondary-text hover:text-coral hover:border-coral/50"
              }`}
              aria-label="Toggle Haru Soft Glow visual filter"
            >
              <Sparkles
                className={`w-4 h-4 ${
                  filterActive ? "text-coral fill-coral/30" : "text-amber-500"
                }`}
              />
              <span>
                Filter: {filterActive ? "Haru Glow ON" : "Natural"}
              </span>
              {filterActive && (
                <Check className="w-3.5 h-3.5 text-coral shrink-0" />
              )}
            </button>

            {/* Control 2: A/V Settings */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-2xl border border-border-primary bg-white hover:bg-blush-primary hover:border-coral/50 text-primary-text hover:text-coral text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              aria-label="Open Audio and Video Settings dialog"
            >
              <Settings className="w-4 h-4 text-coral shrink-0" />
              <span>A/V Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* A/V Settings Modal Dialog */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="av-settings-title"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-left animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
              aria-label="Close A/V Settings"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-blush-primary border border-coral/20 flex items-center justify-center text-coral">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3
                  id="av-settings-title"
                  className="text-base font-bold text-primary-text"
                >
                  Device &amp; Visual Settings
                </h3>
                <p className="text-xs text-secondary-text">
                  Configure your camera, audio, and beauty tone preview
                </p>
              </div>
            </div>

            {/* Controls List */}
            <div className="space-y-3.5 text-xs text-primary-text">
              {/* 1. Camera Stream Setting */}
              <div className="p-3.5 bg-cream rounded-2xl border border-border-soft flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-coral shrink-0" />
                  <div>
                    <p className="font-bold text-primary-text">Camera Feed</p>
                    <p className="text-[11px] text-muted-text truncate max-w-45" title={deviceName}>
                      {deviceName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleCamera}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    cameraActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white text-secondary-text border-border-primary hover:text-coral"
                  }`}
                >
                  {cameraActive ? "Active" : "Disabled"}
                </button>
              </div>

              {/* 2. Microphone Setting */}
              <div className="p-3.5 bg-cream rounded-2xl border border-border-soft flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {micMuted ? (
                    <MicOff className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <Mic className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-primary-text">Microphone</p>
                    <p className="text-[11px] text-muted-text">
                      {micPermissionGranted
                        ? micMuted
                          ? "Muted"
                          : "Input Active"
                        : "Tap to enable mic access"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleMicMute}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    micPermissionGranted && !micMuted
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white text-secondary-text border-border-primary hover:text-coral"
                  }`}
                >
                  {!micPermissionGranted
                    ? "Enable Mic"
                    : micMuted
                    ? "Unmute"
                    : "Mute"}
                </button>
              </div>

              {/* 3. Filter Beauty Tone Slider */}
              <div className="p-3.5 bg-cream rounded-2xl border border-border-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    <span className="font-bold">Haru Soft Glow Tone</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-coral">
                    {beautyIntensity}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={beautyIntensity}
                  onChange={(e) => setBeautyIntensity(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                  aria-label="Haru Soft Glow beauty intensity slider"
                />

                <div className="flex justify-between text-[10px] text-muted-text">
                  <span>Subtle Natural</span>
                  <span>Warm Rosy Glow</span>
                </div>
              </div>

              {/* 4. Audio Chime Test */}
              <div className="p-3.5 bg-cream rounded-2xl border border-border-soft flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-coral" />
                  <div>
                    <p className="font-bold">Partner Arrival Chime</p>
                    <p className="text-[11px] text-muted-text">
                      Plays soft tone when partner joins room
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700">
                  Ready
                </span>
              </div>
            </div>

            {/* Done Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-5 w-full h-11 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
