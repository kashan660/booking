import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",").filter(Boolean);

    const where: any = {};
    if (category) where.category = category;
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }

    const media = await prisma.mediaGallery.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, alt, url, category, tags, width, height, fileSize, mimeType } = body;

    if (!title || !alt || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const media = await prisma.mediaGallery.create({
      data: {
        title,
        alt,
        url,
        category: category || "general",
        tags: tags || [],
        width,
        height,
        fileSize,
        mimeType,
        uploadedBy: session.user.id,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error creating media:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
