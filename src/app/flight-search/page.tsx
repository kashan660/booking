"use client";

import { useSearchParams } from "next/navigation";
import { TravelPayoutsWhiteLabel } from "@/components/features/TravelPayoutsWhiteLabel";
import { Suspense } from "react";

function FlightSearchResults() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  
  return (
    <div className="container mx-auto px-4 pt-32 pb-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Flight Search Results</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-[600px]">
        <TravelPayoutsWhiteLabel searchParams={queryString} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <FlightSearchResults />
    </Suspense>
  );
}