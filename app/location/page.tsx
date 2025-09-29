'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Search, Navigation } from 'lucide-react';

export default function LocationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    address: 'Sha\'biyyat as Rashidiyyah, Sharjah Emirate, United Arab Emirates',
    coordinates: '25.243143, 55.748749'
  });

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

        {/* Map Area */}
        <div className="relative h-2/3 max-h-[66vh] min-h-[300px]">
          {/* Search Bar */}
          <div className="absolute top-4 left-4 right-4 z-[1000]">
            <div className="relative">
              <input
                placeholder="Search for an address..."
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-lg"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Interactive Map</p>
              <p className="text-gray-400 text-sm">Map integration would go here</p>
            </div>
          </div>

          {/* Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24C32 7.163 24.837 0 16 0z" fill="#E4002B"></path>
              <circle cx="16" cy="16" r="6" fill="white"></circle>
            </svg>
          </div>

          {/* My Location Button */}
          <button className="absolute bottom-4 right-4 z-[1000] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <Navigation className="text-red-500 text-xl" />
          </button>
        </div>

        {/* Bottom Panel */}
        <div className="flex-1 bg-white rounded-t-3xl shadow-2xl">
          <div className="p-6">
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            {/* Selected Location Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <MapPin className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Selected Location</h3>
                <p className="text-sm text-gray-500">Delivery address</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 text-lg mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedLocation.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedLocation.coordinates}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
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