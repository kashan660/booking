import { NextResponse } from 'next/server';

const TRAVELPAYOUTS_API_URL = 'https://api.travelpayouts.com/statistics/v1';
const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

export interface BookingStatistics {
  action_id: string;
  action_type: 'booking' | 'paid_click' | 'advertise_profit';
  price_usd: number;
  paid_profit_usd: number;
  state: string;
  date: string;
  updated_at: string;
  created_at: string;
  campaign_id: number;
  airline_code?: string;
  airline_name?: string;
  adults?: number;
  children?: number;
  user_device_type?: string;
  external_click_id?: string;
  sub_id?: string;
}

export interface BookingStatsParams {
  campaignId?: number;
  startDate: string;
  endDate: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Get detailed booking statistics from Travelpayouts API
 * This provides comprehensive data on bookings, clicks, and revenue
 */
export async function getDetailedBookingStatistics(
  params: BookingStatsParams
): Promise<{ results: BookingStatistics[]; total: number }> {
  if (!TRAVELPAYOUTS_TOKEN) {
    throw new Error('Travelpayouts API token not configured');
  }

  const {
    campaignId,
    startDate,
    endDate,
    limit = 100,
    offset = 0,
    sortBy = 'date',
    sortOrder = 'desc'
  } = params;

  // Build the request body for the statistics API
  const requestBody = {
    fields: [
      'action_id',
      'action_type',
      'price_usd',
      'paid_profit_usd',
      'state',
      'date',
      'updated_at',
      'created_at',
      'campaign_id',
      'airline_code',
      'airline_name',
      'adults',
      'children',
      'user_device_type',
      'external_click_id',
      'sub_id'
    ],
    filters: [
      {
        field: 'date',
        op: 'ge',
        value: startDate
      },
      {
        field: 'date',
        op: 'le',
        value: endDate
      }
    ],
    sort: [
      {
        field: sortBy,
        order: sortOrder
      }
    ],
    offset,
    limit
  };

  // Add campaign filter if specified
  if (campaignId) {
    requestBody.filters.push({
      field: 'campaign_id',
      op: 'eq',
      value: campaignId
    });
  }

  const url = `${TRAVELPAYOUTS_API_URL}/execute_query`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': TRAVELPAYOUTS_TOKEN
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Travelpayouts API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total: data.total || data.results?.length || 0
    };
  } catch (error) {
    console.error('Failed to fetch booking statistics:', error);
    throw error;
  }
}

/**
 * Get aggregated statistics for dashboard/overview
 */
export async function getAggregatedStats(
  startDate: string,
  endDate: string,
  campaignId?: number
) {
  try {
    const stats = await getDetailedBookingStatistics({
      startDate,
      endDate,
      campaignId,
      limit: 10000 // Get all records for aggregation
    });

    const aggregated = {
      totalBookings: 0,
      totalRevenue: 0,
      totalClicks: 0,
      averageBookingValue: 0,
      conversionRate: 0,
      topCampaigns: {} as Record<number, { bookings: number; revenue: number }>,
      deviceBreakdown: {} as Record<string, number>,
      monthlyTrend: [] as Array<{ month: string; bookings: number; revenue: number }>
    };

    // Process statistics
    stats.results.forEach(stat => {
      if (stat.action_type === 'booking') {
        aggregated.totalBookings++;
        aggregated.totalRevenue += stat.paid_profit_usd;
        
        // Campaign breakdown
        if (!aggregated.topCampaigns[stat.campaign_id]) {
          aggregated.topCampaigns[stat.campaign_id] = { bookings: 0, revenue: 0 };
        }
        aggregated.topCampaigns[stat.campaign_id].bookings++;
        aggregated.topCampaigns[stat.campaign_id].revenue += stat.paid_profit_usd;
        
        // Device breakdown
        const device = stat.user_device_type || 'unknown';
        aggregated.deviceBreakdown[device] = (aggregated.deviceBreakdown[device] || 0) + 1;
      } else if (stat.action_type === 'paid_click') {
        aggregated.totalClicks++;
      }
    });

    // Calculate averages and rates
    if (aggregated.totalBookings > 0) {
      aggregated.averageBookingValue = aggregated.totalRevenue / aggregated.totalBookings;
    }
    
    if (aggregated.totalClicks > 0) {
      aggregated.conversionRate = (aggregated.totalBookings / aggregated.totalClicks) * 100;
    }

    return aggregated;
  } catch (error) {
    console.error('Failed to aggregate stats:', error);
    throw error;
  }
}

/**
 * Get available fields and their types from Travelpayouts API
 */
export async function getAvailableFields(dataType: 'raw' | 'aggregated' = 'raw'): Promise<any[]> {
  if (!TRAVELPAYOUTS_TOKEN) {
    throw new Error('Travelpayouts API token not configured');
  }

  const url = `${TRAVELPAYOUTS_API_URL}/get_fields_list?data_type=${dataType}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Access-Token': TRAVELPAYOUTS_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch available fields');
  }

  const data = await response.json();
  return data.fields || [];
}