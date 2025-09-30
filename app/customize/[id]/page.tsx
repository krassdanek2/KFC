'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Import menu products data
const menuProducts: { [key: string]: any[] } = {
  'Exclusive Deals': [
    {
      id: 'ed1',
      name: 'BUY 1 GET 1 DEAL',
      description: 'ONLY AVAILABLE THIS WEEK!\nSuper 30 Combo + Zinger Burger + Chicken Meal + Zinger Burger Spicy + Drink + French Fries + Sauce',
      price: 10.00,
      originalPrice: 140.00,
      discount: 93,
      image: '/images/menu/pos.png',
      sizes: ['LARGE']
    },
    {
      id: 'ed2',
      name: 'Big Crunchin Deal',
      description: '10pcs Chicken+ 4 strips+ Family Fries+ Large coleslaw',
      price: 32.00,
      originalPrice: 142.00,
      discount: 77,
      image: '/images/menu/910-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed3',
      name: 'Super 30',
      description: '15pcs chicken+ 15pcs strips + Family Fries',
      price: 50.00,
      originalPrice: 208.50,
      discount: 76,
      image: '/images/menu/303-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed4',
      name: 'Super Mega Deal',
      description: '12pcs Chicken + Family Fries + Large Coleslaw',
      price: 25.00,
      originalPrice: 75.00,
      discount: 67,
      image: '/images/menu/247-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed5',
      name: 'Super Duo Bucket',
      description: '6 strips + 4pcs of chicken + Family fries + 2 coleslaw',
      price: 29.94,
      originalPrice: 91.00,
      discount: 67,
      image: '/images/menu/1325-combo.png',
      sizes: ['MEDIUM']
    }
  ],
  'Combo Meals': [
    {
      id: 'cm1',
      name: 'Chicken Epic Meal',
      description: '2 Pcs Chicken + Medium Fries+ Bun + Can Drink',
      price: 20.00,
      originalPrice: 43.00,
      discount: 53,
      image: '/images/menu/1326-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'cm2',
      name: 'Rizo Epic Meal',
      description: '2 Pcs Chicken + Fries + Bun + Drink',
      price: 18.00,
      originalPrice: 29.00,
      discount: 38,
      image: '/images/menu/1332-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'cm3',
      name: 'Cruncher Epic Meal',
      description: 'Cruncher+ Medium Fries+ Dip+ CAN drink',
      price: 24.00,
      originalPrice: 36.00,
      discount: 33,
      image: '/images/menu/1330-combo.png',
      sizes: ['MEDIUM']
    }
  ],
  'Burgers': [
    {
      id: 'b1',
      name: 'Mighty Cruncher Combo',
      description: 'Mighty Cruncher + Fries + Drink',
      price: 15.00,
      originalPrice: 27.00,
      discount: 44,
      image: '/images/menu/1090-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b2',
      name: 'Mighty Cruncher Box',
      description: 'Mighty Cruncher + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 22.00,
      originalPrice: 35.00,
      discount: 37,
      image: '/images/menu/1087-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b3',
      name: 'Cruncher Box',
      description: 'Cruncher + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 22.00,
      originalPrice: 33.00,
      discount: 33,
      image: '/images/menu/974-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b4',
      name: 'Spicy Mighty Cruncher',
      description: 'Double spicy strips, crispy hash brown & fiery dynamite sauce',
      price: 9.00,
      originalPrice: 13.00,
      discount: 31,
      image: '/images/menu/110084.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b5',
      name: 'Supreme Box',
      description: 'Supreme + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 30.00,
      originalPrice: 43.00,
      discount: 30,
      image: '/images/menu/272-combo.png',
      sizes: ['MEDIUM']
    }
  ],
  'Twisters': [
    {
      id: 't1',
      name: 'Loaded Twister Spicy',
      description: 'Spicy Twister loaded with crispy strips, melted cheese & fiery jalapeños',
      price: 8.00,
      originalPrice: 13.00,
      discount: 38,
      image: '/images/menu/115008.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't2',
      name: 'Cheesy Lava Twister Box',
      description: 'Cheesy lava twister + fries + coleslaw+ 1 cob+ drink',
      price: 19.00,
      originalPrice: 29.00,
      discount: 34,
      image: '/images/menu/1225-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't3',
      name: 'Cheesy Lava Loaded Twister Meal',
      description: 'Cheesy lava loaded twister + fries + drink',
      price: 16.00,
      originalPrice: 24.00,
      discount: 33,
      image: '/images/menu/1227-combo.png',
      sizes: ['MEDIUM']
    }
  ],
  'Chicken Buckets': [
    {
      id: 'cb1',
      name: 'Duo Bucket',
      description: '6pcs Chicken + 2 Fries + 2 Coleslaw + 500ML Drink',
      price: 40.00,
      originalPrice: 55.00,
      discount: 27,
      image: '/images/menu/587-combo.png',
      sizes: ['MEDIUM', 'LARGE']
    },
    {
      id: 'cb2',
      name: 'Strips Dipping Box',
      description: '6 Strips + Fries + Drink + 2 dips + coleslaw',
      price: 28.00,
      originalPrice: 35.00,
      discount: 20,
      image: '/images/menu/1206-combo.png',
      sizes: ['MEDIUM', 'SMALL', 'LARGE']
    },
    {
      id: 'cb3',
      name: 'Triple Treat Bucket',
      description: '20pcs Nuggets + 7pcs Strips + 7pcs Wings + 5 Dips + Family Fries',
      price: 55.00,
      originalPrice: 65.00,
      discount: 15,
      image: '/images/menu/1131-combo.png',
      sizes: ['LARGE']
    }
  ],
  'Chicken Meals': [
    {
      id: 'chm1',
      name: 'Dinner Crispy Strips Meal',
      description: '4pcs Strips + Fries + Coleslaw + 2 Sauces + Bun + Drink',
      price: 28.00,
      originalPrice: 34.00,
      discount: 18,
      image: '/images/menu/288-combo.png',
      sizes: ['SMALL']
    },
    {
      id: 'chm2',
      name: 'Super Dinner Meal',
      description: '4pcs Chicken + Fries + Coleslaw + Bun + Drink',
      price: 33.00,
      originalPrice: 39.00,
      discount: 15,
      image: '/images/menu/284-combo.png',
      sizes: ['MEDIUM', 'LARGE']
    },
    {
      id: 'chm3',
      name: 'My Bucket',
      description: '1pc Chicken + 2 Strips + Fries + Drink',
      price: 22.00,
      originalPrice: 26.00,
      discount: 15,
      image: '/images/menu/795-combo.png',
      sizes: []
    }
  ],
  'Sides': [
    {
      id: 's1',
      name: '3 Pcs Hot Wings',
      description: '',
      price: 9.00,
      image: '/images/menu/510101.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's2',
      name: 'Bun',
      description: '',
      price: 1.00,
      originalPrice: 1.00,
      discount: 0,
      image: '/images/menu/810002.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's3',
      name: 'Coleslaw',
      description: 'KFC\'s signature Coleslaw',
      price: 10.00,
      image: '/images/menu/9.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's4',
      name: 'Spicy Fries',
      description: '',
      price: 12.00,
      image: '/images/menu/5000082.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's5',
      name: 'Fries',
      description: 'KFC\'s Golden Fries',
      price: 11.00,
      image: '/images/menu/5000185.png',
      sizes: ['MEDIUM']
    }
  ],
  'Dips': [
    {
      id: 'd1',
      name: 'Cheddar Sauce',
      description: 'Cheddar Sauce',
      price: 2.50,
      originalPrice: 2.50,
      discount: 0,
      image: '/images/menu/810005.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd2',
      name: 'Gravy',
      description: '',
      price: 4.50,
      originalPrice: 4.50,
      discount: 0,
      image: '/images/menu/810007.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd3',
      name: 'Tomia Sauce',
      description: '',
      price: 2.50,
      originalPrice: 2.50,
      discount: 0,
      image: '/images/menu/810008.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd4',
      name: 'Ranch Sauce',
      description: '',
      price: 2.50,
      image: '/images/menu/810040.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd5',
      name: 'Dynamite Sauce',
      description: '',
      price: 2.50,
      image: '/images/menu/810028.png',
      sizes: ['MEDIUM']
    }
  ],
  'Drinks': [
    {
      id: 'dr1',
      name: 'Pepsi',
      description: '',
      price: 11.00,
      image: '/images/menu/5000475.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr2',
      name: '7 UP',
      description: '',
      price: 11.00,
      image: '/images/menu/5000476.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr3',
      name: 'Mountain Dew',
      description: '',
      price: 11.00,
      image: '/images/menu/5000477.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr4',
      name: 'Mirinda',
      description: '',
      price: 11.00,
      image: '/images/menu/5000478.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr5',
      name: 'Pepsi Zero',
      description: '',
      price: 11.00,
      image: '/images/menu/5000479.png',
      sizes: ['MEDIUM']
    }
  ]
};

