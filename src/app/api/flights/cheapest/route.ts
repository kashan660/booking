import { NextResponse } from 'next/server';
import { getCheapestFlights } from '@/lib/travelpayouts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || 'LON';

  try {
    const flights = await getCheapestFlights(origin);
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Failed to fetch cheapest flights:', error);
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
  }
}
