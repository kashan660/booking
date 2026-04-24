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
import { DriverRegistrationStatusSelect } from "./status-select";

const STATUS_OPTIONS = ["all", "new", "reviewed", "approved", "rejected"] as const;

export default async function DriverRegistrationsAdminPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const statusFilter = STATUS_OPTIONS.includes((searchParams.status || "all") as (typeof STATUS_OPTIONS)[number])
    ? (searchParams.status || "all")
    : "all";
  const q = (searchParams.q || "").trim();

  const registrations = await prisma.driverRegistration.findMany({
    where: {
      ...(statusFilter === "all" ? {} : { status: statusFilter }),
      ...(q
        ? {
            OR: [
              { fullName: { contains: q, mode: "insensitive" } },
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
    return `/admin/team/drivers${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Driver Registrations</h1>
        <p className="text-gray-500 mt-2">Review and manage incoming driver applications</p>
      </div>

      <form method="GET" className="flex flex-col sm:flex-row gap-3">
        {statusFilter !== "all" ? <input type="hidden" name="status" value={statusFilter} /> : null}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by driver name or phone"
          className="h-10 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm"
        />
        <button type="submit" className="h-10 rounded-md bg-slate-900 text-white px-4 text-sm">
          Search
        </button>
        {q ? (
          <Link href={statusFilter === "all" ? "/admin/team/drivers" : `/admin/team/drivers?status=${statusFilter}`} className="h-10 rounded-md border border-slate-200 px-4 text-sm inline-flex items-center justify-center">
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
              <TableHead>Driver</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No driver registrations found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              registrations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{d.fullName}</span>
                      <span className="text-xs text-gray-500">
                        {d.phone}
                        {d.email ? ` • ${d.email}` : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    <div>{d.licenseType}</div>
                    <div className="text-xs text-gray-500">
                      {d.yearsExperience != null ? `${d.yearsExperience} years` : "Experience not provided"}
                      {d.primaryCity ? ` • ${d.primaryCity}` : ""}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 max-w-[380px]">
                    {d.notes ? (
                      <p className="line-clamp-3 whitespace-pre-wrap">{d.notes}</p>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DriverRegistrationStatusSelect id={d.id} value={d.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{format(new Date(d.createdAt), "MMM d, yyyy")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
