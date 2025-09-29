'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronDown,
  ChevronRight,
  MapPin, 
  Star,
  Flame,
  Search,
  ShoppingCart,
  Tag,
  FileText,
  CircleChevronRight,
  PercentIcon
} from 'lucide-react';

export default function Home() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('AlLahjah Institute, Sharjah - ...');

  useEffect(() => {
    // Check if location is already selected
    const location = localStorage.getItem('selectedLocation');
    if (location) {
      setSelectedLocation(location);
    }

  }, []);

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <main className="mb-18">
        
        {/* Top Menu Section */}
        <section className="top-menu bg-white px-4 pt-2">
          <div className="top-navigate flex items-center justify-between">
            <div className="flex items-center gap-3 h-16">
              <MapPin className="text-2xl" />
              <div className="flex flex-col max-w-[200px]">
                <h2 className="text-sm font-bold truncate">{selectedLocation}</h2>
                <p className="text-xs text-gray-600 flex flex-row items-center">15 minutes delivery</p>
              </div>
              <button className="ml-1 rounded-lg bg-red-500 w-[19px] h-[19px] flex items-center justify-center shadow-sm">
                <ChevronDown className="w-full h-full text-white" />
              </button>
            </div>
            <button className="font-bold rounded-lg bg-[#fffafa] border-dred border-solid border-[2px] w-[64px] h-[30px] flex items-center justify-center shadow-sm text-sm text-dred">
              login
            </button>
          </div>
          
          {/* Delivery Method */}
          <div className="delivery-method mt-2 md:mt-4 bg-white w-full">
            <div className="flex items-center justify-center px-2 sm:px-4 gap-4">
              <div className="flex flex-col items-center flex-shrink-0 mt-1 min-w-0">
                <button className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 hover:scale-105 transition-all duration-200 flex items-center justify-center border-dred">
                  <Image
                    src="/images/icon_address_type_delivery_col.png"
                    alt="DELIVERY"
                    width={40}
                    height={40}
                    className="object-contain w-10 h-10"
                  />
                </button>
                <span className="mt-1 mb-2 sm:mt-2 text-xs sm:text-sm font-bold text-dred">DELIVERY</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXCLUSIVE OFFERS Section */}
        <section className="Offers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <h2 className="text-base font-bold">EXCLUSIVE OFFERS</h2>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-dred mt-1"></div>
              </div>
              <Flame className="text-lg text-dred" />
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide scroll-smooth">
            <div className="w-[344px] h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  src="/images/sm123.jpeg"
                  alt="Mighty Twist"
                  width={344}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-[344px] h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  src="/images/FD_AE_En_190525.jpeg"
                  alt="Loaded Twist"
                  width={344}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-[344px] h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  src="/images/stripsdipping_UAE_En_270325.jpeg"
                  alt="Strips Dipping"
                  width={344}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-[344px] h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  src="/images/cheeselavameal_AE_En_140525.jpeg"
                  alt="Cheese Lavameal"
                  width={344}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-[344px] h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  src="/images/superduobucket_AE_En_010825.jpeg"
                  alt="Super Duo Bucket"
                  width={344}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* EXPLORE MENU Section */}
        <section className="explore-menu">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative font-bold text-base after:content-[''] after:block after:h-0.5 after:bg-dred after:w-10 after:mt-1">
                EXPLORE MENU
              </h2>
              <div className="w-6 h-6 ml-3">
                <CircleChevronRight className="text-lg text-dred" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 pb-8">
            <Link href="/menu?category=Exclusive%20Deals" className="block group">
              <Image
                src="/images/Exclusive_Deals_En_211124.png"
                alt="Exclusive Deals"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Twisters" className="block group">
              <Image
                src="/images/twisters_En_170625.png"
                alt="Twisters"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Chicken%20Meals" className="block group">
              <Image
                src="/images/ChickenMeals_En_211124.png"
                alt="Chicken Meals"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Burgers" className="block group">
              <Image
                src="/images/burgers_En_170625.png"
                alt="Burger"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Chicken%20Buckets" className="block group">
              <Image
                src="/images/Chickenbuckets_En_211124.png"
                alt="Chicken Buckets"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Drinks" className="block group">
              <Image
                src="/images/sidesamddrink_En_180625.png"
                alt="Drinks"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>
        </section>

        {/* BESTSELLERS Section */}
        <section className="bestsellers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative text-base font-bold after:content-[''] after:block after:h-0.5 after:bg-dred after:w-12 after:mt-1">
                BESTSELLERS
              </h2>
              <div className="w-6 h-6 ml-3">
                <Star className="text-yellow-400 text-2xl" />
              </div>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide">
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                src="/assets/img/deals/bestsellers/MightyTwist.jpg"
                alt="Mighty Twist"
                width={176}
                height={304}
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white flex items-center gap-1">
                Mighty Twist
                <ChevronRight className="text-white" />
              </p>
            </Link>
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                src="/assets/img/deals/bestsellers/duozinger.jpg"
                alt="Duo Zinger"
                width={176}
                height={304}
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white flex items-center gap-1">
                Duo Zinger
                <ChevronRight className="text-white" />
              </p>
            </Link>
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                src="/assets/img/deals/bestsellers/loadedtwist.jpg"
                alt="Loaded Twist"
                width={176}
                height={304}
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white flex items-center gap-1">
                Loaded Twist
                <ChevronRight className="text-white" />
              </p>
            </Link>
          </div>
        </section>

        {/* TOP DEALS Section */}
        <section className="top-deals p-4 md:px-6">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center">
              <h2 className="relative text-lg md:text-xl font-bold after:content-[''] after:block after:h-0.5 after:bg-dred after:w-12 after:mt-1">
                TOP DEALS
              </h2>
              <div className="w-6 h-6 ml-3">
                <PercentIcon className="text-dred text-xl" />
              </div>
            </div>
            <button className="text-sm md:text-base font-bold flex items-center gap-1 hover:underline text-dred">
              View All
              <CircleChevronRight className="text-base" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            {/* Super 30 Deal - Exact from original HTML */}
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/303-combo.png"
                  alt="Super 30"
                  width={300}
                  height={300}
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-dred text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  76% OFF
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">Super 30</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">15pcs chicken+ 15pcs strips + Family Fries</p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl font-bold text-dred">50 AED</span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">208.5 AED</span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link href="/menu?category=Exclusive%20Deals" className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Mighty Cruncher - Exact from original HTML */}
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png"
                  alt="Mighty Cruncher Meal- Large"
                  width={300}
                  height={300}
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">Mighty Cruncher Meal- Large</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">Mighty Cruncher + Fries + Drink</p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl font-bold text-dred">20 AED</span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">30 AED</span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link href="/menu?category=Exclusive%20Deals" className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Super Mega Deal - Exact from original HTML */}
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png"
                  alt="Super Mega Deal"
                  width={300}
                  height={300}
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-dred text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  67% OFF
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">Super Mega Deal</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">12pcs Chicken + Family Fries + Large Coleslaw</p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl font-bold text-dred">25 AED</span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">75 AED</span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link href="/menu?category=Exclusive%20Deals" className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banners Section */}
        <section className="bottom-banner">
          <div className="mt-2 py-4 px-4">
            <Link href="#" className="block">
              <Image
                src="https://i.ibb.co/KzLJYjFd/bn2.jpg"
                alt="KFC Banner"
                width={1200}
                height={1200}
                className="w-full h-auto rounded-lg"
              />
            </Link>
          </div>
        </section>

        {/* Bottom Image Section */}
        <section className="bottom-img w-full bg-white mb-2">
          <div className="mt-8 py-4 px-4">
            <Link href="#" className="block">
              <Image
                src="/assets/img/ads/banner3.png"
                alt="KFC Banner"
                width={1200}
                height={1200}
                className="w-full h-auto rounded-lg"
              />
            </Link>
            <p className="text-sm text-center mt-2 mb-3 font-medium">
              Kentucky Fried Chicken | It's finger lickin' good
            </p>
          </div>
        </section>

        {/* Fixed Bottom Navigation - Exact from original HTML */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
          <div className="flex justify-between items-center px-6 py-2">
            <Link className="flex flex-col items-center" href="/menu">
              <svg className="text-2xl text-black mb-1" viewBox="0 0 24 24" height="1em" width="1em">
                <path fill="currentColor" d="M21.893 8.23c-4.187.001-5.249 2.365-5.42 3.97-.194 1.802 1.053 3.57 4.127 3.57 1.294 0 2.14-.225 2.44-.32a.215.215 0 00.147-.166l.173-.91a.184.184 0 00-.236-.21c-.336.106-.93.252-1.685.252-1.469 0-2.53-.882-2.395-2.4.13-1.47 1.121-2.59 2.485-2.59.82 0 1.183.43 1.156 1.003v.033a.184.184 0 00.182.193h.557c.086 0 .16-.06.18-.143l.39-1.76a.215.215 0 00-.15-.255 7.21 7.21 0 00-1.95-.266zm-20.157.116a.2.2 0 00-.195.156l-.108.484a.198.198 0 00.13.23l.033.01c.208.082.45.266.348.748l-.792 3.62c-.207.987-.542 1.19-.86 1.226h-.01a.2.2 0 00-.176.157l-.102.464a.192.192 0 00.187.233h3.487c.085 0 .159-.06.177-.142l.12-.543a.184.184 0 00-.112-.21l-.022-.01c-.177-.07-.418-.224-.356-.51l.405-1.85c1.389 2.535 1.848 3.266 3.514 3.265H8.91a.181.181 0 00.177-.142l.105-.47a.195.195 0 00-.186-.238c-.376-.006-.56-.093-.935-.575l-1.932-2.614 2.51-2.088c.337-.264.748-.338.976-.368l.022-.002a.185.185 0 00.163-.144l.103-.464a.184.184 0 00-.18-.223h-3.02a.199.199 0 00-.193.155l-.102.46a.2.2 0 00.138.235c.178.069.217.24.063.366L4.046 11.7l.44-2.014a.683.683 0 01.477-.487l.025-.008a.199.199 0 00.135-.147l.106-.477a.181.181 0 00-.177-.22zm8.88 0a.2.2 0 00-.194.156l-.107.483a.19.19 0 00.122.221l.02.008c.204.077.487.274.364.758l-1.21 5.48a.182.182 0 00.178.222h2.777c.086 0 .16-.06.179-.143l.12-.547a.174.174 0 00-.098-.196 1.558 1.558 0 01-.027-.013c-.176-.086-.438-.285-.35-.67.009-.05.27-1.24.27-1.24h2.362c.086 0 .16-.06.18-.143l.221-1a.183.183 0 00-.18-.224h-2.28l.427-1.94 1.592-.003c.515 0 .672.27.642.728l-.002.024a.184.184 0 00.183.205h.587c.086 0 .16-.06.178-.144l.4-1.8a.184.184 0 00-.18-.222z"/>
              </svg>
              <span className="text-sm text-black font-medium">Menu</span>
            </Link>
            <Link className="flex flex-col items-center" href="/search">
              <Search className="text-2xl text-black mb-1" />
              <span className="text-xs text-black mt-1 font-medium">Search</span>
            </Link>
            <Link className="flex flex-col items-center relative -mt-4" href="/offers">
              <div className="absolute -top-2 w-12 h-12 bg-dred rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Tag className="text-xl text-white" />
              </div>
              <span className="text-xs text-black mt-11 font-medium">Offers</span>
            </Link>
            <Link className="flex flex-col items-center" href="/orders">
              <FileText className="text-2xl text-black mb-1" />
              <span className="text-xs text-black mt-1 font-medium">Orders</span>
            </Link>
            <Link className="flex flex-col items-center relative" href="/cart">
              <div className="relative">
                <ShoppingCart className="text-2xl text-black" />
              </div>
              <span className="text-xs text-black mt-1 font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
