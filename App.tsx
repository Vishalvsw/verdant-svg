
import React, { useState, useEffect } from 'react';
import { AMENITIES, INITIAL_PLOTS, TESTIMONIALS, PROJECT_DETAILS, INITIAL_LEADS, INITIAL_BOOKINGS } from './constants';
import AIConsultant from './components/AIConsultant';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import BookingForm from './components/BookingForm';
import { Lead, PlotOption, AppView, Booking } from './types';

const App: React.FC = () => {
  // Global State
  const [view, setView] = useState<AppView>('landing');
  const [plots, setPlots] = useState<PlotOption[]>(() => {
    const saved = localStorage.getItem('vv_plots');
    return saved ? JSON.parse(saved) : INITIAL_PLOTS;
  });
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('vv_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('vv_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('vv_plots', JSON.stringify(plots));
    localStorage.setItem('vv_leads', JSON.stringify(leads));
    localStorage.setItem('vv_bookings', JSON.stringify(bookings));
  }, [plots, leads, bookings]);

  const handleBookingSubmit = (data: any) => {
    const newLead: Lead = {
      id: `L-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      plotType: data.plotType,
      status: 'Visit Scheduled',
      createdAt: new Date().toISOString()
    };

    const newBooking: Booking = {
      id: `B-${Date.now()}`,
      leadId: newLead.id,
      clientName: data.name,
      date: data.date,
      time: data.time,
      status: 'Pending'
    };

    setLeads([newLead, ...leads]);
    setBookings([newBooking, ...bookings]);
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 6000);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const updatePlotStatus = (id: string, status: PlotOption['status']) => {
    setPlots(plots.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  if (view === 'login') {
    return <LoginForm onLogin={() => setView('admin')} onBack={() => setView('landing')} />;
  }

  if (view === 'admin') {
    return (
      <AdminDashboard 
        leads={leads} 
        plots={plots} 
        bookings={bookings}
        onLogout={() => setView('landing')} 
        onUpdateLeadStatus={updateLeadStatus}
        onUpdatePlotStatus={updatePlotStatus}
        onUpdateBookingStatus={updateBookingStatus}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Utility Top Bar */}
      <div className="bg-emerald-950 text-white py-1 px-4 flex justify-end gap-6 text-[10px] font-bold uppercase tracking-widest">
        <span>Project Status: Phase 1 Pre-Launch</span>
        <button onClick={() => setView('login')} className="text-emerald-400 hover:text-white transition-all flex items-center gap-1">
          🔐 Staff Login
        </button>
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">V</div>
            <span className="font-display text-xl font-bold text-emerald-900 tracking-tight">Verdant Valley</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#plots" className="hover:text-emerald-600 transition-colors">Inventory</a>
            <a href="#amenities" className="hover:text-emerald-600 transition-colors">Amenities</a>
            <a href="#location" className="hover:text-emerald-600 transition-colors">Location</a>
          </div>
          <a href="#contact" className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md">
            Reserve Plot
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920" 
            alt="Beautiful green landscape" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl text-white">
            <div className="inline-block bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/30 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 animate-pulse">
              Exclusive 50-Acre Development
            </div>
            <h1 className="font-display text-5xl md:text-7xl mb-6 leading-[1.1] drop-shadow-sm">
              Build Your <span className="text-emerald-400">Legacy</span> in Nature.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-emerald-50/90 max-w-lg leading-relaxed">
              Premium residential plots with clear titles and 20+ amenities in {PROJECT_DETAILS.location}. Starting from $99,000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white text-emerald-950 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl text-center">
                Book Site Visit
              </a>
              <a href="#plots" className="bg-emerald-600/40 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600/60 transition-all text-center">
                Check Inventory
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Project Area', value: PROJECT_DETAILS.totalArea },
            { label: 'Available Units', value: `${plots.filter(p => p.status === 'Available').length} Plots` },
            { label: 'Price Range', value: '$99K - $320K' },
            { label: 'Developer', value: PROJECT_DETAILS.developer },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</span>
              <span className="text-emerald-900 text-lg font-black">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About Developer */}
      <section id="about" className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" 
              alt="Construction development" 
              className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-50 rounded-[4rem] z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-emerald-100 rounded-[4rem] z-0 -rotate-3" />
          </div>
          <div>
            <h4 className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] mb-4">Quality & Reliability</h4>
            <h2 className="font-display text-5xl text-emerald-950 mb-8 leading-tight">Crafting Spaces <br/>Since {PROJECT_DETAILS.developerYear}.</h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed italic">
              "We don't just sell land; we deliver the foundation for your family's future dreams."
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <div className="text-emerald-600 font-black text-2xl mb-1">10k+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Families Served</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <div className="text-emerald-600 font-black text-2xl mb-1">25+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Awarded Projects</div>
              </div>
            </div>
            <button className="bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all flex items-center gap-2">
              Our Track Record <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plot Inventory Section */}
      <section id="plots" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl text-emerald-950 mb-6">Choose Your Canvas</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">Each plot is meticulously planned to offer maximum efficiency, Vastu compliance, and panoramic views.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {plots.map((plot, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
                <h3 className="text-2xl font-black text-emerald-950 mb-2">{plot.size}</h3>
                <p className="text-slate-400 text-sm mb-6 flex items-center gap-2 font-medium">
                  <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[8px]">📐</span>
                  {plot.dimensions}
                </p>
                <div className="text-emerald-600 font-black text-3xl mb-8">{plot.price}</div>
                
                <div className="mt-auto">
                  <div className={`mb-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${plot.status === 'Sold Out' ? 'text-red-500' : 'text-emerald-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${plot.status === 'Sold Out' ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                    {plot.status}
                  </div>
                  <button 
                    disabled={plot.status === 'Sold Out'}
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                    }}
                    className={`w-full py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest ${plot.status === 'Sold Out' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-950 text-white hover:bg-emerald-800 shadow-lg'}`}
                  >
                    {plot.status === 'Sold Out' ? 'Waitlist' : 'Select Slot'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section id="contact" className="py-32 bg-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="font-display text-5xl text-emerald-950 mb-8 leading-tight">The Best Way <br/>to Buy is to See.</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Site visits are critical. Walk through the clubhouse, see the model villas, and feel the elevation for yourself.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600 text-xl font-bold">✓</div>
                  <p className="font-bold text-slate-700">VIP Sales Lounge Access</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600 text-xl font-bold">✓</div>
                  <p className="font-bold text-slate-700">Complimentary Chauffeur Pickup</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600 text-xl font-bold">✓</div>
                  <p className="font-bold text-slate-700">Detailed ROI Presentation</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              {formStatus === 'success' ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-emerald-100 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-5xl mx-auto mb-6">📅</div>
                  <h3 className="text-3xl font-black text-emerald-950 mb-4">Visit Requested!</h3>
                  <p className="text-slate-500 mb-8">You've successfully requested a slot for your site visit. Check your WhatsApp for a confirmation link.</p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs text-slate-400">
                    <span className="font-bold text-slate-600">Note:</span> Our RM will contact you within 2 business hours to finalize the pick-up details.
                  </div>
                </div>
              ) : (
                <BookingForm onSubmit={handleBookingSubmit} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-2xl">V</div>
              <span className="font-display text-3xl font-bold tracking-tight">Verdant Valley</span>
            </div>
            <p className="text-emerald-100/60 max-w-sm mb-10 leading-relaxed text-lg">
              Developing sustainable, high-value residential assets for the modern investor and homeowner.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI', 'TW'].map(s => (
                <div key={s} className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center font-bold text-xs hover:bg-emerald-900 transition-all cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-emerald-500 uppercase text-xs tracking-widest mb-8">Project Hub</h4>
            <ul className="space-y-4 text-emerald-100/80 font-medium">
              <li><a href="#plots" className="hover:text-emerald-400">Inventory Map</a></li>
              <li><a href="#" className="hover:text-emerald-400">Master Plan PDF</a></li>
              <li><a href="#" className="hover:text-emerald-400">Location Guide</a></li>
              <li><a href="#" className="hover:text-emerald-400">E-Brochure</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-emerald-500 uppercase text-xs tracking-widest mb-8">Corporate</h4>
            <ul className="space-y-4 text-emerald-100/80 font-medium">
              <li><a href="#" className="hover:text-emerald-400">Developer Profile</a></li>
              <li><a href="#" className="hover:text-emerald-400">Privacy & Terms</a></li>
              <li><a href="#" className="hover:text-emerald-400">Career</a></li>
              <li className="pt-4"><button onClick={() => setView('login')} className="text-emerald-400 font-bold underline">Staff Login</button></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Persistent Mobile Actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 flex h-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a href="tel:5551234567" className="flex-1 flex flex-col items-center justify-center border-r border-slate-50">
          <span className="text-xl">📞</span>
          <span className="text-[10px] font-bold uppercase mt-1 text-slate-500 tracking-widest">Call Sales</span>
        </a>
        <a href="#contact" className="flex-[2] bg-emerald-600 text-white flex items-center justify-center font-bold text-sm uppercase tracking-widest">
          Book Site Visit
        </a>
      </div>

      <AIConsultant />
    </div>
  );
};

export default App;
