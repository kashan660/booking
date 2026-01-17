"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Plus, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PageSection {
  id?: string;
  name: string;
  content: string;
  type: string;
  order: number;
  settings?: Record<string, any>;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  published: boolean;
  template: string;
  sections: PageSection[];
}

const templates = [
  { value: "default", label: "Default Page" },
  { value: "landing", label: "Landing Page" },
  { value: "blog", label: "Blog Page" },
  { value: "contact", label: "Contact Page" },
  { value: "services", label: "Services Page" },
];

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const pageId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
    keywords: "",
    ogImage: "",
    published: false,
    template: "default",
    sections: [] as PageSection[],
  });

  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [sectionForm, setSectionForm] = useState({
    name: "",
    content: "",
    type: "text",
    order: 0,
  });

  useEffect(() => {
    fetchPageData();
  }, [pageId]);

  const fetchPageData = async () => {
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      if (response.ok) {
        const data = await response.json();
        setPageData(data);
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          description: data.description || "",
          keywords: data.keywords?.join(", ") || "",
          ogImage: data.ogImage || "",
          published: data.published,
          template: data.template,
          sections: data.sections || [],
        });
      } else {
        router.push("/admin/pages");
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      router.push("/admin/pages");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
    } else if (formData.slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 50) {
      newErrors.content = "Content must be at least 50 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
  };

  const handleAddSection = () => {
    setShowSectionForm(true);
    setEditingSection(null);
    setSectionForm({ name: "", content: "", type: "text", order: formData.sections.length });
  };

  const handleEditSection = (section: PageSection, index: number) => {
    setEditingSection(section);
    setSectionForm({
      name: section.name,
      content: section.content,
      type: section.type,
      order: section.order,
    });
    setShowSectionForm(true);
  };

  const handleDeleteSection = (index: number) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    const reorderedSections = newSections.map((section, i) => ({
      ...section,
      order: i
    }));
    setFormData(prev => ({ ...prev, sections: reorderedSections }));
  };

  const handleSaveSection = () => {
    if (!sectionForm.name.trim()) return;

    if (editingSection) {
      const updatedSections = formData.sections.map(section =>
        section.name === editingSection.name
          ? { ...sectionForm, order: section.order }
          : section
      );
      setFormData(prev => ({ ...prev, sections: updatedSections }));
    } else {
      const newSection: PageSection = {
        ...sectionForm,
        id: `temp-${Date.now()}`,
      };
      setFormData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
    }

    setShowSectionForm(false);
    setEditingSection(null);
    setSectionForm({ name: "", content: "", type: "text", order: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    setErrors({});

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords ? formData.keywords.split(",").map(k => k.trim()).filter(k => k) : [],
          sections: formData.sections.map(section => ({
            name: section.name,
            content: section.content,
            type: section.type,
            order: section.order,
            settings: section.settings || {}
          }))
        }),
      });

      if (response.ok) {
        router.push("/admin/pages");
      } else {
        const errorData = await response.json();
        if (errorData.error === "Page with this slug already exists") {
          setErrors(prev => ({ ...prev, slug: "This slug is already in use" }));
        } else {
          setErrors({ submit: errorData.error || "Failed to update page" });
        }
      }
    } catch (error) {
      console.error("Error updating page:", error);
      setErrors({ submit: "An unexpected error occurred" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/pages">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Edit Page</h2>
              <p className="text-muted-foreground">Loading page data...</p>
            </div>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Loading page data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Page</h2>
            <p className="text-muted-foreground">Update your website page content and settings</p>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  if (!formData.slug) {
                    setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                  }
                }}
                placeholder="Enter page title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Page Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="enter-page-slug"
                className={errors.slug ? "border-red-500" : ""}
              />
              <p className="text-sm text-muted-foreground">
                URL: /{formData.slug || "page-slug"}
              </p>
              {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="template">Page Template</Label>
                <Select
                  value={formData.template}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publish Page</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="content">Page Content *</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Write your page content here..."
              error={errors.content}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Page Sections</CardTitle>
            <Button type="button" onClick={handleAddSection} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </CardHeader>
          <CardContent>
            {formData.sections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sections added yet.</p>
                <Button type="button" onClick={handleAddSection} variant="outline" className="mt-4">
                  Add Your First Section
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.sections.map((section, index) => (
                  <div key={section.id || index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{section.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{section.type}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSection(section, index)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSection(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {section.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter meta description (recommended: 150-160 characters)"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                {formData.description.length}/160 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Meta Keywords</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="Enter keywords separated by commas"
              />
              <p className="text-sm text-muted-foreground">
                Separate keywords with commas
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                value={formData.ogImage}
                onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-muted-foreground">
                URL for social media preview image
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/pages">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            {saving ? (
              "Saving Changes..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog open={showSectionForm} onOpenChange={setShowSectionForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section" : "Add New Section"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="section-name">Section Name *</Label>
              <Input
                id="section-name"
                value={sectionForm.name}
                onChange={(e) => setSectionForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter section name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-type">Section Type</Label>
              <Select
                value={sectionForm.type}
                onValueChange={(value) => setSectionForm(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Content</SelectItem>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="features">Features Section</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                  <SelectItem value="gallery">Image Gallery</SelectItem>
                  <SelectItem value="contact">Contact Form</SelectItem>
                  <SelectItem value="custom">Custom Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-content">Section Content</Label>
              <RichTextEditor
                value={sectionForm.content}
                onChange={(value) => setSectionForm(prev => ({ ...prev, content: value }))}
                placeholder="Write section content here..."
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-order">Display Order</Label>
              <Input
                id="section-order"
                type="number"
                value={sectionForm.order}
                onChange={(e) => setSectionForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowSectionForm(false);
                setEditingSection(null);
                setSectionForm({ name: "", content: "", type: "text", order: 0 });
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveSection}>
              <Save className="mr-2 h-4 w-4" />
              {editingSection ? "Update Section" : "Add Section"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}