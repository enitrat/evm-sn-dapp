import React, { createContext, useState, useContext } from "react";
import { Chain, sepolia, mainnet } from "@starknet-react/chains";

type AvailableChains = typeof sepolia | typeof mainnet;

interface ChainContextType {
  defaultChain: Chain;
  setDefaultChain: React.Dispatch<React.SetStateAction<Chain>>;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [defaultChain, setDefaultChain] = useState<Chain>(sepolia);

  return (
    <ChainContext.Provider value={{ defaultChain, setDefaultChain }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};
