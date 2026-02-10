
import React, { useState, useEffect } from 'react';
import { Calculator, Clock, Globe, ArrowRight } from 'lucide-react';
import { TRADING_SESSIONS } from '../constants';

export const ToolsTab: React.FC = () => {
  // Calculator State
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(15);
  const [pipValue, setPipValue] = useState<number>(10); // Standard for USD base
  
  const [positionSize, setPositionSize] = useState<number>(0);
  const [riskAmount, setRiskAmount] = useState<number>(0);

  useEffect(() => {
    const risk = balance * (riskPercent / 100);
    const size = stopLossPips > 0 ? risk / (stopLossPips * pipValue) : 0;
    setRiskAmount(risk);
    setPositionSize(Number(size.toFixed(2)));
  }, [balance, riskPercent, stopLossPips, pipValue]);

  const getCurrentTimeIST = () => {
    return new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTimeIST());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getCurrentTimeIST()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isSessionActive = (start: string, end: string) => {
    const [nowH, nowM] = currentTime.split(':').map(Number);
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const nowTotal = nowH * 60 + nowM;
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (startTotal < endTotal) {
      return nowTotal >= startTotal && nowTotal < endTotal;
    } else {
      // Overlaps midnight (like New York)
      return nowTotal >= startTotal || nowTotal < endTotal;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Position Size Calculator */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600/20 p-2 rounded-lg">
              <Calculator className="text-indigo-500 w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Position Size Calculator</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Account Balance ($)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 font-mono"
                  value={balance}
                  onChange={e => setBalance(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Risk %</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 font-mono"
                  value={riskPercent}
                  onChange={e => setRiskPercent(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Stop Loss (Pips)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 font-mono"
                  value={stopLossPips}
                  onChange={e => setStopLossPips(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Pip Value ($)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 font-mono"
                  value={pipValue}
                  onChange={e => setPipValue(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Money at Risk</span>
              <span className="text-xl font-bold text-rose-500">${riskAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Recommended Lots</span>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-500">{positionSize}</span>
                <span className="text-xs text-slate-500 block">Standard Lots</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-600 italic">
            *Calculation: (Balance × Risk%) / (SL Pips × Pip Value). Use proper risk for your specific asset class.
          </p>
        </div>

        {/* Market Hours IST */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600/20 p-2 rounded-lg">
                <Clock className="text-orange-500 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">Market Hours (IST)</h2>
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono font-bold text-indigo-400">
              {currentTime}
            </div>
          </div>

          <div className="space-y-4">
            {TRADING_SESSIONS.map(session => {
              const active = isSessionActive(session.startTime, session.endTime);
              return (
                <div 
                  key={session.name}
                  className={`p-4 rounded-2xl border transition-all ${
                    active ? 'bg-indigo-900/10 border-indigo-500/50 ring-1 ring-indigo-500/20' : 'bg-slate-800/30 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${session.color} ${active ? 'animate-pulse' : 'opacity-50'}`} />
                      <span className={`font-bold ${active ? 'text-white' : 'text-slate-400'}`}>{session.name} Session</span>
                    </div>
                    {active && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-black uppercase">Open</span>}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex-1">
                      <span className="text-slate-500 block mb-1">Start</span>
                      <span className="text-slate-200">{session.startTime} IST</span>
                    </div>
                    <ArrowRight className="text-slate-700 w-4 h-4" />
                    <div className="flex-1">
                      <span className="text-slate-500 block mb-1">End</span>
                      <span className="text-slate-200">{session.endTime} IST</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Trading sessions are adjusted for Indian Standard Time (IST). Note that volatility typically spikes during "Session Overlaps" (e.g., London & New York).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
