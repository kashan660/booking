export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        category: body.category,
        author: body.author,
        keywords: body.keywords || [],
      },
    });
    return Response.json(post);
  } catch (error) {
    console.error("Failed to create post:", error);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}
