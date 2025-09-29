import { NextRequest, NextResponse } from 'next/server';

// В реальном приложении здесь была бы база данных
// Для демонстрации используем простой объект в памяти
const paymentStatuses: { [key: string]: string } = {};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const status = paymentStatuses[orderId] || 'pending';

    return NextResponse.json({
      orderId,
      status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    // Обновляем статус платежа
    paymentStatuses[orderId] = status;

    return NextResponse.json({
      success: true,
      orderId,
      status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Payment status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
