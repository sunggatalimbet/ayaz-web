import { createFileRoute } from '@tanstack/react-router';
import { StatisticsPage } from '~/pages/statistics';
import { useInjectDarkTheme } from '~/shared/lib/hooks';

export const Route = createFileRoute('/statistics')({
  component: RouteComponent,
});

function RouteComponent() {
  useInjectDarkTheme();
  return <StatisticsPage />;
}
