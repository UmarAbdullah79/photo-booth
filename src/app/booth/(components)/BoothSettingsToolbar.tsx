"use client";

import React from "react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Sparkles,
  Zap,
  ChevronDown,
  Layout,
  Palette,
  Clock,
} from "lucide-react";
import { FrameTheme, FilterTheme, LayoutTheme } from "./MainBoothFrame";

interface BoothSettingsToolbarProps {
  layoutTheme: LayoutTheme;
  onChangeLayout: (layout: LayoutTheme) => void;
  frameTheme: FrameTheme;
  onChangeFrame: (frame: FrameTheme) => void;
  filterTheme: FilterTheme;
  onChangeFilter: (filter: FilterTheme) => void;
  timerDuration: number;
  onChangeTimer: (timer: number) => void;
  cameraActive: boolean;
  onToggleCamera: () => void;
  micActive: boolean;
  onToggleMic: () => void;
  onTestFlash: () => void;
}

export const BoothSettingsToolbar: React.FC<BoothSettingsToolbarProps> = ({
  layoutTheme,
  onChangeLayout,
  frameTheme,
  onChangeFrame,
  filterTheme,
  onChangeFilter,
  timerDuration,
  onChangeTimer,
  cameraActive,
  onToggleCamera,
  micActive,
  onToggleMic,
  onTestFlash,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border border-border-primary/90 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* SETTINGS DROPDOWNS GROUP */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* 1. Layout Dropdown */}
          <div className="relative inline-flex items-center">
            <Layout className="w-3.5 h-3.5 text-coral absolute left-3 pointer-events-none" />
            <select
              value={layoutTheme}
              onChange={(e) => onChangeLayout(e.target.value as LayoutTheme)}
              className="appearance-none bg-cream border border-border-primary text-xs font-semibold text-primary-text rounded-2xl pl-8 pr-7 py-2 hover:border-coral/50 focus:outline-none focus:ring-2 focus:ring-coral/30 cursor-pointer shadow-2xs"
              aria-label="Select photo booth layout"
            >
              <option value="split">Layout: Split 1:1</option>
              <option value="side-by-side">Layout: Side by Side</option>
            </select>
            <ChevronDown className="w-3 h-3 text-muted-text absolute right-2.5 pointer-events-none" />
          </div>

          {/* 2. Frame Dropdown */}
          <div className="relative inline-flex items-center">
            <Palette className="w-3.5 h-3.5 text-coral absolute left-3 pointer-events-none" />
            <select
              value={frameTheme}
              onChange={(e) => onChangeFrame(e.target.value as FrameTheme)}
              className="appearance-none bg-cream border border-border-primary text-xs font-semibold text-primary-text rounded-2xl pl-8 pr-7 py-2 hover:border-coral/50 focus:outline-none focus:ring-2 focus:ring-coral/30 cursor-pointer shadow-2xs"
              aria-label="Select photo frame style"
            >
              <option value="haru-pastel">Frame: Haru Pastel</option>
              <option value="classic-pink">Frame: Classic Pink</option>
              <option value="romantic-white">Frame: Romantic White</option>
            </select>
            <ChevronDown className="w-3 h-3 text-muted-text absolute right-2.5 pointer-events-none" />
          </div>

          {/* 3. Filter Dropdown */}
          <div className="relative inline-flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-coral absolute left-3 pointer-events-none" />
            <select
              value={filterTheme}
              onChange={(e) => onChangeFilter(e.target.value as FilterTheme)}
              className="appearance-none bg-cream border border-border-primary text-xs font-semibold text-primary-text rounded-2xl pl-8 pr-7 py-2 hover:border-coral/50 focus:outline-none focus:ring-2 focus:ring-coral/30 cursor-pointer shadow-2xs"
              aria-label="Select visual color filter"
            >
              <option value="haru-warm">Filter: Haru Warm</option>
              <option value="soft-glow">Filter: Soft Glow</option>
              <option value="natural">Filter: Natural</option>
            </select>
            <ChevronDown className="w-3 h-3 text-muted-text absolute right-2.5 pointer-events-none" />
          </div>

          {/* 4. Timer Dropdown */}
          <div className="relative inline-flex items-center">
            <Clock className="w-3.5 h-3.5 text-coral absolute left-3 pointer-events-none" />
            <select
              value={timerDuration}
              onChange={(e) => onChangeTimer(Number(e.target.value))}
              className="appearance-none bg-cream border border-border-primary text-xs font-semibold text-primary-text rounded-2xl pl-8 pr-7 py-2 hover:border-coral/50 focus:outline-none focus:ring-2 focus:ring-coral/30 cursor-pointer shadow-2xs"
              aria-label="Select shutter countdown timer"
            >
              <option value={3}>Timer: 3s</option>
              <option value={5}>Timer: 5s</option>
              <option value={10}>Timer: 10s</option>
            </select>
            <ChevronDown className="w-3 h-3 text-muted-text absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        {/* DEVICE TOGGLES & TEST FLASH BUTTONS */}
        <div className="flex items-center gap-2">
          {/* Camera Toggle Button */}
          <button
            type="button"
            onClick={onToggleCamera}
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-colors shadow-2xs ${
              cameraActive
                ? "bg-white border-border-primary text-secondary-text hover:text-coral hover:border-coral/50"
                : "bg-coral text-white border-coral hover:bg-coral-hover"
            }`}
            title={cameraActive ? "Turn Off Camera" : "Turn On Camera"}
            aria-label={cameraActive ? "Turn Off Camera" : "Turn On Camera"}
          >
            {cameraActive ? (
              <Camera className="w-4 h-4" />
            ) : (
              <CameraOff className="w-4 h-4" />
            )}
          </button>

          {/* Microphone Toggle Button */}
          <button
            type="button"
            onClick={onToggleMic}
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-colors shadow-2xs ${
              micActive
                ? "bg-white border-border-primary text-secondary-text hover:text-coral hover:border-coral/50"
                : "bg-rose-50 border-rose-200 text-rose-600"
            }`}
            title={micActive ? "Mute Microphone" : "Unmute Microphone"}
            aria-label={micActive ? "Mute Microphone" : "Unmute Microphone"}
          >
            {micActive ? (
              <Mic className="w-4 h-4 text-emerald-600" />
            ) : (
              <MicOff className="w-4 h-4 text-rose-500" />
            )}
          </button>

          {/* Test Flash Button (Section 11) */}
          <button
            type="button"
            onClick={onTestFlash}
            className="px-3 py-1.5 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            title="Test preview screen flash"
            aria-label="Test Shutter Flash"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="hidden sm:inline">Test Flash ⚡</span>
            <span className="sm:hidden">Flash ⚡</span>
          </button>
        </div>
      </div>
    </div>
  );
};
