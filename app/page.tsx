'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocationModal from '@/components/features/LocationModal';

export default function HomePage() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    // Показать модал выбора локации при первом посещении
    const hasVisited = localStorage.getItem('kfc-visited');
    if (!hasVisited) {
      setShowLocationModal(true);
      localStorage.setItem('kfc-visited', 'true');
    }
  }, []);

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      {/* Location Modal */}
      <LocationModal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)} />

      <main className="mb-18">
        {/* Location Selection Section */}
        <section className="location-section bg-white px-4 py-4 mb-4 shadow-sm">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 h-16">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-3xl text-red-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></path>
                <circle cx="256" cy="192" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
              </svg>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray-800">SELECT LOCATION</h2>
              </div>
              <button className="ml-3 rounded-lg bg-red-500 w-[24px] h-[24px] flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-full h-full text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="delivery-method mt-2 md:mt-4 bg-white w-full">
            <div className="flex items-center justify-center px-2 sm:px-4 gap-4 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-12 xl:gap-16">
              <div className="flex flex-col items-center flex-shrink-0 mt-1 min-w-0">
                <button className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 hover:scale-105 transition-all duration-200 flex items-center justify-center border-red-500">
                  <Image
                    alt="DELIVERY"
                    width={32}
                    height={32}
                    src="/images/menu/icon_address_type_delivery_col.png"
                    className="object-contain w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10"
                  />
                </button>
                <span className="mt-1 mb-2 sm:mt-2 text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight truncate max-w-[60px] sm:max-w-[80px] md:max-w-none text-red-500 font-bold">
                  DELIVERY
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Offers Section */}
        <section className="Offers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <h2 className="text-base bold-font">EXCLUSIVE OFFERS</h2>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-dred mt-1"></div>
              </div>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-lg text-dred" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1 352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9zM713 808.5c-53.7 53.2-125 82.4-201 82.4s-147.3-29.2-201-82.4c-53.5-53.1-83-123.5-83-198.4 0-43.5 9.8-85.2 29.1-124 18.8-37.9 46.8-71.8 80.8-97.9a349.6 349.6 0 0 0 58.6-56.8c25-30.5 44.6-64.5 58.2-101a240 240 0 0 0 12.1-46.5c24.1 22.2 44.3 49 61.2 80.4 33.4 62.6 48.8 118.3 45.8 165.7a74.01 74.01 0 0 0 24.4 59.8 73.36 73.36 0 0 0 53.4 18.8c19.7-1 37.8-9.7 51-24.4 13.3-14.9 24.8-30.1 34.4-45.6 14 17.9 25.7 37.4 35 58.4 15.9 35.8 24 73.9 24 113.1 0 74.9-29.5 145.4-83 198.4z"></path>
              </svg>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide scroll-smooth">
            <div className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  alt="Mighty Twist"
                  width={320}
                  height={176}
                  src="/images/sm123.jpeg"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  alt="Loaded Twist"
                  width={320}
                  height={176}
                  src="/images/FD_AE_En_190525.jpeg"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  alt="Strips Dipping"
                  width={320}
                  height={176}
                  src="/images/stripsdipping_UAE_En_270325.jpeg"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  alt="Cheese Lavameal"
                  width={320}
                  height={176}
                  src="/images/cheeselavameal_AE_En_140525.jpeg"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
              <Link href="/menu?category=Combo%20Meals" className="w-full h-full block group">
                <Image
                  alt="Super Duo Bucket"
                  width={320}
                  height={176}
                  src="/images/superduobucket_AE_En_010825.jpeg"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Explore Menu */}
        <section className="explore-menu">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative bold-font text-base after:content-[''] after:block after:h-0.5 after:bg-dred after:w-10 after:mt-1">
                EXPLORE MENU
              </h2>
              <div className="w-6 h-6 ml-3">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-lg text-dred" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M210.7 147.6c7.5-7.5 19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81.1-81.9-81.1c-7.6-7.4-7.6-19.6 0-27.2z"></path>
                  <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm32 0c0-47 18.3-91.2 51.6-124.4C164.8 98.3 209 80 256 80s91.2 18.3 124.4 51.6C413.7 164.8 432 209 432 256s-18.3 91.2-51.6 124.4C347.2 413.7 303 432 256 432s-91.2-18.3-124.4-51.6C98.3 347.2 80 303 80 256z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 pb-8">
            <Link href="/menu?category=Exclusive%20Deals" className="block group">
              <Image
                alt="Exclusive Deals"
                width={300}
                height={300}
                src="/images/Exclusive_Deals_En_211124.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Twisters" className="block group">
              <Image
                alt="Twisters"
                width={300}
                height={300}
                src="/images/twisters_En_170625.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Chicken%20Meals" className="block group">
              <Image
                alt="Chicken Meals"
                width={300}
                height={300}
                src="/images/ChickenMeals_En_211124.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Burgers" className="block group">
              <Image
                alt="Burger"
                width={300}
                height={300}
                src="/images/burgers_En_170625.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Chicken%20Buckets" className="block group">
              <Image
                alt="Chicken Buckets"
                width={300}
                height={300}
                src="/images/Chickenbuckets_En_211124.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <Link href="/menu?category=Drinks" className="block group">
              <Image
                alt="Drinks"
                width={300}
                height={300}
                src="/images/sidesamddrink_En_180625.png"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="bestsellers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative text-base bold-font after:content-[''] after:block after:h-0.5 after:bg-dred after:w-12 after:mt-1">
                BESTSELLERS
              </h2>
              <div className="w-6 h-6 ml-3">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-yellow-400 text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide">
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                alt="Mighty Twist"
                width={160}
                height={200}
                src="/images/MightyTwist.jpeg"
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white medium-font flex items-center gap-1">
                Mighty Twist
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z"></path>
                </svg>
              </p>
            </Link>
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                alt="Duo Zinger"
                width={160}
                height={200}
                src="/images/duozinger.jpeg"
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white medium-font flex items-center gap-1">
                Duo Zinger
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z"></path>
                </svg>
              </p>
            </Link>
            <Link href="/menu?category=Combo%20Meals" className="flex-shrink-0 group relative">
              <Image
                alt="Loaded Twist"
                width={160}
                height={200}
                src="/images/loadedtwist.jpeg"
                className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <p className="absolute bottom-2 left-2 text-sm font-medium text-white medium-font flex items-center gap-1">
                Loaded Twist
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z"></path>
                </svg>
              </p>
            </Link>
          </div>
        </section>

        {/* Top Deals */}
        <section className="top-deals p-4 md:px-6">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center">
              <h2 className="relative text-lg md:text-xl bold-font after:content-[''] after:block after:h-0.5 after:bg-dred after:w-12 after:mt-1">
                TOP DEALS
              </h2>
              <div className="w-6 h-6 ml-3">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-dred text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <g id="Discount_1"><path d="M21.953,12c0,0.591 -0.346,1.124 -0.839,1.61c-0.295,0.29 -0.639,0.568 -0.942,0.85c-0.242,0.225 -0.46,0.446 -0.562,0.692c-0.107,0.257 -0.114,0.576 -0.105,0.913c0.011,0.416 0.056,0.855 0.059,1.265c0.006,0.691 -0.123,1.304 -0.526,1.708c-0.404,0.403 -1.017,0.532 -1.708,0.526c-0.41,-0.004 -0.849,-0.048 -1.264,-0.059c-0.337,-0.009 -0.657,-0.002 -0.914,0.105c-0.246,0.102 -0.467,0.32 -0.692,0.562c-0.282,0.303 -0.56,0.647 -0.85,0.941c-0.486,0.494 -1.019,0.84 -1.61,0.84c-0.591,-0 -1.124,-0.346 -1.61,-0.84c-0.29,-0.294 -0.568,-0.638 -0.85,-0.941c-0.225,-0.242 -0.447,-0.46 -0.692,-0.562c-0.257,-0.107 -0.577,-0.114 -0.913,-0.105c-0.416,0.011 -0.855,0.055 -1.265,0.059c-0.691,0.006 -1.305,-0.123 -1.708,-0.526c-0.404,-0.404 -0.532,-1.017 -0.526,-1.708c0.003,-0.41 0.048,-0.849 0.059,-1.265c0.009,-0.337 0.002,-0.656 -0.105,-0.914c-0.102,-0.245 -0.32,-0.466 -0.562,-0.691c-0.302,-0.282 -0.646,-0.56 -0.941,-0.85c-0.493,-0.486 -0.84,-1.019 -0.84,-1.61c0,-0.591 0.347,-1.124 0.84,-1.61c0.295,-0.29 0.639,-0.568 0.941,-0.85c0.242,-0.225 0.46,-0.446 0.562,-0.691c0.107,-0.258 0.114,-0.577 0.105,-0.914c-0.011,-0.416 -0.056,-0.855 -0.059,-1.265c-0.006,-0.691 0.122,-1.304 0.526,-1.708c0.403,-0.403 1.017,-0.532 1.708,-0.526c0.41,0.004 0.849,0.048 1.265,0.059c0.336,0.009 0.656,0.002 0.913,-0.105c0.245,-0.102 0.467,-0.32 0.692,-0.562c0.282,-0.303 0.56,-0.647 0.85,-0.941c0.486,-0.494 1.019,-0.84 1.61,-0.84c0.591,0 1.124,0.346 1.61,0.84c0.29,0.294 0.568,0.638 0.85,0.941c0.225,0.242 0.446,0.46 0.692,0.562c0.257,0.107 0.577,0.114 0.914,0.105c0.415,-0.011 0.854,-0.055 1.264,-0.059c0.691,-0.006 1.304,0.123 1.708,0.526c0.403,0.404 0.532,1.017 0.526,1.708c-0.003,0.41 -0.048,0.849 -0.059,1.265c-0.009,0.337 -0.002,0.656 0.105,0.913c0.102,0.246 0.32,0.467 0.562,0.692c0.303,0.282 0.647,0.56 0.942,0.85c0.493,0.486 0.839,1.019 0.839,1.61Zm-1,0c0,-0.188 -0.088,-0.355 -0.206,-0.518c-0.164,-0.226 -0.388,-0.437 -0.622,-0.646c-0.583,-0.521 -1.205,-1.04 -1.439,-1.604c-0.242,-0.585 -0.177,-1.399 -0.136,-2.178c0.017,-0.315 0.027,-0.622 -0.015,-0.895c-0.029,-0.191 -0.08,-0.365 -0.204,-0.489c-0.125,-0.125 -0.299,-0.176 -0.49,-0.205c-0.273,-0.042 -0.58,-0.032 -0.895,-0.015c-0.779,0.041 -1.593,0.106 -2.177,-0.136c-0.565,-0.234 -1.084,-0.855 -1.605,-1.439c-0.209,-0.234 -0.42,-0.458 -0.646,-0.622c-0.163,-0.118 -0.33,-0.206 -0.518,-0.206c-0.187,0 -0.355,0.088 -0.518,0.206c-0.226,0.164 -0.437,0.388 -0.646,0.622c-0.521,0.584 -1.04,1.205 -1.605,1.439c-0.584,0.242 -1.398,0.177 -2.177,0.136c-0.315,-0.017 -0.622,-0.027 -0.895,0.015c-0.192,0.029 -0.365,0.08 -0.49,0.205c-0.125,0.124 -0.175,0.298 -0.204,0.489c-0.042,0.273 -0.032,0.58 -0.016,0.895c0.042,0.779 0.107,1.593 -0.135,2.177c-0.234,0.565 -0.855,1.084 -1.439,1.605c-0.234,0.209 -0.458,0.42 -0.622,0.646c-0.118,0.163 -0.206,0.33 -0.206,0.518c0,0.188 0.088,0.355 0.206,0.518c0.164,0.226 0.388,0.437 0.622,0.646c0.584,0.521 1.205,1.04 1.439,1.605c0.242,0.584 0.177,1.398 0.135,2.177c-0.016,0.315 -0.026,0.622 0.016,0.895c0.029,0.191 0.079,0.365 0.204,0.489c0.125,0.125 0.298,0.176 0.49,0.205c0.273,0.042 0.58,0.032 0.895,0.015c0.779,-0.041 1.593,-0.106 2.177,0.136c0.565,0.234 1.084,0.855 1.605,1.439c0.209,0.234 0.42,0.458 0.646,0.622c0.163,0.118 0.331,0.206 0.518,0.206c0.188,-0 0.355,-0.088 0.518,-0.206c0.226,-0.164 0.437,-0.388 0.646,-0.622c0.521,-0.584 1.04,-1.205 1.605,-1.439c0.584,-0.242 1.398,-0.177 2.177,-0.136c0.315,0.017 0.622,0.027 0.895,-0.015c0.191,-0.029 0.365,-0.08 0.49,-0.205c0.124,-0.124 0.175,-0.298 0.204,-0.489c0.042,-0.273 0.032,-0.58 0.015,-0.895c-0.041,-0.779 -0.106,-1.593 0.136,-2.178c0.234,-0.564 0.856,-1.083 1.439,-1.604c0.234,-0.209 0.458,-0.42 0.622,-0.646c0.118,-0.163 0.206,-0.33 0.206,-0.518Zm-10.531,-1.762c-0.396,0.396 -1.039,0.396 -1.435,-0c-0.396,-0.396 -0.396,-1.04 -0,-1.436c0.396,-0.396 1.039,-0.396 1.435,0c0.396,0.396 0.396,1.04 0,1.436Zm4.471,-1.838c0.195,-0.195 0.512,-0.195 0.707,0c0.195,0.195 0.195,0.512 -0,0.707l-6.493,6.493c-0.195,0.195 -0.512,0.195 -0.707,0c-0.195,-0.195 -0.195,-0.512 -0,-0.707l6.493,-6.493Zm-1.315,5.363c0.396,-0.396 1.039,-0.396 1.435,0c0.396,0.396 0.396,1.04 0,1.436c-0.396,0.396 -1.039,0.396 -1.435,-0c-0.397,-0.396 -0.397,-1.04 -0,-1.436Z"></path></g>
                </svg>
              </div>
            </div>
            <button className="text-sm md:text-base bold-font flex items-center gap-1 hover:underline text-dred">
              View All
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M210.7 147.6c7.5-7.5 19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81.1-81.9-81.1c-7.6-7.4-7.6-19.6 0-27.2z"></path>
                <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm32 0c0-47 18.3-91.2 51.6-124.4C164.8 98.3 209 80 256 80s91.2 18.3 124.4 51.6C413.7 164.8 432 209 432 256s-18.3 91.2-51.6 124.4C347.2 413.7 303 432 256 432s-91.2-18.3-124.4-51.6C98.3 347.2 80 303 80 256z"></path>
              </svg>
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollBehavior: 'smooth' }}>
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  alt="Super 30"
                  width={300}
                  height={300}
                  src="/images/303-combo.png"
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-dred text-white text-xs bold-font px-2 py-1 rounded-full shadow-md">
                  76% OFF
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl bold-font text-gray-900 line-clamp-2 leading-tight">
                    Super 30
                  </h3>
                  <p className="regular-font text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    15pcs chicken+ 15pcs strips + Family Fries
                  </p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl bold-font text-dred">
                      50 AED
                    </span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">
                      208.5 AED
                    </span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link
                    href="/menu?category=Exclusive%20Deals"
                    className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  alt="Mighty Cruncher Meal- Large"
                  width={300}
                  height={300}
                  src="/images/1091-combo.png"
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl bold-font text-gray-900 line-clamp-2 leading-tight">
                    Mighty Cruncher Meal- Large
                  </h3>
                  <p className="regular-font text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    Mighty Cruncher + Fries + Drink
                  </p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl bold-font text-dred">
                      20 AED
                    </span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">
                      30 AED
                    </span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link
                    href="/menu?category=Exclusive%20Deals"
                    className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
              <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  alt="Super Mega Deal"
                  width={300}
                  height={300}
                  src="/images/247-combo.png"
                  className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-dred text-white text-xs bold-font px-2 py-1 rounded-full shadow-md">
                  67% OFF
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl bold-font text-gray-900 line-clamp-2 leading-tight">
                    Super Mega Deal
                  </h3>
                  <p className="regular-font text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    12pcs Chicken + Family Fries + Large Coleslaw
                  </p>
                  <div className="flex items-baseline gap-2 pt-15 pl-2">
                    <span className="text-sm sm:text-xl md:text-2xl bold-font text-dred">
                      25 AED
                    </span>
                    <span className="text-[8px] sm:text-xs text-gray-400 line-through">
                      75 AED
                    </span>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Link
                    href="/menu?category=Exclusive%20Deals"
                    className="inline-flex items-center justify-center text-sm font-semibold text-dred border-2 border-dred rounded-xl px-4 py-2 transition-all duration-200 hover:bg-dred hover:text-white hover:shadow-md active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="bottom-banner">
          <div className="mt-2 py-4 px-4">
            <Link href="/" className="block">
              <Image
                alt="KFC Banner"
                width={1200}
                height={1200}
                src="/images/bn2.jpeg"
                className="w-full h-auto rounded-lg"
              />
            </Link>
          </div>
        </section>

        {/* Footer Banner */}
        <section className="bottom-img w-full bg-white mb-2">
          <div className="mt-8 py-4 px-4">
            <Link href="/" className="block">
              <Image
                alt="KFC Banner"
                width={1200}
                height={1200}
                src="/images/banner3.png"
                className="w-full h-auto rounded-lg"
              />
            </Link>
            <p className="text-sm text-center mt-2 mb-3 medium-font">
              Kentucky Fried Chicken | It's finger lickin' good
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}