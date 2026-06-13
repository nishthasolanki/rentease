import React from 'react';
import { Target, Eye, Shield, Users, Award, Calendar, Home, CheckCircle2 } from 'lucide-react';
import { STORY_INFO, COMPANY_INFO } from '../data';

export default function AboutView() {
  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      {/* 1. Brand Banner Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Award className="h-3.5 w-3.5 text-emerald-600" />
          <span>Our Identity & Background</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-gray-900 tracking-tight">
          About Rent<span className="text-emerald-600">Ease</span>
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          Pioneering a furniture & appliance renting model optimized for convenience, affordability, and ecological circular economies in India.
        </p>
      </section>

      {/* 2. Headline Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight">
            Our Story & Evolution
          </h2>
          <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
            <p>{STORY_INFO.story}</p>
            <p>
              We began as a group of recent graduates in Ahmedabad who experienced firsthand the frustration of spending thousands of rupees on cheap MDF furniture that fell apart during relocation. Since our official founding in {COMPANY_INFO.founded}, we have expanded our reach to serve thousands of families, working executives, and tech-sector professionals across India's largest metropolitan zones.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 font-mono text-[10px] block uppercase">HEADQUARTERED</span>
              <span className="font-bold text-gray-800 font-display text-base">{COMPANY_INFO.headquarters}, India</span>
            </div>
            <div>
              <span className="text-gray-400 font-mono text-[10px] block uppercase">ESTABLISHED YEAR</span>
              <span className="font-bold text-gray-800 font-display text-base">Year {COMPANY_INFO.founded}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" 
            alt="RentEase Ahmedabad Corporate Headquarters"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <p className="font-bold text-sm">RentEase Technologies Pvt. Ltd.</p>
              <p className="text-[10px] text-emerald-300 font-mono">SG Highway Development District, Ahmedabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Mission & Vision Dual Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mission card */}
        <div className="bg-emerald-950 text-white p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="h-12 w-12 bg-emerald-800/50 rounded-xl flex items-center justify-center text-emerald-400">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Our Mission</h3>
          <p className="text-xs text-emerald-100 leading-relaxed font-sans">
            {STORY_INFO.mission}
          </p>
          <ul className="text-[11px] text-emerald-200/90 space-y-2 pt-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Zero downpayments setup cost</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Supporting the circular economy</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Affordable monthly access instead of ownership stress</li>
          </ul>
        </div>

        {/* Vision Card */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="h-12 w-12 bg-slate-800/80 rounded-xl flex items-center justify-center text-blue-400">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Our Vision</h3>
          <p className="text-xs text-slate-100 leading-relaxed font-sans">
            {STORY_INFO.vision}
          </p>
          <ul className="text-[11px] text-slate-200/90 space-y-2 pt-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> High footprint in 20+ major cities</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Comprehensive home maintenance service integration</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Smart IoT enabled appliances rental lines</li>
          </ul>
        </div>

      </section>

      {/* 4. Core Values bento blocks */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight">Our Core Values</h2>
          <p className="text-xs text-gray-500">Six principles that act as our compass for client support and business operations daily.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORY_INFO.coreValues.map((val, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-gray-200 transition-all text-left"
            >
              <div className="space-y-3">
                <div className="h-9 w-9 bg-emerald-50 text-emerald-700 font-bold font-mono text-xs rounded-lg flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-sm text-gray-900 font-sans tracking-wide">{val.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
