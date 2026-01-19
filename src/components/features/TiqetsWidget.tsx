"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function TiqetsWidget() {
  const [height, setHeight] = useState(400);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'tiqets-widget-resize' && typeof event.data.height === 'number') {
        setHeight(event.data.height);
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border p-4 relative transition-all duration-300" style={{ height: `${height}px`, minHeight: '400px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 rounded-xl">
          <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
          <p className="text-sm text-slate-500">Loading experiences...</p>
        </div>
      )}
      <iframe
        src="/tiqets-widget.html"
        title="Tiqets Experiences"
        className="w-full h-full border-0"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
