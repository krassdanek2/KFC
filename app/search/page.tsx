'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updatedHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const popularSearches = ['Zinger', 'Bucket', 'Twister', 'Drinks', 'Combo'];

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 md:pb-0">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Search</h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search for your favorite meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            onFocus={() => setShowHistory(true)}
            className="w-full pl-14 pr-12 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-kfc-red"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Search History & Popular Searches */}
        {!searchQuery && (
          <div className="mb-8">
            {searchHistory.length > 0 && showHistory && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Recent Searches</h2>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(query)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-kfc-red transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-3">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchQuery(query)}
                    className="px-4 py-2 bg-kfc-red text-white rounded-full text-sm hover:bg-kfc-dark-red transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <Link href={`/menu?category=${product.category}`}>
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-kfc-red text-white px-2 py-1 rounded text-sm font-bold">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-kfc-red">{product.price} AED</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice} AED
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <SearchIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!searchQuery && !showHistory && (
          <div className="text-center py-12">
            <SearchIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">What are you craving today?</h2>
            <p className="text-gray-600">Search for your favorite KFC meals</p>
          </div>
        )}
      </div>
    </div>
  );
}