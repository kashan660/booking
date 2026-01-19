import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  keywords: z.string().transform((val) => val ? val.split(",").map((t) => t.trim()) : []).optional(),
  seoTitle: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  imagePosition: z.string().default("center"),
  published: z.boolean().default(false),
  template: z.string().default("default"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = pageSchema.parse(json);

    const existingPage = await prisma.page.findUnique({
      where: { slug: body.slug },
    });

    if (existingPage) {
      return new NextResponse("Slug already exists", { status: 409 });
    }

    const page = await prisma.page.create({
      data: body,
    });

    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
