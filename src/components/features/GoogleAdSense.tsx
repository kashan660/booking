"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export function GoogleAdSense() {
  const pathname = usePathname();

  // Do not render AdSense on the homepage
  if (pathname === "/") {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1283869746905817"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
