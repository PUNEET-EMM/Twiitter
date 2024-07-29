'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
        {children}
      </GoogleOAuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanStackProvider;

