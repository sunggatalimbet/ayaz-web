import { Link, useRouter } from '@tanstack/react-router';
import { Home, BarChart2 } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-2xl font-bold'>Sukun</h1>
      <div className='flex items-center gap-2'>
        <Link
          to='/'
          className={`p-2 rounded-md ${pathname === '/' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
        >
          <Home className='h-5 w-5' />
        </Link>
        <Link
          to='/statistics'
          className={`p-2 rounded-md ${pathname === '/statistics' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
        >
          <BarChart2 className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}
