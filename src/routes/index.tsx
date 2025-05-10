import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <div className='bg-black text-white min-h-screen'>Hello world</div>;
}