// Customization options based on product type
const getCustomizationOptions = (product: any) => {
  const productName = product.name?.toLowerCase() || '';
  
  if (productName.includes('deal') || productName.includes('combo') || productName.includes('meal')) {
    return [
      {
        id: 'drink',
        title: 'Select Your Favorite Beverage',
        type: 'single',
        required: true,
        options: [
          { id: 'pepsi', name: 'Pepsi Can', price: 0, image: '/images/menu/600001.png', isDefault: true },
          { id: '7up', name: '7Up Can', price: 0, image: '/images/menu/600029.png' },
          { id: 'mountain_dew', name: 'Mountain Dew Can', price: 0, image: '/images/menu/600031.png' },
          { id: 'mirinda', name: 'Mirinda Can', price: 0, image: '/images/menu/600030.png' },
          { id: 'pepsi_zero', name: 'Pepsi Zero Can', price: 0, image: '/images/menu/610075.png' },
          { id: 'orange_juice', name: 'Fresh Orange Juice', price: 2, image: '/images/menu/610020.png' }
        ]
      },
      {
        id: 'side',
        title: 'Select Your Favorite Side Item',
        type: 'single',
        required: true,
        options: [
          { id: 'fries', name: 'Medium Fries', price: 0, image: '/images/menu/510050.png', isDefault: true },
          { id: 'spicy_fries', name: 'Medium Spicy Fries', price: 1, image: '/images/menu/510051.png' },
          { id: 'coleslaw', name: 'Coleslaw Salad Small', price: 0, image: '/images/menu/510116.png' }
        ]
      },
      {
        id: 'extra_sides',
        title: 'Would you like to add extra side to your meal?',
        type: 'multiple',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'nuggets', name: '5 pcs Nuggets + 1 Dip', price: 7, image: '/images/menu/510143.png' },
          { id: 'twister_spicy', name: 'Twister Spicy', price: 11, image: '/images/menu/110002.png' },
          { id: 'twister_original', name: 'Twister Original', price: 11, image: '/images/menu/110003.png' },
          { id: 'strips_original', name: '2 Pcs Strips Original', price: 5, image: '/images/menu/511006.png' },
          { id: 'strips_spicy', name: '2 Pcs Strips Spicy', price: 5, image: '/images/menu/511007.png' },
          { id: 'wings', name: '3 Pcs Hot Wings', price: 9, image: '/images/menu/510101.png' },
          { id: 'rice', name: 'Rice', price: 7, image: '/images/menu/510031.png' },
          { id: 'spicy_ranch', name: 'Spicy Ranch Sauce', price: 2.5, image: '/images/menu/810066.png' }
        ]
      }
    ];
  }
  
  return [];
};

