'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, Search, Tag, ShoppingBag, ShoppingCart } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('kfc-cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    
    // Listen for storage changes (when cart is updated from other tabs)
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navItems = [
    { href: '/menu', icon: Home, label: 'Menu' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/offers', icon: Tag, label: 'Offers' },
    { href: '/orders', icon: ShoppingBag, label: 'Orders' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart', showBadge: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <nav className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 flex-1 relative ${
                isActive ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {item.showBadge && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}