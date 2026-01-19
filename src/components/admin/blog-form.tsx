"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Trash2 } from "lucide-react";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().default("travel"),
  tags: z.string().optional(), // We'll handle split in API or here
  published: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featuredImage: initialData?.featuredImage || "",
      category: initialData?.category || "travel",
      tags: initialData?.tags?.join(", ") || "",
      published: initialData?.published || false,
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    setLoading(true);
    try {
      const url = isEditing
        ? `/api/blog/${initialData.id}`
        : "/api/blog";
      
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Something went wrong");

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setLoading(true);
    try {
      await fetch(`/api/blog/${initialData.id}`, { method: "DELETE" });
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      alert("Error deleting post");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="post-url-slug"
              {...form.register("slug")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="travel"
              {...form.register("category")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="travel, guide, tips"
              {...form.register("tags")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              placeholder="https://..."
              {...form.register("featuredImage")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary..."
              {...form.register("excerpt")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content (HTML supported)</Label>
            <Textarea
              id="content"
              className="min-h-[300px] font-mono"
              placeholder="<p>Write your content here...</p>"
              {...form.register("content")}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50">
            <Switch
              checked={form.watch("published")}
              onCheckedChange={(checked) => form.setValue("published", checked)}
            />
            <Label>Publish immediately</Label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {isEditing && (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          
          <Button type="submit" disabled={loading} className="ml-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
