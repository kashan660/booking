import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().nullable(),
  licenseType: z.string().min(2),
  yearsExperience: z.number().int().min(0).max(60).optional().nullable(),
  primaryCity: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = schema.parse(json);

    const registration = await prisma.driverRegistration.create({
      data: body,
    });

    return NextResponse.json({ ok: true, id: registration.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    }
    return new NextResponse("Failed to save registration", { status: 500 });
  }
}
