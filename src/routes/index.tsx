import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '~/pages/home';
import { useInjectDarkTheme } from '~/shared/lib/hooks';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  useInjectDarkTheme();
  return <HomePage />;
}
