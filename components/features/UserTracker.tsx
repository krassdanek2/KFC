'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TrackingData {
  userId: string;
  page: string;
  sessionId: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
}

export default function UserTracker() {
  const pathname = usePathname();
  const [userId] = useState(() => {
    // Генерируем уникальный ID пользователя
    let stored = localStorage.getItem('kfc_user_id');
    if (!stored) {
      stored = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('kfc_user_id', stored);
    }
    return stored;
  });

  const [sessionId] = useState(() => {
    // Генерируем ID сессии
    let stored = sessionStorage.getItem('kfc_session_id');
    if (!stored) {
      stored = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('kfc_session_id', stored);
    }
    return stored;
  });

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const trackingData: TrackingData = {
          userId,
          page: pathname,
          sessionId,
          userAgent: navigator.userAgent,
          referrer: document.referrer || undefined
        };

        // Отправляем данные о посещении
        await fetch('/api/tracking/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trackingData),
        });

        // Отправляем данные о пользователе (для новых пользователей)
        await fetch('/api/tracking/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trackingData),
        });
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };

    trackVisit();
  }, [pathname, userId, sessionId]);

  return null; // Компонент не рендерит ничего видимого
}
