import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/pages/[id] - Get single page
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const page = await prisma.page.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        },
        seoSettings: true
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/pages/[id] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, description, keywords, ogImage, published, template, sections } = body;

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id: params.id }
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug }
      });
      
      if (slugExists) {
        return NextResponse.json({ error: "Page with this slug already exists" }, { status: 400 });
      }
    }

    // Update page
    const page = await prisma.page.update({
      where: { id: params.id },
      data: {
        title: title || existingPage.title,
        slug: slug || existingPage.slug,
        content: content !== undefined ? content : existingPage.content,
        description: description !== undefined ? description : existingPage.description,
        keywords: keywords !== undefined ? keywords : existingPage.keywords,
        ogImage: ogImage !== undefined ? ogImage : existingPage.ogImage,
        published: published !== undefined ? published : existingPage.published,
        template: template || existingPage.template,
        sections: sections ? {
          deleteMany: {}, // Delete existing sections
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

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id: params.id }
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Delete page (sections will be deleted due to cascade)
    await prisma.page.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}