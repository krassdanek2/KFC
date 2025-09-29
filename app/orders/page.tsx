'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'preparing' | 'ready' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  deliveryAddress: string;
  estimatedTime: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders from API/localStorage
    const mockOrders: Order[] = [
      {
        id: 'ORD001',
        date: new Date().toISOString(),
        status: 'preparing',
        items: [
          { id: '1', name: 'Zinger Burger', quantity: 2, price: 12, image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png' },
          { id: '2', name: 'Pepsi', quantity: 2, price: 3, image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png' },
        ],
        total: 30,
        deliveryAddress: 'Dubai Mall, Downtown Dubai',
        estimatedTime: '30-40 mins',
      },
      {
        id: 'ORD002',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        status: 'delivered',
        items: [
          { id: '3', name: 'Super Mega Deal', quantity: 1, price: 25, image: 'https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png' },
        ],
        total: 25,
        deliveryAddress: 'Marina Walk, Dubai Marina',
        estimatedTime: 'Delivered',
      },
    ];

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(mockOrders);
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    }
    setIsLoading(false);
  }, []);

  const activeOrders = orders.filter(o => o.status === 'preparing' || o.status === 'ready');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'ready':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing your order';
      case 'ready':
        return 'Ready for pickup/delivery';
      case 'delivered':
        return 'Order delivered';
      case 'cancelled':
        return 'Order cancelled';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-700';
      case 'ready':
        return 'bg-blue-100 text-blue-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kfc-red"></div>
      </div>
    );
  }

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  if (displayOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-0">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'active'
                  ? 'text-kfc-red border-b-2 border-kfc-red'
                  : 'text-gray-600'
              }`}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'past'
                  ? 'text-kfc-red border-b-2 border-kfc-red'
                  : 'text-gray-600'
              }`}
            >
              Past Orders
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No {activeTab} orders</h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' 
                ? "You don't have any active orders right now" 
                : "You haven't placed any orders yet"}
            </p>
            <Link
              href="/menu"
              className="inline-block bg-kfc-red text-white px-6 py-3 rounded-lg font-medium hover:bg-kfc-dark-red transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 md:pb-0">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'active'
                ? 'text-kfc-red border-b-2 border-kfc-red'
                : 'text-gray-600'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'past'
                ? 'text-kfc-red border-b-2 border-kfc-red'
                : 'text-gray-600'
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {displayOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Order #{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-kfc-red">{order.total} AED</p>
                    <p className="text-sm text-gray-600">{order.estimatedTime}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">{item.price * item.quantity} AED</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Delivery to:</span> {order.deliveryAddress}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  {order.status === 'delivered' && (
                    <Link
                      href="/menu"
                      className="flex-1 text-center bg-kfc-red text-white py-2 rounded-lg font-medium hover:bg-kfc-dark-red transition-colors"
                    >
                      Reorder
                    </Link>
                  )}
                  {(order.status === 'preparing' || order.status === 'ready') && (
                    <button className="flex-1 text-center border border-kfc-red text-kfc-red py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
                      Track Order
                    </button>
                  )}
                  <button className="flex-1 text-center border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}