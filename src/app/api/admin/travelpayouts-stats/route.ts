import { NextResponse } from "next/server";
import { getAggregatedStats } from "@/lib/travelpayouts-stats";
import { auth } from "@/auth";

// GET /api/admin/travelpayouts-stats
export async function GET(request: Request) {
  try {
    const session = await auth();

    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const campaignId = searchParams.get("campaignId");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    // Get comprehensive statistics
    const stats = await getAggregatedStats(
      startDate,
      endDate,
      campaignId ? parseInt(campaignId) : undefined
    );

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Travelpayouts Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Travelpayouts statistics" },
      { status: 500 }
    );
  }
}

// POST /api/admin/travelpayouts-stats
export async function POST(request: Request) {
  try {
    const session = await auth();

    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { startDate, endDate, campaignId, action } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "export":
        // Handle export functionality
        const exportStats = await getAggregatedStats(
          startDate,
          endDate,
          campaignId
        );
        
        return NextResponse.json({
          data: exportStats,
          filename: `travelpayouts-stats-${startDate}-to-${endDate}.json`
        });

      case "detailed":
        // Get detailed booking data
        const { getDetailedBookingStatistics } = await import("@/lib/travelpayouts-stats");
        const detailedStats = await getDetailedBookingStatistics({
          startDate,
          endDate,
          campaignId: campaignId ? parseInt(campaignId) : undefined,
          limit: 1000
        });
        
        return NextResponse.json(detailedStats);

      default:
        // Default to aggregated stats
        const defaultStats = await getAggregatedStats(
          startDate,
          endDate,
          campaignId ? parseInt(campaignId) : undefined
        );
        
        return NextResponse.json(defaultStats);
    }
  } catch (error) {
    console.error("Travelpayouts Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to process Travelpayouts statistics request" },
      { status: 500 }
    );
  }
}