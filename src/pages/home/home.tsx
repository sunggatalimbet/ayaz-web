import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Clock, Play, Plus } from 'lucide-react';

import { getColdExposures } from '~/entities/cold-exposures/api';
import { CreateSessionForm } from '~/features/session';
import { Button } from '~/shared/shadcn-ui/button';
import { Header } from '~/widgets/header';

export function HomePage() {
  const [showForm, setShowForm] = useState(false);

  const {
    data: coldExposureData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cold_exposures'],
    queryFn: () => getColdExposures('fcf6968e-8e77-4afb-821f-839e057a458d'),
  });

  // const handleSessionComplete = () => {
  //   setSelectedSession(null);
  // };

  // if (selectedSession) {
  //   return (
  //     <div className='container mx-auto max-w-md p-4'>
  //       <Timer
  //         session={selectedSession}
  //         onComplete={handleSessionComplete}
  //         onBack={() => setSelectedSession(null)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className='container mx-auto max-w-md space-y-6 p-4'>
      <Header />

      <div className='py-12 text-center'>
        <h2 className='mb-4 text-xl font-semibold'>Welcome to Sukun</h2>
        <p className='text-muted-foreground mb-6'>
          Create your first cold exposure session to get started
        </p>
        <Button onClick={() => setShowForm(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Create Session
        </Button>
      </div>

      <>
        {!showForm && (
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Your Cold Exposures</h2>
            <Button size='sm' onClick={() => setShowForm(true)}>
              <Plus className='mr-2 h-4 w-4' />
              New Session
            </Button>
          </div>
        )}

        {showForm ? (
          <div className='animate-slide-down space-y-4'>
            <CreateSessionForm />
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
            {coldExposureData?.map((session) => (
              <div
                key={session.id}
                className='rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-white shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <h3 className='text-lg font-semibold'>{session.name}</h3>
                  <div className='text-muted-foreground flex items-center text-sm'>
                    <Clock className='mr-1 h-4 w-4' />
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-muted-foreground text-sm'>
                    cold exposure
                  </div>
                  <Button size='sm'>
                    <Play className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
}
