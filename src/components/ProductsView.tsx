import React, { useState } from 'react';
import { Search, Filter, Check, Star, ShoppingCart, Info, Sparkles, X, ChevronRight } from 'lucide-react';
import { Product, CartItem } from '../types';
import { calculateMonthlyRent, getTenureMultiplier } from '../data';

interface ProductsViewProps {
  products: Product[];
  categoryFilter: 'all' | 'furniture' | 'appliances';
  setCategoryFilter: (category: 'all' | 'furniture' | 'appliances') => void;
  onAddToCart: (product: Product, quantity: number, tenure: 3 | 6 | 12 | 24) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export default function ProductsView({
  products,
  categoryFilter,
  setCategoryFilter,
  onAddToCart,
  selectedProduct,
  setSelectedProduct
}: ProductsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState<'all' | string>('all');
  
  // Customization selection state inside the detail modal
  const [selectedTenure, setSelectedTenure] = useState<3 | 6 | 12 | 24>(12);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Derive unique subcategories based on active main category
  const activeProductsByMain = products.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const subcategories = Array.from(new Set(activeProductsByMain.map(p => p.subcategory)));

  // Filter products by search query, category, and subcategory
  const filteredProducts = activeProductsByMain.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = subcategoryFilter === 'all' || p.subcategory === subcategoryFilter;
    return matchesSearch && matchesSub;
  });

  const handleProductCardClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedTenure(12); // Reset to baseline
    setSelectedQty(1);
    setAddedAnimation(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    onAddToCart(selectedProduct, selectedQty, selectedTenure);
    
    // Play a brief visual success confirmation
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProduct(null); // Close modal
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      {/* 1. Header with tagline */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-display text-gray-900 tracking-tight">Renting Solutions Catalogue</h1>
        <p className="text-xs text-gray-500 max-w-2xl">
          Browse through our vetted, pristine condition furniture and electronics collections. Customize tenures dynamically to matching your relocation requirements.
        </p>
      </div>

      {/* 2. Search & Categories Navigation Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-4">
        {/* Search & Categories split */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search sofa, bed, washing machine, refrigerator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800"
            />
          </div>

          {/* Main Category selections */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {(['all', 'furniture', 'appliances'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setSubcategoryFilter('all'); // Reset sub filter
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize cursor-pointer transition-colors ${
                  categoryFilter === cat 
                    ? 'bg-white text-gray-900 shadow-xs' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic subcategory pills */}
        {subcategories.length > 0 && (
          <div className="pt-2 border-t border-gray-50 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono shrink-0">Filter:</span>
            <button
              onClick={() => setSubcategoryFilter('all')}
              className={`px-3 py-1 text-xs rounded-full cursor-pointer shrink-0 ${
                subcategoryFilter === 'all'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 text-gray-600'
              }`}
            >
              All {categoryFilter !== 'all' ? categoryFilter : ''}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSubcategoryFilter(sub)}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer shrink-0 ${
                  subcategoryFilter === sub
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 text-gray-600'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Catalog Products Grid */}
      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleProductCardClick(p)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-xs p-3 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                id={`product-card-${p.id}`}
              >
                <div className="space-y-3">
                  <div className="relative h-44 w-full bg-slate-50 rounded-xl overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-slate-900/60 text-white backdrop-blur-xs px-2 py-0.5 rounded">
                      {p.subcategory}
                    </span>
                    {!p.stockReady && (
                      <span className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-bold text-gray-500 font-sans uppercase">
                        Booked Out
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-gray-800 font-sans group-hover:text-emerald-600 transition-colors line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-normal font-normal">{p.description}</p>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <div className="flex items-center text-amber-500 text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="ml-1 text-gray-700 font-bold font-mono">{p.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">({p.reviewCount} rentals)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-end justify-between mt-3">
                  <div>
                    <span className="text-[9px] font-mono text-gray-400 block tracking-wide uppercase">RENTAL BASIS</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-extrabold text-gray-900 font-mono">₹{p.monthlyPrice}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">/mo</span>
                    </div>
                  </div>
                  
                  <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    Rent Now
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl max-w-md mx-auto space-y-3">
            <div className="text-4xl">🔍</div>
            <p className="font-bold text-sm text-gray-800">No matching items in active catalog</p>
            <p className="text-xs text-gray-500">We update our rental stock in Ahmedabad regularly. Try matching with category buttons instead.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSubcategoryFilter('all');
                setCategoryFilter('all');
              }}
              className="px-4 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. HIGH FIDELITY PRODUCT DETAIL & TENURE CONFIGURATION DIALOG OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/65 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer z-10 hover:scale-105 transition-transform"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Product Visual Container */}
              <div className="md:col-span-5 bg-slate-50 relative h-60 md:h-full min-h-[240px]">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/50 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold font-mono text-emerald-300 uppercase tracking-widest">{selectedProduct.subcategory}</span>
                  <p className="text-white font-extrabold text-base leading-tight font-display">{selectedProduct.name}</p>
                </div>
              </div>

              {/* Configure & Checkout Logic */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] font-mono">Verified Quality</span>
                    <div className="flex items-center text-amber-500 font-bold font-mono">
                      <span>★</span>
                      <span className="ml-0.5 text-gray-800">{selectedProduct.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-sans">{selectedProduct.description}</p>
                </div>

                {/* Specification Table */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Product Specs</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                    {selectedProduct.specs.map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-gray-400 uppercase font-mono text-[9px]">{item.label}</span>
                        <span className="font-semibold text-gray-800 line-clamp-1">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Tenure Selection (Strategic Advantage) */}
                <form onSubmit={handleAddSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <label className="font-bold text-gray-400 uppercase tracking-wider">Select Rental Tenure</label>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        {getTenureMultiplier(selectedTenure) < 1.0 
                          ? `${Math.round((1 - getTenureMultiplier(selectedTenure)) * 100)}% Long-term Discount`
                          : getTenureMultiplier(selectedTenure) > 1.0 
                            ? `${Math.round((getTenureMultiplier(selectedTenure) - 1.0) * 100)}% Short-term Premium` 
                            : 'Standard Rate'}
                      </span>
                    </div>

                    {/* Tenure Options */}
                    <div className="grid grid-cols-4 gap-2">
                      {([3, 6, 12, 24] as const).map((months) => (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setSelectedTenure(months)}
                          className={`py-3.5 border text-center rounded-xl cursor-pointer transition-all ${
                            selectedTenure === months
                              ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-extrabold ring-2 ring-emerald-600/25'
                              : 'border-gray-200 bg-white text-gray-600 hover:bg-slate-50 font-semibold'
                          }`}
                        >
                          <span className="block text-sm font-mono leading-none">{months}</span>
                          <span className="text-[10px] text-gray-400 font-normal mt-1 block">Months</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Dynamic Pricing calculation preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    
                    {/* Quantity selectors */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quantity</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => selectedQty > 1 && setSelectedQty(selectedQty - 1)}
                          className="w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center rounded-lg font-bold text-gray-600"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-sm font-mono">{selectedQty}</span>
                        <button
                          type="button"
                          onClick={() => selectedQty < 5 && setSelectedQty(selectedQty + 1)}
                          className="w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center rounded-lg font-bold text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Recalculating totals display */}
                    <div className="bg-emerald-950 text-white p-3.5 rounded-xl space-y-1">
                      <span className="text-[9px] text-emerald-300 font-mono block uppercase">Billing Calc (INR)</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-emerald-200">Rent / month:</span>
                        <span className="text-base font-bold font-mono">
                          ₹{calculateMonthlyRent(selectedProduct.monthlyPrice, selectedTenure) * selectedQty}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[10px] text-emerald-300">
                        <span>Refundable Deposit:</span>
                        <span className="font-semibold font-mono">₹{selectedProduct.securityDeposit * selectedQty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit to Cart Button / Action */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      disabled={addedAnimation}
                      className={`flex-1 py-3.5 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md ${
                        addedAnimation 
                          ? 'bg-emerald-700 scale-95 shadow-none' 
                          : 'bg-emerald-600 hover:bg-emerald-750 shadow-emerald-200'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="h-4.5 w-4.5 stroke-[3]" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4.5 w-4.5" />
                          <span>Add to Active Lease Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Policy hints */}
                <div className="pt-2 flex justify-between items-center text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Info className="h-3 w-3 text-emerald-500" /> Cancel free post tenure</span>
                  <span className="flex items-center gap-1">✓ Under Warranty rep.</span>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
