"use client";

import React, { useState } from "react";
import { Heart, Sparkles, AlertCircle } from "lucide-react";

export interface NicknameFormProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
  disabled?: boolean;
}

export const NicknameForm: React.FC<NicknameFormProps> = ({
  value,
  onChange,
  error,
  touched,
  onBlur,
  disabled = false,
}) => {
  const maxLength = 20;
  const trimmed = value.trim();
  const currentLength = value.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal.length <= maxLength) {
      onChange(rawVal);
    }
  };

  return (
    <div className="w-full">
      {/* Label & Character Counter */}
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
            currentLength >= maxLength
              ? "text-coral font-bold"
              : currentLength > 15
              ? "text-amber-600 font-medium"
              : "text-muted-text"
          }`}
          aria-live="polite"
        >
          {currentLength}/{maxLength}
        </span>
      </div>

      {/* Input Field Container */}
      <div className="relative">
        <input
          id="nickname-input"
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          placeholder="e.g. Min-ji, Tyler, Sunwoo"
          autoComplete="nickname"
          className={`w-full h-12 sm:h-13 px-4.5 text-sm sm:text-base rounded-2xl bg-white border transition-all duration-200 outline-none placeholder:text-subtle-text text-primary-text shadow-xs ${
            error && touched
              ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-200/50"
              : trimmed.length > 0
              ? "border-coral/50 focus:border-coral focus:ring-3 focus:ring-coral/15"
              : "border-border-primary focus:border-coral focus:ring-3 focus:ring-coral/15"
          } disabled:bg-gray-100 disabled:opacity-60`}
          aria-invalid={Boolean(error && touched)}
          aria-describedby="nickname-feedback"
        />

        {/* Decorative trailing sparkle or heart */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          {trimmed.length > 0 ? (
            <span className="text-coral text-xs sm:text-sm animate-pulse">♥</span>
          ) : (
            <span className="text-muted-text/50 text-xs">✦</span>
          )}
        </div>
      </div>

      {/* Inline Feedback Messages */}
      <div id="nickname-feedback" className="mt-1.5 min-h-[20px] px-1 text-xs">
        {error && touched ? (
          <p className="flex items-center gap-1.5 text-rose-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : trimmed.length > 0 ? (
          <p className="flex items-center gap-1.5 text-emerald-600 font-medium animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Looks lovely, {trimmed}! Ready to take photos ♡</span>
          </p>
        ) : (
          <p className="text-muted-text text-[11px]">
            Your partner or friends will see this name on your photo strips.
          </p>
        )}
      </div>
    </div>
  );
};
