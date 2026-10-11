"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFF5F7] border-t border-border-soft py-10 sm:py-12 text-secondary-text mt-auto transition-colors">
      <Container size="default">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg"
              aria-label="Two Hearts Photo Booth Homepage"
            >
              <Image
                src="/images/logo.png"
                alt="Two Hearts Photo Booth"
                width={130}
                height={42}
                className="w-auto h-8 sm:h-9 object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-secondary-text max-w-sm flex items-center justify-center md:justify-start gap-1.5">
              <span>Two People. Two Cameras. One Photo.</span>
              <Heart className="w-3.5 h-3.5 fill-coral text-coral inline shrink-0" />
            </p>
          </div>

          {/* Quick Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-secondary-text"
          >
            <Link
              href="/#how-it-works"
              className="hover:text-coral transition-colors py-1"
            >
              How It Works
            </Link>
            <Link
              href="/#gallery"
              className="hover:text-coral transition-colors py-1"
            >
              Gallery
            </Link>
            <Link
              href="/create"
              className="text-coral hover:text-coral-hover font-semibold transition-colors py-1"
            >
              Create Room
            </Link>
            <Link
              href="/join"
              className="hover:text-coral transition-colors py-1"
            >
              Join Room
            </Link>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                alert("Two Hearts Photo Booth connects hearts across any distance with synchronized, romantic photo strip captures ♡");
              }}
              className="hover:text-coral transition-colors py-1"
            >
              About
            </a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert("Privacy Promise: All video feeds and snapshots are peer-to-peer and private to your room. We never store recordings or share your private memories.");
              }}
              className="hover:text-coral transition-colors py-1"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:support@twoheartsbooth.com"
              className="hover:text-coral transition-colors py-1"
            >
              Contact Support
            </a>
          </nav>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-8 pt-6 border-t border-border-soft/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-muted-text text-center sm:text-left">
          <p>© {new Date().getFullYear()} Made with love for long-distance hearts. Those 3 Guys.</p>
          <div className="flex items-center gap-1.5 text-muted-text">
            <span>Encrypted &amp; Private Peer-to-Peer</span>
            <span>·</span>
            <span>Zero-Lag Sync</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
