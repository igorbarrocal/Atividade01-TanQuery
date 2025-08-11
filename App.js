import React from 'react';
import QueryClientProvider from './src/QueryClientProvider';
import MainApp from './src/App';

export default function App() {
  return (
    <QueryClientProvider>
      <MainApp />
    </QueryClientProvider>
  );
}

