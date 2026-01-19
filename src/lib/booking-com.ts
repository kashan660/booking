import { addDays, format } from "date-fns";

// Configuration
// You need to register at https://developers.booking.com/ to get these credentials
const BOOKING_API_HOST = process.env.BOOKING_API_HOST || "https://demandapi.booking.com/3.1";
const BOOKING_API_KEY = process.env.BOOKING_API_KEY;
const BOOKING_AFFILIATE_ID = process.env.BOOKING_AFFILIATE_ID;

// Types based on Booking.com Demand API (Simplified for integration)
export interface BookingSearchRequest {
  city?: string;
  country?: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  currency: string;
  limit?: number;
}

export interface BookingHotel {
  hotel_id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  latitude: number;
  longitude: number;
  currency: string;
  min_price: number;
  max_price: number;
  photo_url: string;
  deep_link_url: string; // URL to redirect user to Booking.com
  review_score?: number;
  review_score_word?: string;
  stars?: number;
  amenities?: string[];
}

export interface BookingSearchResponse {
  count: number;
  result: BookingHotel[];
}

/**
 * Searches for hotels using the Booking.com Demand API.
 * This allows for Real-Time availability and pricing directly on your site.
 */
export async function searchBookingHotels(params: BookingSearchRequest): Promise<BookingHotel[]> {
  if (!BOOKING_API_KEY) {
    console.warn("Booking.com API Key is missing. Returning mock data.");
    return getMockHotels(params);
  }

  // Note: The actual endpoint structure depends on the specific version of Demand API you are using.
  // This is a generic example for "Search and Redirect" flow.
  const url = `${BOOKING_API_HOST}/accommodations/search`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BOOKING_API_KEY}`,
        "X-Affiliate-Id": BOOKING_AFFILIATE_ID || "",
      },
      body: JSON.stringify({
        checkin: params.checkIn,
        checkout: params.checkOut,
        guests: {
          number_of_adults: params.adults,
          number_of_children: params.children
        },
        location: {
          city: params.city
        },
        currency: params.currency,
        limit: params.limit || 20
      }),
      next: { revalidate: 0 } // Real-time data, do not cache heavily
    });

    if (!response.ok) {
      throw new Error(`Booking.com API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return transformBookingResponse(data);

  } catch (error) {
    console.error("Failed to fetch from Booking.com:", error);
    return [];
  }
}

/**
 * Transforms the raw API response into our internal BookingHotel interface.
 */
function transformBookingResponse(rawData: any): BookingHotel[] {
  // Adapt this mapping based on the actual JSON structure returned by the API version you use.
  if (!rawData || !Array.isArray(rawData.hotels)) return [];

  return rawData.hotels.map((hotel: any) => ({
    hotel_id: hotel.id,
    name: hotel.name,
    address: hotel.address,
    city: hotel.city,
    country: hotel.country,
    zip: hotel.zip,
    latitude: hotel.location.lat,
    longitude: hotel.location.lon,
    currency: hotel.price.currency,
    min_price: hotel.price.min,
    max_price: hotel.price.max,
    photo_url: hotel.photos?.[0]?.url || "/images/placeholder-hotel.jpg",
    deep_link_url: hotel.deep_link,
    review_score: hotel.review_score,
    stars: hotel.class,
  }));
}

/**
 * Returns mock data for demonstration when API keys are not present.
 */
async function getMockHotels(params: BookingSearchRequest): Promise<BookingHotel[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const city = params.city || "Dubai";
  
  // Create richer mock data with more variety
  const hotelNames = [
    `Grand ${city} Plaza`,
    `${city} Marina Resort`,
    `The Royal ${city} Hotel`,
    `Downtown ${city} Suites`,
    `${city} Boutique Hideaway`,
    `Luxury Palms ${city}`,
    `${city} City Center Inn`
  ];

  return hotelNames.map((name, i) => {
    // Generate deterministic random-like values based on index
    const basePrice = 120 + (i * 45) + (Math.random() * 20);
    const rating = 7.5 + (i * 0.3) % 2.5;
    const stars = 3 + (i % 3);
    
    return {
      hotel_id: 1000 + i,
      name: name,
      address: `${100 + i * 12} Main Boulevard`,
      city: city,
      country: "Country",
      zip: "12345",
      latitude: 0,
      longitude: 0,
      currency: params.currency,
      min_price: Math.floor(basePrice),
      max_price: Math.floor(basePrice * 1.5),
      photo_url: `https://images.unsplash.com/photo-${[
        "1566073771259-6a8506099945", // Luxury
        "1582719508461-905c673771fd", // Resort
        "1571003123894-1f0594d2b5d9", // City
        "1561501900-3701fa6a0864", // Pool
        "1542314831-068cd1dbfeeb", // Palace
        "1596394516093-501ba68a0ba6", // Modern
        "1520250497591-112f2f40a3f4"  // Classic
      ][i % 7]}?auto=format&fit=crop&q=80`,
      deep_link_url: "https://www.booking.com",
      review_score: parseFloat(rating.toFixed(1)),
      stars: stars,
      amenities: [
        "Free WiFi", 
        i % 2 === 0 ? "Swimming Pool" : "City View", 
        i % 3 === 0 ? "Spa & Wellness" : "Fitness Center",
        "Restaurant"
      ].slice(0, 3)
    };
  });
}
