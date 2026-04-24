import Link from "next/link";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VehicleRegistrationStatusSelect } from "./status-select";

const STATUS_OPTIONS = ["all", "new", "reviewed", "approved", "rejected"] as const;

export default async function VehicleRegistrationsAdminPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const statusFilter = STATUS_OPTIONS.includes((searchParams.status || "all") as (typeof STATUS_OPTIONS)[number])
    ? (searchParams.status || "all")
    : "all";
  const q = (searchParams.q || "").trim();

  const registrations = await prisma.vehicleRegistration.findMany({
    where: {
      ...(statusFilter === "all" ? {} : { status: statusFilter }),
      ...(q
        ? {
            OR: [
              { ownerName: { contains: q, mode: "insensitive" } },
              { phone: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  function hrefForStatus(status: (typeof STATUS_OPTIONS)[number]) {
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (q) params.set("q", q);
    const qs = params.toString();
    return `/admin/team/vehicles${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Registrations</h1>
        <p className="text-gray-500 mt-2">Review and manage fleet onboarding requests</p>
      </div>

      <form method="GET" className="flex flex-col sm:flex-row gap-3">
        {statusFilter !== "all" ? <input type="hidden" name="status" value={statusFilter} /> : null}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by owner name or phone"
          className="h-10 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm"
        />
        <button type="submit" className="h-10 rounded-md bg-slate-900 text-white px-4 text-sm">
          Search
        </button>
        {q ? (
          <Link href={statusFilter === "all" ? "/admin/team/vehicles" : `/admin/team/vehicles?status=${statusFilter}`} className="h-10 rounded-md border border-slate-200 px-4 text-sm inline-flex items-center justify-center">
            Clear
          </Link>
        ) : null}
      </form>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => {
          const active = status === statusFilter;
          return (
            <Link
              key={status}
              href={hrefForStatus(status)}
              className={`rounded-md px-3 py-1.5 text-sm border ${
                active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              {status}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Owner</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No vehicle registrations found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              registrations.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{v.ownerName}</span>
                      <span className="text-xs text-gray-500">
                        {v.phone}
                        {v.email ? ` • ${v.email}` : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    <div>
                      {v.vehicleType} • {v.plateNumber}
                    </div>
                    <div className="text-xs text-gray-500">{v.capacity || "Capacity not provided"}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 max-w-[360px]">
                    <p className="line-clamp-2 whitespace-pre-wrap">{v.serviceCoverage || "—"}</p>
                    {v.notes ? <p className="text-xs text-gray-500 mt-1 line-clamp-2 whitespace-pre-wrap">{v.notes}</p> : null}
                  </TableCell>
                  <TableCell>
                    <VehicleRegistrationStatusSelect id={v.id} value={v.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{format(new Date(v.createdAt), "MMM d, yyyy")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
