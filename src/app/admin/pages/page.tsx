import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Globe, EyeOff, Layout } from "lucide-react";
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

export default async function PagesManagementPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-500 mt-2">Manage website pages and content</p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Page
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No pages found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{page.title}</span>
                      <span className="text-xs text-gray-500">/{page.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {page.template}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.published ? (
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
                    {format(new Date(page.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/pages/${page.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
