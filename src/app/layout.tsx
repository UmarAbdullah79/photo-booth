import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Two Hearts Photo Booth | Two People. Two Cameras. One Photo.",
  description:
    "A playful, romantic online photo booth for couples, friends, and groups who are physically apart. Connect cameras, take synchronized photos, and create lasting memories.",
  keywords: [
    "photo booth",
    "online photo booth",
    "long distance couple photo booth",
    "remote photo booth",
    "synchronized photography",
    "two hearts photo booth",
  ],
  authors: [{ name: "Two Hearts Photo Booth" }],
  openGraph: {
    title: "Two Hearts Photo Booth | Connect & Capture Together",
    description: "Two People. Two Cameras. One Photo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FFF9F7] text-[#292326] antialiased selection:bg-[#FFE0E8] selection:text-[#C93E5C]">
        {children}
      </body>
    </html>
  );
}
