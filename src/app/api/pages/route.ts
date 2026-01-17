import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.page.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' }
        },
        seoSettings: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, description, keywords, ogImage, published, template, sections } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug }
    });

    if (existingPage) {
      return NextResponse.json({ error: "Page with this slug already exists" }, { status: 400 });
    }

    // Create page with sections
    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        description,
        keywords: keywords || [],
        ogImage,
        published: published || false,
        template: template || "default",
        sections: sections ? {
          create: sections.map((section: any, index: number) => ({
            name: section.name,
            content: section.content,
            order: section.order || index,
            type: section.type || "text",
            settings: section.settings || {}
          }))
        } : undefined
      },
      include: {
        sections: true,
        seoSettings: true
      }
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}