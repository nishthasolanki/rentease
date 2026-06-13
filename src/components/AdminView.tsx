import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle, 
  RefreshCw, 
  Eye, 
  Globe, 
  Database, 
  TrendingUp, 
  Mail, 
  Laptop, 
  Sliders, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Product, Order, ContactInquiry, SEOConfig } from '../types';
import { SERVICE_AREAS } from '../data';

interface AdminViewProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onToggleStockProduct: (id: string) => void;
  
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
  onClearAllOrders: () => void;
  
  inquiries: ContactInquiry[];
  onResolveInquiry: (id: string) => void;
  
  stats: {
    happyCustomers: string;
    productsAvailable: string;
    citiesServed: string;
    monthlyOrders: string;
    customerRating: string;
  };
  onUpdateStats: (newStats: {
    happyCustomers: string;
    productsAvailable: string;
    citiesServed: string;
    monthlyOrders: string;
    customerRating: string;
  }) => void;
  
  seoConfig: SEOConfig;
  onUpdateSEO: (newSEO: SEOConfig) => void;
}

export default function AdminView({
  products,
  onAddProduct,
  onDeleteProduct,
  onToggleStockProduct,
  orders,
  onUpdateOrderStatus,
  onClearAllOrders,
  inquiries,
  onResolveInquiry,
  stats,
  onUpdateStats,
  seoConfig,
  onUpdateSEO
}: AdminViewProps) {
  
  // Dashboard tab: 'orders' | 'products' | 'queries' | 'parameters' | 'seo'
  const [adminTab, setAdminTab] = useState<'orders' | 'products' | 'queries' | 'parameters' | 'seo'>('orders');

  // 1. Add Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState<'furniture' | 'appliances'>('furniture');
  const [newProdSub, setNewProdSub] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(299);
  const [newProdDeposit, setNewProdDeposit] = useState<number>(799);
  const [newProdImg, setNewProdImg] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdSpecs, setNewProdSpecs] = useState('Dimensions: 60 x 30 x 30 inches; Material: Engineered Oak');
  const [newProdFeatures, setNewProdFeatures] = useState('Easy assembling; Stain resistant; Waterproof seal');
  const [productAddSuccess, setProductAddSuccess] = useState(false);

  // 2. Stats form state
  const [formStats, setFormStats] = useState({ ...stats });
  const [statsSuccess, setStatsSuccess] = useState(false);

  // 3. SEO Form state
  const [formSEO, setFormSEO] = useState({ ...seoConfig });
  const [seoSuccess, setSeoSuccess] = useState(false);

  // Handlers
  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdSub || !newProdImg || !newProdDesc) return;

    // Parse specs CSV
    const parsedSpecs = newProdSpecs.split(';').map(spec => {
      const parts = spec.split(':');
      return {
        label: (parts[0] || 'Spec').trim(),
        value: (parts[1] || 'Standard').trim()
      };
    });

    // Parse features CSV
    const parsedFeatures = newProdFeatures.split(';').map(f => f.trim()).filter(Boolean);

    // Default placeholder falls back
    const customImage = newProdImg.startsWith('http') 
      ? newProdImg 
      : 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800';

    onAddProduct({
      name: newProdName,
      category: newProdCat,
      subcategory: newProdSub,
      monthlyPrice: Number(newProdPrice),
      securityDeposit: Number(newProdDeposit),
      image: customImage,
      description: newProdDesc,
      rating: 4.8,
      reviewCount: 1,
      specs: parsedSpecs,
      features: parsedFeatures,
      stockReady: true
    });

    setProductAddSuccess(true);
    // Reset
    setNewProdName('');
    setNewProdSub('');
    setNewProdPrice(299);
    setNewProdDeposit(799);
    setNewProdImg('');
    setNewProdDesc('');
    
    setTimeout(() => {
      setProductAddSuccess(false);
    }, 4000);
  };

  const handleStatsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats(formStats);
    setStatsSuccess(true);
    setTimeout(() => {
      setStatsSuccess(false);
    }, 3000);
  };

  const handleSEOSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSEO(formSEO);
    setSeoSuccess(true);
    setTimeout(() => {
      setSeoSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8" id="rentease-admin-operations-node">
      
      {/* 1. Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold">
            System: Local persistence enabled
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">RentEase Admin Console</h1>
          <p className="text-xs text-slate-400">Manage rental orders, products inventory lists, visitor inquiries, active landing statistics, and SEO parameters.</p>
        </div>

        <div className="flex gap-2">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-slate-800/80 px-3.5 py-2 rounded-xl">
            <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" /> Core Status Live
          </span>
        </div>
      </div>

      {/* 2. Primary Admin tab Selector buttons */}
      <div className="flex overflow-x-auto gap-2 bg-slate-100 p-1 rounded-xl">
        {[
          { id: 'orders', label: 'Lease Orders', count: orders.length, color: 'emerald' },
          { id: 'products', label: 'Stock Catalog', count: products.length, color: 'indigo' },
          { id: 'queries', label: 'Customer inquiries', count: inquiries.filter(i=>i.status==='unread').length, color: 'rose' },
          { id: 'parameters', label: 'Live Stats Adjuster', count: 0, color: 'amber' },
          { id: 'seo', label: 'SEO Metadata Optimizer', count: 0, color: 'cyan' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 transition-all ${
              adminTab === tab.id
                ? 'bg-white text-gray-900 shadow-xs ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-emerald-950 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 3. Panel Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        
        {/* LEASE ORDERS PANEL VIEW */}
        {adminTab === 'orders' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 font-display">Active Lease Agreement Submissions</h2>
                <p className="text-xs text-gray-500 mt-0.5">Below is the live CRM register tracking customer checkout requests. These can be approved or dispatched instantly.</p>
              </div>
              {orders.length > 0 && (
                <button
                  onClick={onClearAllOrders}
                  className="px-3.5 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Clear Order Database
                </button>
              )}
            </div>

            {orders.length > 0 ? (
              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Lease ID / Date</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Rented Goods</th>
                      <th className="py-3 px-4">Finance Terms</th>
                      <th className="py-3 px-4">Logistics Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/50">
                        
                        {/* ID / Date */}
                        <td className="py-4 px-4 space-y-1">
                          <p className="font-extrabold text-gray-900 font-mono">{ord.id}</p>
                          <p className="text-[10px] text-gray-400 font-sans">{ord.orderDate}</p>
                        </td>

                        {/* Customer details */}
                        <td className="py-4 px-4 space-y-1">
                          <p className="font-bold text-gray-900 font-sans">{ord.customerName}</p>
                          <p className="text-[11px] text-gray-500 block">{ord.customerEmail}</p>
                          <p className="text-[11px] text-gray-500 block">📞 {ord.customerPhone}</p>
                          <p className="text-[10px] text-emerald-800 font-mono mt-0.5 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block">
                            📍 {ord.billingCity}
                          </p>
                        </td>

                        {/* Items ordered */}
                        <td className="py-4 px-4 space-y-1.5 max-w-[220px]">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex gap-2 items-center text-[11px] py-1 border-b border-gray-50 last:border-0">
                              <img src={it.productImage} className="h-6 w-6 rounded-sm object-cover bg-gray-100 border border-gray-50 shrink-0" />
                              <div className="truncate">
                                <p className="font-semibold text-gray-805 truncate">{it.productName}</p>
                                <p className="text-[10px] text-gray-400 font-sans">
                                  Qty: {it.quantity} x {it.tenureMonths}mo plan
                                </p>
                              </div>
                            </div>
                          ))}
                        </td>

                        {/* Finance values */}
                        <td className="py-4 px-4 space-y-1 select-text">
                          <div className="flex justify-between max-w-[120px]">
                            <span className="text-gray-400 text-[10px]">Rent/Mo:</span>
                            <span className="font-bold font-mono text-gray-900">₹{ord.totalMonthlyRent}</span>
                          </div>
                          <div className="flex justify-between max-w-[120px] text-[10px] text-slate-500">
                            <span>Sec Deposit:</span>
                            <span className="font-mono">₹{ord.totalDeposit}</span>
                          </div>
                        </td>

                        {/* Status tracking details */}
                        <td className="py-4 px-4 font-sans font-semibold">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            ord.status === 'approved' ? 'bg-indigo-100 text-indigo-805' :
                            ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            ord.status === 'returned' ? 'bg-slate-100 text-slate-600' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {ord.status}
                          </span>
                        </td>

                        {/* Actions column */}
                        <td className="py-4 px-4 text-right space-y-1 scroll-py-0.5">
                          {ord.status === 'pending' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'approved')}
                              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-150 text-emerald-800 text-[10px] font-bold rounded-lg cursor-pointer transition-colors block w-full text-center"
                            >
                              Approve Lease
                            </button>
                          )}
                          {ord.status === 'approved' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-150 text-indigo-800 text-[10px] font-bold rounded-lg cursor-pointer transition-colors block w-full text-center"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {ord.status === 'delivered' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'returned')}
                              className="px-2.5 py-1.5 bg-slate-150 hover:bg-emerald-100 text-slate-800 text-[10px] font-bold rounded-lg cursor-pointer transition-colors block w-full text-center"
                            >
                              Log Release Return
                            </button>
                          )}
                          {ord.status !== 'cancelled' && ord.status !== 'returned' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'cancelled')}
                              className="px-2.5 py-1 text-red-600 hover:bg-red-50 text-[9px] font-bold rounded cursor-pointer block w-full text-center mt-1"
                            >
                              Cancel Contract / Reject
                            </button>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-12 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto space-y-1.5">
                <p className="text-3xl">🎦</p>
                <p className="font-bold text-sm text-gray-800">No Orders in Active CRM Registry</p>
                <p className="text-xs text-gray-500">Add custom bedroom sets or sofa items from the Catalog tab to the Cart and submit to test checkout actions.</p>
              </div>
            )}
          </div>
        )}

        {/* STOCK INVENTORY PRODUCTS LIST PANEL */}
        {adminTab === 'products' && (
          <div className="p-6 space-y-8">
            
            {/* Create new design product layout */}
            <div className="border border-slate-100 bg-slate-50/50 p-6 rounded-2xl space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gray-950 font-display flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-emerald-600" /> Catalog Registry additions
                </h3>
                <p className="text-[11px] text-gray-500">Insert custom rental goods details. It automatically fits the dynamic multiplier formula ranges.</p>
              </div>

              {productAddSuccess && (
                <div className="bg-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl font-bold animate-pulse">
                  ✓ Success! Custom Item added into catalog database dynamically. Matches grid views.
                </div>
              )}

              <form onSubmit={handleAddNewProductSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dreamer Double Door Wardrobe"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">Corporate Category *</label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value as any)}
                    className="w-full bg-white border border-gray-255 rounded-lg px-3 py-2 text-xs text-gray-800"
                  >
                    <option value="furniture">Furniture Essentials</option>
                    <option value="appliances">Smart Electronics / Appliances</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Subcategory tag *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bedroom, Living Room, Cooling, Utility"
                    value={newProdSub}
                    onChange={(e) => setNewProdSub(e.target.value)}
                    className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Base Monthly price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-white border border-gray-255 rounded-lg px-3 py-2 text-xs text-gray-800 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Fully Refundable Deposit (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProdDeposit}
                    onChange={(e) => setNewProdDeposit(Number(e.target.value))}
                    className="w-full bg-white border border-gray-255 rounded-lg px-3 py-2 text-xs text-gray-800 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Image URL address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Unsplash URL address"
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase text-left">Short description *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Brief description outlining specifications and materials..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full bg-white border border-gray-255 rounded-lg px-3 py-2 text-xs text-gray-800"
                  />
                </div>

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase text-left">Specs list (Semi-colon separated ; and key-value :) *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dimensions: 60x30x30 in; Material: Wood"
                      value={newProdSpecs}
                      onChange={(e) => setNewProdSpecs(e.target.value)}
                      className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase text-left">Highlight features (Semi-colon separated ; ) *</label>
                    <input
                      type="text"
                      placeholder="e.g. Modular design; Water proof; Multi storage drawers"
                      value={newProdFeatures}
                      onChange={(e) => setNewProdFeatures(e.target.value)}
                      className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                    />
                  </div>
                </div>

                <div className="md:col-span-3 pt-2 text-right">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Add Product into Catalog
                  </button>
                </div>

              </form>
            </div>

            {/* List products for deletion/disable */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 font-display">Active Catalogue list ({products.length} items)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="bg-slate-50 border border-gray-100 p-3.5 rounded-xl flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="h-10 w-10 rounded-md object-cover bg-gray-200 border border-gray-100" />
                      <div>
                        <p className="font-bold text-xs text-gray-900 capitalize leading-tight">{p.name}</p>
                        <p className="text-[10px] font-mono text-gray-400">₹{p.monthlyPrice}/mo — Dep. ₹{p.securityDeposit}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onToggleStockProduct(p.id)}
                        className={`p-1.5 rounded border text-[10px] font-bold ${
                          p.stockReady 
                            ? 'bg-emerald-50 text-emerald-850 hover:bg-emerald-200 border-emerald-250' 
                            : 'bg-amber-50 text-amber-805 hover:bg-amber-200 border-amber-250'
                        }`}
                        title="Toggle Delivery status"
                      >
                        {p.stockReady ? 'Ready' : 'Delayed'}
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded"
                        title="Delete Product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* CUSTOMER TICKET INQUIRIES DESK */}
        {adminTab === 'queries' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 font-display">Customer CRM Tickets Desk</h2>
              <p className="text-xs text-gray-500 mt-0.5">Below are questions submitted by customers looking to initiate vendor or rental plans.</p>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className={`border rounded-2xl p-4.5 space-y-3.5 transition-all ${
                      inq.status === 'unread' 
                        ? 'bg-slate-50/55 border-amber-200/60 ring-2 ring-amber-400/5' 
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-gray-400 font-mono italic block">{inq.date}</span>
                        <h4 className="font-bold text-sm text-gray-900 font-sans tracking-wide">
                          Subject: {inq.subject}
                        </h4>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'unread' 
                          ? 'bg-amber-100 text-amber-800 font-semibold' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {inq.status === 'unread' ? 'Unresolved' : 'Resolved'}
                      </span>
                    </div>

                    <div className="bg-white/80 p-3 rounded-lg border border-gray-50 text-xs text-gray-650 leading-relaxed font-sans select-all">
                      "{inq.message}"
                    </div>

                    <div className="flex md:items-center justify-between flex-col md:flex-row gap-2 pt-2 border-t border-gray-50 text-[11px] text-gray-500">
                      <div>
                        <span>Sender: </span>
                        <span className="font-bold text-gray-800">{inq.name}</span>
                        <span> | Email: </span>
                        <a href={`mailto:${inq.email}`} className="text-emerald-700 hover:underline">{inq.email}</a>
                        {inq.phone && (
                          <>
                            <span> | Phone: </span>
                            <span className="font-semibold">{inq.phone}</span>
                          </>
                        )}
                      </div>

                      {inq.status === 'unread' && (
                        <button
                          onClick={() => onResolveInquiry(inq.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shrink-0"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto space-y-1.5">
                <p className="text-3xl">📭</p>
                <p className="font-bold text-sm text-gray-800 font-sans">No Customer inquiries Submitted Yet</p>
                <p className="text-xs text-gray-500 leading-normal">CRM databases remains initial. Click "Contact Us" at the top navigation to fire custom test questions.</p>
              </div>
            )}
          </div>
        )}

        {/* STATS CONTROLLER ADJUSTMENT PANEL */}
        {adminTab === 'parameters' && (
          <form onSubmit={handleStatsSave} className="p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 font-display">Active Landing Statistics Adjuster</h2>
              <p className="text-xs text-gray-500 mt-0.5">Modify stats shown across landing page counters instantly to matching sales volumes.</p>
            </div>

            {statsSuccess && (
              <div className="bg-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl font-bold animate-pulse">
                ✓ Success! Business values saved. Changes appear live on the Home view statistics bento boxes.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Happy Customers Counter</label>
                <input
                  type="text"
                  required
                  value={formStats.happyCustomers}
                  onChange={(e) => setFormStats({ ...formStats, happyCustomers: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Premium Products Available</label>
                <input
                  type="text"
                  required
                  value={formStats.productsAvailable}
                  onChange={(e) => setFormStats({ ...formStats, productsAvailable: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Cities Served count</label>
                <input
                  type="text"
                  required
                  value={formStats.citiesServed}
                  onChange={(e) => setFormStats({ ...formStats, citiesServed: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Monthly Orders placed</label>
                <input
                  type="text"
                  required
                  value={formStats.monthlyOrders}
                  onChange={(e) => setFormStats({ ...formStats, monthlyOrders: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2 text-xs text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Customer feedback score</label>
                <input
                  type="text"
                  required
                  value={formStats.customerRating}
                  onChange={(e) => setFormStats({ ...formStats, customerRating: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-255 rounded-lg px-3 py-2 text-xs text-gray-800"
                />
              </div>

            </div>

            <div className="pt-4 text-right">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
              >
                Save Business Statistics
              </button>
            </div>
          </form>
        )}

        {/* SEO OPTIMIZER VIEW (With LIVE Google Card simulator) */}
        {adminTab === 'seo' && (
          <div className="p-6 space-y-8">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-gray-900 font-display">SEO Metadata Optimizer</h2>
              <p className="text-xs text-gray-500">Configure global metadata tags dynamically. These are synchronized in the parent application header layout.</p>
            </div>

            {seoSuccess && (
              <div className="bg-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl font-bold animate-pulse">
                ✓ Success! SEO headers updated. Document tags refreshed.
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form entries */}
              <form onSubmit={handleSEOSave} className="lg:col-span-6 space-y-4 text-xs">
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Meta SEO Title *</label>
                    <span className="text-[10px] text-gray-400 font-mono">{formSEO.metaTitle.length}/60 chars</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter short searchable SEO title"
                    value={formSEO.metaTitle}
                    onChange={(e) => setFormSEO({ ...formSEO, metaTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs text-gray-800 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Meta Description tag *</label>
                    <span className="text-[10px] text-gray-400 font-mono">{formSEO.metaDescription.length}/160 chars</span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly state products categories, rental advantages, cities support..."
                    value={formSEO.metaDescription}
                    onChange={(e) => setFormSEO({ ...formSEO, metaDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-255 rounded-lg px-3 py-2.5 text-xs text-gray-800 leading-normal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Search Keywords (Comma-separated)</label>
                  <input
                    type="text"
                    value={formSEO.keywords}
                    onChange={(e) => setFormSEO({ ...formSEO, keywords: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs text-gray-800"
                  />
                  <p className="text-[9px] text-gray-400 leading-snug font-sans">Helps organic crawling. Use keywords like furniture rental, appliance on rent, rentbed, sofa booking.</p>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Save & Update Header Meta
                  </button>
                </div>

              </form>

              {/* Live search visualizer preview */}
              <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <h3 className="text-xs font-bold text-gray-900 font-display uppercase tracking-wider flex items-center gap-1">
                  <Globe className="h-4.5 w-4.5 text-blue-500" /> Simulated Google Search Result
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Below is a representation of how organic Google crawler crawlers parse and show your digital website card to searchers in Ahmedabad and Bengaluru.
                </p>

                {/* Simulated Google Search Box Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-250 max-w-md shadow-xs select-none space-y-1.5 font-sans">
                  
                  {/* Google url breadcrumb */}
                  <div className="flex items-center gap-1.5 text-gray-800 text-xs">
                    <div className="h-5 w-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-800">RE</div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-650 leading-none">RentEase India</p>
                      <p className="text-[9px] text-gray-400 leading-none mt-0.5">https://www.rentease.in › ahmedabad</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-blue-800 hover:underline cursor-pointer leading-tight line-clamp-1">
                    {formSEO.metaTitle || 'RentEase | Sofa & Appliance Rentals Ahmedabad'}
                  </h4>

                  {/* Snippet */}
                  <p className="text-[11px] text-[#4d5156] leading-relaxed line-clamp-2">
                    {formSEO.metaDescription || 'Rent premium furniture, bedroom packages and smart AC systems in Ahmedabad and Vadodara. Pay as you go with free logistics maintenance.'}
                  </p>

                  {/* Rich parameters */}
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-1 font-sans">
                    <span>★ Rating: 4.8/5</span>
                    <span>• Min Tenure: 3 mo</span>
                    <span>• Ahmedabad Hub</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
