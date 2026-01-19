"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().default("travel"),
  tags: z.string().optional(),
  seoTitle: z.string().optional(),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface BlogEditFormProps {
  post: BlogPost;
}

export default function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post.content);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      featuredImage: post.featuredImage || "",
      category: post.category,
      tags: post.tags.join(", "),
      seoTitle: post.seoTitle || "",
      published: post.published,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="url-friendly-slug"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor
                content={content}
                onChange={(html) => {
                  setContent(html);
                  setValue("content", html);
                }}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register("excerpt")}
                placeholder="Brief summary of the post..."
                className="h-24"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publish Status</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={watch("published")}
                    onCheckedChange={(checked) => setValue("published", checked)}
                  />
                  <span className="text-sm text-gray-500">
                    {watch("published") ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Post
                  </>
                )}
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">Meta Title (SEO)</Label>
                <Input
                  id="seoTitle"
                  {...register("seoTitle")}
                  placeholder="Custom title for search results (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register("category")}
                  placeholder="e.g. Travel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags / Keywords (SEO)</Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  placeholder="Separate with commas (e.g. travel, dubai, luxury)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <div className="space-y-3">
                  <ImageUpload
                    value={watch("featuredImage") || ""}
                    onChange={(url) => setValue("featuredImage", url)}
                  />
                  <Input
                    id="featuredImage"
                    {...register("featuredImage")}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
