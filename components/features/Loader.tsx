'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img 
          src="/kfc-loader.gif" 
          alt="Loading..." 
          className="w-32 h-32 object-contain"
          onError={(e) => {
            // Fallback if gif doesn't exist
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden text-center">
          <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">KFC</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}
