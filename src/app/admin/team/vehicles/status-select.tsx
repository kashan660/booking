"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = ["new", "reviewed", "approved", "rejected"] as const;

export function VehicleRegistrationStatusSelect({ id, value }: { id: string; value: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function onChange(next: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/team/vehicles/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={saving}
      aria-label="Vehicle registration status"
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
