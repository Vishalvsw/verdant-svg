
import { Amenity, PlotOption, Testimonial, Lead, Booking } from './types';

export const AMENITIES: Amenity[] = [
  { id: '1', name: 'Grand Clubhouse', icon: '🏰', description: '5,000 sq.ft luxury space for social gatherings.' },
  { id: '2', name: 'Swimming Pool', icon: '🏊', description: 'Olympic-sized temperature controlled pool.' },
  { id: '3', name: '24/7 Security', icon: '🛡️', description: 'Multi-tier CCTV and manned security posts.' },
  { id: '4', name: 'Jogging Track', icon: '🏃', description: '2km scenic rubberized walking & running track.' },
  { id: '5', name: 'Children\'s Play Area', icon: '🎠', description: 'Safe and modern playground for all ages.' },
  { id: '6', name: 'Gymnasium', icon: '💪', description: 'State-of-the-art fitness center with trainers.' },
  { id: '7', name: 'Lush Green Park', icon: '🌳', description: '40% open space with themed gardens.' },
  { id: '8', name: 'EV Charging', icon: '⚡', description: 'Eco-friendly infrastructure for your future.' },
];

export const INITIAL_PLOTS: PlotOption[] = [
  { id: 'p1', size: '1,200 sq.ft', dimensions: '30 x 40', price: '$99,000', status: 'Fast Filling' },
  { id: 'p2', size: '1,500 sq.ft', dimensions: '30 x 50', price: '$125,000', status: 'Available' },
  { id: 'p3', size: '2,400 sq.ft', dimensions: '40 x 60', price: '$195,000', status: 'Available' },
  { id: 'p4', size: '4,000 sq.ft', dimensions: '50 x 80', price: '$320,000', status: 'Sold Out' },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah Jenkins', role: 'Homeowner', content: 'Verdant Valley is exactly what we were looking for. The location is prime and the development speed is impressive.', rating: 5 },
  { name: 'David Miller', role: 'Real Estate Investor', content: 'The ROI potential here is huge. The developers have a solid track record and clear legal documentation.', rating: 5 },
  { name: 'Priya Sharma', role: 'Tech Professional', content: 'Gated community with all amenities. It\'s a perfect place to build a weekend home away from city noise.', rating: 4 },
];

export const PROJECT_DETAILS = {
  name: "Verdant Valley Estates",
  location: "North Hills, Riverside County",
  developer: "Lumina Developers Group",
  developerYear: "1998",
  totalArea: "50 Acres",
  totalPlots: "250 Units",
  possession: "Dec 2025"
};

export const INITIAL_LEADS: Lead[] = [
  { id: 'L1', name: 'Robert Fox', email: 'robert@example.com', phone: '+1 234 567 8901', plotType: 'Premium', status: 'New', createdAt: new Date().toISOString() },
  { id: 'L2', name: 'Jenny Wilson', email: 'jenny@example.com', phone: '+1 234 567 8902', plotType: 'Standard', status: 'Contacted', createdAt: new Date().toISOString() },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'B1', leadId: 'L1', clientName: 'Robert Fox', date: '2024-06-25', time: '10:00 AM', status: 'Confirmed' }
];

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const SEO_STRATEGY = {
  targetKeywords: [
    { keyword: "Plots for sale in North Hills", difficulty: "Medium", volume: "2,400/mo" },
    { keyword: "Residential plots near Riverside County", difficulty: "High", volume: "1,800/mo" },
    { keyword: "Gated community plots North Hills", difficulty: "Low", volume: "900/mo" },
    { keyword: "Land for sale in North Hills area", difficulty: "Medium", volume: "3,100/mo" },
  ],
  checklist: [
    { category: "Google Business Profile", items: [
      "Claim business name 'Verdant Valley Estates'",
      "Verify address in North Hills, Riverside County",
      "Upload 20+ High-res site photos and 360-degree drone views",
      "Collect 5 reviews from existing plot owners",
      "Post weekly site development updates"
    ]},
    { category: "On-Page Optimization", items: [
      "Optimized Meta Title: Premium Residential Plots for Sale in North Hills | Verdant Valley",
      "H1 Tag: Your Dream Legacy Starts at Verdant Valley Estates",
      "ALT tags for all project layout and master plan images",
      "Internal linking from Developer's main site",
      "Fast-loading mobile experience (LCP under 2.5s)"
    ]},
    { category: "Local Backlinks", items: [
      "Listing on Riverside County real estate directories",
      "Guest post on North Hills local news blog",
      "Press release on Phase 1 project launch",
      "Partnering with local architectural firms for referrals"
    ]}
  ],
  metaTemplate: {
    title: "Residential Plots for Sale in North Hills | Verdant Valley Estates",
    description: "Discover exclusive gated community plots in North Hills, Riverside County. Starting from $99k with world-class amenities like clubhouse, swimming pool & 24/7 security. Reserve your site visit today!",
    ogImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
  }
};
