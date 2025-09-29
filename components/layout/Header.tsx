'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, User, ShoppingCart, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get cart count from localStorage
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartCount(cartItems.length);
    }
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-24 h-12">
                <Image
                  src="/assets/img/kfc-logo.png"
                  alt="KFC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/menu" 
                className="text-gray-800 hover:text-kfc-red transition-colors font-medium"
              >
                Menu
              </Link>
              <Link 
                href="/offers" 
                className="text-gray-800 hover:text-kfc-red transition-colors font-medium"
              >
                Offers
              </Link>
              <Link 
                href="/search" 
                className="text-gray-800 hover:text-kfc-red transition-colors font-medium"
              >
                Search
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Location Button */}
              <button 
                className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-kfc-red transition-colors"
                onClick={() => {
                  // Open location modal
                  const event = new CustomEvent('openLocationModal');
                  window.dispatchEvent(event);
                }}
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Select Location</span>
              </button>

              {/* Login Button */}
              <Link 
                href="/login" 
                className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-kfc-red transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>

              {/* Cart Button */}
              <Link 
                href="/cart" 
                className="relative text-gray-700 hover:text-kfc-red transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-kfc-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-white z-40 transform transition-transform duration-300 lg:hidden ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <Link 
            href="/menu" 
            className="block py-2 text-gray-800 hover:text-kfc-red transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link 
            href="/offers" 
            className="block py-2 text-gray-800 hover:text-kfc-red transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Offers
          </Link>
          <Link 
            href="/search" 
            className="block py-2 text-gray-800 hover:text-kfc-red transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          <Link 
            href="/orders" 
            className="block py-2 text-gray-800 hover:text-kfc-red transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Orders
          </Link>
          <div className="pt-4 mt-4 border-t">
            <button 
              className="flex items-center space-x-2 text-gray-700 hover:text-kfc-red transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                const event = new CustomEvent('openLocationModal');
                window.dispatchEvent(event);
              }}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Select Location</span>
            </button>
            <Link 
              href="/login" 
              className="flex items-center space-x-2 text-gray-700 hover:text-kfc-red transition-colors mt-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}