import type { Metadata } from "next";
import PhotoPreviewClient from "../room/preview/(components)/PhotoPreviewClient";

export const metadata: Metadata = {
  title: "Photo Preview & Styling · Two Hearts Haru Film | Miles Apart",
  description:
    "Review your synchronized photo booth shots, inspect framing, customize poses, and preview your classic Life4Cut strip or 6-photo Korean collage.",
};

export default function PreviewShortcutPage() {
  return <PhotoPreviewClient initialMode={4} />;
}
