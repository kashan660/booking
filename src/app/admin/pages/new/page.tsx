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
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  imagePosition: z.string().default("center"),
  description: z.string().optional(),
  imagePosition: z.string().default("center"),
  description: z.string().optional(),
  keywords: z.string().optional(),
  seoTitle: z.string().optional(),
  published: z.boolean().default(false),
  template: z.string().default("default"),
});

type FormData = z.infer<typeof formSchema>;

export default function NewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: false,
      template: "default",
    },
  });

  // Generate slug from title
  const title = watch("title");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("title", value);
    if (!watch("slug")) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create page");
      }

      router.push("/admin/pages");
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
        <Link href="/admin/pages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Enter page title"
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
              <Label>Featured Image</Label>
              <ImageUpload
                value={watch("featuredImage") || ""}
                onChange={(url) => setValue("featuredImage", url)}
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                 <div>
                    <Label htmlFor="imagePosition" className="text-xs text-gray-500 mb-1 block">Image Position</Label>
                    <Select
                      onValueChange={(value) => setValue("imagePosition", value)}
                      defaultValue={watch("imagePosition")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top (Head)</SelectItem>
                        <SelectItem value="center">Center (Middle)</SelectItem>
                        <SelectItem value="bottom">Bottom (Lower)</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title (SEO)</Label>
              <Input
                id="seoTitle"
                {...register("seoTitle")}
                placeholder="Custom title tag for search results"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description (SEO)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Meta description for search engines..."
                className="h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Meta Keywords (SEO)</Label>
              <Input
                id="keywords"
                {...register("keywords")}
                placeholder="Comma separated keywords (e.g. travel, booking, flights)"
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
                    Save Page
                  </>
                )}
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Page Template</Label>
                <Select
                  onValueChange={(value) => setValue("template", value)}
                  defaultValue={watch("template")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="full-width">Full Width</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
