"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ImageUpload } from "@/components/ui/image-upload";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens"),
  shortIntro: z.string().optional().nullable(),
  heroImage: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  keywords: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function MovingServiceEditForm({ service }: { service: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>(service.content || "");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: service.name,
      slug: service.slug,
      shortIntro: service.shortIntro || "",
      heroImage: service.heroImage || "",
      seoTitle: service.seoTitle || "",
      description: service.description || "",
      keywords: (service.keywords || []).join(", "),
      ogImage: service.ogImage || "",
      published: !!service.published,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/moving/services/${service.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, content }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/moving/services");
      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/moving/services">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
          <p className="text-sm text-gray-500 mt-1">/services/{service.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Service name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortIntro">Short intro (optional)</Label>
              <Textarea id="shortIntro" {...register("shortIntro")} className="h-20" />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor content={content} onChange={(html) => setContent(html)} />
            </div>

            <div className="space-y-2">
              <Label>Hero image (optional)</Label>
              <ImageUpload value={watch("heroImage") || ""} onChange={(url) => setValue("heroImage", url)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title (SEO)</Label>
              <Input id="seoTitle" {...register("seoTitle")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description (SEO)</Label>
              <Textarea id="description" {...register("description")} className="h-24" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input id="keywords" {...register("keywords")} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publish</Label>
                <Switch id="published" checked={watch("published")} onCheckedChange={(v) => setValue("published", v)} />
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
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

