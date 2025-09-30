require('dotenv').config();

// Запуск бота только с MongoDB (без SQLite)
async function startBotMongoDB() {
    try {
        console.log('🔄 Инициализация Telegram бота с MongoDB...');
        
        // Запуск бота (он сам подключится к MongoDB)
        const bot = require('./bot');
        console.log('🤖 Telegram бот запущен с MongoDB!');
        
    } catch (error) {
        console.error('❌ Ошибка запуска бота:', error.message);
        process.exit(1);
    }
}

startBotMongoDB();
