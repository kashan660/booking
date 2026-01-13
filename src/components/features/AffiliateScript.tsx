"use client";

import Script from "next/script";

export function AffiliateScript() {
  return (
    <Script
      id="affiliate-tracking"
      strategy="afterInteractive"
      data-noptimize="1"
      data-cfasync="false"
      data-wpfc-render="false"
    >
      {`
        (function () { 
          var script = document.createElement("script"); 
          script.async = 1; 
          script.src = 'https://emrldtp.com/NDg4NDQ0.js?t=488444'; 
          document.head.appendChild(script); 
        })();
      `}
    </Script>
  );
}
