import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import MovingServiceEditForm from "./moving-service-edit-form";

export default async function EditMovingServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.movingService.findUnique({ where: { id } });
  if (!service) notFound();
  return <MovingServiceEditForm service={service} />;
}

