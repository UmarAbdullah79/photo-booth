import type { Metadata } from "next";
import MainBoothClient from "@/app/booth/(components)/MainBoothClient";

interface PageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Main Photo Booth · Two Hearts Haru Film | Miles Apart",
  description:
    "Synchronized romantic photo booth experience for couples and friends across any distance.",
};

export default async function DynamicRoomBoothPage({ params }: PageProps) {
  const { roomId } = await params;
  const initialCode =
    roomId && roomId.length === 6 ? roomId.toUpperCase() : undefined;

  return <MainBoothClient initialRoomCode={initialCode} />;
}
