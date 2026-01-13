import { NextResponse } from "next/server";
import { searchLocations } from "@/lib/travelpayouts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term");

  if (!term || term.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const locations = await searchLocations(term);
    return NextResponse.json({ results: locations });
  } catch (error) {
    console.error("Location Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
