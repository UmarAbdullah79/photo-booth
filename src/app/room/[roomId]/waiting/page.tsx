import type { Metadata } from "next";
import WaitingRoomClient from "@/app/waiting/(components)/WaitingRoomClient";

interface PageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Waiting Room · Virtual Booth Step 3 | Miles Apart",
  description:
    "We're getting both cameras ready before entering the booth together.",
};

export default async function DynamicRoomWaitingPage({ params }: PageProps) {
  const { roomId } = await params;
  const initialCode =
    roomId && roomId.length === 6 ? roomId.toUpperCase() : undefined;

  return <WaitingRoomClient initialCode={initialCode} />;
}
