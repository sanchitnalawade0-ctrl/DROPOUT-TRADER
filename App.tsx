
import React, { useState } from 'react';
import { JournalTab } from './components/JournalTab';
import { ToolsTab } from './components/ToolsTab';
import { RiskManagementTab } from './components/RiskManagementTab';
import { TabType } from './types';
// Fixed: Changed 'Tool' to 'Wrench' as 'Tool' is not exported from lucide-react
import { BookOpen, Wrench, ShieldAlert, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Journal');

  const renderContent = () => {
    switch (activeTab) {
      case 'Journal':
        return <JournalTab />;
      case 'Tools':
        return <ToolsTab />;
      case 'RiskManagement':
        return <RiskManagementTab />;
      default:
        return <JournalTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">TradeMind</h1>
        </div>

        <div className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('Journal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'Journal' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Trading Journal</span>
          </button>
          
          <button
            onClick={() => setActiveTab('Tools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'Tools' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {/* Fixed: Changed 'Tool' to 'Wrench' */}
            <Wrench className="w-5 h-5" />
            <span className="font-medium">Tools & Calc</span>
          </button>

          <button
            onClick={() => setActiveTab('RiskManagement')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'RiskManagement' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="font-medium">Risk Strategy</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800 text-slate-500 text-xs px-2">
          <p>© 2024 TradeMind Pro</p>
          <p>Indian Timing (IST) Mode</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{activeTab === 'RiskManagement' ? 'Risk Management' : activeTab}</h2>
          <div className="flex items-center gap-4">
             <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-medium text-emerald-400">Live Market Feed</div>
             <img src="https://picsum.photos/32/32" className="w-8 h-8 rounded-full border border-slate-700" alt="Profile" />
          </div>
        </header>

        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
