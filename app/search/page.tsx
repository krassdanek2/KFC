'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, Star, Clock } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    'Zinger Burger',
    'Box Master',
    'Twister',
    'Family Feast',
    'Pepsi',
    'Coleslaw'
  ];

  const featuredItems = [
    {
      id: 'f1',
      name: 'Mighty Cruncher Meal- Large',
      price: '20 AED',
      category: 'Exclusive Deals',
      image: '/images/menu/1091-combo.png',
      time: '15-20 minutes'
    },
    {
      id: 'f2',
      name: 'Super Mega Deal',
      price: '25 AED',
      category: 'Exclusive Deals',
      image: '/images/menu/247-combo.png',
      time: '15-20 minutes'
    },
    {
      id: 'f3',
      name: 'Super 30',
      price: '50 AED',
      category: 'Exclusive Deals',
      image: '/images/menu/303-combo.png',
      time: '15-20 minutes'
    }
  ];

  const categoryImages = [
    { name: 'Combo', image: '/images/menu/combo.png', href: '/menu?category=Exclusive%20Deals' },
    { name: 'Burgers', image: '/images/menu/burgers.png', href: '/menu?category=Burgers' },
    { name: 'Drinks', image: '/images/menu/drinks.png', href: '/menu?category=Drinks' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="text-2xl text-gray-700" />
          </Link>
          <div className="relative flex-1">
            <input
              placeholder="Search for delicious food..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 focus:bg-white transition-all"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Popular Searches */}
        <div className="mb-8 px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 relative">
            <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-[2px] after:bg-red-500">
              Popular Searches
            </span>
            <Star className="text-red-500" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <section className="explore-menu">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative font-bold text-base after:content-[''] after:block after:h-0.5 after:bg-red-500 after:w-10 after:mt-1">
                OUR SPECIALS
              </h2>
              <div className="w-6 h-6 ml-3">
                <Star className="text-lg text-red-500" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 pb-6">
            {categoryImages.map((category, index) => (
              <Link key={index} href={category.href} className="block group">
                <Image
                  alt={category.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  src={category.image}
                />
              </Link>
            ))}
          </div>
          <div className="mt-8 py-4 px-4">
            <Link href="/menu" className="block">
              <Image
                alt="Banner"
                width={1200}
                height={1200}
                className="w-full h-auto rounded-lg"
                src="/images/menu/banner4.jpeg"
              />
            </Link>
          </div>
        </section>

        {/* Featured Items */}
        <div className="mb-6 px-4 mt-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            Featured Items
            <Star className="text-yellow-500" />
          </h3>
          <div className="space-y-4">
            {featuredItems.map((item) => (
              <Link key={item.id} href="/menu?category=Exclusive%20Deals" className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0 mt-1 mx-1">
                    <Image
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      src={item.image}
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <span className="text-red-500 font-bold">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="text-xs text-red-500" />
                          <span className="text-xs">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Hot Deals */}
        <div className="mb-6 relative z-0">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">🔥 Hot Deals Today!</h3>
              <p className="text-red-100 mb-4">Get up to 30% off on combo meals</p>
              <Link href="/menu?category=Exclusive%20Deals" className="bg-white text-red-500 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors inline-block">
                Explore Deals
              </Link>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-12 px-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">What are you craving?</h3>
          <p className="text-center text-gray-500 leading-relaxed">
            Search for your favorite KFC items or browse our categories above
          </p>
        </div>
      </div>
    </div>
  );
}