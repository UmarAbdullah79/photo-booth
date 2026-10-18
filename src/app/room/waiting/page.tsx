import type { Metadata } from "next";
import WaitingRoomClient from "@/app/room/waiting/(components)/WaitingRoomClient";

export const metadata: Metadata = {
  title: "Waiting Room · Virtual Booth Step 3 | Miles Apart",
  description:
    "We're getting both cameras ready before entering the booth together.",
};

export default function RoomWaitingPage() {
  return <WaitingRoomClient />;
}
