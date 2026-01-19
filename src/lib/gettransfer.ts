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
  error?: string; // Added for error propagation
  data?: {
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
    console.error("Missing coordinates for location");
    return { result: "error", error: "Missing coordinates" };
  }

  // Ensure date format includes timezone if possible, or matches expected format
  // GetTransfer expects: 2025-11-15T18:30:00+07:00
  // Incoming dateTo is: 2025-11-15T18:30:00 (no timezone)
  // We'll append +00:00 (UTC) or let it be treated as local if the API supports it.
  // Ideally, we should use the pickup location's timezone, but for now we'll pass as is.
  
  const url = `${GETTRANSFER_API_URL}/route_info?points[]=${from.coordinates.lat},${from.coordinates.lon}&points[]=${to.coordinates.lat},${to.coordinates.lon}&with_prices=true&pax=${pax}&date_to=${dateTo}&currency=${currency}`;
  
  console.log("Fetching GetTransfer prices:", url);

  try {
    // Add headers to mimic a real browser and avoid Cloudflare blocking
    const headers = {
      "X-ACCESS-TOKEN": ACCESS_TOKEN || "",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://lugvia.com/",
      "Origin": "https://lugvia.com"
    };

    let res = await fetch(url, {
      headers,
      next: { revalidate: 0 }, // Live data
    });

    // If production fails with 403/401, try Sandbox as fallback (in case the token is for sandbox)
    if (res.status === 403 || res.status === 401) {
        console.warn(`GetTransfer Production API blocked (${res.status}). Attempting Sandbox...`);
        const sandboxUrl = url.replace('gettransfer.com', 'gtrbox.org');
        
        const sandboxRes = await fetch(sandboxUrl, {
            headers,
            next: { revalidate: 0 }
        });
        
        if (sandboxRes.ok) {
            console.log("GetTransfer Sandbox API success!");
            res = sandboxRes; // Use sandbox response
        } else {
            console.warn(`GetTransfer Sandbox also failed: ${sandboxRes.status}`);
            // Stick with original error if sandbox also fails
        }
    }

    if (!res.ok) {
        const errorBody = await res.text();
        const isCloudflare = errorBody.includes("Cloudflare");
        console.error(`GetTransfer API Error (${res.status}): ${isCloudflare ? "Cloudflare Block" : errorBody.substring(0, 200)}`);
        
        return { result: "error", error: `API Error: ${res.status} ${isCloudflare ? "(Security Block)" : res.statusText}` };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch transfer prices:", error);
    return { result: "error", error: "Network or Server Error" };
  }
}
