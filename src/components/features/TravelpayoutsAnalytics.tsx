"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  MousePointer, 
  Plane, 
  Hotel, 
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { format, subDays } from 'date-fns';

interface RevenueAnalytics {
  totalBookings: number;
  totalRevenue: number;
  totalClicks: number;
  averageBookingValue: number;
  conversionRate: number;
  topCampaigns: Record<number, { bookings: number; revenue: number }>;
  deviceBreakdown: Record<string, number>;
}

interface BookingStats {
  date: string;
  bookings: number;
  revenue: number;
  clicks: number;
}

export function TravelpayoutsAnalytics() {
  const [analytics, setAnalytics] = useState<RevenueAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (days: number) => {
    try {
      setLoading(true);
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = subDays(new Date(), days).toISOString().split('T')[0];

      const response = await fetch(`/api/admin/travelpayouts-stats?startDate=${startDate}&endDate=${endDate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(parseInt(dateRange));
  }, [dateRange]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics(parseInt(dateRange));
  };

  const handleExport = () => {
    if (!analytics) return;

    const csvContent = [
      ['Date Range', 'Total Bookings', 'Total Revenue', 'Total Clicks', 'Conversion Rate', 'Avg Booking Value'],
      [
        `${dateRange} days`,
        analytics.totalBookings.toString(),
        `$${analytics.totalRevenue.toFixed(2)}`,
        analytics.totalClicks.toString(),
        `${analytics.conversionRate.toFixed(2)}%`,
        `$${analytics.averageBookingValue.toFixed(2)}`
      ]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travelpayouts-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
        <Button onClick={handleRefresh} variant="outline" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const campaignNames: Record<number, string> = {
    100: 'Aviasales (Flights)',
    84: 'Booking.com (Hotels)',
    85: 'GetYourGuide (Tours)',
    86: 'Kiwitaxi (Transfers)'
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Travelpayouts Analytics</h2>
          <p className="text-muted-foreground">Affiliate program performance metrics</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          
          <Button onClick={handleRefresh} variant="outline" disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${analytics.averageBookingValue.toFixed(2)} avg per booking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalClicks > 0 ? `${((analytics.totalBookings / analytics.totalClicks) * 100).toFixed(1)}% conversion` : 'No clicks'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.conversionRate.toFixed(1)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Industry avg: 2-3%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averageBookingValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per successful booking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      {Object.keys(analytics.topCampaigns).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.topCampaigns).map(([campaignId, data]) => (
                <div key={campaignId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {campaignId === '100' ? <Plane className="h-4 w-4" /> : <Hotel className="h-4 w-4" />}
                    <span className="font-medium">{campaignNames[parseInt(campaignId)] || `Campaign ${campaignId}`}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{data.bookings} bookings</Badge>
                    <span className="font-semibold">${data.revenue.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Device Breakdown */}
      {Object.keys(analytics.deviceBreakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.deviceBreakdown).map(([device, count]) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {device === 'mobile' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                    <span className="font-medium capitalize">{device}</span>
                  </div>
                  <Badge>{count} bookings</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}