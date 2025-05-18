import { Loader2 } from 'lucide-react';

import { Button } from '../shadcn-ui/button';

interface SubmitButtonProps {
  isPending: boolean;
  title: string;
  className?: string;
}

export const SubmitButton = ({
  isPending,
  title,
  className,
}: SubmitButtonProps) => {
  return (
    <Button className={className} type='submit'>
      {isPending ? <Loader2 className='size-4 animate-spin' /> : title}
    </Button>
  );
};
