import type React from 'react';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { postColdExposure } from '~/entities/cold-exposures/api/post-cold-exposure.api';
import type { PostColdExposureRequest } from '~/entities/cold-exposures/model/contracts';
import { Button } from '~/shared/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/shadcn-ui/card';
import { Input } from '~/shared/shadcn-ui/input';
import { Label } from '~/shared/shadcn-ui/label';

export function CreateSessionForm() {
  const [name, setName] = useState('');
  const [coldDuration, setColdDuration] = useState('60');
  const [preparationDuration, setPreparationDuration] = useState('25');

  const { mutate: createColdExposure } = useMutation({
    mutationFn: (newColdExposure: PostColdExposureRequest) => {
      return postColdExposure(newColdExposure);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    const requestBody: PostColdExposureRequest = {
      userId: 'fcf6968e-8e77-4afb-821f-839e057a458d',
      name: 'Cold exposure',
      exposureDuration: 60,
      preparationDuration: 10,
    };

    e.preventDefault();
    createColdExposure(requestBody);

    setName('');
    setColdDuration('60');
    setPreparationDuration('25');
  };

  return (
    <Card className='mx-auto w-full max-w-md border-zinc-800 bg-zinc-900'>
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
