
import React, { useState } from 'react';
import { TIME_SLOTS } from '../constants';

interface BookingFormProps {
  onSubmit: (data: any) => void;
  plotTypeDefault?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, plotTypeDefault }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotType: plotTypeDefault || 'Standard',
    date: '',
    time: ''
  });

  // Generate next 7 days for selection
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      raw: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
    };
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-emerald-900">Book Site Visit</h3>
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
          <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-widest">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-widest">Phone</label>
                <input 
                  required
                  type="tel" 
                  placeholder="+1..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-widest">Email</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <button 
              type="button" 
              onClick={nextStep}
              disabled={!formData.name || !formData.phone}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl disabled:opacity-50 mt-4"
            >
              Choose Visit Slot →
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-3 tracking-widest">Select Date</label>
              <div className="grid grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.raw}
                    type="button"
                    onClick={() => setFormData({...formData, date: d.raw})}
                    className={`py-3 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                      formData.date === d.raw ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-emerald-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-3 tracking-widest">Available Times</label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({...formData, time: t})}
                    className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${
                      formData.time === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={prevStep}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                disabled={!formData.date || !formData.time}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-xl disabled:opacity-50"
              >
                Confirm Site Visit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
