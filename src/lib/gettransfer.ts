import { Location } from "@/components/features/LocationSearch";

const GETTRANSFER_API_URL = "https://gettransfer.com/api";
const ACCESS_TOKEN = process.env.GETTRANSFER_ACCESS_TOKEN;

export interface TransferPrice {
  min: string;
  min_float: number;
  book_now?: string;
}

export interface RouteInfoResponse {
  result: string;
  data: {
    status?: string;
    distance: number;
    duration: number;
    success: boolean;
    prices: {
      [key: string]: TransferPrice;
    };
  };
}

export async function getTransferPrices(
  from: Location,
  to: Location,
  dateTo: string, // ISO string
  pax: number = 1,
  currency: string = "USD"
): Promise<RouteInfoResponse | null> {
  if (!from.coordinates || !to.coordinates) {
    throw new Error("Missing coordinates for location");
  }

  const params = new URLSearchParams({
    "points[]": `${from.coordinates.lat},${from.coordinates.lon}`,
    "with_prices": "true",
    "pax": pax.toString(),
    "date_to": dateTo,
    "currency": currency,
  });

  // Since we have two points with the same key "points[]", we need to append them manually
  // URLSearchParams supports multiple values for the same key, but let's be explicit
  const url = `${GETTRANSFER_API_URL}/route_info?points[]=${from.coordinates.lat},${from.coordinates.lon}&points[]=${to.coordinates.lat},${to.coordinates.lon}&with_prices=true&pax=${pax}&date_to=${dateTo}&currency=${currency}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-ACCESS-TOKEN": ACCESS_TOKEN || "",
      },
      next: { revalidate: 0 }, // Live data
    });

    if (!res.ok) {
        if (res.status === 429) {
            console.error("GetTransfer API Rate Limit Exceeded");
            // Retry logic could go here
        }
        throw new Error(`GetTransfer API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch transfer prices:", error);
    return null;
  }
}
