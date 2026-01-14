
import React, { useState } from 'react';
import { SEO_STRATEGY, PROJECT_DETAILS } from '../constants';

const SEOStrategy: React.FC = () => {
  const [activeRoadmapTab, setActiveRoadmapTab] = useState(0);

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-500">
      <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-display font-bold text-emerald-950 mb-4">Google Search Domination</h2>
          <p className="text-emerald-800/70 leading-relaxed max-w-xl">
            Our SEO strategy is built to ensure Verdant Valley Estates ranks #1 for "Plots for sale in {PROJECT_DETAILS.location}". 
            We focus on Local SEO, High-Intent Keywords, and Google Business Profile authority.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 w-full md:w-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-black">G</div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expected Visibility</div>
              <div className="text-2xl font-black text-slate-900">Top 3 Results</div>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[85%]"></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Keywords Section */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-emerald-500">🔍</span> High-Intent Keywords
          </h3>
          <div className="space-y-4">
            {SEO_STRATEGY.targetKeywords.map((kw, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-700">{kw.keyword}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Volume: {kw.volume}</div>
                </div>
                <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  kw.difficulty === 'Low' ? 'bg-emerald-100 text-emerald-600' : 
                  kw.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                }`}>
                  {kw.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Preview */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-emerald-500">📄</span> Search Snippet Demo
          </h3>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md max-w-sm mx-auto font-sans">
            <div className="text-[10px] text-slate-500 flex items-center gap-1 mb-1">
              www.verdantvalley.com <span className="text-[8px]">▼</span>
            </div>
            <div className="text-blue-700 text-lg hover:underline cursor-pointer font-medium leading-tight mb-1">
              {SEO_STRATEGY.metaTemplate.title}
            </div>
            <div className="text-slate-600 text-xs leading-relaxed">
              {SEO_STRATEGY.metaTemplate.description}
            </div>
          </div>
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Pro Tip</div>
            <p className="text-xs text-amber-900/70">Using your location directly in the title tag increases Click-Through-Rate (CTR) for local buyers by up to 40%.</p>
          </div>
        </div>
      </div>

      {/* SEO Checklist - Restructured to use a tabbed interface */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="text-emerald-500">✅</span> Growth Roadmap
          </h3>
          
          <div className="flex flex-wrap bg-slate-50 p-1 rounded-2xl border border-slate-100">
            {SEO_STRATEGY.checklist.map((group, i) => (
              <button
                key={i}
                onClick={() => setActiveRoadmapTab(i)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeRoadmapTab === i 
                    ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-500/10' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[240px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {SEO_STRATEGY.checklist[activeRoadmapTab].items.map((item, j) => (
              <div 
                key={j} 
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  {j + 1}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1.5">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Template */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl -mr-32 -mt-32"></div>
        <h3 className="text-2xl font-display font-bold mb-8">SEO Landing Content Template</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">Section: Hero H1</div>
            <div className="text-xl text-slate-300">"Exclusive Plots for Sale in {PROJECT_DETAILS.location}: Build Your Dream Home Today."</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">Section: Local SEO Block</div>
            <div className="text-sm text-slate-400 italic">
              "Verdant Valley Estates is located just 15 minutes from North Hills City Center. If you are looking for residential plots near {PROJECT_DETAILS.location}, our gated community offers the best value with complete legal clarity and modern infrastructure."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOStrategy;
