"use client";

import React from "react";
import { ShieldCheck, Heart, Camera } from "lucide-react";

export const SessionInfoBar: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-3 px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-secondary-text text-center">
        {/* Item 1 */}
        <div className="inline-flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-coral shrink-0" />
          <span>Local session active</span>
        </div>

        <span className="text-border-primary hidden sm:inline">·</span>

        {/* Item 2 */}
        <div className="inline-flex items-center gap-1.5 font-medium">
          <Camera className="w-3.5 h-3.5 text-muted-text shrink-0" />
          <span>Camera preview capture ready</span>
        </div>

        <span className="text-border-primary hidden sm:inline">·</span>

        {/* Item 3 */}
        <div className="inline-flex items-center gap-1.5 font-medium text-muted-text">
          <Heart className="w-3.5 h-3.5 fill-coral/50 text-coral shrink-0" />
          <span>No server photo storage · Direct in-browser memories</span>
        </div>
      </div>
    </div>
  );
};
