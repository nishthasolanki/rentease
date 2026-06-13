import React, { useState } from 'react';
import { ShoppingCart, Menu, X, MapPin, Sparkles, Settings } from 'lucide-react';
import { SERVICE_AREAS } from '../data';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  selectedCity,
  setSelectedCity
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Upper announcements bar */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-emerald-950 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider animate-pulse">Offer</span>
            <span>Enjoy **Free Maintenance & Setup** on all tenures!</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span>Support: +91 1800-123-4567</span>
            <span>|</span>
            <span> Ahmedabad, India</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <button 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-2.5 group cursor-pointer text-left"
            id="header-logo-btn"
          >
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-200 transition-all group-hover:scale-105">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="text-xl font-bold font-display text-gray-900 tracking-tight block">
                Rent<span className="text-emerald-600">Ease</span>
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider font-mono uppercase block -mt-1 font-semibold">
                Rent Smart. Live Better.
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentTab === item.id 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions (City select, Cart, Admin toggle) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* City Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                id="city-selector-btn"
              >
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>{selectedCity}</span>
              </button>

              {showCityDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCityDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1.5 max-h-60 overflow-y-auto">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 py-1">Deliver to:</p>
                    {SERVICE_AREAS.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 hover:text-emerald-700 block cursor-pointer transition-colors ${
                          selectedCity === city ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Admin Dashboard */}
            <button
              id="admin-tab-btn"
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                currentTab === 'admin'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              id="cart-toggle-btn"
              className="relative flex items-center justify-center p-2.5 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-100 hover:bg-emerald-700 cursor-pointer hover:scale-105 transition-all"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-bold font-mono text-[10px] h-5 w-5 rounded-full flex items-center justify-center animate-bounce border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Bar (Cart + Trigger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-emerald-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white font-bold font-mono text-[9px] h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-2 text-base font-medium rounded-md ${
                  currentTab === item.id 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="my-2 border-gray-100" />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-600" /> Deliver to:
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border border-gray-200 text-xs font-semibold rounded px-2 py-1"
              >
                {SERVICE_AREAS.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setCurrentTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-amber-800 bg-amber-50 rounded-md"
            >
              <Settings className="h-5 w-5 text-amber-600" /> Admin Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
