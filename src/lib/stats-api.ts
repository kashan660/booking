const TRAVELPAYOUTS_API_URL = 'https://api.travelpayouts.com/statistics/v1';
const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

export async function getAffiliateStatistics(startDate: string) {
  if (!TRAVELPAYOUTS_TOKEN) {
    console.warn("TravelPayouts token not found");
    return [];
  }

  // https://api.travelpayouts.com/statistics/v1/sales.json?group_by=date&date_from=...
  const url = `${TRAVELPAYOUTS_API_URL}/sales.json?group_by=date&date_from=${startDate}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Access-Token': TRAVELPAYOUTS_TOKEN,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
        // Log the error but return empty to avoid crashing UI
        const text = await response.text();
        console.error('Failed to fetch booking stats:', text);
        return [];
    }

    const json = await response.json();
    return json.sales || [];
  } catch (error) {
    console.error('Failed to fetch booking stats:', error);
    return [];
  }
}
