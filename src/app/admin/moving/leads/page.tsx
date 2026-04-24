import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadStatusSelect } from "./status-select";

export default async function MovingLeadsAdminPage() {
  const leads = await prisma.movingLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500 mt-2">Quote requests submitted from the website</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Move</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No leads yet.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{l.fullName}</span>
                      <span className="text-xs text-gray-500">{l.phone}{l.email ? ` • ${l.email}` : ""}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {(l.originCity || l.originState) ? `${l.originCity || ""}${l.originState ? `, ${l.originState}` : ""}` : "—"}
                      {" → "}
                      {(l.destinationCity || l.destinationState) ? `${l.destinationCity || ""}${l.destinationState ? `, ${l.destinationState}` : ""}` : "—"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {l.moveDate ? format(new Date(l.moveDate), "MMM d, yyyy") : "No date"}{l.propertySize ? ` • ${l.propertySize}` : ""}
                    </div>
                  </TableCell>
                  <TableCell>
                    {l.services.length ? (
                      <div className="flex flex-wrap gap-1">
                        {l.services.slice(0, 4).map((s) => (
                          <Badge key={s} variant="outline">
                            {s}
                          </Badge>
                        ))}
                        {l.services.length > 4 ? <Badge variant="outline">+{l.services.length - 4}</Badge> : null}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <LeadStatusSelect id={l.id} value={l.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{format(new Date(l.createdAt), "MMM d, yyyy")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

