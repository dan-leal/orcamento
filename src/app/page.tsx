import Image from "next/image";
import Navbar from "@/app/components/Navbar/Navbar";
import ListProducts from "./components/ListProducts/ListProducts";

import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { HydrationBoundary as Hydrate } from '@tanstack/react-query'
import Home from "./components/App/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <Home {...pageProps} />
      </Hydrate>
    </ReactQueryProvider>
  );
}
