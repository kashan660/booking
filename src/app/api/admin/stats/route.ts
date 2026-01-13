import { NextResponse } from "next/server";
import { getAffiliateStatistics } from "@/lib/stats-api";
import { auth } from "@/auth";

// Get booking stats
export async function GET(req: Request) {
  const session = await auth();

  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Default to last 30 days
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const startDate = lastMonth.toISOString().split('T')[0];

    const data = await getAffiliateStatistics(startDate);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TravelPayouts API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking statistics" },
      { status: 500 }
    );
  }
}
