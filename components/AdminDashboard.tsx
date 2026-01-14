
import React, { useState } from 'react';
import { Lead, PlotOption, Booking } from '../types';

interface AdminDashboardProps {
  leads: Lead[];
  plots: PlotOption[];
  bookings: Booking[];
  onLogout: () => void;
  onUpdateLeadStatus: (id: string, status: Lead['status']) => void;
  onUpdatePlotStatus: (id: string, status: PlotOption['status']) => void;
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  leads, plots, bookings, onLogout, onUpdateLeadStatus, onUpdatePlotStatus, onUpdateBookingStatus 
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings' | 'inventory'>('leads');

  const stats = [
    { label: 'Total Leads', value: leads.length, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Scheduled Visits', value: bookings.filter(b => b.status === 'Confirmed').length, color: 'bg-blue-100 text-blue-600' },
    { label: 'Deals Closed', value: leads.filter(l => l.status === 'Sold').length, color: 'bg-purple-100 text-purple-600' },
    { label: 'Inventory', value: `${plots.filter(p => p.status === 'Available').length}/${plots.length}`, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-950 text-white p-6 hidden md:flex flex-col border-r border-white/5">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20">V</div>
          <span className="font-display text-xl font-bold tracking-tight">Lumina CRM</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full p-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'leads' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/5'}`}
          >
            <span className="text-xl">👥</span> Leads
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full p-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'bookings' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/5'}`}
          >
            <span className="text-xl">📅</span> Site Visits
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full p-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'inventory' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/5'}`}
          >
            <span className="text-xl">🏘️</span> Inventory
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="p-4 bg-red-500/10 hover:bg-red-500/20 rounded-2xl text-red-400 font-bold transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-display">Sales Console</h1>
            <p className="text-slate-500 capitalize">{activeTab} Management Dashboard</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-slate-600 uppercase">System Live</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-100 transition-all cursor-default">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-bold text-slate-900">{s.value}</span>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${s.color}`}>+5.2%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          {activeTab === 'leads' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-50">
                    <th className="px-8 py-5">Name</th>
                    <th className="px-8 py-5">Contact</th>
                    <th className="px-8 py-5">Preference</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 font-bold text-slate-900">{lead.name}</td>
                      <td className="px-8 py-5 text-sm text-slate-500">{lead.phone}</td>
                      <td className="px-8 py-5 text-sm font-medium text-emerald-700">{lead.plotType}</td>
                      <td className="px-8 py-5">
                        <select 
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="text-[10px] font-bold uppercase py-1.5 px-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:ring-2 focus:ring-emerald-500/20"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Sold">Sold</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="px-8 py-5 text-slate-400">•••</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-50">
                    <th className="px-8 py-5">Client Name</th>
                    <th className="px-8 py-5">Date & Time</th>
                    <th className="px-8 py-5">Booking Status</th>
                    <th className="px-8 py-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 font-bold text-slate-900">{booking.clientName}</td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-700">{booking.date}</div>
                        <div className="text-xs text-slate-400">{booking.time}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' :
                          booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                          booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 flex gap-2">
                        <button 
                          onClick={() => onUpdateBookingStatus(booking.id, 'Confirmed')}
                          className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-100 transition-all"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => onUpdateBookingStatus(booking.id, 'Cancelled')}
                          className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-100 transition-all"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="p-20 text-center text-slate-400 font-medium italic">No site visits scheduled yet.</div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plots.map((plot) => (
                <div key={plot.id} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-900">{plot.size}</h4>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-lg ${
                      plot.status === 'Available' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {plot.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-6">{plot.dimensions} • {plot.price}</div>
                  <button 
                    onClick={() => onUpdatePlotStatus(plot.id, plot.status === 'Available' ? 'Sold Out' : 'Available')}
                    className="w-full bg-white border border-slate-200 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-slate-100"
                  >
                    Mark as {plot.status === 'Available' ? 'Sold Out' : 'Available'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
