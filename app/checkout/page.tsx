'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Clock, CreditCard, User, Phone, Mail } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentMethod: 'cash' | 'card';
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dubai',
    paymentMethod: 'cash'
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('kfc-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 5.00;
  const serviceFee = 2.00;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee + serviceFee;
  const vat = total * 0.05;

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    alert('Order placed successfully!');
    // Clear cart and redirect
    localStorage.removeItem('kfc-cart');
    window.location.href = '/orders';
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F0F3F6] min-h-screen">
        <main className="pb-25">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="flex items-center gap-2">
              <Link href="/cart" className="text-3xl cursor-pointer">
                <ArrowLeft />
              </Link>
              <span className="text-sm font-bold">Checkout</span>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-4xl text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="176" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
                <circle cx="400" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256"></path>
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-center text-gray-500 mb-6">Add some items to your cart first!</p>
            <Link href="/menu" className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">
              Browse Menu
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F3F6] min-h-screen">
      <main className="pb-25">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <Link href="/cart" className="text-3xl cursor-pointer">
              <ArrowLeft />
            </Link>
            <span className="text-sm font-bold">Checkout</span>
          </div>
        </div>

        {/* Delivery Information */}
        <section className="mt-4 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="text-red-500" />
            Delivery Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Enter your full name"
                  value={deliveryInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="+971 50 123 4567"
                  value={deliveryInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="your.email@example.com"
                  value={deliveryInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Enter your complete delivery address"
                  rows={3}
                  value={deliveryInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                value={deliveryInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              >
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
              </select>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="mt-4 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CreditCard className="text-red-500" />
            Payment Method
          </h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={deliveryInfo.paymentMethod === 'cash'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="text-red-500"
              />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">$</span>
                </div>
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-500">Pay when your order arrives</div>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={deliveryInfo.paymentMethod === 'card'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="text-red-500"
              />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="text-blue-600 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-500">Pay securely online</div>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Order Summary */}
        <section className="mt-4 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 border-b border-gray-100">
                <Image
                  alt={item.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-lg"
                  src={item.image}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{(item.price * item.quantity).toFixed(2)} AED</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm">{subtotal.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Delivery Fee</span>
              <span className="text-sm">{deliveryFee.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Service Fee</span>
              <span className="text-sm">{serviceFee.toFixed(2)} AED</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toFixed(2)} AED</span>
            </div>
            <p className="text-xs text-gray-500">Inclusive of VAT 5%</p>
          </div>
        </section>

        {/* Delivery Time */}
        <section className="mt-4 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="text-red-500" />
            Estimated Delivery Time
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 font-medium">30-45 minutes</p>
            <p className="text-sm text-red-600">Delivery time may vary based on location and traffic</p>
          </div>
        </section>

        {/* Place Order Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handlePlaceOrder}
            disabled={!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address}
            className="w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 text-white py-3 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-600 hover:via-red-500 hover:to-red-600 transition-all"
          >
            Place Order - {total.toFixed(2)} AED
          </button>
        </div>
      </main>
    </div>
  );
}
