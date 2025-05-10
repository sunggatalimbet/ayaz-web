import { useState } from 'react';
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
import { Clock, Calendar, BarChart, Award } from 'lucide-react';
import { Header } from '~/widgets/header';
import type { TimePeriod } from '~/shared/model/types';
import { formatMinutes, getStatistics } from '~/shared/model/mock-storage';

export function StatisticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');
  const stats = getStatistics(period);

  return (
    <div className='container max-w-md mx-auto p-4'>
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

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='p-4 flex flex-col items-center justify-center h-full'>
            <Calendar className='h-8 w-8 mb-2 text-white' />
            <div className='text-2xl font-bold'>{stats.count}</div>
            <div className='text-sm text-muted-foreground text-center'>
              Cold Exposures
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='p-4 flex flex-col items-center justify-center h-full'>
            <Clock className='h-8 w-8 mb-2 text-white' />
            <div className='text-2xl font-bold'>
              {formatMinutes(stats.totalColdDuration)}
            </div>
            <div className='text-sm text-muted-foreground text-center'>
              Total Cold Time
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='p-4 flex flex-col items-center justify-center h-full'>
            <BarChart className='h-8 w-8 mb-2 text-white' />
            <div className='text-2xl font-bold'>
              {stats.count > 0
                ? formatMinutes(stats.averageColdDuration)
                : '0 min'}
            </div>
            <div className='text-sm text-muted-foreground text-center'>
              Average Duration
            </div>
          </CardContent>
        </Card>

        <Card className='border-zinc-800 bg-zinc-900'>
          <CardContent className='p-4 flex flex-col items-center justify-center h-full'>
            <Award className='h-8 w-8 mb-2 text-white' />
            <div className='text-2xl font-bold'>
              {formatMinutes(stats.longestColdDuration)}
            </div>
            <div className='text-sm text-muted-foreground text-center'>
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
          <p className='text-muted-foreground'>{stats.message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
