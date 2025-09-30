'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: any;
}

interface CartTrackingData {
  userId: string;
  sessionId: string;
  items: CartItem[];
  totalAmount: number;
  action: 'cart_update' | 'checkout_start';
}

export default function CartTracker() {
  const [userId] = useState(() => {
    return localStorage.getItem('kfc_user_id') || '';
  });

  const [sessionId] = useState(() => {
    return sessionStorage.getItem('kfc_session_id') || '';
  });

  // Функция для отслеживания обновления корзины
  const trackCartUpdate = async (items: CartItem[], totalAmount: number) => {
    if (!userId || !sessionId) return;

    try {
      const trackingData: CartTrackingData = {
        userId,
        sessionId,
        items,
        totalAmount,
        action: 'cart_update'
      };

      await fetch('/api/tracking/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
    } catch (error) {
      console.error('Cart tracking error:', error);
    }
  };

  // Функция для отслеживания перехода на оплату
  const trackCheckoutStart = async (items: CartItem[], totalAmount: number) => {
    if (!userId || !sessionId) return;

    try {
      const trackingData: CartTrackingData = {
        userId,
        sessionId,
        items,
        totalAmount,
        action: 'checkout_start'
      };

      await fetch('/api/tracking/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
    } catch (error) {
      console.error('Checkout tracking error:', error);
    }
  };

  // Экспортируем функции для использования в других компонентах
  useEffect(() => {
    // Добавляем функции в window для глобального доступа
    (window as any).trackCartUpdate = trackCartUpdate;
    (window as any).trackCheckoutStart = trackCheckoutStart;
  }, [userId, sessionId]);

  return null; // Компонент не рендерит ничего видимого
}
