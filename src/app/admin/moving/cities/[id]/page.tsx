import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import MovingCityEditForm from "./moving-city-edit-form";

export default async function EditMovingCityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const city = await prisma.movingCity.findUnique({ where: { id } });
  if (!city) notFound();
  return <MovingCityEditForm city={city} />;
}

