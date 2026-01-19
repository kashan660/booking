import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditForm from "./BlogEditForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return <BlogEditForm post={post} />;
}
