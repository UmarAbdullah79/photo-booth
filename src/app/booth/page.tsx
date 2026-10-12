import type { Metadata } from "next";
import MainBoothClient from "./(components)/MainBoothClient";

export const metadata: Metadata = {
  title: "Main Photo Booth · Two Hearts Haru Film | Miles Apart",
  description:
    "Synchronized romantic photo booth experience for couples and friends across any distance. Capture 4 or 6 photos together.",
  keywords: [
    "photo booth main",
    "two hearts booth",
    "life4cut online",
    "long distance photo booth",
    "haru film digital strip",
  ],
};

export default function MainBoothPage() {
  return <MainBoothClient />;
}
