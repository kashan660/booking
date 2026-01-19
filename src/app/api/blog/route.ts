import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().default("travel"),
  tags: z.string().transform((val) => val.split(",").map((t) => t.trim())),
  seoTitle: z.string().optional(),
  published: z.boolean().default(false),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = blogSchema.parse(json);

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: body.slug },
    });

    if (existingPost) {
      return new NextResponse("Slug already exists", { status: 409 });
    }

    const post = await prisma.blogPost.create({
      data: {
        ...body,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
