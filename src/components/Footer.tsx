import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Shield, Sparkles } from 'lucide-react';
import { COMPANY_INFO, CONTACT_INFO, SOCIAL_MEDIA } from '../data';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-200" id="rentease-main-footer">
      {/* Top detailed credentials footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-emerald-500 rounded-lg flex items-center justify-center text-gray-950 font-bold">
                <Sparkles className="h-5 w-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Rent<span className="text-emerald-400">Ease</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              RentEase provides affordable, flexible furniture and appliance rentals across India. Pay only for what you use with safe doorstep delivery, free setup, and hassle-free returns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={SOCIAL_MEDIA.facebook} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SOCIAL_MEDIA.instagram} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SOCIAL_MEDIA.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={SOCIAL_MEDIA.youtube} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400 text-gray-400 transition-colors cursor-pointer">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-emerald-400 text-gray-400 transition-colors cursor-pointer">About Us</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-emerald-400 text-gray-400 transition-colors cursor-pointer">Renting Products</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('faqs')} className="hover:text-emerald-400 text-gray-400 transition-colors cursor-pointer">FAQs Accordion</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-emerald-400 text-gray-400 transition-colors cursor-pointer">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Customer Support</h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-200">Phone Care</p>
                  <p>{CONTACT_INFO.support.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-200">Email Address</p>
                  <a href={`mailto:${CONTACT_INFO.support.email}`} className="hover:text-emerald-400">{CONTACT_INFO.support.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-center text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono shrink-0">WA</span>
                <div>
                  <p className="text-gray-200">WhatsApp Chat</p>
                  <p>{CONTACT_INFO.support.whatsapp}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Corporate Office Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Corporate Office</h3>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="font-semibold text-gray-200">{CONTACT_INFO.address.companyName}</p>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {CONTACT_INFO.address.building},<br />
                  {CONTACT_INFO.address.street},<br />
                  {CONTACT_INFO.address.cityStateZip},<br />
                  {CONTACT_INFO.address.country}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <p className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400">Founded</p>
                <p className="text-white mt-0.5">Year {COMPANY_INFO.founded} — Ahmedabad</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mid-sized Footer disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-gray-400 cursor-pointer">Refunding Policies</span>
            <span className="hover:text-gray-400 cursor-pointer">Grievance Officer</span>
          </div>
          <div>
            <span className="flex items-center gap-1.5 align-middle">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>100% Secured SSL Payments</span>
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 text-center text-[10px] text-gray-600 font-mono tracking-wider">
          © {new Date().getFullYear()} RentEase Technologies Pvt. Ltd. All rights reserved. Made in Ahmedabad, India.
        </div>

      </div>
    </footer>
  );
}
