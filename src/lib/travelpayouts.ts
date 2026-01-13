import { NextResponse } from 'next/server';

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

export interface FlightTicket {
  origin: string;
  destination: string;
  price: number;
  airline: string;
  flight_number: number;
  departure_at: string;
  return_at: string;
  transfers: number;
  duration: number;
  link: string;
}

export async function getFlightPrices(
  origin: string,
  destination: string,
  date?: string,
  isOneWay: boolean = true
): Promise<FlightTicket[]> {
  if (!TRAVELPAYOUTS_TOKEN) {
    console.error('TRAVELPAYOUTS_TOKEN is not defined');
    return [];
  }

  const queryParams = new URLSearchParams({
    origin,
    destination,
    currency: 'usd',
    sorting: 'price',
    limit: '20',
    token: TRAVELPAYOUTS_TOKEN
  });

  if (date) {
    queryParams.append('departure_at', date);
  }
  
  if (isOneWay) {
    queryParams.append('one_way', 'true');
  }

  // Use v3/prices_for_dates for best specific date results
  const url = `${TRAVELPAYOUTS_API_URL.replace('/statistics/v1', '')}/aviasales/v3/prices_for_dates?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch flight prices: ${response.statusText}`);
    }

    const data = await response.json();
    
    // The API returns { data: [ ... ] }
    if (data && data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching flight prices:", error);
    return [];
  }
}

export async function getBookingStatistics(startDate: string) {
  if (!TRAVELPAYOUTS_TOKEN) {
    throw new Error('TRAVELPAYOUTS_TOKEN is not defined');
  }

  // First, get available fields
  const fieldsResponse = await fetch(`${TRAVELPAYOUTS_API_URL}/get_fields_list`, {
    headers: {
      'X-Access-Token': TRAVELPAYOUTS_TOKEN,
    },
    cache: 'no-store',
  });

  if (!fieldsResponse.ok) {
    throw new Error('Failed to fetch fields list');
  }

  const fieldsData = await fieldsResponse.json();
  const fieldNames = fieldsData.fields.map((f: any) => f.name);

  // Construct the query
  const query = {
    fields: fieldNames,
    filters: [
      {
        field: 'date',
        op: 'ge',
        value: startDate,
      },
    ],
    sort: [
      {
        field: 'date',
        order: 'desc',
      },
    ],
    limit: 100,
    offset: 0,
  };

  // Execute query
  const response = await fetch(`${TRAVELPAYOUTS_API_URL}/execute_query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': TRAVELPAYOUTS_TOKEN,
    },
    body: JSON.stringify(query),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch statistics');
  }

  return await response.json();
}
