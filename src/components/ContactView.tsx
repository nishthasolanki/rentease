import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, CheckCircle2, MessageSquare, Laptop, Landmark } from 'lucide-react';
import { CONTACT_INFO, SERVICE_AREAS } from '../data';
import { ContactInquiry } from '../types';

interface ContactViewProps {
  onAddInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'date' | 'status'>) => void;
}

export default function ContactView({ onAddInquiry }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Send up to parent simulation database
    onAddInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });

    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: ''
    });

    // Dismiss message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 6500);
  };

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      {/* 1. Page Header */}
      <section className="text-center space-y-4 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Building className="h-3.5 w-3.5 text-emerald-600" />
          <span>Connect With Our Team</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-gray-900 tracking-tight">
          Contact RentEase
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          Reach out for tenant assistance, vendor listings, commercial office space furnishings partnerships, or standard logistics updates.
        </p>
      </section>

      {/* 2. Key Directories Grid & Contact Form split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Key Directories & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
            <h3 className="font-bold text-base text-gray-900 font-display">Specialized Inboxes</h3>
            
            <div className="space-y-4 text-xs">
              
              {/* Support */}
              <div className="flex gap-3 pb-3 border-b border-gray-50">
                <div className="h-9 w-9 shrink-0 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Customer Support Desk</p>
                  <p className="text-gray-500 mt-0.5">Toll Free: {CONTACT_INFO.support.phone}</p>
                  <p className="text-gray-500">WhatsApp: {CONTACT_INFO.support.whatsapp}</p>
                  <p className="text-emerald-700 font-medium mt-1">Email: {CONTACT_INFO.support.email}</p>
                </div>
              </div>

              {/* Business inquirys */}
              <div className="flex gap-3 pb-3 border-b border-gray-50">
                <div className="h-9 w-9 shrink-0 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center">
                  <Laptop className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Corporate & Business Sales</p>
                  <p className="text-gray-500 mt-0.5">For corporate leasing of IT laptops and bulk employee office furniture rentals in Ahmedabad.</p>
                  <p className="text-amber-700 font-medium mt-1">Email: {CONTACT_INFO.business.email}</p>
                </div>
              </div>

              {/* Vendor plans */}
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Vendor & Manufacturer Partnerships</p>
                  <p className="text-gray-500 mt-0.5">For localized quality furniture makers looking to supply RentEase regional logistics hubs.</p>
                  <p className="text-blue-700 font-medium mt-1">Email: {CONTACT_INFO.vendor.email}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Corporate location coordinates card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-white font-display">Corporate Office</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{CONTACT_INFO.address.companyName}</p>
                <p className="mt-0.5">{CONTACT_INFO.address.building}</p>
                <p>{CONTACT_INFO.address.street}</p>
                <p>{CONTACT_INFO.address.cityStateZip}</p>
                <p>{CONTACT_INFO.address.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive message portal form */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="font-bold text-lg text-gray-900 font-display mb-2">Send a Message</h3>
          <p className="text-xs text-gray-500 mb-6">Have a custom sizing query or want pricing support? Write to us here. Submitted messages are persistent and appear on-the-fly under the Admin Console!</p>
          
          {showSuccess ? (
            <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-xl text-center space-y-3">
              <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-base">✓</div>
              <h4 className="font-bold text-sm text-emerald-900">Message Dispatched Successfully!</h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Thank you for your contact query! Your communication has been dispatched to Ahmedabad administrative operations. It is now registered inside our Admin Console CRM database.
              </p>
              <p className="text-[10px] font-mono text-emerald-800 bg-emerald-100 py-1.5 px-3 rounded-lg inline-block font-semibold">
                Tip: Click "Admin Console" in the header menu to view your submission!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800 outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 99988 77766"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800 outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Inquiry Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800 outline-hidden"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing / Refund Help">Billing / Refund Help</option>
                    <option value="Custom Rental Tonnage / Office Fitouts">Custom Corporate Leases</option>
                    <option value="Vendor / Logistics Franchise">Vendor Partnership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide complete request details, size options, preferred tenure, or delivery location..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-gray-800 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                id="contact-form-submit-btn"
              >
                Send Message
              </button>

            </form>
          )}
        </div>

      </section>

      {/* 3. Coverage Areas Indicator Block */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="max-w-xl">
          <h3 className="font-bold text-lg text-gray-900 font-display">Active Service Regions</h3>
          <p className="text-xs text-gray-500 mt-1">We maintain active delivery trucks, replacement assets, and service coordinators directly stationed inside these Indian cities:</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SERVICE_AREAS.map((city) => (
            <div 
              key={city}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 py-1.5 px-3 rounded-lg text-xs font-semibold text-gray-700 shadow-xs"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
