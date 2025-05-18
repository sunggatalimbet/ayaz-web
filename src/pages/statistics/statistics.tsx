import { useState } from 'react';

import { Award, BarChart, Calendar, Clock } from 'lucide-react';

import type { TimePeriod } from '~/shared/model/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/shadcn-ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/shadcn-ui/select';
import { Header } from '~/widgets/header';

export function StatisticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');

  return (
    <div className='container mx-auto max-w-md p-4'>
      <Header />

      <div className='mb-6'>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as TimePeriod)}
        >
          <SelectTrigger className='border-zinc-800'>
            <SelectValue placeholder='Select time period' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='24h'>Last 24 hours</SelectItem>
            <SelectItem value='week'>Last week</SelectItem>
            <SelectItem value='month'>Last month</SelectItem>
            <SelectItem value='year'>Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='mb-6 grid grid-cols-2 gap-4'>
        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='flex h-full flex-col items-center justify-center p-4'>
            <Calendar className='mb-2 h-8 w-8 text-white' />
            <div className='text-2xl font-bold'>201</div>
            <div className='text-muted-foreground text-center text-sm'>
              Cold Exposures
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='flex h-full flex-col items-center justify-center p-4'>
            <Clock className='mb-2 h-8 w-8 text-white' />
            <div className='text-2xl font-bold'>60</div>
            <div className='text-muted-foreground text-center text-sm'>
              Total Cold Time
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='flex h-full flex-col items-center justify-center p-4'>
            <BarChart className='mb-2 h-8 w-8 text-white' />
            <div className='text-2xl font-bold'>4 mins</div>
            <div className='text-muted-foreground text-center text-sm'>
              Average Duration
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='flex h-full flex-col items-center justify-center p-4'>
            <Award className='mb-2 h-8 w-8 text-white' />
            <div className='text-2xl font-bold'>6 mins</div>
            <div className='text-muted-foreground text-center text-sm'>
              Longest Exposure
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='border-zinc-800 bg-zinc-900'>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>Cool!</p>
        </CardContent>
      </Card>
    </div>
  );
}
