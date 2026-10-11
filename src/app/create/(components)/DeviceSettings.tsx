"use client";

import React from "react";
import { Mic, MicOff, Sparkles, Heart } from "lucide-react";
import { LightingMode } from "./CameraPreviewCard";

export interface DeviceSettingsProps {
  micEnabled: boolean;
  onMicToggle: (enabled: boolean) => void;
  lighting: LightingMode;
  onLightingChange: (mode: LightingMode) => void;
  disabled?: boolean;
}

export const DeviceSettings: React.FC<DeviceSettingsProps> = ({
  micEnabled,
  onMicToggle,
  lighting,
  onLightingChange,
  disabled = false,
}) => {
  return (
    <div className="w-full bg-[#FFF9F7] sm:bg-white rounded-2xl p-3.5 sm:p-4 border border-border-primary/80 shadow-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* MICROPHONE CONTROL */}
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
            disabled={disabled}
            onClick={() => onMicToggle(!micEnabled)}
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

        {/* VERTICAL DIVIDER ON TABLET/DESKTOP */}
        <div className="hidden sm:block w-px h-8 bg-border-primary" aria-hidden="true" />

        {/* LIGHTING FILTER CONTROLS */}
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
            {/* Auto (Natural) button */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => onLightingChange("auto")}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                lighting === "auto"
                  ? "bg-white text-primary-text shadow-xs font-semibold"
                  : "text-secondary-text hover:text-coral"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Auto</span>
            </button>

            {/* Warm Romantic button */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => onLightingChange("warm")}
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
  );
};
