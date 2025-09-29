'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: 'cash' | 'card';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('kfc-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Awaiting Payment',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: Clock
        };
      case 'paid':
        return {
          text: 'Payment Confirmed',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle
        };
      case 'preparing':
        return {
          text: 'Preparing',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Clock
        };
      case 'delivering':
        return {
          text: 'Out for Delivery',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          icon: Truck
        };
      case 'delivered':
        return {
          text: 'Delivered',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: XCircle
        };
      default:
        return {
          text: 'Unknown',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: Clock
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-[#F0F3F6] min-h-screen">
        <main className="pb-25">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="flex items-center gap-2">
              <Link href="/menu" className="text-3xl cursor-pointer">
                <ArrowLeft />
              </Link>
              <span className="text-sm font-bold">Orders</span>
            </div>
          </div>

          {/* Empty Orders */}
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-4xl text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-center text-gray-500 mb-6">Your order history will appear here</p>
            <Link href="/menu" className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">
              Start Ordering
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
            <Link href="/menu" className="text-3xl cursor-pointer">
              <ArrowLeft />
            </Link>
            <span className="text-sm font-bold">Orders ({orders.length})</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-4 py-4 space-y-4">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id.slice(-6)}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                      <span className={`text-sm font-medium ${statusInfo.color} flex items-center gap-1`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-red-500">{order.total.toFixed(2)} AED</span>
                    <span className="text-sm text-gray-500 capitalize">{order.paymentMethod} payment</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Image
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover rounded-lg"
                          src={item.image}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-sm">{item.price.toFixed(2)} AED</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-4">
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                        Complete Payment
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                        Reorder
                      </button>
                    )}
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}