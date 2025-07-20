import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Satellite } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  city: string;
  country: string;
  timezone: string;
}

export const GeolocationTracker: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string>('');

  const trackLocation = () => {
    setIsTracking(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setIsTracking(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // Simulate reverse geocoding
          const mockLocation: LocationData = {
            latitude,
            longitude,
            accuracy,
            city: 'San Francisco',
            country: 'United States',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          
          setLocation(mockLocation);
        } catch (err) {
          setError('Failed to get location details');
        }
        
        setIsTracking(false);
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="bg-black bg-opacity-60 border border-green-500 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Satellite className="h-4 w-4 text-green-400" />
          <span className="text-green-400 font-semibold">GPS TRACKER</span>
        </div>
        {!isTracking && !location && (
          <button
            onClick={trackLocation}
            className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-3 py-1 rounded text-sm hover:bg-opacity-30 transition-colors"
          >
            TRACK LOCATION
          </button>
        )}
      </div>

      {isTracking && (
        <div className="text-center py-4">
          <div className="animate-spin inline-block">
            <Satellite className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-green-300 text-sm mt-2">Acquiring GPS signal...</p>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm mb-3">
          <span className="text-red-500">ERROR:</span> {error}
        </div>
      )}

      {location && (
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-green-500" />
            <span className="text-green-500">COORDINATES:</span>
            <span className="text-green-300">
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-3 w-3 text-green-500" />
            <span className="text-green-500">LOCATION:</span>
            <span className="text-green-300">{location.city}, {location.country}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">ACCURACY:</span>
            <span className="text-green-300">±{Math.round(location.accuracy)}m</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">TIMEZONE:</span>
            <span className="text-green-300">{location.timezone}</span>
          </div>
        </div>
      )}
    </div>
  );
};



