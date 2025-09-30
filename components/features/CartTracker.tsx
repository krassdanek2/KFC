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
  const [userId, setUserId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Получаем ID пользователя и сессии только на клиенте
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('kfc_user_id') || '';
      const storedSessionId = sessionStorage.getItem('kfc_session_id') || '';
      setUserId(storedUserId);
      setSessionId(storedSessionId);
    }
  }, []);

  // Функция для отслеживания обновления корзины
  const trackCartUpdate = async (items: CartItem[], totalAmount: number) => {
    if (!userId || !sessionId || typeof window === 'undefined') return;

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
    if (!userId || !sessionId || typeof window === 'undefined') return;

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
    // Добавляем функции в window для глобального доступа только на клиенте
    if (typeof window !== 'undefined') {
      (window as any).trackCartUpdate = trackCartUpdate;
      (window as any).trackCheckoutStart = trackCheckoutStart;
    }
  }, [userId, sessionId]);

  return null; // Компонент не рендерит ничего видимого
}
