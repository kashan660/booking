import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardData(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      bookings: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });
  return user;
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await getDashboardData(session.user.email);
  if (!user) return null;

  const upcomingBookings = user.bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const completedBookings = user.bookings.filter(b => b.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h2>
        <p className="text-muted-foreground">Here's what's happening with your trips.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.bookings.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Bookings</h3>
          <Button variant="outline" asChild>
            <Link href="/profile/bookings">View All</Link>
          </Button>
        </div>

        {user.bookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
              <Button asChild>
                <Link href="/booking">Book a Trip</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {user.bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="grid gap-1">
                    <div className="font-semibold">
                      {booking.pickup} to {booking.dropoff}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.date} at {booking.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {booking.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
