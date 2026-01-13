"use client";

import Script from "next/script";

export function FlightWidget() {
  return (
    <div className="w-full my-12 flex justify-center">
      <Script
        src="https://tpwgts.com/content?trs=488444&shmarker=696229&locale=en&border_radius=9&plain=true&powered_by=true&promo_id=3408&campaign_id=86"
        strategy="lazyOnload"
      />
    </div>
  );
}
