import type { Metadata } from "next";
import MainBoothClient from "@/app/room/booth/(components)/MainBoothClient";

export const metadata: Metadata = {
  title: "Main Photo Booth · Two Hearts Haru Film | Miles Apart",
  description:
    "Synchronized romantic photo booth experience for couples and friends across any distance.",
};

export default function RoomBoothPage() {
  return <MainBoothClient />;
}
