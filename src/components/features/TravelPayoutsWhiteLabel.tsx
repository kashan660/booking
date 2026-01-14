"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function TravelPayoutsWhiteLabel() {
  const scriptLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scriptLoaded.current) {
      setIsLoading(false);
      return;
    }

    // Check if script already exists to avoid duplicates
    if (document.querySelector('script[src*="tpwgts.com/wl_web/main.js"]')) {
      scriptLoaded.current = true;
      setIsLoading(false);
      return;
    }

    const loadScript = () => {
      setError(null);
      setIsLoading(true);

      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.src = "https://tpwgts.com/wl_web/main.js?wl_id=3677";
      
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setError("The search widget is taking longer than expected to load.");
          setIsLoading(false);
        }
      }, 10000); // 10 second timeout

      script.onload = () => {
        clearTimeout(timeoutId);
        setIsLoading(false);
        scriptLoaded.current = true;
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        setError("Failed to load the search widget. Please check your connection and try again.");
        setIsLoading(false);
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Widget Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="w-fit">
            Reload Page
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="travelpayouts-wrapper space-y-8 min-h-[400px]">
       {isLoading && (
         <div className="flex flex-col items-center justify-center py-20 text-slate-500">
           <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
           <p>Loading flight search...</p>
         </div>
       )}
       
       {/* Search Form Container */}
       <div id="tpwl-search" className={isLoading ? "hidden" : ""}></div>
       
       {/* Search Results Container */}
       <div id="tpwl-tickets" className={isLoading ? "hidden" : ""}></div>
    </div>
  );
}
