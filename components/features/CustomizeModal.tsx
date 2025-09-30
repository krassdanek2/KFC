'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export interface CustomizeOption {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isDefault?: boolean;
}

export interface CustomizeSection {
  id: string;
  title: string;
  type: 'single' | 'multiple' | 'optional';
  required: boolean;
  options: CustomizeOption[];
  maxSelections?: number;
}

export interface ProductCustomization {
  productId: string;
  sections: CustomizeSection[];
}

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onAddToCart: (customizedProduct: any) => void;
}

// Данные кастомизации для разных типов товаров
const getCustomizationData = (product: any): CustomizeSection[] => {
  const category = product.category || '';
  const productName = product.name?.toLowerCase() || '';

  // Для бургеров
  if (category === 'burgers' || productName.includes('burger') || productName.includes('cruncher')) {
    return [
      {
        id: 'sauces',
        title: 'Выберите соус',
        type: 'single',
        required: false,
        options: [
          { id: 'mayo', name: 'Майонез', price: 0, image: '/images/menu/810041.png', category: 'sauce', isDefault: true },
          { id: 'ketchup', name: 'Кетчуп', price: 0, image: '/images/menu/810028.png', category: 'sauce' },
          { id: 'mustard', name: 'Горчица', price: 0, image: '/images/menu/810062.png', category: 'sauce' },
          { id: 'bbq', name: 'BBQ соус', price: 0, image: '/images/menu/810065.png', category: 'sauce' },
          { id: 'ranch', name: 'Ранч соус', price: 0, image: '/images/menu/810040.png', category: 'sauce' },
          { id: 'dynamite', name: 'Динамит соус', price: 0, image: '/images/menu/810028.png', category: 'sauce' },
        ]
      },
      {
        id: 'extras',
        title: 'Дополнительные ингредиенты',
        type: 'multiple',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'cheese', name: 'Сыр', price: 2, image: '/images/menu/814007.png', category: 'extra' },
          { id: 'bacon', name: 'Бекон', price: 3, image: '/images/menu/510001.png', category: 'extra' },
          { id: 'lettuce', name: 'Салат', price: 1, image: '/images/menu/510004.png', category: 'extra' },
          { id: 'tomato', name: 'Помидор', price: 1, image: '/images/menu/510012.png', category: 'extra' },
          { id: 'onion', name: 'Лук', price: 1, image: '/images/menu/510001.png', category: 'extra' },
        ]
      },
      {
        id: 'size',
        title: 'Размер порции',
        type: 'single',
        required: false,
        options: [
          { id: 'regular', name: 'Обычный', price: 0, image: product.image, category: 'size', isDefault: true },
          { id: 'large', name: 'Большой', price: 3, image: product.image, category: 'size' },
        ]
      }
    ];
  }

  // Для твистеров
  if (category === 'twisters' || productName.includes('twister')) {
    return [
      {
        id: 'flavor',
        title: 'Выберите вкус',
        type: 'single',
        required: true,
        options: [
          { id: 'original', name: 'Оригинальный', price: 0, image: '/images/menu/910001.png', category: 'flavor', isDefault: true },
          { id: 'spicy', name: 'Острый', price: 0, image: '/images/menu/910002.png', category: 'flavor' },
        ]
      },
      {
        id: 'sauces',
        title: 'Выберите соус',
        type: 'single',
        required: false,
        options: [
          { id: 'mayo', name: 'Майонез', price: 0, image: '/images/menu/810041.png', category: 'sauce', isDefault: true },
          { id: 'ranch', name: 'Ранч соус', price: 0, image: '/images/menu/810040.png', category: 'sauce' },
          { id: 'spicy_ranch', name: 'Острый ранч', price: 0, image: '/images/menu/810066.png', category: 'sauce' },
          { id: 'bbq', name: 'BBQ соус', price: 0, image: '/images/menu/810065.png', category: 'sauce' },
          { id: 'dynamite', name: 'Динамит соус', price: 0, image: '/images/menu/810028.png', category: 'sauce' },
        ]
      },
      {
        id: 'extras',
        title: 'Дополнительные ингредиенты',
        type: 'multiple',
        required: false,
        maxSelections: 2,
        options: [
          { id: 'cheese', name: 'Сыр', price: 2, image: '/images/menu/814007.png', category: 'extra' },
          { id: 'lettuce', name: 'Салат', price: 1, image: '/images/menu/510004.png', category: 'extra' },
          { id: 'tomato', name: 'Помидор', price: 1, image: '/images/menu/510012.png', category: 'extra' },
          { id: 'jalapeno', name: 'Халапеньо', price: 1, image: '/images/menu/510001.png', category: 'extra' },
        ]
      }
    ];
  }

  // Для куриных ведер
  if (category === 'chicken-buckets' || productName.includes('bucket') || productName.includes('chicken')) {
    return [
      {
        id: 'flavor',
        title: 'Выберите вкус курицы',
        type: 'single',
        required: true,
        options: [
          { id: 'original', name: 'Оригинальный', price: 0, image: '/images/menu/910001.png', category: 'flavor', isDefault: true },
          { id: 'spicy', name: 'Острый', price: 0, image: '/images/menu/910002.png', category: 'flavor' },
        ]
      },
      {
        id: 'sides',
        title: 'Выберите гарнир',
        type: 'single',
        required: false,
        options: [
          { id: 'fries', name: 'Картофель фри', price: 0, image: '/images/menu/5000185.png', category: 'side', isDefault: true },
          { id: 'spicy_fries', name: 'Острый картофель фри', price: 1, image: '/images/menu/5000082.png', category: 'side' },
          { id: 'coleslaw', name: 'Кольслоу', price: 0, image: '/images/menu/9.png', category: 'side' },
          { id: 'rice', name: 'Рис', price: 0, image: '/images/menu/510031.png', category: 'side' },
          { id: 'mashed_potatoes', name: 'Картофельное пюре', price: 0, image: '/images/menu/5000185.png', category: 'side' },
        ]
      },
      {
        id: 'dips',
        title: 'Выберите соусы',
        type: 'multiple',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'ketchup', name: 'Кетчуп', price: 0, image: '/images/menu/810028.png', category: 'dip' },
          { id: 'ranch', name: 'Ранч соус', price: 0, image: '/images/menu/810040.png', category: 'dip' },
          { id: 'bbq', name: 'BBQ соус', price: 0, image: '/images/menu/810065.png', category: 'dip' },
          { id: 'dynamite', name: 'Динамит соус', price: 0, image: '/images/menu/810028.png', category: 'dip' },
          { id: 'gravy', name: 'Грави', price: 0, image: '/images/menu/810007.png', category: 'dip' },
          { id: 'cheddar', name: 'Чеддер соус', price: 0, image: '/images/menu/810005.png', category: 'dip' },
        ]
      },
      {
        id: 'extra_items',
        title: 'Дополнительные позиции',
        type: 'multiple',
        required: false,
        maxSelections: 2,
        options: [
          { id: 'extra_chicken', name: 'Дополнительная курица', price: 5, image: '/images/menu/910001.png', category: 'extra' },
          { id: 'nuggets', name: 'Наггетсы', price: 7, image: '/images/menu/510143.png', category: 'extra' },
          { id: 'wings', name: 'Крылышки', price: 9, image: '/images/menu/510101.png', category: 'extra' },
          { id: 'strips', name: 'Стрипсы', price: 5, image: '/images/menu/511006.png', category: 'extra' },
        ]
      }
    ];
  }

  // Для напитков
  if (category === 'drinks' || productName.includes('pepsi') || productName.includes('juice') || productName.includes('water')) {
    return [
      {
        id: 'size',
        title: 'Выберите размер',
        type: 'single',
        required: true,
        options: [
          { id: 'small', name: 'Маленький', price: 0, image: product.image, category: 'size', isDefault: true },
          { id: 'medium', name: 'Средний', price: 2, image: product.image, category: 'size' },
          { id: 'large', name: 'Большой', price: 4, image: product.image, category: 'size' },
        ]
      },
      {
        id: 'ice',
        title: 'Количество льда',
        type: 'single',
        required: false,
        options: [
          { id: 'no_ice', name: 'Без льда', price: 0, image: product.image, category: 'ice', isDefault: true },
          { id: 'light_ice', name: 'Мало льда', price: 0, image: product.image, category: 'ice' },
          { id: 'normal_ice', name: 'Обычно', price: 0, image: product.image, category: 'ice' },
          { id: 'extra_ice', name: 'Много льда', price: 0, image: product.image, category: 'ice' },
        ]
      },
      {
        id: 'temperature',
        title: 'Температура',
        type: 'single',
        required: false,
        options: [
          { id: 'cold', name: 'Холодный', price: 0, image: product.image, category: 'temperature', isDefault: true },
          { id: 'room_temp', name: 'Комнатной температуры', price: 0, image: product.image, category: 'temperature' },
        ]
      }
    ];
  }

  // Для комбо-обедов
  if (category === 'combo-meals' || productName.includes('combo') || productName.includes('meal')) {
    return [
      {
        id: 'drink',
        title: 'Выберите напиток',
        type: 'single',
        required: true,
        options: [
          { id: 'pepsi', name: 'Pepsi', price: 0, image: '/images/menu/5000475.png', category: 'drink', isDefault: true },
          { id: '7up', name: '7UP', price: 0, image: '/images/menu/5000476.png', category: 'drink' },
          { id: 'mountain_dew', name: 'Mountain Dew', price: 0, image: '/images/menu/5000477.png', category: 'drink' },
          { id: 'mirinda', name: 'Mirinda', price: 0, image: '/images/menu/5000478.png', category: 'drink' },
          { id: 'pepsi_zero', name: 'Pepsi Zero', price: 0, image: '/images/menu/5000479.png', category: 'drink' },
          { id: 'orange_juice', name: 'Апельсиновый сок', price: 2, image: '/images/menu/610020.png', category: 'drink' },
          { id: 'water', name: 'Вода', price: 0, image: '/images/menu/614001.png', category: 'drink' },
        ]
      },
      {
        id: 'side',
        title: 'Выберите гарнир',
        type: 'single',
        required: true,
        options: [
          { id: 'fries', name: 'Картофель фри', price: 0, image: '/images/menu/5000185.png', category: 'side', isDefault: true },
          { id: 'spicy_fries', name: 'Острый картофель фри', price: 1, image: '/images/menu/5000082.png', category: 'side' },
          { id: 'coleslaw', name: 'Кольслоу', price: 0, image: '/images/menu/9.png', category: 'side' },
          { id: 'rice', name: 'Рис', price: 0, image: '/images/menu/510031.png', category: 'side' },
          { id: 'mashed_potatoes', name: 'Картофельное пюре', price: 0, image: '/images/menu/5000185.png', category: 'side' },
        ]
      },
      {
        id: 'extra_sides',
        title: 'Дополнительные гарниры',
        type: 'multiple',
        required: false,
        maxSelections: 2,
        options: [
          { id: 'nuggets', name: '5 шт наггетсов', price: 7, image: '/images/menu/510143.png', category: 'extra' },
          { id: 'wings', name: '3 шт крылышек', price: 9, image: '/images/menu/510101.png', category: 'extra' },
          { id: 'strips', name: '2 шт стрипсов', price: 5, image: '/images/menu/511006.png', category: 'extra' },
          { id: 'extra_fries', name: 'Дополнительный картофель фри', price: 3, image: '/images/menu/5000185.png', category: 'extra' },
        ]
      },
      {
        id: 'dips',
        title: 'Выберите соусы',
        type: 'multiple',
        required: false,
        maxSelections: 2,
        options: [
          { id: 'ketchup', name: 'Кетчуп', price: 0, image: '/images/menu/810028.png', category: 'dip' },
          { id: 'ranch', name: 'Ранч соус', price: 0, image: '/images/menu/810040.png', category: 'dip' },
          { id: 'bbq', name: 'BBQ соус', price: 0, image: '/images/menu/810065.png', category: 'dip' },
          { id: 'dynamite', name: 'Динамит соус', price: 0, image: '/images/menu/810028.png', category: 'dip' },
        ]
      }
    ];
  }

  // Для соусов и гарниров
  if (category === 'dips' || category === 'sides') {
    return [
      {
        id: 'quantity',
        title: 'Количество',
        type: 'single',
        required: true,
        options: [
          { id: '1', name: '1 порция', price: 0, image: product.image, category: 'quantity', isDefault: true },
          { id: '2', name: '2 порции', price: product.price, image: product.image, category: 'quantity' },
          { id: '3', name: '3 порции', price: product.price * 2, image: product.image, category: 'quantity' },
        ]
      },
      {
        id: 'size',
        title: 'Размер порции',
        type: 'single',
        required: false,
        options: [
          { id: 'small', name: 'Маленький', price: 0, image: product.image, category: 'size', isDefault: true },
          { id: 'medium', name: 'Средний', price: 2, image: product.image, category: 'size' },
          { id: 'large', name: 'Большой', price: 4, image: product.image, category: 'size' },
        ]
      }
    ];
  }

  // Для эксклюзивных предложений
  if (category === 'exclusive-deals' || productName.includes('deal') || productName.includes('super')) {
    return [
      {
        id: 'drink',
        title: 'Выберите напиток',
        type: 'single',
        required: true,
        options: [
          { id: 'pepsi', name: 'Pepsi', price: 0, image: '/images/menu/5000475.png', category: 'drink', isDefault: true },
          { id: '7up', name: '7UP', price: 0, image: '/images/menu/5000476.png', category: 'drink' },
          { id: 'mountain_dew', name: 'Mountain Dew', price: 0, image: '/images/menu/5000477.png', category: 'drink' },
          { id: 'orange_juice', name: 'Апельсиновый сок', price: 2, image: '/images/menu/610020.png', category: 'drink' },
        ]
      },
      {
        id: 'side',
        title: 'Выберите гарнир',
        type: 'single',
        required: true,
        options: [
          { id: 'fries', name: 'Картофель фри', price: 0, image: '/images/menu/5000185.png', category: 'side', isDefault: true },
          { id: 'spicy_fries', name: 'Острый картофель фри', price: 1, image: '/images/menu/5000082.png', category: 'side' },
          { id: 'coleslaw', name: 'Кольслоу', price: 0, image: '/images/menu/9.png', category: 'side' },
        ]
      },
      {
        id: 'extra_items',
        title: 'Дополнительные позиции',
        type: 'multiple',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'extra_chicken', name: 'Дополнительная курица', price: 5, image: '/images/menu/910001.png', category: 'extra' },
          { id: 'nuggets', name: 'Наггетсы', price: 7, image: '/images/menu/510143.png', category: 'extra' },
          { id: 'wings', name: 'Крылышки', price: 9, image: '/images/menu/510101.png', category: 'extra' },
          { id: 'strips', name: 'Стрипсы', price: 5, image: '/images/menu/511006.png', category: 'extra' },
          { id: 'burger', name: 'Дополнительный бургер', price: 8, image: '/images/menu/110001.png', category: 'extra' },
        ]
      }
    ];
  }

  // По умолчанию - базовая кастомизация
  return [
    {
      id: 'size',
      title: 'Выберите размер',
      type: 'single',
      required: false,
      options: [
        { id: 'regular', name: 'Обычный', price: 0, image: product.image, category: 'size', isDefault: true },
        { id: 'large', name: 'Большой', price: 3, image: product.image, category: 'size' },
      ]
    }
  ];
};

