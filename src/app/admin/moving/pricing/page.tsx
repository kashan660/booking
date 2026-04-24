import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Pencil } from "lucide-react";
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
import { DeleteRateCardButton } from "./delete-button";

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function PricingAdminPage() {
  const cards = await prisma.movingRateCard.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing (Rate Cards)</h1>
          <p className="text-gray-500 mt-2">Controls the instant quote API: `/api/moving/quote`</p>
        </div>
        <Link href="/admin/moving/pricing/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Rate Card
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Base / Min</TableHead>
              <TableHead>Markup</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No rate cards yet. Add one to enable instant quotes.
                </TableCell>
              </TableRow>
            ) : (
              cards.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">
                    <div>{c.serviceSlug ? `Service: ${c.serviceSlug}` : "Service: any"}</div>
                    <div>
                      {c.originCity || c.originState
                        ? `Origin: ${c.originCity ? `${c.originCity}, ` : ""}${c.originState || ""}`
                        : "Origin: any"}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    <div>Base: {money(c.basePrice)}</div>
                    <div>Min: {money(c.minimumPrice)}</div>
                  </TableCell>
                  <TableCell>{c.resellerMarkupPercent}%</TableCell>
                  <TableCell>
                    {c.active ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Disabled</Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(c.updatedAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/moving/pricing/${c.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <DeleteRateCardButton id={c.id} />
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

