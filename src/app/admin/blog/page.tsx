import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function BlogPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 mt-2">Manage your blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No blog posts found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{post.title}</span>
                      <span className="text-xs text-gray-500">/{post.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>{post.author?.name || "Unknown Author"}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        <Globe className="h-3 w-3 mr-1" /> Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
                        <EyeOff className="h-3 w-3 mr-1" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <DeleteButton id={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
