export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: 'exclusive-deals', name: 'Exclusive Deals', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Exclusive_Deals_En_211124.png' },
  { id: 'twisters', name: 'Twisters', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/twisters_En_170625.png' },
  { id: 'chicken-meals', name: 'Chicken Meals', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/ChickenMeals_En_211124.png' },
  { id: 'burgers', name: 'Burgers', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/burgers_En_170625.png' },
  { id: 'chicken-buckets', name: 'Chicken Buckets', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Chickenbuckets_En_211124.png' },
  { id: 'drinks', name: 'Drinks', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png' },
  { id: 'combo-meals', name: 'Combo Meals', image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/ChickenMeals_En_211124.png' },
];

export const products: Product[] = [
  // Exclusive Deals
  {
    id: '1',
    name: 'Super Mega Deal',
    description: '12pcs Chicken + Family Fries + Large Coleslaw',
    price: 25,
    originalPrice: 75,
    discount: 67,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png',
    category: 'exclusive-deals',
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Mighty Cruncher Meal- Large',
    description: 'Mighty Cruncher + Fries + Drink',
    price: 20,
    originalPrice: 30,
    discount: 33,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png',
    category: 'exclusive-deals',
  },
  {
    id: '3',
    name: 'Super 30',
    description: '15pcs chicken + 15pcs strips + Family Fries',
    price: 50,
    originalPrice: 208.5,
    discount: 76,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/303-combo.png',
    category: 'exclusive-deals',
    isBestseller: true,
  },

  // Twisters
  {
    id: '4',
    name: 'Mighty Twist',
    description: 'Crispy chicken strips wrapped in tortilla with lettuce, tomato, and mayo',
    price: 15,
    image: '/assets/img/deals/bestsellers/MightyTwist.jpg',
    category: 'twisters',
    isBestseller: true,
  },
  {
    id: '5',
    name: 'Loaded Twist',
    description: 'Loaded with crispy chicken, cheese, and special sauce',
    price: 18,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/FD_AE_En_190525.jpg',
    category: 'twisters',
    isBestseller: true,
  },
  {
    id: '6',
    name: 'Strips Dipping',
    description: 'Crispy strips with your choice of dipping sauce',
    price: 12,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/stripsdipping_UAE_En_270325.jpg',
    category: 'twisters',
    isNew: true,
  },
  {
    id: '7',
    name: 'Cheese Lava Meal',
    description: 'Twister filled with melted cheese',
    price: 20,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/cheeselavameal_AE_En_140525.jpg',
    category: 'twisters',
    isNew: true,
  },

  // Burgers
  {
    id: '8',
    name: 'Zinger Burger',
    description: 'Spicy chicken fillet with lettuce and mayo',
    price: 12,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png',
    category: 'burgers',
    isBestseller: true,
  },
  {
    id: '9',
    name: 'Tower Burger',
    description: 'Double chicken fillet with hash brown',
    price: 18,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png',
    category: 'burgers',
  },
  {
    id: '10',
    name: 'Colonel Burger',
    description: 'Classic crispy chicken with special sauce',
    price: 10,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png',
    category: 'burgers',
  },

  // Chicken Buckets
  {
    id: '11',
    name: '12 Pcs Chicken',
    description: '12 pieces of crispy fried chicken',
    price: 45,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png',
    category: 'chicken-buckets',
  },
  {
    id: '12',
    name: '21 Pcs Chicken',
    description: '21 pieces of crispy fried chicken',
    price: 75,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png',
    category: 'chicken-buckets',
    isBestseller: true,
  },
  {
    id: '13',
    name: 'Super Duo Bucket',
    description: '6 pcs chicken + 6 strips + 2 fries',
    price: 35,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/superduobucket_AE_En_010825.jpg',
    category: 'chicken-buckets',
    isNew: true,
  },

  // Combo Meals
  {
    id: '14',
    name: 'Duo Zinger',
    description: '2 Zinger burgers + 2 fries + 2 drinks',
    price: 28,
    image: '/assets/img/deals/bestsellers/duozinger.jpg',
    category: 'combo-meals',
    isBestseller: true,
  },

  // Drinks
  {
    id: '15',
    name: 'Pepsi',
    description: 'Regular Pepsi',
    price: 3,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png',
    category: 'drinks',
  },
  {
    id: '16',
    name: '7UP',
    description: 'Regular 7UP',
    price: 3,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png',
    category: 'drinks',
  },
  {
    id: '17',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 5,
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png',
    category: 'drinks',
  },
];

export const bannerSlides = [
  {
    id: '1',
    image: 'https://i.ibb.co/9kYGPcs5/sm123.jpg',
    alt: 'Mighty Twist',
    link: '/menu?category=combo-meals',
  },
  {
    id: '2',
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/FD_AE_En_190525.jpg',
    alt: 'Loaded Twist',
    link: '/menu?category=combo-meals',
  },
  {
    id: '3',
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/stripsdipping_UAE_En_270325.jpg',
    alt: 'Strips Dipping',
    link: '/menu?category=combo-meals',
  },
  {
    id: '4',
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/cheeselavameal_AE_En_140525.jpg',
    alt: 'Cheese Lava Meal',
    link: '/menu?category=combo-meals',
  },
  {
    id: '5',
    image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/superduobucket_AE_En_010825.jpg',
    alt: 'Super Duo Bucket',
    link: '/menu?category=combo-meals',
  },
];

export const bottomBanners = [
  {
    id: '1',
    image: 'https://i.ibb.co/KzLJYjFd/bn2.jpg',
    alt: 'KFC Special Offer',
    link: '#',
  },
  {
    id: '2',
    image: '/assets/img/ads/banner3.png',
    alt: 'KFC Delivery',
    link: '#',
  },
];