import { Toaster } from "@/components/ui/toaster";
import { UserContextProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "@/services/users.services";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />

          <Component {...pageProps} />

          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
