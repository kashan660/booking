import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Pencil, Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteMovingServiceButton } from "./delete-button";

export default async function MovingServicesAdminPage() {
  const services = await prisma.movingService.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Moving Services</h1>
          <p className="text-gray-500 mt-2">Manage service pages (DB-driven)</p>
        </div>
        <Link href="/admin/moving/services/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No services yet. Add one to start.
                </TableCell>
              </TableRow>
            ) : (
              services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{s.name}</span>
                      <span className="text-xs text-gray-500">/services/{s.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {s.published ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        <Globe className="h-3 w-3 mr-1" /> Published
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                      >
                        <EyeOff className="h-3 w-3 mr-1" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(s.updatedAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/moving/services/${s.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <DeleteMovingServiceButton id={s.id} />
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

