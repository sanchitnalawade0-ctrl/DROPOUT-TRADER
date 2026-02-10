
import React from 'react';
import { Shield, Target, TrendingUp, AlertTriangle, Layers, Zap } from 'lucide-react';

export const RiskManagementTab: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Strategy Cases */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="text-emerald-500 w-6 h-6" />
          <h2 className="text-2xl font-bold">Core Execution Strategy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 font-bold">01</div>
            <h3 className="text-lg font-bold mb-3">NY Market Open Reversal</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              After the New York market opens (6:30 PM IST), monitor for a sharp reversal entry. Look for liquidity sweeps of the initial open high/low.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-emerald-500">
              <Zap className="w-4 h-4" />
              HIGH PROBABILITY SETUP
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 font-bold">02</div>
            <h3 className="text-lg font-bold mb-3">Pivot Level Mastery</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Proper Buy/Sell execution at standard Pivot levels:
            </p>
            <ul className="space-y-2">
              <li className="text-xs flex items-center gap-2 bg-emerald-500/10 text-emerald-400 p-2 rounded">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                BUY: Support S1 or S2
              </li>
              <li className="text-xs flex items-center gap-2 bg-rose-500/10 text-rose-400 p-2 rounded">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                SELL: Resistance R1 or R2
              </li>
            </ul>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 font-bold">03</div>
            <h3 className="text-lg font-bold mb-3">Fibonacci Retracement</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Wait for one-sided directional movement. Plan entries on retracement levels:
            </p>
            <div className="flex flex-wrap gap-2">
              {['0.5', '0.7', '0.786'].map(f => (
                <span key={f} className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono font-bold text-indigo-400">
                  FIB {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quantity Management */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Quantity Management</h2>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
             <div className="flex items-start gap-4">
               <div className="bg-blue-600 p-2 rounded-lg mt-1"><Target className="w-5 h-5 text-white" /></div>
               <div>
                 <h4 className="font-bold text-blue-400 mb-2">The "100% Rule"</h4>
                 <p className="text-sm text-slate-300 leading-relaxed">
                   Deploy 100% quantity <span className="text-white font-bold underline decoration-blue-500">ONLY</span> on the following conditions:
                 </p>
               </div>
             </div>
             
             <ul className="mt-6 space-y-3">
               {[
                 'NY Market Open + Clear Reversal',
                 'Pivot Point Standard Levels (S1/S2/R1/R2)',
                 'Double Top / Double Bottom Patterns',
                 'Fibonacci Levels (0.5, 0.7, 0.786)'
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-3 text-sm text-slate-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   {item}
                 </li>
               ))}
             </ul>
          </div>
        </section>

        {/* Profit Booking & Stop Loss */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-emerald-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Exit Strategy (TP/SL)</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border-l-4 border-rose-600 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span className="font-bold text-xs uppercase tracking-widest text-rose-500">Stop Loss Protocol</span>
              </div>
              <p className="text-sm text-slate-400">
                Implement strict stop loss measures immediately upon execution. No mental stops. Protect capital at all costs.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border-l-4 border-emerald-600 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">Take Profit Strategy</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Your Take Profit (TP) should be set at one of these levels:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Next Swing Point',
                  'Fixed 1:2 Risk/Reward',
                  'Next Pivot Level',
                  'Next Round Number'
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900 p-2 rounded text-[11px] font-bold text-slate-500 text-center border border-slate-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-l-4 border-indigo-600 rounded-r-xl">
               <span className="font-bold text-xs uppercase tracking-widest text-indigo-400 block mb-2">Partial Management</span>
               <p className="text-sm text-slate-400">
                 Always consider partial profit booking as per timeframe levels to de-risk the position once moving in favor.
               </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
