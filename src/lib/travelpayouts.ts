import { NextResponse } from 'next/server';

const TRAVELPAYOUTS_API_URL = 'https://api.travelpayouts.com/statistics/v1';
const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

export async function getBookingStatistics(startDate: string) {
  if (!TRAVELPAYOUTS_TOKEN) {
    throw new Error('TRAVELPAYOUTS_TOKEN is not defined');
  }

  // First, get available fields
  const fieldsResponse = await fetch(`${TRAVELPAYOUTS_API_URL}/get_fields_list`, {
    headers: {
      'X-Access-Token': TRAVELPAYOUTS_TOKEN,
    },
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
  });

  if (!response.ok) {
    throw new Error('Failed to fetch statistics');
  }

  return await response.json();
}
