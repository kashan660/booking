import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const updateSchema = z.object({
  status: z.enum(["new", "reviewed", "approved", "rejected"]),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const json = await req.json();
    const body = updateSchema.parse(json);

    const updated = await prisma.driverRegistration.update({
      where: { id: params.id },
      data: { status: body.status },
    });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(err.issues), { status: 422 });
    }
    return new NextResponse("Failed to update driver registration", { status: 500 });
  }
}
