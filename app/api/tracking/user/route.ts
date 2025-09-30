import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';

// Bot configuration
const BOT_TOKEN = '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA';
const LOGS_GROUP_ID = '-4938154910';

const bot = new Telegraf(BOT_TOKEN);

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URL || process.env.DATABASE_URL || 'mongodb://localhost:27017/kfc-clone';

// Схемы
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  userAgent: { type: String },
  referrer: { type: String },
  firstVisit: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

// Модели
const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export async function POST(request: NextRequest) {
  try {
    // Подключаемся к MongoDB если еще не подключены
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUrl);
    }

    const { userId, page, sessionId, ip, userAgent, referrer } = await request.json();

    if (!userId || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, page' },
        { status: 400 }
      );
    }

    // Получаем IP адрес
    const clientIP = ip || request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Получаем User Agent
    const clientUserAgent = userAgent || request.headers.get('user-agent') || 'unknown';

    // Проверяем, новый ли это пользователь
    const existingUser = await Users.findOne({ userId });
    
    if (!existingUser) {
      // Создаем нового пользователя
      await Users.create({
        userId,
        ip: clientIP,
        userAgent: clientUserAgent,
        referrer: referrer || null,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1,
        createdAt: new Date()
      });

      // Отправляем уведомление о новом пользователе
      const alertMessage = `
🆕 <b>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</b>

👤 <b>ID пользователя:</b> <code>${userId}</code>
🌐 <b>Страница:</b> <code>${page}</code>
🆔 <b>Сессия:</b> <code>${sessionId || 'N/A'}</code>
📍 <b>IP адрес:</b> <code>${clientIP}</code>
🔗 <b>Referrer:</b> ${referrer || 'Прямой переход'}

📱 <b>User Agent:</b>
<code>${clientUserAgent}</code>

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
      `;

      await bot.telegram.sendMessage(LOGS_GROUP_ID, alertMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '👁 Отследить', callback_data: `track_user_${userId}` },
              { text: '📊 Статистика', callback_data: 'user_stats' }
            ]
          ]
        }
      });

      return NextResponse.json({
        success: true,
        isNewUser: true,
        userId,
        page,
        timestamp: new Date().toISOString()
      });
    } else {
      // Обновляем существующего пользователя
      await Users.findOneAndUpdate(
        { userId },
        {
          $set: {
            ip: clientIP,
            userAgent: clientUserAgent,
            referrer: referrer || null,
            lastVisit: new Date()
          },
          $inc: { visitCount: 1 }
        }
      );

      return NextResponse.json({
        success: true,
        isNewUser: false,
        userId,
        page,
        visitCount: existingUser.visitCount + 1,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('User tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track user' },
      { status: 500 }
    );
  }
}
