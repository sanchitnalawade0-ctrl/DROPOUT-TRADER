
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Mic, Trash2, Camera, Check, X, Filter } from 'lucide-react';
import { TradeEntry, Bias } from '../types';
import { TIMEFRAMES, COMMON_PAIRS, CONFLUENCE_OPTIONS, FIB_LEVELS, TRADING_SESSIONS } from '../constants';

export const JournalTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [trades, setTrades] = useState<Record<string, TradeEntry[]>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [sessionFilter, setSessionFilter] = useState<string>('All');

  // Form State
  const [newTrade, setNewTrade] = useState<Partial<TradeEntry>>({
    pair: 'EURUSD',
    timeframe: '15m',
    session: 'London',
    confluences: [],
    bias: [],
    comments: '',
    mistakes: '',
    fibLevel: 'None'
  });

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleAddTrade = () => {
    const entry: TradeEntry = {
      ...(newTrade as TradeEntry),
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
    };

    setTrades(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), entry]
    }));
    setIsAdding(false);
    setNewTrade({ 
      pair: 'EURUSD', 
      timeframe: '15m', 
      session: 'London', 
      confluences: [], 
      bias: [], 
      comments: '', 
      mistakes: '',
      fibLevel: 'None'
    });
  };

  const toggleBias = (b: Bias) => {
    setNewTrade(prev => ({
      ...prev,
      bias: prev.bias?.includes(b) 
        ? prev.bias.filter(item => item !== b)
        : [...(prev.bias || []), b]
    }));
  };

  const toggleConfluence = (c: string) => {
    setNewTrade(prev => ({
      ...prev,
      confluences: prev.confluences?.includes(c)
        ? prev.confluences.filter(item => item !== c)
        : [...(prev.confluences || []), c]
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      // Logic for recording...
    } catch (err) {
      console.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(viewDate);
    const startDay = firstDayOfMonth(viewDate);
    const days = [];
    const monthName = viewDate.toLocaleString('default', { month: 'long' });

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 md:h-24"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const hasTrades = trades[dateStr]?.length > 0;

      days.push(
        <button
          key={d}
          onClick={() => setSelectedDate(dateStr)}
          className={`h-14 md:h-24 p-2 border border-slate-800 flex flex-col items-start transition-all hover:bg-slate-800 ${
            isSelected ? 'bg-indigo-900/30 ring-2 ring-indigo-500 z-10' : ''
          }`}
        >
          <span className={`text-xs md:text-sm font-medium ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}>{d}</span>
          {hasTrades && (
            <div className="mt-auto flex flex-wrap gap-1">
              {trades[dateStr].map(t => (
                <div key={t.id} className={`w-1.5 h-1.5 rounded-full ${t.bias.includes('Buy') ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              ))}
            </div>
          )}
        </button>
      );
    }

    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="font-bold text-lg">{monthName} {viewDate.getFullYear()}</h3>
          <div className="flex gap-2">
            <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 hover:bg-slate-800 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 hover:bg-slate-800 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center border-b border-slate-800">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  const filteredTrades = trades[selectedDate]?.filter(t => sessionFilter === 'All' || t.session === sessionFilter) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-indigo-400 w-5 h-5" />
              <h2 className="text-xl font-bold">Session Calendar</h2>
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </button>
          </div>
          
          {renderCalendar()}

          {/* Trades for selected date */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-400 flex items-center gap-2">
                Trades on {new Date(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </h3>
              
              {/* Session Filter */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setSessionFilter('All')}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${sessionFilter === 'All' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  All
                </button>
                {TRADING_SESSIONS.map(s => (
                  <button
                    key={s.name}
                    onClick={() => setSessionFilter(s.name)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${sessionFilter === s.name ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredTrades.length ? (
              <div className="grid gap-4">
                {filteredTrades.map(trade => (
                  <div key={trade.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className={`p-2 rounded-lg ${trade.bias.includes('Buy') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          {trade.pair} <span className="text-xs text-slate-500">| {trade.timeframe}</span>
                        </div>
                        <div className="text-sm text-slate-400">
                          {trade.session} Session {trade.fibLevel && trade.fibLevel !== 'None' ? `| ${trade.fibLevel}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const newTrades = { ...trades };
                          newTrades[selectedDate] = newTrades[selectedDate].filter(t => t.id !== trade.id);
                          setTrades(newTrades);
                        }}
                        className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                {trades[selectedDate]?.length 
                  ? `No trades found for ${sessionFilter} session` 
                  : 'No trades recorded for this date'}
              </div>
            )}
          </div>
        </div>

        {/* Form Modal/Side Column */}
        {isAdding && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold">Record New Trade</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-800 rounded-full"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trading Pair</label>
                    <select 
                      className="w-full bg-slate-800 border-none rounded-xl p-3"
                      value={newTrade.pair}
                      onChange={e => setNewTrade({...newTrade, pair: e.target.value})}
                    >
                      {COMMON_PAIRS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timeframe</label>
                    <select 
                      className="w-full bg-slate-800 border-none rounded-xl p-3"
                      value={newTrade.timeframe}
                      onChange={e => setNewTrade({...newTrade, timeframe: e.target.value})}
                    >
                      {TIMEFRAMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Session</label>
                    <select 
                      className="w-full bg-slate-800 border-none rounded-xl p-3"
                      value={newTrade.session}
                      onChange={e => setNewTrade({...newTrade, session: e.target.value})}
                    >
                      {TRADING_SESSIONS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fibonacci Level</label>
                    <select 
                      className="w-full bg-slate-800 border-none rounded-xl p-3"
                      value={newTrade.fibLevel}
                      onChange={e => setNewTrade({...newTrade, fibLevel: e.target.value})}
                    >
                      {FIB_LEVELS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Session Bias (Multi-select)</label>
                  <div className="flex gap-2">
                    {(['Buy', 'Sell'] as Bias[]).map(b => (
                      <button
                        key={b}
                        onClick={() => toggleBias(b)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
                          newTrade.bias?.includes(b) 
                            ? (b === 'Buy' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-rose-600 border-rose-400 text-white')
                            : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confluences</label>
                  <div className="flex flex-wrap gap-2">
                    {CONFLUENCE_OPTIONS.map(c => (
                      <button
                        key={c}
                        onClick={() => toggleConfluence(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          newTrade.confluences?.includes(c)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detailed Comments</label>
                    <textarea 
                      placeholder="What was the narrative? How did you feel?"
                      className="w-full bg-slate-800 border-none rounded-xl p-3 min-h-[100px] resize-none focus:ring-2 ring-indigo-500"
                      value={newTrade.comments}
                      onChange={e => setNewTrade({...newTrade, comments: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mistakes / Learnings</label>
                    <textarea 
                      placeholder="FOMO? Early exit? Oversizing?"
                      className="w-full bg-slate-800 border-none rounded-xl p-3 min-h-[80px] resize-none focus:ring-2 ring-indigo-500"
                      value={newTrade.mistakes}
                      onChange={e => setNewTrade({...newTrade, mistakes: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Screenshot</label>
                    <div className="relative">
                      <input type="file" className="hidden" id="file-upload" />
                      <label 
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 rounded-xl hover:border-indigo-500 transition-all cursor-pointer bg-slate-800/50"
                      >
                        <Camera className="w-6 h-6 text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500 font-medium">Click to upload</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Voice Note</label>
                    <button
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      className={`w-full flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${
                        isRecording ? 'bg-rose-600 border-rose-400 animate-pulse' : 'bg-slate-800/50 border-slate-700'
                      }`}
                    >
                      <Mic className={`w-6 h-6 mb-2 ${isRecording ? 'text-white' : 'text-slate-400'}`} />
                      <span className={`text-xs font-medium ${isRecording ? 'text-white' : 'text-slate-500'}`}>
                        {isRecording ? 'Recording...' : 'Hold to record'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-800/50 border-t border-slate-800">
                <button
                  onClick={handleAddTrade}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-900/40"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
