import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  brandName: z.string().min(1).optional(),
  primaryPhone: z.string().optional().nullable(),
  whatsappNumber: z.string().min(5).optional(),
  supportEmail: z.string().email().optional().nullable(),
  addressLine: z.string().optional().nullable(),
  defaultOgImage: z.string().url().optional().nullable(),
  googleSiteVerification: z.string().optional().nullable(),
  googleAnalyticsId: z.string().optional().nullable(),
  googleTagManagerId: z.string().optional().nullable(),
  facebookUrl: z.string().url().optional().nullable(),
  instagramUrl: z.string().url().optional().nullable(),
  twitterUrl: z.string().url().optional().nullable(),
  youtubeUrl: z.string().url().optional().nullable(),
});

export async function GET() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch {
    settings = null;
  }
  return NextResponse.json(
    settings ?? { brandName: "Lugvia Movers", whatsappNumber: "+16467197124" }
  );
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const json = await req.json();
    const body = schema.parse(json);

    const existing = await prisma.siteSettings.findFirst();
    const updated = existing
      ? await prisma.siteSettings.update({ where: { id: existing.id }, data: body })
      : await prisma.siteSettings.create({ data: { whatsappNumber: "+16467197124", ...body } });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    }
    return new NextResponse(null, { status: 500 });
  }
}

