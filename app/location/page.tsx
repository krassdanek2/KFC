'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ChevronDown, Star, ArrowRight, Tag } from 'lucide-react';

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState('Dubai, UAE');

  const locations = [
    'Dubai, UAE',
    'Abu Dhabi, UAE',
    'Sharjah, UAE',
    'Ajman, UAE',
    'Ras Al Khaimah, UAE',
    'Fujairah, UAE',
    'Umm Al Quwain, UAE'
  ];

  const exclusiveOffers = [
    {
      id: 'eo1',
      name: 'Mighty Twist',
      image: 'https://i.ibb.co/9kYGPcs5/sm123.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      id: 'eo2',
      name: 'Loaded Twist',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/FD_AE_En_190525.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      id: 'eo3',
      name: 'Strips Dipping',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/stripsdipping_UAE_En_270325.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      id: 'eo4',
      name: 'Cheese Lavameal',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/cheeselavameal_AE_En_140525.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      id: 'eo5',
      name: 'Super Duo Bucket',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/superduobucket_AE_En_010825.jpg',
      href: '/menu?category=Combo%20Meals'
    }
  ];

  const exploreMenu = [
    {
      name: 'Exclusive Deals',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Exclusive_Deals_En_211124.png',
      href: '/menu?category=Exclusive%20Deals'
    },
    {
      name: 'Twisters',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/twisters_En_170625.png',
      href: '/menu?category=Twisters'
    },
    {
      name: 'Chicken Meals',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/ChickenMeals_En_211124.png',
      href: '/menu?category=Chicken%20Meals'
    },
    {
      name: 'Burgers',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/burgers_En_170625.png',
      href: '/menu?category=Burgers'
    },
    {
      name: 'Chicken Buckets',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Chickenbuckets_En_211124.png',
      href: '/menu?category=Chicken%20Buckets'
    },
    {
      name: 'Drinks',
      image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png',
      href: '/menu?category=Drinks'
    }
  ];

  const bestsellers = [
    {
      name: 'Mighty Twist',
      image: '/assets/img/deals/bestsellers/MightyTwist.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      name: 'Duo Zinger',
      image: '/assets/img/deals/bestsellers/duozinger.jpg',
      href: '/menu?category=Combo%20Meals'
    },
    {
      name: 'Loaded Twist',
      image: '/assets/img/deals/bestsellers/loadedtwist.jpg',
      href: '/menu?category=Combo%20Meals'
    }
  ];

  const topDeals = [
    {
      id: 'td1',
      name: 'Super Mega Deal',
      description: '12pcs Chicken + Family Fries + Large Coleslaw',
      price: '25 AED',
      originalPrice: '75 AED',
      discount: '67% OFF',
      image: '/images/menu/247-combo.png',
      href: '/menu?category=Exclusive%20Deals'
    },
    {
      id: 'td2',
      name: 'Super 30',
      description: '15pcs chicken+ 15pcs strips + Family Fries',
      price: '50 AED',
      originalPrice: '208.5 AED',
      discount: '76% OFF',
      image: '/images/menu/303-combo.png',
      href: '/menu?category=Exclusive%20Deals'
    },
    {
      id: 'td3',
      name: 'Mighty Cruncher Meal- Large',
      description: 'Mighty Cruncher + Fries + Drink',
      price: '20 AED',
      originalPrice: '30 AED',
      discount: '33% OFF',
      image: '/images/menu/1091-combo.png',
      href: '/menu?category=Exclusive%20Deals'
    }
  ];

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <main className="mb-18">
        {/* Top Menu Section */}
        <section className="top-menu bg-white px-4 pt-2">
          <div className="top-navigate flex items-center justify-between">
            <div className="flex items-center gap-3 h-16">
              <MapPin className="text-2xl" />
              <div className="flex flex-col max-w-[200px]">
                <h2 className="text-sm font-bold">SELECT LOCATION</h2>
                <p className="text-xs text-gray-600">Get accurate pricing and menu listing</p>
              </div>
              <button className="ml-1 rounded-lg bg-red-500 w-[19px] h-[19px] flex items-center justify-center shadow-sm">
                <ChevronDown className="w-full h-full text-white" />
              </button>
            </div>
          </div>
          
          {/* Delivery Method */}
          <div className="delivery-method mt-2 md:mt-4 bg-white w-full">
            <div className="flex items-center justify-center px-2 sm:px-4 gap-4 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-12 xl:gap-16">
              <div className="flex flex-col items-center flex-shrink-0 mt-1 min-w-0">
                <button className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 hover:scale-105 transition-all duration-200 flex items-center justify-center border-red-500">
                  <Image
                    alt="DELIVERY"
                    width={32}
                    height={32}
                    className="object-contain w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10"
                    src="/images/menu/icon_address_type_delivery_col.png"
                  />
                </button>
                <span className="mt-1 mb-2 sm:mt-2 text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight truncate max-w-[60px] sm:max-w-[80px] md:max-w-none text-red-500 font-bold">
                  DELIVERY
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Offers */}
        <section className="Offers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <h2 className="text-base font-bold">EXCLUSIVE OFFERS</h2>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500 mt-1"></div>
              </div>
              <Star className="text-lg text-red-500" />
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide scroll-smooth">
            {exclusiveOffers.map((offer) => (
              <div key={offer.id} className="w-86 h-48 flex-shrink-0 rounded-2xl overflow-hidden">
                <Link href={offer.href} className="w-full h-full block group">
                  <Image
                    alt={offer.name}
                    width={320}
                    height={176}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    src={offer.image}
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Menu */}
        <section className="explore-menu">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative font-bold text-base after:content-[''] after:block after:h-0.5 after:bg-red-500 after:w-10 after:mt-1">
                EXPLORE MENU
              </h2>
              <div className="w-6 h-6 ml-3">
                <ArrowRight className="text-lg text-red-500" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 pb-8">
            {exploreMenu.map((item, index) => (
              <Link key={index} href={item.href} className="block group">
                <Image
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  src={item.image}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Bestsellers */}
        <section className="bestsellers">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <h2 className="relative text-base font-bold after:content-[''] after:block after:h-0.5 after:bg-red-500 after:w-12 after:mt-1">
                BESTSELLERS
              </h2>
              <div className="w-6 h-6 ml-3">
                <Star className="text-yellow-400 text-2xl" />
              </div>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 scrollbar-hide">
            {bestsellers.map((item, index) => (
              <Link key={index} href={item.href} className="flex-shrink-0 group relative">
                <Image
                  alt={item.name}
                  width={160}
                  height={200}
                  className="w-44 h-76 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  src={item.image}
                />
                <p className="absolute bottom-2 left-2 text-sm font-medium text-white flex items-center gap-1">
                  {item.name}
                  <ArrowRight className="text-white" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section className="top-deals p-4 md:px-6">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center">
              <h2 className="relative text-lg md:text-xl font-bold after:content-[''] after:block after:h-0.5 after:bg-red-500 after:w-12 after:mt-1">
                TOP DEALS
              </h2>
              <div className="w-6 h-6 ml-3">
                <Tag className="text-red-500 text-xl" />
              </div>
            </div>
            <button className="text-sm md:text-base font-bold flex items-center gap-1 hover:underline text-red-500">
              View All
              <ArrowRight className="text-base" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollBehavior: 'smooth' }}>
            {topDeals.map((deal) => (
              <div key={deal.id} className="group flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[280px] w-[320px] md:h-[300px] md:w-[380px] flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
                <div className="relative w-40 md:w-44 h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    alt={deal.name}
                    width={300}
                    height={300}
                    className="w-full h-2/3 object-cover transition-transform duration-300 group-hover:scale-105"
                    src={deal.image}
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {deal.discount}
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                      {deal.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {deal.description}
                    </p>
                    <div className="flex items-baseline gap-2 pt-15 pl-2">
                      <span className="text-sm sm:text-xl md:text-2xl font-bold text-red-500">
                        {deal.price}
                      </span>
                      <span className="text-[8px] sm:text-xs text-gray-400 line-through">
                        {deal.originalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-3">
                    <Link href={deal.href} className="inline-flex items-center justify-center text-sm font-semibold text-red-500 border-2 border-red-500 rounded-xl px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-md active:scale-95">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
                className="w-full h-auto rounded-lg"
                src="https://i.ibb.co/KzLJYjFd/bn2.jpg"
              />
            </Link>
          </div>
        </section>

        {/* Bottom Image */}
        <section className="bottom-img w-full bg-white mb-2">
          <div className="mt-8 py-4 px-4">
            <Link href="/" className="block">
              <Image
                alt="KFC Banner"
                width={1200}
                height={1200}
                className="w-full h-auto rounded-lg"
                src="/assets/img/ads/banner3.png"
              />
            </Link>
            <p className="text-sm text-center mt-2 mb-3 font-medium">
              Kentucky Fried Chicken | It's finger lickin' good
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
