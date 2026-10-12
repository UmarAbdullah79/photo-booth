import type { Metadata } from "next";
import RoomReadyClient from "../(components)/RoomReadyClient";

export const metadata: Metadata = {
  title: "Your Room is Ready 💕 | Miles Apart Photo Booth",
  description:
    "Share your private photo booth code with your favorite person to take synchronized photos together.",
  keywords: [
    "photo booth room ready",
    "two hearts booth lobby",
    "miles apart room code",
    "long distance couples photo booth",
  ],
};

export default function RoomReadyPage() {
  return <RoomReadyClient />;
}
