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
import { DeleteMovingCityButton } from "./delete-button";

export default async function MovingCitiesAdminPage() {
  const cities = await prisma.movingCity.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Moving Cities</h1>
          <p className="text-gray-500 mt-2">Manage city landing pages (DB-driven)</p>
        </div>
        <Link href="/admin/moving/cities/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add City
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No cities yet. Add one to start ranking.
                </TableCell>
              </TableRow>
            ) : (
              cities.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>
                        {c.name}
                        {c.state ? `, ${c.state}` : ""}
                      </span>
                      <span className="text-xs text-gray-500">/movers/{c.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {c.published ? (
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
                  <TableCell>{format(new Date(c.updatedAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/moving/cities/${c.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <DeleteMovingCityButton id={c.id} />
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

