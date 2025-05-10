import { useEffect, useState, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { formatTime, saveCompletedSession } from '~/shared/model/mock-storage';
import type {
  ColdExposureSession,
  SessionProgress,
} from '~/shared/model/types';
import { Card, CardContent } from '~/shared/shadcn-ui/card';
import { Button } from '~/shared/shadcn-ui/button';

interface TimerProps {
  session: ColdExposureSession;
  onComplete: () => void;
  onBack: () => void;
}

export function Timer({ session, onComplete, onBack }: TimerProps) {
  const [progress, setProgress] = useState<SessionProgress>({
    phase: 'preparation',
    timeRemaining: session.preparationDuration,
    isActive: false,
    isPaused: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/notification.mp3');
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (progress.isActive && !progress.isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newTime = prev.timeRemaining - 1;

          if (newTime <= 0) {
            // Play sound when changing phases
            audioRef.current
              ?.play()
              .catch((error) => console.error('Audio playback failed:', error));

            // If we've completed the cold phase
            if (prev.phase === 'cold') {
              clearInterval(interval);
              saveCompletedSession(session);
              onComplete();
              return prev;
            }

            // Switch from preparation to cold phase
            return {
              ...prev,
              phase: 'cold',
              timeRemaining: session.coldDuration,
            };
          }

          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [progress.isActive, progress.isPaused, session, onComplete]);

  const toggleTimer = () => {
    if (!progress.isActive && !progress.isPaused) {
      // Play sound when starting the session
      audioRef.current
        ?.play()
        .catch((error) => console.error('Audio playback failed:', error));
    }
    setProgress((prev) => ({
      ...prev,
      isActive: true,
      isPaused: !prev.isPaused,
    }));
  };

  const resetTimer = () => {
    setProgress({
      phase: 'preparation',
      timeRemaining: session.preparationDuration,
      isActive: false,
      isPaused: false,
    });
  };

  const totalDuration =
    progress.phase === 'preparation'
      ? session.preparationDuration
      : session.coldDuration;

  const progress_percentage = (progress.timeRemaining / totalDuration) * 100;

  return (
    <Card className='w-full max-w-md mx-auto border-zinc-800 bg-zinc-900'>
      <CardContent className='p-6'>
        <div className='relative aspect-square'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-4xl font-bold'>
              {formatTime(progress.timeRemaining)}
            </div>
          </div>
          <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
            <circle
              className='stroke-zinc-800 fill-none'
              strokeWidth='4'
              cx='50'
              cy='50'
              r='48'
            />
            <circle
              className={`fill-none transition-all duration-1000 ease-in-out ${
                progress.phase === 'preparation'
                  ? 'stroke-yellow-500'
                  : 'stroke-blue-500'
              }`}
              strokeWidth='4'
              strokeLinecap='round'
              strokeDasharray='300'
              strokeDashoffset={300 - progress_percentage * 3}
              cx='50'
              cy='50'
              r='48'
            />
          </svg>
        </div>
        <div className='mt-6 space-y-4'>
          <div className='text-center'>
            <div className='text-lg font-semibold'>
              {progress.phase === 'preparation' ? 'Get Ready' : 'Cold Exposure'}
            </div>
            <div className='text-sm text-muted-foreground'>
              {progress.phase === 'preparation'
                ? 'Preparing for cold exposure'
                : "Stay strong, you've got this!"}
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              className='border-zinc-800'
              onClick={onBack}
              disabled={progress.isActive && !progress.isPaused}
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='border-zinc-800'
              onClick={toggleTimer}
            >
              {progress.isPaused || !progress.isActive ? (
                <Play className='h-4 w-4' />
              ) : (
                <Pause className='h-4 w-4' />
              )}
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='border-zinc-800'
              onClick={resetTimer}
              disabled={!progress.isActive}
            >
              <RotateCcw className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
