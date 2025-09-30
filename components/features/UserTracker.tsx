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
  const [userId, setUserId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Генерируем уникальный ID пользователя только на клиенте
    let stored = '';
    if (typeof window !== 'undefined') {
      stored = localStorage.getItem('kfc_user_id') || '';
      if (!stored) {
        stored = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('kfc_user_id', stored);
      }
    }
    setUserId(stored);

    // Генерируем ID сессии только на клиенте
    let sessionStored = '';
    if (typeof window !== 'undefined') {
      sessionStored = sessionStorage.getItem('kfc_session_id') || '';
      if (!sessionStored) {
        sessionStored = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('kfc_session_id', sessionStored);
      }
    }
    setSessionId(sessionStored);
  }, []);

  useEffect(() => {
    const trackVisit = async () => {
      // Проверяем что мы на клиенте и есть необходимые данные
      if (typeof window === 'undefined' || !userId || !sessionId) return;

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
