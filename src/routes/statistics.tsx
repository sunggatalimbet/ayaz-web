import { createFileRoute } from '@tanstack/react-router';
import { useInjectDarkTheme } from '~/shared/lib/hooks';

export const Route = createFileRoute('/statistics')({
  component: RouteComponent,
});

function RouteComponent() {
  useInjectDarkTheme();
  return <div>Hello "/statistics"!</div>;
}
