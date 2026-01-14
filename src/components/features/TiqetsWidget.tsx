"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function TiqetsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    const loadWidget = () => {
      setError(null);
      setIsLoading(true);

      try {
        const script = document.createElement("script");
        script.src = "https://tpwgts.com/content?currency=USD&trs=488444&shmarker=696229&language=en&locale=260932&layout=horizontal&cards=4&powered_by=true&campaign_id=89&promo_id=3947";
        script.charset = "utf-8";
        script.async = true;

        const timeoutId = setTimeout(() => {
          if (isLoading) {
            // Widget might still be loading, but we stop showing the main spinner
            // The widget itself handles its own loading state usually
          }
        }, 8000);

        script.onload = () => {
          clearTimeout(timeoutId);
          setIsLoading(false);
        };

        script.onerror = () => {
          clearTimeout(timeoutId);
          setError("Failed to load the experiences widget. Please check your connection.");
          setIsLoading(false);
        };

        containerRef.current?.appendChild(script);
      } catch (err) {
        setError("An unexpected error occurred while loading the widget.");
        setIsLoading(false);
      }
    };

    loadWidget();

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-4xl mx-auto my-8">
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
    <div className="w-full bg-white rounded-xl shadow-sm border p-4 min-h-[400px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 rounded-xl">
          <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
          <p className="text-sm text-slate-500">Loading experiences...</p>
        </div>
      )}
      <div ref={containerRef} className="w-full tiqets-widget-container" />
    </div>
  );
}
