'use client';

import { getQueryClient } from '@/utils/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

function TanStackQueryProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  );
}

export default TanStackQueryProvider;
