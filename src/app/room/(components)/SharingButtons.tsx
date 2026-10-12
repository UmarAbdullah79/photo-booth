"use client";

import React, { useState } from "react";
import { Copy, Link2, Share2, QrCode, Check } from "lucide-react";

interface SharingButtonsProps {
  code: string;
  invitationUrl: string;
  onOpenQRCode: () => void;
  onNotify?: (msg: string) => void;
}

export const SharingButtons: React.FC<SharingButtonsProps> = ({
  code,
  invitationUrl,
  onOpenQRCode,
  onNotify,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shared, setShared] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  };

  const handleCopyCode = async () => {
    await copyToClipboard(code);
    setCopiedCode(true);
    onNotify?.("Room code copied to clipboard! ♡");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = async () => {
    await copyToClipboard(invitationUrl);
    setCopiedLink(true);
    onNotify?.("Invitation link copied to clipboard! ♡");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Join my Two Hearts Photo Booth",
          text: `Join my photo booth room using code ${code} 💕`,
          url: invitationUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // Fallback: copy link and notify
    await copyToClipboard(invitationUrl);
    setShared(true);
    onNotify?.("Link copied! Share it with your photo partner 💕");
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* 1. Copy Code Button */}
        <button
          type="button"
          onClick={handleCopyCode}
          className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
            copiedCode
              ? "bg-pastel-green border-emerald-300 text-emerald-800"
              : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
          }`}
          aria-label="Copy Room Code"
        >
          {copiedCode ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-coral shrink-0" />
              <span>Copy Code</span>
            </>
          )}
        </button>

        {/* 2. Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
            copiedLink
              ? "bg-pastel-green border-emerald-300 text-emerald-800"
              : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
          }`}
          aria-label="Copy Invitation Link"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 text-coral shrink-0" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* 3. Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className={`h-11 sm:h-12 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 ${
            shared
              ? "bg-pastel-pink border-coral/40 text-coral-dark"
              : "bg-white border-border-primary text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral"
          }`}
          aria-label="Share Room Invitation"
        >
          <Share2 className="w-4 h-4 text-coral shrink-0" />
          <span>{shared ? "Shared! ♡" : "Share"}</span>
        </button>

        {/* 4. QR Code Button */}
        <button
          type="button"
          onClick={onOpenQRCode}
          className="h-11 sm:h-12 px-3 rounded-2xl border border-border-primary bg-white text-primary-text hover:border-coral/50 hover:bg-blush-primary/50 hover:text-coral text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 select-none shadow-2xs hover:shadow-xs active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
          aria-label="View QR Code"
        >
          <QrCode className="w-4 h-4 text-coral shrink-0" />
          <span>QR Code</span>
        </button>
      </div>
    </div>
  );
};
