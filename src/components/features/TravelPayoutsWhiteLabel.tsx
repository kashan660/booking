"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function TravelPayoutsWhiteLabel({ 
  onResultsShow,
  searchParams
}: { 
  onResultsShow?: () => void;
  searchParams?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle flight widget resize
      if (event.data.type === 'tpwl-resize' && typeof event.data.height === 'number') {
        setHeight(event.data.height + 50); 
      }
      // Handle hotel widget resize (if reused here or globally)
      if (event.data.type === 'hotel-widget-resize' && typeof event.data.height === 'number') {
        // We can add logic here if this component is used for hotels too, 
        // but currently hotels use a separate iframe in the page.tsx
      }
      
      if (event.data.type === 'tpwl-loaded') {
        setIsLoading(false);
      }
      if (event.data.type === 'tpwl-results' && onResultsShow) {
        onResultsShow();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onResultsShow]);

  // Construct src with search params if provided
  // Note: searchParams should be the query string (e.g. "flightSearch=...")
  const src = "/flight-widget.html" + (searchParams ? `?${searchParams}` : "");

  return (
    <div className="travelpayouts-wrapper w-full relative isolate transition-all duration-300" style={{ height: `${height}px`, minHeight: '500px' }}>
       {isLoading && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 rounded-xl">
           <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
           <p className="text-sm font-medium text-slate-600">Loading flight search engine...</p>
         </div>
       )}
       
       <iframe
        src={src}
        title="Flight Search"
        className="w-full h-full border-0"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
       />
    </div>
  );
}
