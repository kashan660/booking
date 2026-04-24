import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import RateCardEditForm from "./rate-card-edit-form";

export default async function EditRateCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await prisma.movingRateCard.findUnique({ where: { id } });
  if (!card) notFound();
  return <RateCardEditForm card={card} />;
}

