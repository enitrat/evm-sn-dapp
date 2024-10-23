import React from "react";
import { StarknetProvider } from "./StarknetProvider";
import { Navbar } from "./components/Navbar";
import CounterData from "./components/CounterData";
import { IncreaseCounter } from "./components/IncreaseCounter";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainProvider } from "./context/ChainContext";
import { useChain } from "./context/ChainContext";
import { BrowserRouter } from "react-router-dom";
import { VStack, Heading, Flex, Box } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ChakraProvider theme={theme}>
        <ChainProvider>
          <StarknetProviderWrapper>
            <div className="App">
              <Navbar />
              <main className="container mx-auto mt-8">
                <Home />
              </main>
            </div>
          </StarknetProviderWrapper>
        </ChainProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

function StarknetProviderWrapper({ children }: { children: React.ReactNode }) {
  const { defaultChain } = useChain();
  return (
    <StarknetProvider defaultChain={defaultChain}>{children}</StarknetProvider>
  );
}

function Home() {
  return (
    <VStack as="main" minH="100vh" justify="center" p={8}>
      <Box maxW="4xl" w="full">
        <Heading as="h1" size="2xl" mb={8} textAlign="center">
          Shared Counter
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <Box flex={1}>
            <CounterData />
          </Box>
          <Box flex={1}>
            <IncreaseCounter />
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}

export default App;
