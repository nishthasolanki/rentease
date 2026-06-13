import React, { useState } from 'react';
import { X, Trash2, Shield, MapPin, CheckCircle, Smartphone } from 'lucide-react';
import { CartItem, Order } from '../types';
import { SERVICE_AREAS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onCheckoutSuccess: (order: Order) => void;
  selectedCity: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQty,
  onCheckoutSuccess,
  selectedCity
}: CartDrawerProps) {
  
  // Checkout details form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [billingCity, setBillingCity] = useState(selectedCity);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Progress flow: 'cart' | 'checkout' | 'confirmed'
  const [flowStep, setFlowStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [recentOrderId, setRecentOrderId] = useState('');

  if (!isOpen) return null;

  // Calculators
  const totalMonthlyRent = cart.reduce((sum, item) => sum + (item.monthlyRent * item.quantity), 0);
  const totalDeposit = cart.reduce((sum, item) => sum + (item.product.securityDeposit * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress) return;

    const uniqueId = `RE-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: uniqueId,
      customerName,
      customerEmail,
      customerPhone,
      customerWhatsapp: customerWhatsapp || customerPhone,
      billingCity,
      deliveryAddress,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        tenureMonths: item.tenureMonths,
        monthlyRent: item.monthlyRent
      })),
      totalMonthlyRent,
      totalDeposit,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0]
    };

    setRecentOrderId(uniqueId);
    onCheckoutSuccess(newOrder); // Pass to parent state
    setFlowStep('confirmed');
  };

  const handleFinishClose = () => {
    // Reset local steps
    setFlowStep('cart');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerWhatsapp('');
    setDeliveryAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-950/60 backdrop-blur-xs">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={flowStep === 'confirmed' ? handleFinishClose : onClose} />

      {/* Drawer content pane */}
      <div className="relative w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-l border-gray-100 z-10 overflow-y-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-gray-900 font-display">Active Lease Cart</h3>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">RENT SMART. NO COLD DOWNPAYMENT.</span>
          </div>
          <button
            onClick={flowStep === 'confirmed' ? handleFinishClose : onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Dynamic Body based on flow step */}
        {flowStep === 'confirmed' ? (
          /* CONFIRMED STEP SUCCESS */
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-6">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold animate-pulse">
              ✓
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-gray-900 font-display">Lease Order Placed!</h4>
              <p className="text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded inline-block">
                Lease ID: {recentOrderId}
              </p>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-sans">
                A copy of your rent agreement draft has been dispatched to <span className="font-semibold text-gray-700">{customerEmail}</span>. Our installation coordinator in **{billingCity}** will schedule call verification within 2 hours.
              </p>
            </div>

            <div className="w-full text-left bg-slate-50 border border-gray-100 p-4.5 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-gray-800">What Happens Next?</p>
              <ul className="space-y-1.5 text-gray-500 list-disc pl-4">
                <li>Receive telephone verification to lock down delivery slot.</li>
                <li>Refundable deposit collected via secure Razorpay link.</li>
                <li>Prisinte products delivered & assembled to {billingCity} address within 48 hours.</li>
              </ul>
            </div>

            <button
              onClick={handleFinishClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        ) : flowStep === 'checkout' ? (
          /* CHECKOUT CONTRACT DETAILS FORM */
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div>
              <button 
                onClick={() => setFlowStep('cart')}
                className="text-xs font-semibold text-emerald-600 hover:underline mb-2 flex items-center gap-1 cursor-pointer"
              >
                ← Edit Lease Cart list
              </button>
              <h4 className="font-bold text-sm text-gray-800 font-sans tracking-wide">Enter Delivery & Lease Details</h4>
              <p className="text-[10px] text-gray-400">Please provide complete metrics to generate the legal lease paperwork correctly.</p>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Receiver Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Patel"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 focus:bg-white rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aarav.patel@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 focus:bg-white rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 focus:bg-white rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Operational City *</label>
                  <select
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 focus:bg-white rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  >
                    {SERVICE_AREAS.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Complete Delivery Address *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Street, Tower block details, Landmark, Pin code"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 focus:bg-white rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl text-center space-y-1">
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-mono">DUE NOW ON VERIFICATION</p>
                <p className="text-xl font-bold font-mono text-white">₹{totalDeposit}</p>
                <p className="text-[10px] text-emerald-400 font-sans">Wait, this is fully refundable at end of tenure!</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg transition-colors"
                id="cart-checkout-submit-btn"
              >
                Submit Lease Inscription
              </button>
            </form>
          </div>
        ) : (
          /* CART ITEMS ACTIVE PANEL */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-3 bg-slate-50 border border-gray-100 p-3 rounded-2xl relative group"
                  >
                    {/* Item Image */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-gray-200 border border-gray-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta coordinates */}
                    <div className="flex-1 min-w-0 pr-6 space-y-1">
                      <h4 className="font-bold text-xs text-gray-800 leading-tight block truncate">{item.product.name}</h4>
                      <p className="text-[9px] font-bold text-emerald-700 font-mono uppercase bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                        {item.tenureMonths} Months plan
                      </p>
                      
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-bold text-gray-900 font-mono">
                          ₹{item.monthlyRent} <span className="text-[9px] text-gray-400 font-normal">/mo</span>
                        </span>

                        {/* quantity slider/stepper */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => item.quantity > 1 && onUpdateQty(item.id, item.quantity - 1)}
                            className="w-5 h-5 bg-white border border-gray-200 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold font-mono text-gray-600 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-mono w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => item.quantity < 5 && onUpdateQty(item.id, item.quantity + 1)}
                            className="w-5 h-5 bg-white border border-gray-200 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold font-mono text-gray-600 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50/55 rounded-2xl border border-gray-100 space-y-3">
                  <div className="text-3xl">🛄</div>
                  <p className="font-bold text-sm text-gray-800">Your leasing cart is empty</p>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-normal">
                    Explore our premium appliances and furniture selections to construct your personalized rental package.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Explore Products page
                  </button>
                </div>
              )}
            </div>

            {/* Bottom summary and action */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-slate-50 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-baseline text-gray-600">
                    <span>Monthly Rent:</span>
                    <span className="font-bold text-gray-900 font-mono">₹{totalMonthlyRent}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-gray-600">
                    <span>Refundable Deposit:</span>
                    <span className="font-bold text-gray-900 font-mono">₹{totalDeposit}</span>
                  </div>
                  <hr className="border-gray-250 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">Lease Monthly Total:</span>
                    <span className="text-base font-extrabold text-emerald-800 font-mono">₹{totalMonthlyRent} <span className="text-xs text-emerald-600 font-normal">/mo</span></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setFlowStep('checkout')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-100"
                    id="cart-proceed-checkout-btn"
                  >
                    <span>Proceed to Inscription</span>
                    <span>→</span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <Shield className="h-3 w-3 text-emerald-600" />
                    <span>Refundable Deposit returned post-pickup process</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
