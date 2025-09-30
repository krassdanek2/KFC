#!/usr/bin/env node

// Запуск бота в Railway
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск Telegram бота в Railway...');

// Запускаем бота
const botProcess = spawn('node', ['bot.js'], {
  cwd: path.join(__dirname, 'telegram-bot'),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

botProcess.on('error', (error) => {
  console.error('❌ Ошибка запуска бота:', error);
});

botProcess.on('exit', (code) => {
  console.log(`🤖 Бот завершился с кодом: ${code}`);
});

// Обработка сигналов завершения
process.on('SIGTERM', () => {
  console.log('🛑 Получен SIGTERM, завершаем бота...');
  botProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🛑 Получен SIGINT, завершаем бота...');
  botProcess.kill('SIGINT');
});
