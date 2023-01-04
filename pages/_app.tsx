import "primereact/resources/themes/vela-purple/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "../styles/globals.css";

// import { QueryClientProvider } from "react-query/types/react";
// import { QueryClient } from "react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { QueryClientConfig } from "@tanstack/query-core";
// import { config } from "lib/react-query-config";

export default function App({ Component, pageProps }: AppProps) {
  // const queryClient = new QueryClient();
  // const [queryClient] = useState(() => new QueryClient(config));
  const config: QueryClientConfig = {};
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
