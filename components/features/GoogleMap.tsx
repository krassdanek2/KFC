'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function GoogleMap({ onLocationSelect, initialLocation }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyDehdA6FPjPGyijDq-5chiYI7gUjsL7QoE',
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await (loader as any).importLibrary('maps');
        const { Marker } = await (loader as any).importLibrary('marker');
        const { Geocoder } = await (loader as any).importLibrary('geocoder');

        if (!mapRef.current) return;

        // Default location (Dubai)
        const defaultLocation = initialLocation || { lat: 25.2048, lng: 55.2708 };

        const mapInstance = new Map(mapRef.current, {
          center: defaultLocation,
          zoom: 15,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Create marker
        const markerInstance = new Marker({
          position: defaultLocation,
          map: mapInstance,
          draggable: true,
          title: 'Delivery Location'
        });

        // Geocoder for reverse geocoding
        const geocoder = new Geocoder();

        // Handle marker drag
        markerInstance.addListener('dragend', () => {
          const position = markerInstance.getPosition();
          if (position) {
            const lat = position.lat();
            const lng = position.lng();
            
            // Reverse geocode to get address
            geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
              if (status === 'OK' && results && results[0]) {
                onLocationSelect({
                  lat,
                  lng,
                  address: results[0].formatted_address
                });
              }
            });
          }
        });

        // Handle map click
        mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            
            // Move marker to clicked location
            markerInstance.setPosition({ lat, lng });
            
            // Reverse geocode to get address
            geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
              if (status === 'OK' && results && results[0]) {
                onLocationSelect({
                  lat,
                  lng,
                  address: results[0].formatted_address
                });
              }
            });
          }
        });

        setMap(mapInstance);
        setMarker(markerInstance);
        setIsLoading(false);

        // Set initial location
        if (initialLocation) {
          geocoder.geocode({ location: initialLocation }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
              onLocationSelect({
                lat: initialLocation.lat,
                lng: initialLocation.lng,
                address: results[0].formatted_address
              });
            }
          });
        }

      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();
  }, [onLocationSelect, initialLocation]);

  const centerMap = () => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(userLocation);
          if (marker) {
            marker.setPosition(userLocation);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (error) {
    return (
      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">Map Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Center location button */}
      <button
        onClick={centerMap}
        className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow duration-200"
        title="Center on my location"
      >
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}