export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [customizations, setCustomizations] = useState<{ [key: string]: string | string[] }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Find product by ID
    let foundProduct = null;
    for (const category in menuProducts) {
      foundProduct = menuProducts[category].find(p => p.id === productId);
      if (foundProduct) break;
    }
    
    if (foundProduct) {
      setProduct(foundProduct);
      setTotalPrice(foundProduct.price);
      
      // Initialize default customizations
      const options = getCustomizationOptions(foundProduct);
      const defaultCustomizations: { [key: string]: string | string[] } = {};
      options.forEach(section => {
        const defaultOption = section.options.find(option => option.isDefault);
        if (defaultOption) {
          if (section.type === 'multiple') {
            defaultCustomizations[section.id] = [defaultOption.id];
          } else {
            defaultCustomizations[section.id] = defaultOption.id;
          }
        }
      });
      setCustomizations(defaultCustomizations);
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('kfc-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [productId]);

  const customizationOptions = product ? getCustomizationOptions(product) : [];

  const calculateTotalPrice = (customizations: { [key: string]: string | string[] }) => {
    if (!product) return 0;
    
    let total = product.price;
    
    customizationOptions.forEach(section => {
      const selected = customizations[section.id];
      if (selected) {
        if (section.type === 'multiple' && Array.isArray(selected)) {
          selected.forEach(optionId => {
            const option = section.options.find(opt => opt.id === optionId);
            if (option) total += option.price;
          });
        } else if (typeof selected === 'string') {
          const option = section.options.find(opt => opt.id === selected);
          if (option) total += option.price;
        }
      }
    });
    
    return total;
  };

  const handleOptionSelect = (sectionId: string, optionId: string, sectionType: 'single' | 'multiple') => {
    const newCustomizations = { ...customizations };
    
    if (sectionType === 'single') {
      newCustomizations[sectionId] = optionId;
    } else {
      const currentSelections = (newCustomizations[sectionId] as string[]) || [];
      const section = customizationOptions.find(s => s.id === sectionId);
      const maxSelections = section?.maxSelections || 3;
      
      if (currentSelections.includes(optionId)) {
        newCustomizations[sectionId] = currentSelections.filter(id => id !== optionId);
      } else if (currentSelections.length < maxSelections) {
        newCustomizations[sectionId] = [...currentSelections, optionId];
      }
    }
    
    setCustomizations(newCustomizations);
    setTotalPrice(calculateTotalPrice(newCustomizations));
  };

  const isOptionSelected = (sectionId: string, optionId: string, sectionType: 'single' | 'multiple') => {
    const selected = customizations[sectionId];
    if (sectionType === 'multiple' && Array.isArray(selected)) {
      return selected.includes(optionId);
    }
    return selected === optionId;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const customizedProduct = {
      ...product,
      customizations,
      totalPrice,
      customizedName: `${product.name} (Customized)`
    };
    
    const newCart = [...cart];
    const existingItem = newCart.find(item => 
      item.id === product.id && 
      JSON.stringify(item.customizations) === JSON.stringify(product.customizations)
    );
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      newCart.push({ ...customizedProduct, quantity: 1 });
    }
    
    setCart(newCart);
    localStorage.setItem('kfc-cart', JSON.stringify(newCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Navigate back to menu
    router.push('/menu');
  };

  const canProceed = () => {
    return customizationOptions.every(section => {
      if (!section.required) return true;
      const selected = customizations[section.id];
      return selected && (Array.isArray(selected) ? selected.length > 0 : true);
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F0F3F6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/menu" className="text-red-500 hover:text-red-600">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <main className="mb-20">
        {/* Header */}
        <section className="top-nav bg-white">
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path>
                </svg>
              </button>
              <span className="text-base font-bold">Explore Menu</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg bg-[#fffafa] border border-gray-300 border-[2px] w-[64px] h-[30px] flex items-center justify-center shadow-sm">
                <span className="text-red-500 text-xs font-bold">RESET</span>
              </button>
            </div>
          </div>
          
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Image
              alt={product.name}
              width={250}
              height={200}
              src={product.image}
              className="object-contain"
            />
          </div>
          
          {/* Navigation Tabs */}
          <div className="overflow-x-auto">
            <nav className="overflow-x-scroll scrollbar-hide">
              <div className="flex gap-8 px-4 py-3 min-w-max whitespace-nowrap">
                {customizationOptions.map((section, index) => (
                  <button
                    key={section.id}
                    className={`text-base font-bold relative ${
                      index === 0
                        ? 'text-red-500 after:content-[""] after:block after:h-1 after:bg-red-500 after:w-full after:absolute after:bottom-[-12px]'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </section>

        {/* Customization Sections */}
        <section className="choice">
          {customizationOptions.map((section) => (
            <div key={section.id} className="mt-3">
              <h1 className="font-bold mb-4 px-4">{section.title}</h1>
              <div className="w-full bg-white">
                {section.options.map((option, index) => (
                  <div key={option.id}>
                    <div className="flex items-center justify-between p-3 rounded-lg h-20">
                      <div className="flex items-center gap-3 flex-1">
                        <Image
                          alt={option.name}
                          width={60}
                          height={60}
                          src={option.image}
                          className="rounded-lg flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <span className="font-medium text-base truncate">{option.name}</span>
                          <span className="text-sm text-gray-500">
                            {option.price === 0 ? 'FREE' : `${option.price} AED`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center flex-shrink-0 w-32 justify-end">
                        <button
                          onClick={() => handleOptionSelect(section.id, option.id, section.type)}
                          className={`w-28 h-12 rounded-lg font-medium text-sm flex-shrink-0 border border-2 ${
                            isOptionSelected(section.id, option.id, section.type)
                              ? 'border-red-500 text-red-500 bg-red-50'
                              : 'border-red-500 text-red-500 bg-white'
                          }`}
                        >
                          {isOptionSelected(section.id, option.id, section.type) ? 'ADDED' : 'ADD'}
                        </button>
                      </div>
                    </div>
                    {index < section.options.length - 1 && <hr className="border-gray-200" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Cart */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <section className="CART bg-white p-4 border-t border-gray-200 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    alt="Cart Item"
                    width={50}
                    height={50}
                    src={product.image}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-sm sm:text-base">1 ITEM</span>
              </div>
              <div className="w-2/3">
                <button
                  onClick={handleAddToCart}
                  disabled={!canProceed()}
                  className={`bg-gradient-to-r from-red-500 via-red-400 to-red-500 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg relative overflow-hidden flex items-center justify-between w-full ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <div className="text-sm sm:text-base font-bold">{totalPrice.toFixed(2)} AED</div>
                    <div className="text-[10px] sm:text-xs opacity-80">*VAT included</div>
                  </div>
                  <div className="font-medium flex items-center gap-0.5 sm:gap-1 text-sm sm:text-base">
                    Add to cart
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-sm sm:text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