export default function CustomizeModal({ isOpen, onClose, product, onAddToCart }: CustomizeModalProps) {
  const [customizations, setCustomizations] = useState<{ [key: string]: string | string[] }>({});
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [currentSection, setCurrentSection] = useState(0);

  const customizationSections = getCustomizationData(product);

  useEffect(() => {
    if (isOpen) {
      // Инициализация значений по умолчанию
      const defaultCustomizations: { [key: string]: string | string[] } = {};
      customizationSections.forEach(section => {
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
      calculateTotalPrice(defaultCustomizations);
    }
  }, [isOpen, product]);

  const calculateTotalPrice = (customizations: { [key: string]: string | string[] }) => {
    let total = product.price;
    
    customizationSections.forEach(section => {
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
    
    setTotalPrice(total);
  };

  const handleOptionSelect = (sectionId: string, optionId: string, sectionType: 'single' | 'multiple') => {
    const newCustomizations = { ...customizations };
    
    if (sectionType === 'single') {
      newCustomizations[sectionId] = optionId;
    } else {
      const currentSelections = (newCustomizations[sectionId] as string[]) || [];
      const section = customizationSections.find(s => s.id === sectionId);
      const maxSelections = section?.maxSelections || 3;
      
      if (currentSelections.includes(optionId)) {
        newCustomizations[sectionId] = currentSelections.filter(id => id !== optionId);
      } else if (currentSelections.length < maxSelections) {
        newCustomizations[sectionId] = [...currentSelections, optionId];
      }
    }
    
    setCustomizations(newCustomizations);
    calculateTotalPrice(newCustomizations);
  };

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      customizations,
      totalPrice,
      customizedName: `${product.name} (кастомизированный)`
    };
    
    onAddToCart(customizedProduct);
    onClose();
  };

  const isOptionSelected = (sectionId: string, optionId: string, sectionType: 'single' | 'multiple') => {
    const selected = customizations[sectionId];
    if (sectionType === 'multiple' && Array.isArray(selected)) {
      return selected.includes(optionId);
    }
    return selected === optionId;
  };

  const canProceed = () => {
    return customizationSections.every(section => {
      if (!section.required) return true;
      const selected = customizations[section.id];
      return selected && (Array.isArray(selected) ? selected.length > 0 : true);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-hidden rounded-t-2xl md:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-xl text-gray-700">
                  <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path>
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Кастомизация</h2>
                <p className="text-sm text-gray-600">{product.name}</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
              СБРОС
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={150}
            className="rounded-lg object-contain"
          />
        </div>

        {/* Customization Sections */}
        <div className="px-4 pb-20 overflow-y-auto max-h-[60vh]">
          {customizationSections.map((section, index) => (
            <div key={section.id} className="mb-6">
              <h3 className="text-base font-bold mb-3 text-gray-900">
                {section.title}
                {section.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              
              <div className="space-y-2">
                {section.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      isOptionSelected(section.id, option.id, section.type)
                        ? 'bg-red-50 border-2 border-red-500'
                        : 'bg-white border border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Image
                        src={option.image}
                        alt={option.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-contain"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{option.name}</span>
                        {option.price > 0 && (
                          <span className="text-sm text-gray-500 ml-2">+{option.price} AED</span>
                        )}
                        {option.price === 0 && (
                          <span className="text-sm text-green-600 ml-2">БЕСПЛАТНО</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {section.type === 'single' ? (
                        <input
                          type="radio"
                          name={section.id}
                          value={option.id}
                          checked={isOptionSelected(section.id, option.id, section.type)}
                          onChange={() => handleOptionSelect(section.id, option.id, section.type)}
                          className="w-5 h-5 text-red-500 border-gray-300 focus:ring-red-500"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={isOptionSelected(section.id, option.id, section.type)}
                          onChange={() => handleOptionSelect(section.id, option.id, section.type)}
                          className="w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
                        />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-contain"
                />
              </div>
              <span className="font-bold text-sm">1 ТОВАР</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-medium text-white flex items-center gap-2 ${
                canProceed()
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <div className="flex flex-col items-start">
                <div className="text-sm font-bold">{totalPrice.toFixed(2)} AED</div>
                <div className="text-xs opacity-80">*НДС включен</div>
              </div>
              <div className="flex items-center gap-1">
                Добавить в корзину
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-sm">
                  <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
