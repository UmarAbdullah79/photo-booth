"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, QrCode as QrCodeIcon, Heart } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitationUrl: string;
  code: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  invitationUrl,
  code,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !invitationUrl) return;

    QRCode.toDataURL(invitationUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: "#292326",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating QR code:", err));
  }, [isOpen, invitationUrl]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(invitationUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-center animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close QR Code Dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral hover:bg-blush-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-blush-primary border border-coral/20 flex items-center justify-center text-coral mb-2.5">
            <QrCodeIcon className="w-5 h-5" />
          </div>
          <h2
            id="qr-modal-title"
            className="text-lg font-bold text-primary-text flex items-center gap-1.5"
          >
            <span>Scan to Join Booth</span>
            <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
          </h2>
          <p className="text-xs text-secondary-text mt-1 max-w-xs">
            Open camera on another phone or tablet to join this booth room.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-4 p-3 bg-linear-to-b from-[#FFFDFD] to-[#FFF5F7] rounded-2xl border border-border-primary/80 inline-block shadow-inner">
          {qrDataUrl ? (
            <Image
              src={qrDataUrl}
              alt={`QR Code for room code ${code}`}
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-xl object-contain bg-white p-2 border border-border-soft"
            />
          ) : (
            <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-xs text-muted-text">
              Generating QR Code...
            </div>
          )}
        </div>

        {/* Code Stamp */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/70 border border-coral/25 text-xs font-mono font-bold text-coral-dark">
            <span>CODE:</span>
            <span className="tracking-widest text-sm">{code}</span>
          </div>
        </div>

        {/* Copy Link Button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full h-11 rounded-full font-bold text-xs sm:text-sm text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Link Copied! ♡</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Invitation Link</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-muted-text">
            Temporary frontend demonstration link
          </p>
        </div>
      </div>
    </div>
  );
};
