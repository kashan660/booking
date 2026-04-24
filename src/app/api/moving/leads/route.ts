import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const createSchema = z.object({
  originCity: z.string().optional().nullable(),
  originState: z.string().optional().nullable(),
  destinationCity: z.string().optional().nullable(),
  destinationState: z.string().optional().nullable(),
  moveDate: z.string().datetime().optional().nullable(),
  propertySize: z.string().optional().nullable(),
  services: z.array(z.string()).optional().default([]),
  notes: z.string().optional().nullable(),
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().nullable(),
  preferredContact: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = createSchema.parse(json);

    const lead = await prisma.movingLead.create({
      data: {
        ...body,
        moveDate: body.moveDate ? new Date(body.moveDate) : null,
      },
    });
    return NextResponse.json(lead);
  } catch (err) {
    if (err instanceof z.ZodError) return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const leads = await prisma.movingLead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

