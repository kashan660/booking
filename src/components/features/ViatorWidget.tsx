"use client";

import { useEffect, useRef } from "react";

export function ViatorWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '696229';

  useEffect(() => {
    // This is a placeholder for the actual Viator/GetYourGuide widget script
    // Since we don't have the specific widget script from the user, we'll create a generic promo banner
    // that links to Viator via TravelPayouts
  }, []);

  return (
    <div className="w-full bg-slate-50 p-8 rounded-xl border text-center">
       <h3 className="text-2xl font-bold mb-4">Find Unforgettable Experiences</h3>
       <p className="text-muted-foreground mb-6">Browse thousands of tours and activities worldwide.</p>
       
       <a 
         href={`https://www.viator.com/?pid=P00000000&mcid=42383&medium=link&medium_version=selector&campaign=${MARKER}`}
         target="_blank"
         rel="noopener noreferrer"
         className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
       >
         Search Tours on Viator
       </a>
    </div>
  );
}
