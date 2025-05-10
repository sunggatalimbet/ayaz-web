export interface ColdExposureSession {
  id: string;
  name: string;
  coldDuration: number; // in seconds
  preparationDuration: number; // in seconds
}

export interface SessionProgress {
  phase: 'preparation' | 'cold';
  timeRemaining: number;
  isActive: boolean;
  isPaused: boolean;
}

export interface DailyStreak {
  date: string;
  completed: boolean;
}

export interface CompletedSession {
  id: string;
  sessionId: string;
  name: string;
  date: string; // ISO string
  totalDuration: number; // in seconds (including preparation)
  coldDuration: number; // in seconds (just the cold part)
}

export type TimePeriod = '24h' | 'week' | 'month' | 'year';
