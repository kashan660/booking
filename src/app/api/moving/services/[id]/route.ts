import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortIntro: z.string().optional().nullable(),
  heroImage: z.string().url().optional().nullable().or(z.literal("")),
  content: z.string().min(1),
  published: z.boolean().default(false),
  seoTitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  keywords: z.string().optional().transform((val) => (val ? val.split(",").map((t) => t.trim()).filter(Boolean) : [])),
  ogImage: z.string().url().optional().nullable().or(z.literal("")),
  faqs: z.any().optional().nullable(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.movingService.findUnique({ where: { id } });
  if (!service) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  try {
    const json = await req.json();
    const body = schema.parse(json);

    const updated = await prisma.movingService.update({
      where: { id },
      data: {
        ...body,
        heroImage: body.heroImage || null,
        ogImage: body.ogImage || null,
      },
    });
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
  await prisma.movingService.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}

