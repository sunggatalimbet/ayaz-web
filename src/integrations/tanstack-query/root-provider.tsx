import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with custom configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable refetching on window focus
      refetchOnWindowFocus: false,
      // Disable refetching when tab becomes visible again
      refetchOnReconnect: false,
    },
  },
});

export function getContext() {
  return {
    queryClient,
  };
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
