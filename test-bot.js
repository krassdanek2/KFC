// Простой тест Telegram бота
const { Telegraf } = require('telegraf');

const BOT_TOKEN = '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA';
const LOGS_GROUP_ID = '-4938154910';

const bot = new Telegraf(BOT_TOKEN);

// Тест отправки сообщения
async function testBot() {
  try {
    console.log('🤖 Тестирование Telegram бота...');
    
    // Проверяем информацию о боте
    const botInfo = await bot.telegram.getMe();
    console.log('✅ Бот подключен:', botInfo.first_name);
    
    // Отправляем тестовое сообщение
    const message = await bot.telegram.sendMessage(LOGS_GROUP_ID, `
🧪 <b>ТЕСТ БОТА</b>

✅ Бот работает!
⏰ Время: ${new Date().toLocaleString('ru-RU')}
🔧 Статус: Активен

Это тестовое сообщение для проверки работы бота.
    `, {
      parse_mode: 'HTML'
    });
    
    console.log('✅ Сообщение отправлено! ID:', message.message_id);
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    
    if (error.code === 400) {
      console.log('💡 Возможные причины:');
      console.log('   - Неправильный GROUP_ID');
      console.log('   - Бот не добавлен в группу');
      console.log('   - У бота нет прав отправлять сообщения');
    }
  }
}

testBot();
