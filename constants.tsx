
import { SessionInfo } from './types';

export const TRADING_SESSIONS: SessionInfo[] = [
  { name: 'Sydney', startTime: '03:30', endTime: '12:30', color: 'bg-blue-500' },
  { name: 'Tokyo', startTime: '05:30', endTime: '14:30', color: 'bg-red-500' },
  { name: 'London', startTime: '13:30', endTime: '22:30', color: 'bg-green-500' },
  { name: 'New York', startTime: '18:30', endTime: '03:30', color: 'bg-yellow-500' },
];

export const TIMEFRAMES = ['1m', '3m', '5m', '15m', '1h', '4h', 'D1', 'W1'];
export const COMMON_PAIRS = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTCUSD', 'AUDUSD', 'USDCAD', 'US30'];
export const FIB_LEVELS = ['None', 'FIB 0.5', 'FIB 0.7', 'FIB 0.786'];
export const CONFLUENCE_OPTIONS = [
  'Support S1',
  'Support S2',
  'Support S3',
  'Support S4',
  'Resistance R1',
  'Resistance R2',
  'Resistance R3',
  'Resistance R4',
  'Failure to hold highs',
  'Failure to hold LOW',
  'Supply/Demand Zone',
  'Liquidity Sweep',
  'Pivot Level Bounce'
];
