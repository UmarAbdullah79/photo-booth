import type { Metadata } from "next";
import WaitingRoomClient from "./(components)/WaitingRoomClient";

export const metadata: Metadata = {
  title: "Waiting Room · Virtual Booth Step 3 | Miles Apart",
  description:
    "We're getting both cameras ready before entering the booth together. Share your code with your photo partner.",
  keywords: [
    "waiting room photo booth",
    "two hearts waiting room",
    "miles apart virtual booth",
    "long distance photo booth lobby",
  ],
};

export default function WaitingRoomPage() {
  return <WaitingRoomClient />;
}
