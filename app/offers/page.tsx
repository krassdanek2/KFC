'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';

export default function OffersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const offers = products.filter(p => p.discount || p.category === 'exclusive-deals');

  const filteredOffers = selectedFilter === 'all' 
    ? offers 
    : selectedFilter === 'high-discount'
    ? offers.filter(o => o.discount && o.discount >= 50)
    : selectedFilter === 'new'
    ? offers.filter(o => o.isNew)
    : offers;

  const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'high-discount', name: '50% OFF & Above' },
    { id: 'new', name: 'New Offers' },
  ];

  const couponCodes = [
    {
      code: 'KFC50',
      title: 'Get 50% OFF',
      description: 'On orders above 50 AED',
      expiry: 'Valid till 31st Dec',
      bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
    },
    {
      code: 'FAMILY25',
      title: 'Family Meal Deal',
      description: '25% OFF on family buckets',
      expiry: 'Valid till 31st Dec',
      bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      code: 'FREESHIP',
      title: 'Free Delivery',
      description: 'On all orders above 30 AED',
      expiry: 'Valid till 31st Dec',
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
    },
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg z-50 animate-slide-up';
    toast.textContent = `Coupon code ${code} copied!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 md:pb-0">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Exclusive Offers</h1>

        {/* Coupon Codes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Coupon Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {couponCodes.map((coupon) => (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`${coupon.bgColor} text-white rounded-lg p-6 cursor-pointer`}
                onClick={() => copyCode(coupon.code)}
              >
                <div className="flex items-start justify-between mb-3">
                  <Tag className="w-8 h-8" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    Click to copy
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
                <p className="text-sm mb-3 opacity-90">{coupon.description}</p>
                <div className="border-t border-white/30 pt-3 flex items-center justify-between">
                  <span className="font-mono text-lg font-bold">{coupon.code}</span>
                  <div className="flex items-center text-xs opacity-80">
                    <Clock className="w-3 h-3 mr-1" />
                    {coupon.expiry}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto gap-3 mb-8 pb-3 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedFilter === category.id
                  ? 'bg-kfc-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={offer.image}
                  alt={offer.name}
                  fill
                  className="object-cover"
                />
                {offer.discount && (
                  <div className="absolute top-2 left-2 bg-kfc-red text-white px-3 py-2 rounded text-lg font-bold">
                    {offer.discount}% OFF
                  </div>
                )}
                {offer.isNew && (
                  <div className="absolute top-2 right-2 bg-kfc-yellow text-black px-3 py-2 rounded text-sm font-bold">
                    NEW
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{offer.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-kfc-red">{offer.price} AED</span>
                    {offer.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {offer.originalPrice} AED
                      </span>
                    )}
                  </div>
                  {offer.discount && (
                    <span className="text-green-600 font-semibold">
                      Save {((offer.originalPrice || 0) - offer.price).toFixed(0)} AED
                    </span>
                  )}
                </div>

                <Link
                  href={`/menu?category=${offer.category}`}
                  className="flex items-center justify-center bg-kfc-red text-white py-2 rounded-lg font-medium hover:bg-kfc-dark-red transition-colors"
                >
                  Order Now
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terms & Conditions */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• All offers are valid for a limited time only</li>
            <li>• Offers cannot be combined with other promotions</li>
            <li>• Delivery charges apply as per standard rates</li>
            <li>• KFC reserves the right to modify or cancel offers at any time</li>
            <li>• Valid at participating stores only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}