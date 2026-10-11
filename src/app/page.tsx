import React from "react";
import { Hero } from "@/app/components/home/Hero";
import { HowItWorks } from "@/app/components/home/HowItWorks";
import { InspirationGallery } from "@/app/components/home/InspirationGallery";
import { SynchronizedCameras } from "@/app/components/home/SynchronizedCameras";
import { CustomizationSection } from "@/app/components/home/CustomizationSection";
import { HighQualitySection } from "@/app/components/home/HighQualitySection";
import { FinalCTA } from "@/app/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-cream">
      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. How It Works Section */}
        <HowItWorks />

        {/* 4. Inspiration Gallery Section */}
        <InspirationGallery />

        {/* 5. Zero-Lag Precision Feature Section */}
        <SynchronizedCameras />

        {/* 6. Endless Customization Feature Section */}
        <CustomizationSection />

        {/* 7. Always High Quality / Download Feature Section */}
        <HighQualitySection />

        {/* 8. Final CTA Section */}
        <FinalCTA />
      </main>
    </div>
  );
}
