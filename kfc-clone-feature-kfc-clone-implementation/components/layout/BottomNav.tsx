'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Tag, ShoppingBag, ShoppingCart } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/menu', icon: Home, label: 'Menu' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/offers', icon: Tag, label: 'Offers' },
    { href: '/orders', icon: ShoppingBag, label: 'Orders' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <nav className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 flex-1 ${
                isActive ? 'text-kfc-red' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}