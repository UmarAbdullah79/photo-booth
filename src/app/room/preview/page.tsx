import type { Metadata } from "next";
import PhotoPreviewClient from "./(components)/PhotoPreviewClient";

export const metadata: Metadata = {
  title: "Photo Preview & Styling · Two Hearts Haru Film | Miles Apart",
  description:
    "Review your synchronized photo booth shots, inspect framing, customize poses, and preview your classic Life4Cut strip or 6-photo Korean collage.",
  keywords: [
    "photo booth preview",
    "two hearts booth styling",
    "korean life4cut photo strip",
    "miles apart photo preview",
    "long distance couples photo booth",
  ],
};

export default function PhotoPreviewPage() {
  return <PhotoPreviewClient initialMode={4} />;
}
