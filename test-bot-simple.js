const { Telegraf } = require('telegraf');

// Простой тест бота с правильным токеном
const bot = new Telegraf('8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA');

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Telegram bot error:', err);
});

// Команда /start
bot.command('start', (ctx) => {
  ctx.reply('🤖 KFC Bot работает!');
});

// Команда /test
bot.command('test', (ctx) => {
  ctx.reply('✅ Бот отвечает на команды!');
});

// Запуск бота
bot.launch().then(() => {
  console.log('🤖 KFC Bot запущен!');
  console.log('Токен:', '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA');
}).catch((error) => {
  console.error('Ошибка запуска бота:', error);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
