"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Camera,
  Check,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";
import {
  PhotoSlot,
  AVAILABLE_GALLERY_IMAGES,
} from "../types";

interface RetakePhotoModalProps {
  isOpen: boolean;
  photo: PhotoSlot | null;
  allPhotos: PhotoSlot[];
  onClose: () => void;
  onSelectPhotoToRetake: (slotId: string) => void;
  onReplaceImage: (slotId: string, newImageSrc: string) => void;
}

export const RetakePhotoModal: React.FC<RetakePhotoModalProps> = ({
  isOpen,
  photo,
  allPhotos,
  onClose,
  onSelectPhotoToRetake,
  onReplaceImage,
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>("");
  const [isCameraTab, setIsCameraTab] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (photo) {
      setSelectedSlotId(photo.id);
      setSelectedImageSrc(photo.imageSrc);
    } else if (allPhotos.length > 0) {
      setSelectedSlotId(allPhotos[0].id);
      setSelectedImageSrc(allPhotos[0].imageSrc);
    }
  }, [photo, allPhotos]);

  const stopCamera = useCallback(() => {
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
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setCameraError("Camera capture not supported in this browser.");
      return;
    }
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setCameraError(
        "Camera access was declined. You can select an existing pose below."
      );
      setCameraActive(false);
    }
  };

  const handleCaptureLive = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      const snapshot = canvas.toDataURL("image/jpeg", 0.9);
      setSelectedImageSrc(snapshot);
      stopCamera();
      setIsCameraTab(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleConfirm = () => {
    if (selectedSlotId && selectedImageSrc) {
      onReplaceImage(selectedSlotId, selectedImageSrc);
    }
    handleClose();
  };

  if (!isOpen) return null;

  const currentSlot = allPhotos.find((p) => p.id === selectedSlotId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="retake-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-7 border border-border-primary shadow-elevated my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border-soft shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-coral">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="retake-modal-title"
                className="text-base sm:text-lg font-extrabold text-primary-text"
              >
                Retake &amp; Replace Photo
              </h2>
              <p className="text-xs text-secondary-text">
                Choose which slot to retake and select a fresh photo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
            aria-label="Close retake modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary-text flex items-center justify-between">
              <span>Target Strip Slot:</span>
              <span className="text-coral text-[11px] font-mono">
                {currentSlot ? `Editing Slot #${currentSlot.slotNumber}` : ""}
              </span>
            </label>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {allPhotos.map((item, idx) => {
                const isSelected = item.id === selectedSlotId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedSlotId(item.id);
                      setSelectedImageSrc(item.imageSrc);
                    }}
                    className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? "bg-pastel-pink border-coral ring-2 ring-coral/40 shadow-2xs"
                        : "bg-cream border-border-soft hover:bg-blush-soft opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-white">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold font-mono">
                      #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex rounded-xl bg-cream p-1 border border-border-soft">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                setIsCameraTab(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                !isCameraTab
                  ? "bg-white text-coral shadow-2xs"
                  : "text-secondary-text hover:text-primary-text"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Available Project Photos (3)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsCameraTab(true);
                startCamera();
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isCameraTab
                  ? "bg-white text-coral shadow-2xs"
                  : "text-secondary-text hover:text-primary-text"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Camera Snap</span>
            </button>
          </div>

          {!isCameraTab ? (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-secondary-text">
                Pick an existing photo asset to replace slot #{currentSlot?.slotNumber}:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AVAILABLE_GALLERY_IMAGES.map((img) => {
                  const isChosen = selectedImageSrc === img.src;

                  return (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImageSrc(img.src)}
                      className={`group relative rounded-2xl p-2 border cursor-pointer transition-all ${
                        isChosen
                          ? "bg-pastel-pink/70 border-coral ring-2 ring-coral/50 shadow-sm"
                          : "bg-white border-border-soft hover:border-coral/40 hover:bg-cream"
                      }`}
                    >
                      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-black/10 mb-2 border border-white">
                        <Image
                          src={img.src}
                          alt={img.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover"
                        />
                        {isChosen && (
                          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-coral text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="px-1 text-left">
                        <p className="text-xs font-bold text-primary-text truncate">
                          {img.name}
                        </p>
                        <span className="text-[10px] text-muted-text">
                          {img.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden bg-black border-2 border-border-primary shadow-inner flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform -scale-x-100 ${
                    cameraActive ? "block" : "hidden"
                  }`}
                />

                {!cameraActive && (
                  <div className="p-4 text-center space-y-2 text-white">
                    <Camera className="w-8 h-8 text-coral mx-auto animate-pulse" />
                    <p className="text-xs font-semibold">
                      {cameraError || "Initializing camera stream..."}
                    </p>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-3 py-1.5 rounded-full text-xs font-bold bg-coral text-white"
                    >
                      Retry Camera
                    </button>
                  </div>
                )}
              </div>

              {cameraActive && (
                <button
                  type="button"
                  onClick={handleCaptureLive}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Photo for Slot #{currentSlot?.slotNumber}</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-border-soft flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-secondary-text hover:text-primary-text bg-white border border-border-soft hover:bg-cream transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedSlotId || !selectedImageSrc}
            className="px-6 py-2 rounded-full text-xs font-bold text-white bg-coral hover:bg-coral-hover active:bg-coral-dark shadow-sm hover:shadow-md disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Replacement</span>
          </button>
        </div>
      </div>
    </div>
  );
};
