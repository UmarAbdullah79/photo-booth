"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Camera, Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

export interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-border-soft transition-all duration-200">
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 h-17 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1 -ml-1"
          aria-label="Two Hearts Photo Booth Homepage"
        >
          <Image
            src="/images/logo.png"
            alt="Two Hearts Photo Booth"
            width={140}
            height={46}
            className="w-auto h-10 object-cover"
            priority
          />
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-secondary-text"
          aria-label="Main Navigation"
        >
          <a
            href="/#how-it-works"
            className={`transition-colors duration-200 hover:text-coral ${
              activeSection === "how-it-works" ? "text-coral" : ""
            }`}
          >
            How it works
          </a>
          <a
            href="/#gallery"
            className={`transition-colors duration-200 hover:text-coral ${
              activeSection === "gallery" ? "text-coral" : ""
            }`}
          >
            Gallery
          </a>
        </nav>

        {/* RIGHT: CTAs (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="secondary" size="sm" href="/join">
            Join a Room
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="/create"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Create a Room
          </Button>

          {/* Small circular quick-action button */}
          <button
            className="w-9.5 h-9.5 rounded-full bg-white border border-border-primary flex items-center justify-center text-secondary-text hover:text-coral hover:bg-blush-primary hover:border-coral/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            aria-label="Quick Camera Test"
            title="Quick Camera Check"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-white border border-border-primary flex items-center justify-center text-primary-text hover:bg-blush-primary transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-soft bg-cream px-5 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 font-semibold text-sm text-secondary-text">
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-coral transition-colors"
            >
              How it works
            </a>
            <a
              href="/#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-coral transition-colors"
            >
              Gallery
            </a>
          </nav>
          <div className="pt-2 flex flex-col gap-2.5">
            <Button
              variant="primary"
              size="md"
              href="/create"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Create a Room
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/join"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              Join a Room
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
