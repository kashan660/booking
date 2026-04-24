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
  state: z.string().optional(),
  country: z.string().optional(),
  heroImage: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function NewMovingCityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "USA", published: false },
  });

  const name = watch("name");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("name", value);
    if (!watch("slug")) {
      setValue(
        "slug",
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/moving/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, content }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/moving/cities");
      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Failed to create city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/moving/cities">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add City</h1>
          <p className="text-sm text-gray-500 mt-1">Create a city landing page for movers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">City name</Label>
              <Input id="name" {...register("name")} onChange={handleNameChange} placeholder="Houston" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register("slug")} placeholder="houston-tx" />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State (optional)</Label>
                <Input id="state" {...register("state")} placeholder="TX" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor
                content={content}
                onChange={(html) => {
                  setContent(html);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Hero image (optional)</Label>
              <ImageUpload value={watch("heroImage") || ""} onChange={(url) => setValue("heroImage", url)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title (SEO)</Label>
              <Input id="seoTitle" {...register("seoTitle")} placeholder={`Movers in ${name || "City"} | Best Price`} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description (SEO)</Label>
              <Textarea id="description" {...register("description")} className="h-24" placeholder="Short snippet for Google…" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input id="keywords" {...register("keywords")} placeholder="packers and movers, moving company, packing, storage" />
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
                    Save City
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

