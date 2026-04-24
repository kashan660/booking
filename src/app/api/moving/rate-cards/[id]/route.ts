import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1),
  active: z.boolean().default(true),
  serviceSlug: z.string().optional().nullable(),
  originState: z.string().optional().nullable(),
  originCity: z.string().optional().nullable(),
  currency: z.string().default("USD"),
  minimumPrice: z.coerce.number().int().min(0),
  basePrice: z.coerce.number().int().min(0),
  perMile: z.coerce.number().int().min(0),
  perHour: z.coerce.number().int().min(0),
  hoursStudio: z.coerce.number().min(0),
  hours1br: z.coerce.number().min(0),
  hours2br: z.coerce.number().min(0),
  hours3br: z.coerce.number().min(0),
  hours4brPlus: z.coerce.number().min(0),
  packingFullMultiplier: z.coerce.number().min(1),
  packingPartialMultiplier: z.coerce.number().min(1),
  storageFlat: z.coerce.number().int().min(0),
  junkRemovalFlat: z.coerce.number().int().min(0),
  assemblyFlat: z.coerce.number().int().min(0),
  resellerMarkupPercent: z.coerce.number().int().min(0).max(500),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  const card = await prisma.movingRateCard.findUnique({ where: { id } });
  if (!card) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(card);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;

  try {
    const body = schema.parse(await req.json());
    const updated = await prisma.movingRateCard.update({
      where: { id },
      data: { ...body, originState: body.originState ? body.originState.toUpperCase() : null },
    });
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  await prisma.movingRateCard.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}

