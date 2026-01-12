export interface Location {
  id?: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  type: 'airport' | 'city' | 'hotel' | 'station';
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'sedan' | 'suv' | 'van' | 'minibus' | 'luxury';
  capacity: {
    passengers: number;
    luggage: number;
  };
  price: number;
  currency: string;
  image?: string;
  description?: string;
  features: string[];
}

export interface BookingRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  date: Date;
  time: string; // HH:mm
  passengers: number;
  returnDate?: Date;
  returnTime?: string;
}
