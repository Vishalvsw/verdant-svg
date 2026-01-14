
export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PlotOption {
  id: string;
  size: string;
  dimensions: string;
  price: string;
  status: 'Available' | 'Sold Out' | 'Fast Filling';
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  plotType: string;
  status: 'New' | 'Contacted' | 'Visit Scheduled' | 'Sold' | 'Lost';
  createdAt: string;
}

export interface Booking {
  id: string;
  leadId: string;
  clientName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes?: string;
}

export type AppView = 'landing' | 'login' | 'admin';
