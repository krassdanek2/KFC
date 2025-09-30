import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

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

const visitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  page: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String },
  ip: { type: String },
  userAgent: { type: String }
});

// Модели
const Users = mongoose.models.Users || mongoose.model('Users', userSchema);
const Visits = mongoose.models.Visits || mongoose.model('Visits', visitSchema);

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

    // Обновляем или создаем пользователя
    await Users.findOneAndUpdate(
      { userId },
      {
        $set: {
          ip: clientIP,
          userAgent: clientUserAgent,
          referrer: referrer || null,
          lastVisit: new Date()
        },
        $inc: { visitCount: 1 },
        $setOnInsert: {
          firstVisit: new Date(),
          createdAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    // Создаем запись о посещении
    await Visits.create({
      userId,
      page,
      sessionId: sessionId || `session_${Date.now()}`,
      ip: clientIP,
      userAgent: clientUserAgent,
      timestamp: new Date()
    });

    return NextResponse.json({
      success: true,
      userId,
      page,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Visit tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}
