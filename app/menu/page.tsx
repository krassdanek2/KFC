'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// Menu categories from original KFC site
const menuCategories = [
  'Exclusive Deals',
  'Combo Meals',
  'Burgers',
  'Twisters', 
  'Chicken Buckets',
  'Chicken Meals',
  'Sides',
  'Dips',
  'Drinks'
];

// Products data extracted from original HTML files
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
    },
    {
      id: 'ed6',
      name: 'Cheesy Lava Loaded Twister Crunch',
      description: 'Inferno Loaded Twister + Fries + Drink + Cruncher',
      price: 10.00,
      originalPrice: 25.00,
      discount: 60,
      image: '/images/menu/1231-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed7',
      name: 'Mighty Cruncher Twist',
      description: 'Mighty Cruncher + Twister + Fries + Drink',
      price: 14.00,
      originalPrice: 32.00,
      discount: 56,
      image: '/images/menu/1084-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed8',
      name: 'Cheesy Lava Loaded Twister Duo',
      description: '2 Inferno Loaded Twister + Fries + Drink',
      price: 22.00,
      originalPrice: 49.00,
      discount: 55,
      image: '/images/menu/1233-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed9',
      name: 'Loaded Twister Duo',
      description: '2 Loaded Twister + Fries + Drink',
      price: 22.00,
      originalPrice: 48.00,
      discount: 54,
      image: '/images/menu/994-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed10',
      name: 'Mighty Twist',
      description: 'Mighty Zinger + Twister + Fries + Pepsi',
      price: 31.00,
      originalPrice: 60.00,
      discount: 48,
      image: '/images/menu/575-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed11',
      name: 'Loaded Twister Crunch',
      description: 'Loaded Twister + Cruncher + Fries + Drink',
      price: 20.00,
      originalPrice: 36.00,
      discount: 44,
      image: '/images/menu/992-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed12',
      name: 'Mighty Cruncher Duo',
      description: '2 Mighty Cruncher + Fries + Drink',
      price: 32.00,
      originalPrice: 49.00,
      discount: 35,
      image: '/images/menu/1092-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed13',
      name: 'Strips Epic Meal',
      description: '3pcs strips+ Medium fries+1 dip+ Can drink',
      price: 24.00,
      originalPrice: 32.00,
      discount: 25,
      image: '/images/menu/1328-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed14',
      name: 'Cruncher Twist',
      description: 'Cruncher + Twister + Fries + Drink',
      price: 29.00,
      originalPrice: 36.00,
      discount: 19,
      image: '/images/menu/976-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'ed15',
      name: 'Mighty Cruncher Meal- Large',
      description: 'Mighty Cruncher + Fries + Drink',
      price: 20.00,
      originalPrice: 30.00,
      discount: 0,
      image: '/images/menu/1091-combo.png',
      sizes: ['MEDIUM', 'LARGE']
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
    },
    {
      id: 'b6',
      name: 'Zinger Supreme',
      description: 'Spicy chicken fillet, cheddar & smoked turkey ham with mayo',
      price: 15.00,
      originalPrice: 21.00,
      discount: 29,
      image: '/images/menu/110009.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b7',
      name: 'Zinger Meal',
      description: 'Zinger + Fries + Drink',
      price: 24.00,
      originalPrice: 34.00,
      discount: 29,
      image: '/images/menu/464-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b8',
      name: 'Mighty Zinger Box',
      description: 'Mighty Zinger + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 36.00,
      originalPrice: 48.00,
      discount: 25,
      image: '/images/menu/258-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b9',
      name: 'Veggie Zinger Meal',
      description: 'Veggie Zinger + Fries + Drink + 1 DIP',
      price: 18.00,
      originalPrice: 24.00,
      discount: 25,
      image: '/images/menu/554-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b10',
      name: 'Supreme Meal',
      description: 'Supreme + Fries + Drink',
      price: 27.00,
      originalPrice: 35.00,
      discount: 23,
      image: '/images/menu/462-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b11',
      name: 'Mighty Zinger Meal',
      description: 'Mighty Zinger + Fries + Drink',
      price: 32.00,
      originalPrice: 40.00,
      discount: 20,
      image: '/images/menu/458-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b12',
      name: 'Fillet Supreme',
      description: 'Tender chicken fillet, smoked turkey ham & cheddar with spicy mayo',
      price: 18.00,
      originalPrice: 21.00,
      discount: 14,
      image: '/images/menu/110008.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b13',
      name: 'Zinger Sandwich',
      description: 'Legendary spicy fillet burger with crisp lettuce & creamy mayo in a soft bun',
      price: 20.00,
      originalPrice: 20.00,
      discount: 0,
      image: '/images/menu/110001.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b14',
      name: 'Veggie Zinger',
      description: 'Crispy veggie patty, fresh veggies & spicy dynamite sauce in a brioche bun',
      price: 10.00,
      originalPrice: 10.00,
      discount: 0,
      image: '/images/menu/110037.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b15',
      name: 'Spicy Cruncher',
      description: 'Spicy strips, crispy hash brown & dynamite sauce in a brioche bun',
      price: 11.00,
      originalPrice: 11.00,
      discount: 0,
      image: '/images/menu/110058.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b16',
      name: 'Original Cruncher',
      description: 'Juicy strips, crispy hash brown & melted cheese in a brioche bun',
      price: 11.00,
      originalPrice: 11.00,
      discount: 0,
      image: '/images/menu/110060.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'b17',
      name: 'Original Mighty Cruncher',
      description: 'Double strips, crispy hash brown & melted cheese with KFC\'s signature sauce',
      price: 13.00,
      originalPrice: 13.00,
      discount: 0,
      image: '/images/menu/110085.png',
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
    },
    {
      id: 't4',
      name: 'Box Master Box',
      description: 'Box Master + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 28.00,
      originalPrice: 42.00,
      discount: 33,
      image: '/images/menu/632-combo.png',
      sizes: ['LARGE']
    },
    {
      id: 't5',
      name: 'Cheesy Lava Loaded Twister Box',
      description: 'Cheesy lava loaded twister + fries + coleslaw+ 1 cob+ drink',
      price: 21.00,
      originalPrice: 31.00,
      discount: 32,
      image: '/images/menu/1229-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't6',
      name: 'Twister Meal',
      description: 'Twister Sandwich + Fries + Drink',
      price: 17.00,
      originalPrice: 25.00,
      discount: 32,
      image: '/images/menu/460-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't7',
      name: 'Loaded Twister Box',
      description: 'Loaded Twister + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 24.00,
      originalPrice: 35.00,
      discount: 31,
      image: '/images/menu/990-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't8',
      name: 'Cheesy Lava Loaded Twister',
      description: 'Cheesy Lava Loaded Twister',
      price: 9.00,
      originalPrice: 13.00,
      discount: 31,
      image: '/images/menu/110096.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't9',
      name: 'Cheesy Lava Twister Meal',
      description: 'Cheesy lava twister + fries + drink',
      price: 18.00,
      originalPrice: 22.00,
      discount: 18,
      image: '/images/menu/1223-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't10',
      name: 'Cheesy Lava Twister',
      description: 'Cheesy Lava Twister',
      price: 9.00,
      originalPrice: 11.00,
      discount: 18,
      image: '/images/menu/110095.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't11',
      name: 'Loaded Twister Combo',
      description: 'Loaded Twister + Fries + Drink',
      price: 23.00,
      originalPrice: 27.00,
      discount: 15,
      image: '/images/menu/988-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 't12',
      name: 'Twister Box',
      description: 'Twister Sandwich + 1pc Chicken + Fries + Coleslaw + Drink',
      price: 28.00,
      originalPrice: 33.00,
      discount: 15,
      image: '/images/menu/264-combo.png',
      sizes: ['SMALL', 'MEDIUM', 'LARGE']
    },
    {
      id: 't15',
      name: 'Box Master Meal',
      description: 'Box Master + Fries + Drink',
      price: 34.00,
      originalPrice: 34.00,
      discount: 0,
      image: '/images/menu/282-combo.png',
      sizes: ['LARGE']
    },
    {
      id: 't16',
      name: 'Loaded Twister Original',
      description: 'Iconic Twister loaded with crispy strips, melted cheese & pickles',
      price: 13.00,
      originalPrice: 13.00,
      discount: 0,
      image: '/images/menu/115009.png',
      sizes: ['MEDIUM']
    },
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
    },
    {
      id: 'chm4',
      name: '10pcs Nuggets Meal',
      description: '10pcs Nuggets + 2 Dips + Fries + Drink',
      price: 24.00,
      originalPrice: 28.00,
      discount: 14,
      image: '/images/menu/1129-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'chm5',
      name: 'Dinner Meal',
      description: '3pcs Chicken + Fries + Coleslaw + Bun + Drink',
      price: 30.00,
      originalPrice: 35.00,
      discount: 14,
      image: '/images/menu/286-combo.png',
      sizes: ['LARGE']
    },
    {
      id: 'chm6',
      name: 'Chicken Rice Meal',
      description: '2pcs Chicken + Rice + 1 Sauce + Drink',
      price: 30.00,
      originalPrice: 35.00,
      discount: 14,
      image: '/images/menu/256-combo.png',
      sizes: ['SMALL']
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
    },
    {
      id: 's6',
      name: 'Rizo',
      description: '',
      price: 15.00,
      image: '/images/menu/1301-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's7',
      name: '2 Strips + 1 Dip',
      description: '2 Strips + 1 Dip',
      price: 6.00,
      image: '/images/menu/450-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 's8',
      name: 'Mashed Potatoes',
      description: 'Creamy mashed potatoes with gravy',
      price: 6.00,
      originalPrice: 7.00,
      discount: 14,
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
    },
    {
      id: 'd6',
      name: 'Hot Cheddar Cheese',
      description: '',
      price: 3.50,
      image: '/images/menu/814007.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd7',
      name: 'Garlic Buttermilk Mayonnaise Sauce',
      description: '',
      price: 2.50,
      image: '/images/menu/810041.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd8',
      name: 'Sweet Mustard Sauce',
      description: '',
      price: 2.50,
      image: '/images/menu/810062.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd9',
      name: 'Spicy Ranch Sauce',
      description: '',
      price: 2.50,
      image: '/images/menu/810066.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd10',
      name: 'Smokey Southern BBQ',
      description: '',
      price: 2.50,
      image: '/images/menu/810065.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd11',
      name: '3 Dips Combo',
      description: '',
      price: 6.00,
      image: '/images/menu/1210-combo.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd12',
      name: 'Herbed Creamy Sauce',
      description: '',
      price: 5.50,
      image: '/images/menu/810075.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd13',
      name: 'Spicy Paprika Sauce',
      description: '',
      price: 5.50,
      image: '/images/menu/810076.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'd14',
      name: 'Cheesy Lava Dip Sauce',
      description: 'Cheesy Lava Dip Sauce',
      price: 2.50,
      image: '/images/menu/5000678.png',
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
    },
    {
      id: 'dr6',
      name: 'Pepsi Magic Mojito',
      description: '',
      price: 12.00,
      image: '/images/menu/610013.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr7',
      name: 'Fresh Orange Juice',
      description: '',
      price: 13.00,
      image: '/images/menu/610020.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr8',
      name: 'Mojito Krusher',
      description: '',
      price: 12.00,
      image: '/images/menu/610021.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr9',
      name: 'Onion Rings',
      description: '',
      price: 11.00,
      image: '/images/menu/5000461.png',
      sizes: ['MEDIUM']
    },
    {
      id: 'dr10',
      name: 'Water',
      description: '',
      price: 4.50,
      image: '/images/menu/614001.png',
      sizes: ['MEDIUM']
    }
  ]
};

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'Exclusive Deals');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('kfc-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Update cart count
    if (cart.length > 0) {
      setShowCart(true);
    }
  }, [cart]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/menu?category=${encodeURIComponent(category)}`);
  };

  const addToCart = (product: any) => {
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    
    setCart(newCart);
    localStorage.setItem('kfc-cart', JSON.stringify(newCart));
  };

  const currentProducts = menuProducts[selectedCategory] || [];

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <main className="mb-4">
        {/* Header Section */}
        <section className="bg-white">
          <div className="bg-white shadow-md z-50">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-2xl text-gray-700" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path>
                  </svg>
                </Link>
                <div>
                  <h1 className="text-lg bold-font text-gray-900">Explore Menu</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/search">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-2xl cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Category Navigation - Mobile */}
          <div className="flex mt-3 md:hidden">
            <div className="flex-shrink-0 bg-dred flex flex-col items-center px-2 py-2">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-white text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M7 8h10"></path>
                <path d="M7 12h10"></path>
                <path d="M7 16h10"></path>
              </svg>
              <span className="text-white text-xs bold-font">MENU</span>
            </div>
            <div className="w-full overflow-x-auto ml-2 mr-2">
              <nav className="overflow-x-scroll scrollbar-hide">
                <div className="flex gap-8 px-4 py-3 min-w-max whitespace-nowrap">
                  {menuCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`text-base bold-font relative ${
                        selectedCategory === category
                          ? 'text-dred after:content-[""] after:block after:h-1 after:bg-dred after:w-full after:absolute after:bottom-[-12px]'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="hidden md:block mt-3">
            <div className="container mx-auto px-4">
              <nav className="flex justify-center">
                <div className="flex gap-8 px-4 py-3">
                  {menuCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`text-base bold-font relative px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'text-white bg-red-500'
                          : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* Products List - Mobile */}
        <div className="md:hidden">
          {currentProducts.map((product) => (
            <section key={product.id} className="bg-white mt-4">
              <div className="w-full bg-white h-54 px-3 py-2 flex flex-col justify-between cursor-pointer">
                <div className="flex flex-col w-2/3">
                  <h3 className="bold-font text-sm sm:text-base">{product.name}</h3>
                  <p className="text-[10px] sm:text-[11px] regular-font text-gray-600 mt-1 w-2/3 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="additional flex-1 flex items-start justify-between flex-col gap-1 mt-2 mb-3">
                  <div className="flex flex-row gap-2">
                    {product.sizes?.map((size: string) => (
                      <button
                        key={size}
                        className="py-4 rounded-lg border-solid border-[2px] w-[60px] sm:w-[64px] h-[28px] sm:h-[30px] flex items-center justify-center shadow-sm transition-all duration-200 bg-[#fffafa] border-dred hover:bg-dred hover:border-dred"
                      >
                        <span className="text-[12px] sm:text-sm font-bold transition-colors duration-200 text-dred hover:text-white">
                          {size}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="price relative">
                  <div className="flex items-center gap-2 mb-4 cursor-pointer">
                    <span className="text-sm sm:text-sm bold-font text-blue">CUSTOMIZE</span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-blue rounded-lg">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-white text-xs sm:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-base bold-font">{product.price.toFixed(2)} AED</span>
                    {product.originalPrice > 0 && (
                      <>
                        <span className="text-[11px] sm:text-xs regular-font line-through text-gray-500">
                          {product.originalPrice.toFixed(2)} AED
                        </span>
                        {product.discount > 0 && (
                          <>
                            <span className="text-sm sm:text-base">|</span>
                            <span className="text-sm sm:text-sm bold-font text-dred">
                              -{product.discount}% OFF
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="absolute right-0 bottom-0 flex flex-col items-end">
                    <div className="relative">
                      <Image
                        alt={product.name}
                        width={192}
                        height={128}
                        src={product.image}
                        className="w-30 h-40 sm:w-34 sm:h-42 object-contain mt-2"
                      />
                      <button className="absolute -left-2 top-5 transition-transform duration-200 hover:scale-110 active:scale-95">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-dred text-2xl transition-all duration-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="mb-1 shadow-lg shadow-dred/30 w-33 sm:w-32 h-10 sm:h-10 bg-dred text-white px-3 sm:px-6 py-1 sm:py-2 rounded-md bold-font text-xs sm:text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Products List - Desktop */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          {product.sizes && product.sizes.map((size: string) => (
                            <span key={size} className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {size}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 font-bold text-lg">{product.price.toFixed(2)} AED</span>
                            {product.originalPrice > 0 && (
                              <>
                                <span className="text-gray-400 line-through text-sm">{product.originalPrice.toFixed(2)} AED</span>
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                  -{product.discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Cart Button */}
        {showCart && cart.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <Link href="/cart">
              <button 
                className="bg-dred bg-opacity-90 text-white px-6 py-3 rounded-full shadow-lg shadow-dred/30 flex items-center gap-2 hover:bg-red-700 hover:bg-opacity-90 transition-all duration-200 backdrop-blur-sm"
                style={{ boxShadow: 'rgba(239, 68, 68, 0.3) 0px 4px 15px, rgba(239, 68, 68, 0.2) 0px 0px 20px' }}
              >
                <span className="bold-font">Go to Cart</span>
                <span className="bg-white text-dred rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                </span>
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Image src="/kfc-loader.gif" alt="Loading..." width={100} height={100} />
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}