import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for payment statuses and SMS requests
const paymentStatuses: { [key: string]: any } = {};
const smsRequests: { [key: string]: any } = {};

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
    const smsRequest = smsRequests[orderId];

    return NextResponse.json({
      orderId,
      status,
      smsRequest,
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
    const { orderId, status, smsCode, action } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    if (action === 'updateStatus') {
      // Update payment status
      paymentStatuses[orderId] = status;
      
      return NextResponse.json({
        success: true,
        orderId,
        status,
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'requestSMS') {
      // Request SMS code from user
      smsRequests[orderId] = {
        requested: true,
        timestamp: new Date().toISOString()
      };
      
      return NextResponse.json({
        success: true,
        orderId,
        action: 'sms_requested',
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'submitSMS') {
      // Submit SMS code
      if (!smsCode) {
        return NextResponse.json(
          { error: 'SMS code is required' },
          { status: 400 }
        );
      }

      // Validate SMS code (in real app, this would be validated with bank)
      const isValid = smsCode.length >= 4; // Simple validation
      
      if (isValid) {
        paymentStatuses[orderId] = 'success';
        delete smsRequests[orderId];
      } else {
        return NextResponse.json(
          { error: 'Invalid SMS code' },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        success: true,
        orderId,
        status: isValid ? 'success' : 'sms_invalid',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Payment status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}