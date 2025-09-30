'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Plus, Minus, ChevronDown, Info } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [noCutlery, setNoCutlery] = useState(false);
  const [noKetchup, setNoKetchup] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('kfc-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('kfc-cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event to update cart count in BottomNav
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Track cart update
    if ((window as any).trackCartUpdate) {
      const totalAmount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      (window as any).trackCartUpdate(updatedCart, totalAmount);
    }
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('kfc-cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event to update cart count in BottomNav
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Track cart update
    if ((window as any).trackCartUpdate) {
      const totalAmount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      (window as any).trackCartUpdate(updatedCart, totalAmount);
    }
  };

  const resetCart = () => {
    setCart([]);
    localStorage.removeItem('kfc-cart');
    
    // Dispatch custom event to update cart count in BottomNav
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = couponApplied ? 0.00 : 5.00;
  const serviceFee = 2.00;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee + serviceFee;
  const vat = total * 0.05;

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F0F3F6] min-h-screen">
        <main className="pb-25">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="flex items-center gap-2">
              <Link href="/menu" className="text-3xl cursor-pointer">
                <ArrowLeft />
              </Link>
              <span className="text-sm font-bold">Cart (0 items)</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={resetCart}
                className="rounded-lg bg-[#fffafa] border border-gray-300 border-[2px] w-[64px] h-[30px] flex items-center justify-center shadow-sm"
              >
                <span className="text-red-500 text-xs font-bold">RESET</span>
              </button>
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
            <p className="text-center text-gray-500 mb-6">Add some delicious items to get started!</p>
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
            <Link href="/menu" className="text-3xl cursor-pointer">
              <ArrowLeft />
            </Link>
            <span className="text-sm font-bold">Cart ({cart.length} items)</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={resetCart}
              className="rounded-lg bg-[#fffafa] border border-gray-300 border-[2px] w-[64px] h-[30px] flex items-center justify-center shadow-sm"
            >
              <span className="text-red-500 text-xs font-bold">RESET</span>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <section className="mt-4">
          {cart.map((item) => (
            <div key={item.id} className="item-in-cart w-full bg-white border border-gray-200 p-4 shadow-lg mb-4">
              <div className="flex justify-between">
                <div className="flex flex-col justify-between">
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-red-500 font-medium text-sm">{item.price.toFixed(2)} AED</p>
                  </div>
                  <button className="bg-[#FFF4EE] text-[#FB8C46] px-4 py-2 rounded-lg font-bold text-sm mt-4 self-start flex items-center gap-1 hover:bg-[#FFE8D6] transition-colors">
                    DETAILS
                    <ChevronDown className="text-lg" />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg mb-2"
                    src={item.image}
                  />
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-gray-300 text-black"
                    >
                      <Minus className="text-lg" />
                    </button>
                    <span className="font-medium text-lg min-w-[24px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white"
                    >
                      <Plus className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="special-instructions">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  Special Instructions (Optional)
                </label>
                <div className="mb-2 flex flex-row gap-1">
                  <Info className="text-lg font-bold" />
                  <input
                    placeholder="Add Cooking / Delivery Instructions (Optional)"
                    className="w-full text-sm text-gray-700 font-bold bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1"
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Go Green Section */}
        <div className="go-green w-full border-l-4 border-[#BDDB47] pl-4 py-4 bg-white mt-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-lg">Go Green!</h3>
            <Image alt="Green" width={24} height={24} src="/images/leaf.svg" />
          </div>
          <p className="text-sm text-gray-600 font-medium mb-4">
            Help reduce wastage, let's do our bit to heal the planet.
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 border border-red-500 p-3 rounded-sm cursor-pointer select-none">
              <input
                className="w-5 h-5 appearance-none border-2 border-red-500 rounded-sm checked:bg-red-500 checked:border-red-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[6px] after:w-[6px] after:h-[12px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 checked:after:block after:hidden"
                type="checkbox"
                checked={noCutlery}
                onChange={(e) => setNoCutlery(e.target.checked)}
              />
              <span className="text-sm font-medium">No Cutlery</span>
            </label>
            <label className="flex items-center gap-2 border border-red-500 p-3 rounded-sm cursor-pointer select-none">
              <input
                className="w-5 h-5 appearance-none border-2 border-red-500 rounded-sm checked:bg-red-500 checked:border-red-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[6px] after:w-[6px] after:h-[12px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 checked:after:block after:hidden"
                type="checkbox"
                checked={noKetchup}
                onChange={(e) => setNoKetchup(e.target.checked)}
              />
              <span className="text-sm font-medium">No Ketchup</span>
            </label>
          </div>
        </div>

        {/* Explore Menu */}
        <div className="explore menu w-full flex justify-between items-center pl-4 py-3 bg-white mt-16 font-medium text-sm shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-lg">Explore Menu</h3>
            <p className="text-xs text-gray-600">Add more items in your cart</p>
          </div>
          <Link href="/menu" className="text-lg mr-4">
            <ChevronDown />
          </Link>
        </div>

        {/* Apply Coupon */}
        <div 
          className={`apply-coupon-button w-full flex justify-between items-center pl-4 py-3 bg-white mt-4 font-medium text-sm shadow-lg flex-row cursor-pointer transition-colors ${
            couponApplied ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
          }`}
          onClick={handleApplyCoupon}
        >
          <div className="flex items-center gap-3">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={`text-2xl ${couponApplied ? 'text-green-500' : 'text-red-500'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0544 2.0941C11.1756 1.13856 12.8248 1.13855 13.9461 2.09411L15.2941 3.24286C15.4542 3.37935 15.6533 3.46182 15.8631 3.47856L17.6286 3.61945C19.0971 3.73663 20.2633 4.9028 20.3805 6.37131L20.5214 8.13679C20.5381 8.34654 20.6205 8.54568 20.757 8.70585L21.9058 10.0539C22.8614 11.1751 22.8614 12.8243 21.9058 13.9456L20.757 15.2935C20.6206 15.4537 20.538 15.6529 20.5213 15.8627L20.3805 17.6281C20.2633 19.0967 19.0971 20.2628 17.6286 20.3799L15.8631 20.5208C15.6533 20.5376 15.4542 20.6201 15.2941 20.7566L13.9461 21.9053C12.8248 22.8609 11.1756 22.8608 10.0543 21.9053L8.70631 20.7566C8.54615 20.6201 8.34705 20.5376 8.1373 20.5209L6.37184 20.3799C4.9033 20.2627 3.73716 19.0966 3.61997 17.6281L3.47906 15.8627C3.46232 15.6529 3.37983 15.4538 3.24336 15.2936L2.0946 13.9455C1.13905 12.8243 1.13904 11.1752 2.09458 10.0539L3.24334 8.70589C3.37983 8.54573 3.46234 8.34654 3.47907 8.13678L3.61996 6.3713C3.73714 4.90278 4.90327 3.73665 6.3718 3.61946L8.13729 3.47857C8.34705 3.46183 8.54619 3.37935 8.70636 3.24286L10.0544 2.0941ZM12.6488 3.61632C12.2751 3.29782 11.7253 3.29781 11.3516 3.61632L10.0036 4.76509C9.5231 5.17456 8.92568 5.42201 8.29637 5.47223L6.5309 5.61312C6.04139 5.65219 5.65268 6.04089 5.61362 6.53041L5.47272 8.29593C5.4225 8.92521 5.17505 9.52259 4.76559 10.0031L3.61683 11.3511C3.29832 11.7248 3.29831 12.2746 3.61683 12.6483L4.76559 13.9963C5.17506 14.4768 5.4225 15.0743 5.47275 15.7035L5.61363 17.469C5.65268 17.9585 6.04139 18.3473 6.53092 18.3863L8.29636 18.5272C8.92563 18.5774 9.5231 18.8249 10.0036 19.2344L11.3516 20.3831C11.7254 20.7016 12.2751 20.7016 12.6488 20.3831L13.9969 19.2343C14.4773 18.8249 15.0747 18.5774 15.704 18.5272L17.4695 18.3863C17.959 18.3472 18.3478 17.9585 18.3868 17.469L18.5277 15.7035C18.5779 15.0742 18.8253 14.4768 19.2349 13.9964L20.3836 12.6483C20.7022 12.2746 20.7021 11.7249 20.3836 11.3511L19.2348 10.0031C18.8253 9.52259 18.5779 8.92519 18.5277 8.2959L18.3868 6.53041C18.3478 6.0409 17.959 5.65219 17.4695 5.61312L15.704 5.47224C15.0748 5.42203 14.4773 5.17455 13.9968 4.76508L12.6488 3.61632ZM14.8284 7.75718L16.2426 9.1714L9.17154 16.2425L7.75733 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64641 10.8178 8.69667 10.8178 8.11088 10.232C7.52509 9.6463 7.52509 8.69652 8.11088 8.11073C8.69667 7.52494 9.64641 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C14.3535 16.4747 15.3032 16.4747 15.889 15.8889C16.4748 15.3031 16.4748 14.3534 15.889 13.7676C15.3032 13.1818 14.3535 13.1818 13.7677 13.7676C13.1819 14.3534 13.1819 15.3031 13.7677 15.8889Z"></path>
            </svg>
            <h3 className={`font-medium text-lg ${couponApplied ? 'text-green-600' : 'text-gray-800'}`}>
              {couponApplied ? 'Coupon Applied!' : 'Apply Coupon'}
            </h3>
          </div>
          {couponApplied && (
            <div className="text-green-600 text-sm font-medium">
              ✓ Applied
            </div>
          )}
        </div>

        {/* Total Amount */}
        <section className="total-amount w-full px-4 py-3 bg-white mt-4 shadow-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">Sub Total</span>
              <span className="font-medium text-sm">{subtotal.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Delivery</span>
                <Info className="text-lg" />
                {couponApplied && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    FREE
                  </span>
                )}
              </div>
              <span className={`font-medium text-sm ${couponApplied ? 'text-green-600' : ''}`}>
                {deliveryFee.toFixed(2)} AED
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Service Fee</span>
                <Info className="text-lg" />
              </div>
              <span className="font-medium text-sm">{serviceFee.toFixed(2)} AED</span>
            </div>
            <hr className="border-gray-300 my-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">{total.toFixed(2)} AED</span>
            </div>
            <p className="text-xs text-red-500 mt-1">Inclusive of VAT 5% i.e. {vat.toFixed(2)}AED</p>
          </div>
        </section>

        {/* Fixed Bottom Checkout */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <section className="CART bg-white p-4 border-t border-gray-200 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    alt="Cart Item"
                    width={50}
                    height={50}
                    src="/images/menu/combo.png"
                  />
                </div>
                <span className="font-bold text-sm sm:text-base">{cart.length} ITEM{cart.length !== 1 ? 'S' : ''}</span>
              </div>
              <div className="w-2/3">
                <Link 
                  href="/checkout" 
                  className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg relative overflow-hidden flex items-center justify-between w-full"
                  onClick={() => {
                    // Track checkout start
                    if ((window as any).trackCheckoutStart) {
                      (window as any).trackCheckoutStart(cart, total);
                    }
                  }}
                >
                  <div className="flex flex-col items-start">
                    <div className="text-sm sm:text-base font-bold">{total.toFixed(2)} AED</div>
                    <div className="text-[10px] sm:text-xs opacity-80">*VAT included</div>
                  </div>
                  <div className="font-medium flex items-center gap-0.5 sm:gap-1 text-sm sm:text-base">
                    Checkout
                    <ChevronDown className="text-sm sm:text-base" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}