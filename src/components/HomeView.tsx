import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Tv, 
  Sofa, 
  Heart, 
  MapPin, 
  ThumbsUp, 
  Clock, 
  Percent, 
  Wrench, 
  Check 
} from 'lucide-react';
import { Product } from '../types';
import { WHY_CHOOSE_US, SERVICE_AREAS } from '../data';

interface HomeViewProps {
  products: Product[];
  stats: {
    happyCustomers: string;
    productsAvailable: string;
    citiesServed: string;
    monthlyOrders: string;
    customerRating: string;
  };
  setCurrentTab: (tab: string) => void;
  setCategoryFilter: (category: 'all' | 'furniture' | 'appliances') => void;
  onProductClick: (product: Product) => void;
}

export default function HomeView({
  products,
  stats,
  setCurrentTab,
  setCategoryFilter,
  onProductClick
}: HomeViewProps) {
  const [cityCheckerInput, setCityCheckerInput] = useState('');
  const [cityCheckResult, setCityCheckResult] = useState<{ checked: boolean; serviceable: boolean; cityName?: string } | null>(null);

  const handleCityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const query = cityCheckerInput.trim().toLowerCase();
    if (!query) return;

    const matchedCity = SERVICE_AREAS.find(city => city.toLowerCase() === query);
    
    if (matchedCity) {
      setCityCheckResult({
        checked: true,
        serviceable: true,
        cityName: matchedCity
      });
    } else {
      setCityCheckResult({
        checked: true,
        serviceable: false,
        cityName: cityCheckerInput
      });
    }
  };

  // Pre-selected reviews
  const reviews = [
    {
      id: 1,
      name: "Rohan Sharma",
      city: "Ahmedabad",
      rating: 5,
      date: "May 2026",
      text: "Relocating to Ahmedabad was stress-free! RentEase delivered a double-door fridge and an orthopaedic bed in 48 hours. The refundable deposit is low, and setup was completely free. Zero hassle!",
      likes: 24
    },
    {
      id: 2,
      name: "Ananya Iyer",
      city: "Bengaluru",
      rating: 5,
      date: "April 2026",
      text: "As an IT professional, purchasing heavy items doesn't make sense. I rented my 3-seater sofa and modular study table. RentEase pricing plans are highly affordable.",
      likes: 19
    },
    {
      id: 3,
      name: "Amit Desai",
      city: "Mumbai",
      rating: 4,
      date: "March 2026",
      text: "Excellent service. When my rented washing machine had a minor vibration error, their technician came over on Sunday within 4 hours and fixed it. Fully recommended!",
      likes: 12
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl -ml-20 -mb-20" />

        <div className="px-6 py-16 sm:px-12 sm:py-24 max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/40 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Trusted Furniture & Appliance Rentals</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-white mb-6">
            Rent Smart.<br className="sm:hidden" /> Live Better.
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed mb-10">
            Set up your dream living space instantly in Ahmedabad, Mumbai, Bengaluru and more. Choose flexible tenures starting from ₹149/month with zero upfront purchasing burdens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setCurrentTab('products');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              id="hero-rent-furniture-btn"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                setCurrentTab('about');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
              id="hero-about-btn"
            >
              Why Choose Us?
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Free Setup & Placement</span>
            <span className="flex items-center gap-1.5 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Refundable Security Deposit</span>
            <span className="flex items-center gap-1.5 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Cancel anytime after tenure</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Service Checker Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs py-8 px-6 sm:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-md text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <MapPin className="h-5 w-5 text-emerald-600 animate-bounce" />
              <h3 className="text-lg font-bold text-gray-900 font-display">Are we active in your city?</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              We serve 9 major Indian cities including Ahmedabad, Surat, Mumbai, Bengaluru, and Pune. Check below to ensure direct doorstep delivery.
            </p>
          </div>

          <form onSubmit={handleCityCheck} className="w-full max-w-md flex flex-col sm:flex-row gap-2 relative z-0">
            <input
              type="text"
              placeholder="Enter your City (e.g. Ahmedabad)"
              value={cityCheckerInput}
              onChange={(e) => {
                setCityCheckerInput(e.target.value);
                setCityCheckResult(null);
              }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white text-gray-800 transition-all outline-hidden"
              required
            />
            <button
              type="submit"
              className="sm:w-32 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex justify-center items-center cursor-pointer transition-colors"
            >
              Verify Now
            </button>
          </form>

          {cityCheckResult && (
            <div className="w-full lg:w-48 text-center sm:text-left">
              {cityCheckResult.serviceable ? (
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-semibold font-sans">
                  <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                  <span>Yes, {cityCheckResult.cityName} is live!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2 rounded-xl text-xs font-semibold font-sans">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Oops! No active coverage.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. Business Statistics bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-2xl text-center shadow-xs transition-all hover:translate-y-[-2px]">
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">{stats.happyCustomers}</p>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1.5">Happy Renters</p>
          </div>
          <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-2xl text-center shadow-xs transition-all hover:translate-y-[-2px]">
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">{stats.productsAvailable}</p>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1.5">Premium Products</p>
          </div>
          <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-2xl text-center shadow-xs transition-all hover:translate-y-[-2px]">
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">{stats.citiesServed}</p>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1.5">Cities Served</p>
          </div>
          <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-2xl text-center shadow-xs transition-all hover:translate-y-[-2px]">
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">{stats.monthlyOrders}</p>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1.5">Orders Monthly</p>
          </div>
          <div className="col-span-2 md:col-span-1 bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center shadow-xs">
            <p className="text-3xl font-extrabold text-emerald-700 tracking-tight font-mono">{stats.customerRating}</p>
            <div className="flex justify-center gap-0.5 text-amber-500 my-0.5">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Top Rated</p>
          </div>
        </div>
      </section>

      {/* 4. Category Selector (Themed Entry Buttons) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold font-display text-gray-900 tracking-tight">Renting Categories</h2>
          <p className="text-xs text-gray-500 mt-2">What home essentials are you looking to rent today? Select from our premium catalogue ranges.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => {
              setCategoryFilter('furniture');
              setCurrentTab('products');
            }}
            className="group flex items-center justify-between p-8 bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100 border border-emerald-100 rounded-2xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer text-left focus:ring-2 focus:ring-emerald-500 outline-hidden"
            id="cat-select-furniture-btn"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Sofa className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-display">Premium Furniture</h3>
                <p className="text-xs text-gray-500 mt-1">Living room sofas, king/queen beds, oak study tables, office chairs, premium wardrobes.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                Browse Furniture <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setCategoryFilter('appliances');
              setCurrentTab('products');
            }}
            className="group flex items-center justify-between p-8 bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 border border-blue-100 rounded-2xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer text-left focus:ring-2 focus:ring-blue-500 outline-hidden"
            id="cat-select-appliances-btn"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <Tv className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-display">Smart Appliances</h3>
                <p className="text-xs text-gray-500 mt-1">Frost-free refrigerators, smart washing machines, Split smart ACs, 4K Android TVs.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
                Browse Appliances <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Highlight Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight">Trending Rental Essentials</h2>
            <p className="text-xs text-gray-500 mt-1">Highly rented items by families, students, and shifting workers across cities.</p>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setCurrentTab('products');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            <span>View Complete Catalogue ({products.length} items)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image element */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Visual Category Pill */}
                <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-1 rounded-full ${
                  product.category === 'furniture' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {product.category}
                </span>

                {/* Ready Status indicator */}
                {product.stockReady && (
                  <span className="absolute top-4 right-4 bg-emerald-700/80 text-white font-semibold rounded px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs">
                    Rapid Delivery
                  </span>
                )}
              </div>

              {/* content */}
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider block">{product.subcategory}</span>
                  <h3 className="font-bold text-sm text-gray-800 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1 mt-0.5">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500 text-xs font-bold font-mono">
                    <span>★</span>
                    <span className="ml-0.5 text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-sans">({product.reviewCount} customer reviews)</span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-mono">RENT STARTS AT</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-black text-gray-900 font-mono">₹{product.monthlyPrice}</span>
                      <span className="text-[10px] font-semibold text-gray-400">/mo</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onProductClick(product)}
                    className="px-3.5 py-2 bg-slate-50 hover:bg-emerald-50 text-gray-800 hover:text-emerald-700 border border-gray-200 hover:border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Choose RentEase Section (6 core advantages) */}
      <section className="bg-slate-50/50 rounded-3xl py-12 px-6 sm:px-12 max-w-7xl mx-auto border border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center bg-emerald-50 text-emerald-800 rounded px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold mb-3">Our Commitments</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 tracking-tight">The RentEase Advantage</h2>
          <p className="text-xs text-gray-500 mt-2">We build values around simplicity, flexible budget options, and maximum service stability.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((benefit, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
            >
              <div className="h-10 w-10 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold font-mono">
                0{idx + 1}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide font-sans">{benefit.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Easy 4-Step rental flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 tracking-tight">How Furniture Renting Works</h2>
          <p className="text-xs text-gray-500 mt-2">No complicated registrations or unexpected downpayments. Renting home goods is now faster than placing a delivery query.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Decorative Connecting Lines (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-16 right-16 h-0.5 bg-gray-100 z-0" />

          {/* Steps */}
          {[
            { step: "01", title: "Select Product", desc: "Choose your favorite premium sofa, bed, washing machine, or TV." },
            { step: "02", title: "Pick Your Tenure", desc: "Select a comfortable rental duration from 3 to 24 months." },
            { step: "03", title: "Free Set Up", desc: "Our expert logistics team delivers, installs, and places the products absolutely post-haste." },
            { step: "04", title: "Hassle-free Returns", desc: "When tenure completes, choose to extend, upgrade, or return with ease." }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 text-center space-y-3.5 group">
              <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 text-emerald-600 font-extrabold font-mono text-lg flex items-center justify-center mx-auto shadow-xs group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-650 transition-all duration-300">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-gray-900 font-sans">{item.title}</h3>
                <p className="text-xs text-gray-500 max-w-[220px] mx-auto leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 8. Human customer reviews carousel section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl py-12 px-6 sm:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-emerald-400">Authentic Voices</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">What Our Renters Are Saying</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-900/40 border border-emerald-500/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-white font-sans">{rev.name}</p>
                      <p className="text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" /> {rev.city}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{rev.date}</span>
                  </div>

                  <div className="flex gap-0.5 text-amber-400 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-xs text-emerald-100/90 leading-relaxed font-sans line-clamp-5">"{rev.text}"</p>

                  <div className="pt-3 border-t border-emerald-500/5 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1 text-emerald-400/80">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified Tenant
                    </span>
                    <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                      <ThumbsUp className="h-3 w-3" /> Helpful ({rev.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
