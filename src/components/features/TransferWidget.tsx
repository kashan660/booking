"use client";

import { useEffect, useRef } from "react";

export function TransferWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    
    initialized.current = true;

    const script = document.createElement("script");
    script.src = "https://tpwgts.com/content?currency=USD&trs=488444&shmarker=696229.696229&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879";
    script.charset = "utf-8";
    script.async = true;
    
    containerRef.current.appendChild(script);

    return () => {
      // Cleanup if needed, though these widgets often modify DOM outside their container or are hard to remove cleanly.
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden -mt-10 relative z-10 border border-slate-100">
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
