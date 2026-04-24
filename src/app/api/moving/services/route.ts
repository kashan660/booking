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

export async function GET() {
  const services = await prisma.movingService.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const json = await req.json();
    const body = schema.parse(json);

    const existing = await prisma.movingService.findUnique({ where: { slug: body.slug } });
    if (existing) return new NextResponse("Slug already exists", { status: 409 });

    const service = await prisma.movingService.create({
      data: {
        ...body,
        heroImage: body.heroImage || null,
        ogImage: body.ogImage || null,
      },
    });
    return NextResponse.json(service);
  } catch (err) {
    if (err instanceof z.ZodError) return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    return new NextResponse(null, { status: 500 });
  }
}

