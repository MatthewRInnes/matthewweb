import { NextResponse } from 'next/server';

// List of restricted regions
const RESTRICTED_REGIONS = [
  // Countries
  'CN', // China
  'VN', // Vietnam
  'UA', // Ukraine
  'RU', // Russia
  'KP', // North Korea
  'UZ', // Uzbekistan
  // US States
  'US-PA', // Pennsylvania
  'US-NY', // New York
  'US-WA'  // Washington
];

export function geoRestrictionMiddleware(request: Request) {
  // Get the user's IP address from the request
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  
  // In a production environment, you would use a service like MaxMind or IP2Location
  // to get the user's country and state based on their IP address
  // For now, we'll use a mock implementation
  const userLocation = getUserLocation(ip);

  if (RESTRICTED_REGIONS.includes(userLocation)) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Access denied',
        message: 'This service is not available in your region due to legal restrictions.'
      }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return NextResponse.next();
}

// Mock function - replace with actual IP geolocation service
function getUserLocation(ip: string | null): string {
  // In production, use a service like:
  // - MaxMind GeoIP2
  // - IP2Location
  // - IPStack
  // For now, return a mock value
  return 'US'; // This is just for development
} 