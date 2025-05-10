import { useEffect, useState } from 'react';
import { Plus, Play, Clock } from 'lucide-react';
import {
  calculateSessionDuration,
  formatMinutes,
  getSessions,
} from '~/shared/model/mock-storage';
import type { ColdExposureSession } from '~/shared/model/types';
import { CreateSessionForm } from '~/features/session';
import { Button } from '~/shared/shadcn-ui/button';
import { Timer } from '~/widgets/timer/timer';
import { Header } from '~/widgets/header';

export function HomePage() {
  const [selectedSession, setSelectedSession] =
    useState<ColdExposureSession | null>(null);
  const [sessions, setSessions] = useState<ColdExposureSession[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const refreshSessions = () => {
    setSessions(getSessions());
    setShowForm(false);
  };

  const handleSessionComplete = () => {
    setSelectedSession(null);
  };

  if (selectedSession) {
    return (
      <div className='container max-w-md mx-auto p-4'>
        <Timer
          session={selectedSession}
          onComplete={handleSessionComplete}
          onBack={() => setSelectedSession(null)}
        />
      </div>
    );
  }

  return (
    <div className='container max-w-md mx-auto p-4 space-y-6'>
      <Header />

      {sessions.length === 0 && !showForm ? (
        <div className='text-center py-12'>
          <h2 className='text-xl font-semibold mb-4'>Welcome to Sukun</h2>
          <p className='text-muted-foreground mb-6'>
            Create your first cold exposure session to get started
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Create Session
          </Button>
        </div>
      ) : (
        <>
          {!showForm && (
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-semibold'>Your Cold Exposures</h2>
              <Button size='sm' onClick={() => setShowForm(true)}>
                <Plus className='mr-2 h-4 w-4' />
                New Session
              </Button>
            </div>
          )}

          {showForm ? (
            <div className='space-y-4 animate-slide-down'>
              <CreateSessionForm onSessionCreated={refreshSessions} />
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className='grid gap-4'>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className='p-4 rounded-lg border border-zinc-800 bg-zinc-900 text-white shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-semibold text-lg'>{session.name}</h3>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <Clock className='h-4 w-4 mr-1' />
                      {formatMinutes(calculateSessionDuration(session))}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-muted-foreground'>
                      {formatMinutes(session.coldDuration)} cold exposure
                    </div>
                    <Button
                      size='sm'
                      onClick={() => setSelectedSession(session)}
                    >
                      <Play className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
