import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1'); // Default open first
  
  // Custom ticket state
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketQuestion, setTicketQuestion] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Filter FAQs based on search query
  const filteredFaqs = FAQS.filter(faq => {
    const q = faq.question.toLowerCase();
    const a = faq.answer.toLowerCase();
    const s = searchQuery.toLowerCase();
    return q.includes(s) || a.includes(s);
  });

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketQuestion) return;

    // Simulate database insertion or API delivery
    setTicketSuccess(true);
    setTimeout(() => {
      setTicketName('');
      setTicketEmail('');
      setTicketQuestion('');
      setTicketSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-16 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      {/* 1. Page Header */}
      <section className="text-center space-y-4 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
          <span>Need Assitance?</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-gray-900 tracking-tight">
          Help & Frequently Asked
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          Quickly search or scroll through our verified support answers covering refundable deposits, tenure lengths, repairs, and scheduling returns.
        </p>
      </section>

      {/* 2. Live Search & Accordion Section */}
      <section className="space-y-6">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type keywords to filter FAQs... (e.g. deposit, duration, repair)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-550 focus:border-transparent transition-all shadow-xs text-gray-800"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden focus:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm text-gray-800 font-sans tracking-wide">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50 select-text font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 space-y-2">
              <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
              <p className="font-bold text-sm text-gray-800">No matching FAQs found</p>
              <p className="text-xs text-gray-500">Try typing a simplified query or reset your search buffer.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Ticket helper card */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-gray-900">Still have questions?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Submit your specific question directly to our custom ticketing system. Our logistics and customer helpdesk in Ahmedabad will revert back within 2 business hours.
            </p>
            <div className="space-y-1.5 text-xs text-gray-600">
              <p>📍 Ahmedabad, Gujarat</p>
              <p>✉️ support@rentease.in</p>
              <p>🕒 Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            {ticketSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-gray-900">Ticket Submitted Successfully!</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We have mapped your inquiry to Ahmedabad Ticketing Node. A customer support manager will email you directly at the address provided.
                </p>
                <p className="text-[10px] font-mono text-emerald-600 animate-pulse">This simulation remains locally persistent.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-sans text-gray-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Patel"
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 focus:bg-white rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-555 text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-sans text-gray-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@gmail.com"
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 focus:bg-white rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-555 text-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-sans text-gray-400 uppercase">Describe Your Question</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide details about your query here..."
                    value={ticketQuestion}
                    onChange={(e) => setTicketQuestion(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-255 focus:bg-white rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-555 text-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
