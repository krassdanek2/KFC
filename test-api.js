// Тест API endpoints для отслеживания
const testTracking = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Тестирование API endpoints...');
  
  try {
    // Тест отслеживания пользователя
    console.log('\n1. Тестирование /api/tracking/user');
    const userResponse = await fetch(`${baseUrl}/api/tracking/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'test_user_123',
        page: '/test',
        sessionId: 'test_session_456',
        userAgent: 'Test Agent',
        referrer: 'https://test.com'
      }),
    });
    
    const userResult = await userResponse.json();
    console.log('✅ User tracking response:', userResult);
    
    // Тест отслеживания посещения
    console.log('\n2. Тестирование /api/tracking/visit');
    const visitResponse = await fetch(`${baseUrl}/api/tracking/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'test_user_123',
        page: '/test',
        sessionId: 'test_session_456',
        userAgent: 'Test Agent'
      }),
    });
    
    const visitResult = await visitResponse.json();
    console.log('✅ Visit tracking response:', visitResult);
    
    // Тест отслеживания корзины
    console.log('\n3. Тестирование /api/tracking/cart');
    const cartResponse = await fetch(`${baseUrl}/api/tracking/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'test_user_123',
        sessionId: 'test_session_456',
        items: [
          { id: '1', name: 'Test Item', price: 10, quantity: 1 }
        ],
        totalAmount: 10,
        action: 'checkout_start'
      }),
    });
    
    const cartResult = await cartResponse.json();
    console.log('✅ Cart tracking response:', cartResult);
    
  } catch (error) {
    console.error('❌ Ошибка тестирования:', error);
  }
};

// Запускаем тест через 3 секунды после запуска сервера
setTimeout(testTracking, 3000);
