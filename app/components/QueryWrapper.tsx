"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="bottom-center" toastOptions={{
         style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}/>
    </QueryClientProvider>
  );
};

export default QueryWrapper;
