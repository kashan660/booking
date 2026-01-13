import { NextResponse } from 'next/server';
import { format, addMonths } from 'date-fns';

const TRAVELPAYOUTS_API_URL = 'https://api.travelpayouts.com/statistics/v1';
const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

// Autocomplete API (Public)
const AUTOCOMPLETE_URL = 'https://autocomplete.travelpayouts.com/places2';

export interface LocationData {
  code: string;
  name: string;
  country_name: string;
  type: string;
  coordinates: {
    lon: number;
    lat: number;
  };
}

export async function searchLocations(term: string): Promise<LocationData[]> {
  const url = `${AUTOCOMPLETE_URL}?term=${encodeURIComponent(term)}&locale=en&types[]=city&types[]=airport`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return await response.json();
}

export interface HotelPrice {
  priceAvg: number;
  pricePercentile: number;
  hotelName: string;
  stars: number;
  location: {
    geo: {
      lat: number;
      lon: number;
    };
    name: string;
    state: string | null;
    country: string;
  };
  hotelId: number;
  locationId: number;
}

export async function getHotelPrices(
  location: string,
  checkIn: string,
  checkOut: string,
  limit: number = 20
): Promise<HotelPrice[]> {
  // Use Hotellook Cache API
  // https://engine.hotellook.com/api/v2/cache.json?location=Paris&currency=usd&checkIn=2024-12-01&checkOut=2024-12-07&limit=10
  
  const queryParams = new URLSearchParams({
    location,
    checkIn,
    checkOut,
    currency: 'usd',
    limit: limit.toString(),
    token: TRAVELPAYOUTS_TOKEN || ''
  });

  const url = `https://engine.hotellook.com/api/v2/cache.json?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
        // If 404 or empty, return empty array
        return [];
    }

    const json = await response.json();
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error('Failed to fetch hotel prices:', error);
    return [];
  }
}

export function getHotelDeepLink(
    hotelId: number,
    checkIn: string,
    checkOut: string,
    adults: number = 2,
    children: number = 0
): string {
    const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '696229';
    // https://search.hotellook.com/hotels?hotelId=...&checkIn=...&checkOut=...&adults=...&marker=...
    const params = new URLSearchParams({
        hotelId: hotelId.toString(),
        checkIn,
        checkOut,
        adults: adults.toString(),
        children: children.toString(),
        marker,
        currency: 'usd',
        language: 'en'
    });
    
    return `https://search.hotellook.com/hotels?${params.toString()}`;
}

export function getHotelSearchDeepLink(
  location: string,
  checkIn: string,
  checkOut: string,
  adults: number = 2,
  children: number = 0
): string {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '696229';
  const params = new URLSearchParams({
    location,
    checkIn,
    checkOut,
    adults: adults.toString(),
    children: children.toString(),
    marker,
    currency: 'usd',
    language: 'en'
  });
  
  return `https://search.hotellook.com/hotels?${params.toString()}`;
}

  export interface CheapestTicket {
  price: number;
  airline: string;
  flight_number: number;
  departure_at: string;
  return_at: string;
  expires_at: string;
  destination: string;
  origin: string;
}

export async function getCheapestFlights(
  origin: string,
  destination: string = '-', // '-' means any destination
  departDate?: string, // YYYY-MM
  returnDate?: string
): Promise<CheapestTicket[]> {
  if (!TRAVELPAYOUTS_TOKEN) return [];

  const queryParams = new URLSearchParams({
    origin,
    destination,
    currency: 'usd',
    token: TRAVELPAYOUTS_TOKEN,
    page: '1'
  });

  if (departDate) queryParams.append('depart_date', departDate);
  if (returnDate) queryParams.append('return_date', returnDate);

  const url = `${TRAVELPAYOUTS_API_URL.replace('/statistics/v1', '')}/v1/prices/cheap?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Access-Token': TRAVELPAYOUTS_TOKEN,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error('Failed to fetch cheapest flights');

    const json = await response.json();
    
    // The API returns { success: true, data: { "HKT": { "0": { ... }, "1": { ... } } } }
    // We need to flatten this into an array
    if (json.success && json.data) {
      const tickets: CheapestTicket[] = [];
      
      Object.keys(json.data).forEach(dest => {
        const destData = json.data[dest];
        Object.values(destData).forEach((ticket: any) => {
          tickets.push({
            ...ticket,
            destination: dest,
            origin
          });
        });
      });
      
      return tickets.sort((a, b) => a.price - b.price);
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching cheapest flights:", error);
    return [];
  }
}

export interface FlightTicket {
    price: number;
    airline: string;
    flight_number: number;
    departure_at: string;
    return_at: string;
    transfers: number;
    return_transfers: number;
    duration: number;
    duration_to: number;
    duration_return: number;
    link: string;
}

export async function getFlightPrices(
  origin: string,
  destination: string,
  date?: string
): Promise<FlightTicket[]> {
    // For direct flight prices, we can use the same cheapest flights API or calendar API
    // The previous implementation seems to be missing, so we'll map getCheapestFlights to FlightTicket
    
    const cheapest = await getCheapestFlights(origin, destination, date);
    
    return cheapest.map(t => ({
        price: t.price,
        airline: t.airline,
        flight_number: t.flight_number,
        departure_at: t.departure_at,
        return_at: t.return_at,
        transfers: 0, // Mock data as cheap API might not return this
        return_transfers: 0,
        duration: 0,
        duration_to: 0,
        duration_return: 0,
        link: `/search/${origin}${date ? format(new Date(date), 'ddMMyyyy') : ''}${destination}1`
    }));
}



