'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, LocateFixed } from 'lucide-react';
import GoogleMap from '@/components/features/GoogleMap';
import AddressSearch from '@/components/features/AddressSearch';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    lat: 25.243143,
    lng: 55.748749,
    address: 'Sha\'biyyat as Rashidiyyah, Sharjah Emirate, United Arab Emirates'
  });

  useEffect(() => {
    // Load saved location from localStorage
    const savedLocation = localStorage.getItem('kfc-selected-location');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        if (parsed.lat && parsed.lng) {
          setSelectedLocation(parsed);
        }
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleConfirmLocation = () => {
    // Save location to localStorage
    localStorage.setItem('kfc-selected-location', JSON.stringify(selectedLocation));
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <div className="relative h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md z-50">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ArrowLeft className="text-2xl text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Select Location</h1>
                <p className="text-sm text-gray-500">Choose your delivery address</p>
              </div>
            </div>
          </div>
          
          {/* Delivery Method */}
          <div className="mb-1">
            <div className="delivery-method mt-2 md:mt-4 bg-white w-full">
              <div className="flex items-center justify-center px-2 sm:px-4 gap-4 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-12 xl:gap-16">
                <div className="flex flex-col items-center flex-shrink-0 mt-1 min-w-0">
                  <button className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 hover:scale-105 transition-all duration-200 flex items-center justify-center border-red-500">
                    <Image
                      alt="DELIVERY"
                      width={32}
                      height={32}
                      className="object-contain w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10"
                      src="/images/menu/icon_address_type_delivery_col.png"
                      style={{ color: 'transparent' }}
                    />
                  </button>
                  <span className="mt-1 mb-2 sm:mt-2 text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight truncate max-w-[60px] sm:max-w-[80px] md:max-w-none text-red-500 font-bold">
                    DELIVERY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-2/3 max-h-[66vh] min-h-[300px]">
          {/* Search Bar */}
          <div className="absolute top-4 left-4 right-4 z-[1000]">
            <AddressSearch
              onLocationSelect={handleLocationSelect}
              placeholder="Search for an address..."
            />
          </div>

          {/* Google Map */}
          <GoogleMap
            onLocationSelect={handleLocationSelect}
            initialLocation={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        </div>

        {/* Bottom Sheet */}
        <div className="flex-1 bg-white rounded-t-3xl shadow-2xl">
          <div className="p-6">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <MapPin className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Selected Location</h3>
                <p className="text-sm text-gray-500">Delivery address</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 text-lg mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedLocation.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmLocation}
              className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-base hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}