import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InspirationGallery } from "@/components/home/InspirationGallery";
import { SynchronizedCameras } from "@/components/home/SynchronizedCameras";
import { CustomizationSection } from "@/components/home/CustomizationSection";
import { HighQualitySection } from "@/components/home/HighQualitySection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* 1. Floating Wordmark Navbar */}
      <Navbar />

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

