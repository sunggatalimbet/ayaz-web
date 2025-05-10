import type React from 'react';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/shadcn-ui/card';
import { Input } from '~/shared/shadcn-ui/input';
import { Button } from '~/shared/shadcn-ui/button';
import { Label } from '~/shared/shadcn-ui/label';
import { getSessions, saveSessions } from '~/shared/model/mock-storage';
import type { ColdExposureSession } from '~/shared/model/types';

interface SessionFormProps {
  onSessionCreated: () => void;
}

export function CreateSessionForm({ onSessionCreated }: SessionFormProps) {
  const [name, setName] = useState('');
  const [coldDuration, setColdDuration] = useState('60');
  const [preparationDuration, setPreparationDuration] = useState('25');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session: ColdExposureSession = {
      id: Date.now().toString(),
      name,
      coldDuration: Number.parseInt(coldDuration),
      preparationDuration: Number.parseInt(preparationDuration),
    };

    const sessions = getSessions();
    saveSessions([...sessions, session]);

    setName('');
    setColdDuration('60');
    setPreparationDuration('25');

    onSessionCreated();
  };

  return (
    <Card className='w-full max-w-md mx-auto border-zinc-800 bg-zinc-900'>
      <CardHeader>
        <CardTitle>Create Cold Exposure</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Session Name</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Morning Cold Shower'
              required
              className='border-zinc-800 bg-zinc-800'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='cold'>Cold Exposure Duration (seconds)</Label>
            <Input
              id='cold'
              type='number'
              min='5'
              value={coldDuration}
              onChange={(e) => setColdDuration(e.target.value)}
              required
              className='border-zinc-800 bg-zinc-800'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='preparation'>Preparation Duration (seconds)</Label>
            <Input
              id='preparation'
              type='number'
              min='5'
              value={preparationDuration}
              onChange={(e) => setPreparationDuration(e.target.value)}
              required
              className='border-zinc-800 bg-zinc-800'
            />
          </div>
          <Button type='submit' className='w-full'>
            Create Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
