import type {
  ColdExposureSession,
  CompletedSession,
  DailyStreak,
  TimePeriod,
} from '~/shared/model/types';

export const STORAGE_KEYS = {
  SESSIONS: 'sukun-sessions',
  STREAKS: 'sukun-streaks',
  COMPLETED_SESSIONS: 'sukun-completed-sessions',
} as const;

export function getSessions(): Array<ColdExposureSession> {
  if (typeof window === 'undefined') return [];
  try {
    const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

export function saveSessions(sessions: Array<ColdExposureSession>) {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

export function getStreaks(): Array<DailyStreak> {
  if (typeof window === 'undefined') return [];
  const streaks = localStorage.getItem(STORAGE_KEYS.STREAKS);
  return streaks ? JSON.parse(streaks) : [];
}

export function saveStreak(date: string) {
  const streaks = getStreaks();
  const today = { date, completed: true };
  const existingIndex = streaks.findIndex((s) => s.date === date);

  if (existingIndex >= 0) {
    streaks[existingIndex] = today;
  } else {
    streaks.push(today);
  }

  localStorage.setItem(STORAGE_KEYS.STREAKS, JSON.stringify(streaks));
}

export function getCompletedSessions(): Array<CompletedSession> {
  if (typeof window === 'undefined') return [];
  try {
    const completed = localStorage.getItem(STORAGE_KEYS.COMPLETED_SESSIONS);
    return completed ? JSON.parse(completed) : [];
  } catch (error) {
    console.error('Error getting completed sessions:', error);
    return [];
  }
}

export function saveCompletedSession(session: ColdExposureSession) {
  try {
    const completedSessions = getCompletedSessions();
    const totalDuration = session.preparationDuration + session.coldDuration;

    const completedSession: CompletedSession = {
      id: Date.now().toString(),
      sessionId: session.id,
      name: session.name,
      date: new Date().toISOString(),
      totalDuration,
      coldDuration: session.coldDuration,
    };

    completedSessions.push(completedSession);
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED_SESSIONS,
      JSON.stringify(completedSessions),
    );

    // Also save streak
    const today = new Date().toISOString().split('T')[0];
    saveStreak(today);

    return completedSession;
  } catch (error) {
    console.error('Error saving completed session:', error);
    return null;
  }
}

export function calculateSessionDuration(session: ColdExposureSession): number {
  // Total duration in seconds
  return session.preparationDuration + session.coldDuration;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatMinutes(seconds: number): string {
  return Math.ceil(seconds / 60) + ' min';
}

export function filterSessionsByTimePeriod(
  sessions: Array<CompletedSession>,
  period: TimePeriod,
): Array<CompletedSession> {
  const now = new Date();
  let cutoffDate: Date;

  switch (period) {
    case '24h':
      cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'week':
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      cutoffDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      );
      break;
    case 'year':
      cutoffDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate(),
      );
      break;
  }

  return sessions.filter((session) => new Date(session.date) >= cutoffDate);
}

export function getStatistics(period: TimePeriod) {
  const allSessions = getCompletedSessions();
  const filteredSessions = filterSessionsByTimePeriod(allSessions, period);

  if (filteredSessions.length === 0) {
    return {
      count: 0,
      totalColdDuration: 0,
      averageColdDuration: 0,
      longestColdDuration: 0,
      message:
        "You haven't taken any cold exposures in this period. Time to start your journey!",
    };
  }

  const totalColdDuration = filteredSessions.reduce(
    (sum, session) => sum + session.coldDuration,
    0,
  );
  const averageColdDuration = totalColdDuration / filteredSessions.length;
  const longestColdDuration = Math.max(
    ...filteredSessions.map((session) => session.coldDuration),
  );

  // Generate a creative message based on total duration
  let message = '';
  const totalMinutes = Math.floor(totalColdDuration / 60);

  if (totalMinutes < 10) {
    message = `You've spent ${totalMinutes} minutes in cold exposure. That's a great start to building resilience!`;
  } else if (totalMinutes < 30) {
    message = `${totalMinutes} minutes of cold exposure! Your body is adapting and getting stronger!`;
  } else if (totalMinutes < 60) {
    message = `Wow! ${totalMinutes} minutes of cold exposure! That's impressive dedication to your health!`;
  } else if (totalMinutes < 120) {
    message = `${totalMinutes} minutes in the cold! You're developing serious mental toughness!`;
  } else {
    message = `An incredible ${totalMinutes} minutes of cold exposure! You're in the elite category of cold endurance!`;
  }

  return {
    count: filteredSessions.length,
    totalColdDuration,
    averageColdDuration,
    longestColdDuration,
    message,
  };
}
