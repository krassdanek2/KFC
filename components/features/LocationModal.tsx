'use client';

import { useState, useEffect } from 'react';
import { X, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  const locations = [
    'Dubai Mall',
    'Mall of the Emirates',
    'Dubai Marina Mall',
    'Ibn Battuta Mall',
    'City Centre Deira',
    'Dubai Festival City',
    'Burjuman',
    'Mercato Shopping Mall',
  ];

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem('selectedLocation', location);
    localStorage.setItem('deliveryType', deliveryType);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-90 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-full max-w-md max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">SELECT LOCATION</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-600 mb-4">Get accurate pricing and menu listing</p>

              {/* Delivery Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-kfc-red bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://kfc.discount/_next/image?url=https%3A%2F%2Fkfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net%2Fcmsimages%2Fkfc%2Fimagestemp%2Ficon_address_type_delivery_col.png&w=64&q=75"
                      alt="Delivery"
                      width={48}
                      height={48}
                    />
                    <span className="mt-2 font-medium">DELIVERY</span>
                  </div>
                </button>

                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-kfc-red bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <MapPin className="w-12 h-12 text-kfc-red" />
                    <span className="mt-2 font-medium">PICKUP</span>
                  </div>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for area, street name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-kfc-red"
                />
              </div>

              {/* Locations List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleSelectLocation(location)}
                    className={`w-full text-left p-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors ${
                      selectedLocation === location ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{location}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Use Current Location Button */}
              <button
                onClick={() => {
                  // In a real app, this would request geolocation
                  handleSelectLocation('Current Location');
                }}
                className="w-full mt-4 py-3 bg-kfc-red text-white rounded-lg font-medium hover:bg-kfc-dark-red transition-colors"
              >
                Use Current Location
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}