import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const updateSchema = z.object({
  status: z.string().optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const lead = await prisma.movingLead.findUnique({ where: { id } });
  if (!lead) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(lead);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  try {
    const json = await req.json();
    const body = updateSchema.parse(json);
    const updated = await prisma.movingLead.update({ where: { id }, data: body });
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  await prisma.movingLead.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}

