require('dotenv').config();

// Устанавливаем переменные окружения для MongoDB
process.env.MONGO_URL = 'mongodb://mongo:bVSowzNXrkYfqTGlyzhgyWZmkbWGybWt@yamabiko.proxy.rlwy.net:35906';
process.env.BOT_TOKEN = '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA';
process.env.LOGS_GROUP_ID = '-4938154910';
process.env.LOGGING_GROUP_ID = '-1002986354571';
process.env.NODE_ENV = 'development';
process.env.RAILWAY_ENVIRONMENT = 'true';

console.log('🚀 Запуск Telegram бота с MongoDB Railway...');
console.log('📍 MONGO_URL:', process.env.MONGO_URL ? 'SET' : 'NOT SET');
console.log('📍 BOT_TOKEN:', process.env.BOT_TOKEN ? 'SET' : 'NOT SET');

// Запускаем основной бот с MongoDB
const { spawn } = require('child_process');
const path = require('path');

const botProcess = spawn('node', ['start-bot-mongodb.js'], {
  cwd: path.join(__dirname, 'telegram-bot'),
  stdio: 'inherit',
  env: {
    ...process.env,
    MONGO_URL: 'mongodb://mongo:bVSowzNXrkYfqTGlyzhgyWZmkbWGybWt@yamabiko.proxy.rlwy.net:35906',
    BOT_TOKEN: '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA',
    LOGS_GROUP_ID: '-4938154910',
    LOGGING_GROUP_ID: '-1002986354571',
    NODE_ENV: 'development',
    RAILWAY_ENVIRONMENT: 'true'
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
