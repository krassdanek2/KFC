'use client';

import { useState, useEffect } from 'react';
import { X, Shield, Loader2 } from 'lucide-react';

interface SMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  orderId: string;
}

export default function SMSModal({ isOpen, onClose, onSuccess, orderId }: SMSModalProps) {
  const [smsCode, setSmsCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/payment/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          smsCode,
          action: 'submitSMS'
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.status === 'success') {
          onSuccess();
          onClose();
        } else {
          setError('Invalid SMS code. Please try again.');
        }
      } else {
        setError(result.error || 'Failed to verify SMS code');
      }
    } catch (error) {
      console.error('SMS verification error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setSmsCode(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Shield className="text-blue-500" />
            SMS Verification
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Enter SMS Code
            </h3>
            <p className="text-gray-600 text-sm">
              Please enter the SMS verification code sent to your phone number to complete the payment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* SMS Code Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                SMS Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono tracking-widest"
                placeholder="123456"
                value={smsCode}
                onChange={handleInputChange}
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || smsCode.length < 4}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                isSubmitting || smsCode.length < 4
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify SMS Code'
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Order ID: #{orderId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
