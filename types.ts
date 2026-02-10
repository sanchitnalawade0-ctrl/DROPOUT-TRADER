
export type Bias = 'Buy' | 'Sell';

export interface TradeEntry {
  id: string;
  date: string;
  pair: string;
  timeframe: string;
  session: string;
  confluences: string[];
  bias: Bias[];
  screenshot?: string;
  comments: string;
  mistakes: string;
  voiceNoteUrl?: string;
  fibLevel?: string;
}

export type TabType = 'Journal' | 'Tools' | 'RiskManagement';

export interface SessionInfo {
  name: string;
  startTime: string; // IST
  endTime: string;   // IST
  color: string;
}
