import React from 'react';
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }) {
  return <Provider client={queryClient}>{children}</Provider>;
}
