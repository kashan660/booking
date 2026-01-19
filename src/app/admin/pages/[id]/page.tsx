import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageEditForm from "./PageEditForm";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) {
    notFound();
  }

  return <PageEditForm page={page} />;
}
