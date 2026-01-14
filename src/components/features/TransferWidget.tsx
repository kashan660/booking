"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function TransferWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    
    initialized.current = true;

    const loadScript = () => {
      setError(null);
      setIsLoading(true);

      const script = document.createElement("script");
      script.src = "https://tpwgts.com/content?currency=USD&trs=488444&shmarker=696229.696229&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879";
      script.charset = "utf-8";
      script.async = true;
      
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          // Note: Some widgets might take time to render even after script load, 
          // but we can't easily detect that without internal events. 
          // We'll just assume if script loaded, it's fine, but if it takes too long to load script...
          // Actually, for widgets that modify DOM, onload is good enough for script download.
          // But visually it might still be loading.
          // We'll keep the loader until onload fires.
        }
      }, 10000);

      script.onload = () => {
        clearTimeout(timeoutId);
        setIsLoading(false);
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        setError("Failed to load the transfer widget. Please check your connection.");
        setIsLoading(false);
      };
      
      containerRef.current?.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-6xl mx-auto my-8">
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
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden -mt-10 relative z-10 border border-slate-100 min-h-[200px]">
      {isLoading && (
         <div className="flex flex-col items-center justify-center py-10 text-slate-500 absolute inset-0 bg-white z-20">
           <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
           <p>Loading transfers...</p>
         </div>
       )}
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
