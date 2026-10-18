"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const PIN_LENGTH = 6;
const SUGGESTIONS = ["Honeybear 🍯", "Boba Bunny 🧋", "Matcha 🍵"];

export default function EnterRoomCodePage() {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [nickname, setNickname] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const isComplete = pin.every((c) => c !== "");

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1).toUpperCase();
    if (char && !/^[A-Z0-9]$/.test(char)) return;

    const next = [...pin];
    next[index] = char;
    setPin(next);

    if (char && index < PIN_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const chars = text
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, PIN_LENGTH)
        .split("");
      setPin(Array.from({ length: PIN_LENGTH }, (_, i) => chars[i] ?? ""));
    } catch {
      // Clipboard permission denied - ignore
    }
  };

  const handleJoin = () => {
    if (!isComplete) return;
    console.log("Joining room", pin.join(""), nickname || "Guest");
    // TODO: connect to your room / WebRTC logic here
  };

  return (
    <main className="min-h-screen bg-[#fff3f1] px-4 py-6 text-[#3b2a30]">
      <div className="mx-auto max-w-5xl">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-2 text-xs font-medium shadow-sm"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold text-[#b5476b] shadow-sm">
            ▮▮▮▯ ROOM SETUP STEP 2 (GUEST)
          </span>
        </div>

        {/* Heading */}
        <header className="mt-8 text-center">
          <span className="rounded-full bg-[#fbd9e2] px-3 py-1 text-[10px] font-bold tracking-wide text-[#b5476b]">
            ‖ CONNECT & POSE ‖
          </span>
          <h1 className="mt-3 text-4xl font-extrabold">
            Enter Room <span className="text-[#3b2a30]">Code</span>
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#7a6a70]">
            Enter the 6-character code your friend shared to hop into the booth together
            ✨
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div className="space-y-4">
            {/* Room code card */}
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f0ea] text-xl">
                  📷
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#ffeef1] px-4 py-2">
                  <p className="text-[10px] font-bold text-[#b5476b]">
                    TWO HEARTS BOOTH ALERT
                  </p>
                  <p className="text-sm font-semibold">
                    Your friend is waiting in Seoul! 📸 Let&apos;s snap Life4Cuts!
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[11px] font-bold text-primary">
                ROOM SECRET PIN (6 DIGITS)
              </p>

              <div className="mt-2 flex justify-between gap-2">
                {pin.map((char, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={char}
                    maxLength={1}
                    inputMode="text"
                    aria-label={`PIN character ${i + 1}`}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="h-20 w-full max-w-20 rounded-xl border-2 border-[#fbd9e2] bg-[#fff5f7] text-center text-xl font-bold text-[#b5476b] outline-none focus:border-[#f06292]"
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-blush-primary px-3 py-1 text-xs font-medium">
                  <span className="text-green-500">●</span> Room Found! Host: Min-ji
                  (Seoul) 💕
                </span>
                <button
                  onClick={handlePaste}
                  className="text-xs font-medium text-[#b5476b]"
                >
                  📋 Paste Code
                </button>
              </div>

              <p className="mt-4 text-[11px] text-[#7a6a70]">
                ⓘ Need help? Check WhatsApp, KakaoTalk or Messages for your 6-digit link.
              </p>
            </section>

            {/* Nickname card */}
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">What&apos;s your nickname? ♡</h2>
                <span className="text-[10px] text-[#7a6a70]">{nickname.length} / 20</span>
              </div>

              <input
                value={nickname}
                maxLength={20}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Tyler, Alex, Sunwoo (or leave blank for Guest)"
                className="mt-3 w-full rounded-xl border-2 border-[#fbd9e2] bg-[#fff5f7] px-4 py-3 text-sm outline-none placeholder:text-[#c9a9b2] focus:border-[#f06292]"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-[#7a6a70]">Cute suggestions:</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setNickname(s)}
                    className="rounded-full bg-[#ffeef1] px-3 py-1 font-semibold text-[#b5476b]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Studio info */}
            <section className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffeef1]">
                  📸
                </div>
                <div>
                  <p className="text-xs font-semibold">Haru Film Pastel Studio</p>
                  <p className="text-[11px] text-[#7a6a70]">
                    4-Cut Classic · Pink Blush Filter preloaded
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#fbd9e2] px-3 py-1 text-[10px] font-semibold text-[#b5476b]">
                Private 1:1
              </span>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Camera preview polaroid */}
            <section className="rounded-2xl bg-white p-3 shadow-md">
              <div className="relative overflow-hidden rounded-xl bg-[#ead7d1]">
                <div className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white">
                  <span className="text-red-500">●</span> LIVE · 30FPS
                </div>
                <div className="absolute right-3 top-3 z-10 rounded-full bg-white/80 px-2 py-0.5 text-[10px]">
                  Looking ready!
                </div>

                {/* Replace with <video> or next/image for the real feed */}
                <div className="relative flex aspect-3/4 items-center justify-center text-6xl">
                  <Image
                    src="/images/logo-2.svg"
                    alt=""
                    fill
                    className="object-center object-contain"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/50 to-transparent p-3 pt-10 text-center text-sm font-bold text-white">
                  ♡ Ready?
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-[#7a6a70]">
                <span>Studio Mic Ready</span>
                <span>1080p WebRTC</span>
              </div>

              <div className="mt-3 flex items-end justify-between px-1">
                <p className="text-sm font-semibold italic">
                  two hearts booth ♡ guest
                  <br />
                  camera ready
                </p>
                <span className="text-[10px] text-[#7a6a70]">2025.10.24</span>
              </div>

              <div className="mt-3 flex gap-2 text-[11px]">
                <button className="flex-1 rounded-full border border-[#fbd9e2] px-3 py-1.5 font-medium">
                  FaceTime HD
                </button>
                <button className="rounded-full border border-[#fbd9e2] px-3 py-1.5 font-medium">
                  🎙 On
                </button>
                <button className="rounded-full bg-[#ffeef1] px-3 py-1.5 font-medium text-[#b5476b]">
                  Blush
                </button>
              </div>
            </section>

            {/* Join button */}
            <button
              onClick={handleJoin}
              disabled={!isComplete}
              className="w-full rounded-full bg-linear-to-r from-[#f06292] to-[#ec407a] py-4 text-base font-bold text-white shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✨ Join Room Now →
            </button>

            <p className="text-center text-[11px] text-[#7a6a70]">
              🔒 Instant P2P connection · 1080p synced shutter enabled
            </p>

            {/* Privacy */}
            <section className="rounded-2xl bg-[#ffeaee] p-4 text-xs">
              <p className="font-bold text-[#b5476b]">Privacy First Booth</p>
              <p className="mt-1 text-[#7a6a70]">
                Your webcam feed is streamed directly peer-to-peer to your friend.
                Snapshots are only saved when both click print.
              </p>
            </section>
          </div>
        </div>

        {/* Connection status */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-2 text-[11px] shadow-sm">
            <span className="text-[#b5476b]">●</span>
            <span>Connected to WebRTC Relay · Latency: 18ms</span>
            <button className="font-semibold text-[#b5476b]">Test Audio/Video</button>
          </div>
        </div>
      </div>
    </main>
  );
}
