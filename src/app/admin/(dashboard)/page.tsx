"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Users, DollarSign, Globe, Map, FileEdit, Eye } from "lucide-react";
import { AffiliateStats } from "@/components/admin/AffiliateStats";
import { TravelpayoutsAnalytics } from "@/components/features/TravelpayoutsAnalytics";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Page {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  template: string;
  sections: any[];
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/pages");
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 drafts pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2k</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Est.)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Affiliate Performance (TravelPayouts)</h2>
        <TravelpayoutsAnalytics />
      </div>

      {/* Existing Pages Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Existing Pages</h2>
            <p className="text-muted-foreground">Manage all website pages from here.</p>
          </div>
          <Link href="/admin/pages">
            <Button variant="outline">
              <FileEdit className="mr-2 h-4 w-4" /> Manage All Pages
            </Button>
          </Link>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">Loading pages...</div>
            </CardContent>
          </Card>
        ) : pages.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No pages found yet.</p>
                <Link href="/admin/pages/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pages.slice(0, 6).map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={page.published ? "default" : "secondary"}>
                      {page.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{page.template}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {page.sections.length} sections • Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/pages/${page.slug}`} target="_blank" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="mr-1 h-3 w-3" /> View
                      </Button>
                    </Link>
                    <Link href={`/admin/pages/${page.id}/edit`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pages.length > 6 && (
              <Card className="border-dashed flex items-center justify-center">
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-2">+{pages.length - 6} more pages</p>
                  <Link href="/admin/pages">
                    <Button variant="outline" size="sm">
                      View All Pages
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-sm text-muted-foreground">Istanbul Airport → Hotel Taksim</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-sm text-muted-foreground">Jan {10 + i}, 2024</span>
                     <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white shadow hover:bg-green-600">
                        Confirmed
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/blog/new" className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors">
              <span className="font-medium">Create New Blog Post</span>
              <FileText className="h-4 w-4" />
            </Link>
            <Link href="/admin/pages/new" className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors">
              <span className="font-medium">Create New Page</span>
              <FileEdit className="h-4 w-4" />
            </Link>
            <Link href="/admin/seo" className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors">
              <span className="font-medium">Update SEO Settings</span>
              <Globe className="h-4 w-4" />
            </Link>
            <Link href="/admin/destinations" className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors">
              <span className="font-medium">Manage Destinations</span>
              <Map className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
