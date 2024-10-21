import React from 'react';
import { StarknetProvider } from './StarknetProvider';
import { Navbar } from './components/Navbar';
import "./index.css"
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi_config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CounterData from './components/CounterData'
import { IncreaseCounter } from './components/IncreaseCounter'
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StarknetProvider>
          <div className="App">
            <Navbar />
            <main className="container mx-auto mt-8">
              <Home />
            </main>
          </div>
        </StarknetProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ChakraProvider>
  );
}

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Shared Counter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CounterData />
          <IncreaseCounter />
        </div>
      </div>
    </main>
  )
}

export default App;