"use client";

import React from "react";
import { LogOut, X, AlertTriangle } from "lucide-react";

interface LeaveRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLeave: () => void;
}

export const LeaveRoomModal: React.FC<LeaveRoomModalProps> = ({
  isOpen,
  onClose,
  onConfirmLeave,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 border border-border-primary shadow-elevated text-center animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream border border-border-soft flex items-center justify-center text-secondary-text hover:text-coral transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Heading */}
        <h3
          id="leave-modal-title"
          className="text-base sm:text-lg font-bold text-primary-text mb-1.5"
        >
          Leave Waiting Room?
        </h3>

        {/* Description */}
        <p className="text-xs text-secondary-text max-w-xs mx-auto mb-5 leading-relaxed">
          Are you sure you want to step out? Your camera preview will be stopped,
          and you can re-enter anytime using your room code.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 h-10 rounded-full font-bold text-xs text-secondary-text bg-cream border border-border-primary hover:bg-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirmLeave}
            className="w-full sm:flex-1 h-10 rounded-full font-bold text-xs text-white bg-coral hover:bg-coral-hover active:bg-coral-dark transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};
