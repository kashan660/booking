"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Search, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type MediaItem = {
  id: string;
  title: string;
  alt: string;
  url: string;
  category: string;
  tags: string[];
  width?: number;
  height?: number;
  createdAt: string;
};

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: "",
    alt: "",
    url: "",
    category: "general",
    tags: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, [selectedCategory]);

  async function fetchMedia() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      
      const res = await fetch(`/api/media?${params}`);
      const data = await res.json();
      setMedia(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMedia() {
    if (!newMedia.title || !newMedia.alt || !newMedia.url) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...newMedia,
          tags: newMedia.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error("Failed to add media");

      setNewMedia({ title: "", alt: "", url: "", category: "general", tags: "" });
      setShowAddForm(false);
      fetchMedia();
    } catch (error: any) {
      alert(error.message || "Failed to add media");
    } finally {
      setSaving(false);
    }
  }

  const filteredMedia = media.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ["all", "hero", "service", "city", "blog", "general"];

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-500 mt-2">Manage images for services, cities, and blog posts</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Media
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newMedia.title}
                onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                placeholder="Moving Truck Hero"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text *</Label>
              <Input
                id="alt"
                value={newMedia.alt}
                onChange={(e) => setNewMedia({ ...newMedia, alt: e.target.value })}
                placeholder="Professional moving truck ready for service"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Image URL *</Label>
              <Input
                id="url"
                value={newMedia.url}
                onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newMedia.category}
                onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
              >
                <option value="general">General</option>
                <option value="hero">Hero</option>
                <option value="service">Service</option>
                <option value="city">City</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={newMedia.tags}
                onChange={(e) => setNewMedia({ ...newMedia, tags: e.target.value })}
                placeholder="moving, truck, professional"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleAddMedia} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Add Media
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No media found</h3>
          <p className="text-gray-500">Add your first media item to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2 truncate">{item.alt}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  {item.width && item.height && (
                    <span className="text-xs text-gray-500">
                      {item.width}×{item.height}
                    </span>
                  )}
                </div>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
