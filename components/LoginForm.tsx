
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: () => void;
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onBack }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin/admin for demo.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <button onClick={onBack} className="absolute top-8 left-8 text-emerald-600 font-bold flex items-center gap-2">
        ← Back to Site
      </button>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg">V</div>
          <h2 className="font-display text-3xl text-slate-900">Admin Login</h2>
          <p className="text-slate-500 mt-2">Access the Sales CRM & Inventory</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Username</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="admin"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl">
            Enter Dashboard
          </button>
        </form>
        <p className="mt-8 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">Lumina CRM v1.0.4</p>
      </div>
    </div>
  );
};

export default LoginForm;
