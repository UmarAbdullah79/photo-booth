import type { Metadata } from "next";
import CreateRoomClient from "./(components)/CreateRoomClient";

export const metadata: Metadata = {
  title: "Create Your Room | Miles Apart",
  description:
    "Get your camera ready before inviting your favorite person. Set up your nickname, camera preview, and lighting for your romantic synchronized photo booth.",
  keywords: [
    "create photo booth room",
    "miles apart create",
    "online couples photo booth",
    "long distance photo booth room",
    "remote photo strip setup",
  ],
  openGraph: {
    title: "Create Your Room | Miles Apart",
    description:
      "Get your camera ready before inviting your favorite person to Miles Apart.",
    type: "website",
  },
};

export default function CreateRoomPage() {
  return <CreateRoomClient />;
}
