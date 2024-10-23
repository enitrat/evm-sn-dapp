import React, { useEffect } from "react";
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import { MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { useAccount, useNetwork, useSwitchChain } from "@starknet-react/core";
import { useChain } from "@/context/ChainContext";

export const ChainSwitcher: React.FC = () => {
  const { defaultChain, setDefaultChain } = useChain();
  const { isConnected } = useAccount();

  const {
    switchChain: switchStarknetChain,
    error: switchStarknetChainError,
    isSuccess: isSwitchSuccess,
  } = useSwitchChain({});

  const { chain: currentChain } = useNetwork();

  const toast = useToast();

  useEffect(() => {
    if (switchStarknetChainError) {
      toast({
        title: "Network Switch Error",
        description:
          switchStarknetChainError.message || "Failed to switch network",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [switchStarknetChainError, toast, isSwitchSuccess]);

  const handleSwitchChain = (newChain: Chain) => {
    if (currentChain?.id === newChain.id) {
      return;
    }
    if (isConnected) {
      try {
        switchStarknetChain({ chainId: `0x${newChain.id.toString(16)}` });
      } catch (error: any) {
        toast({
          title: "Network Switch Error",
          description: error.message || "Failed to switch network",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      setDefaultChain(newChain);
    }
  };

  return (
    <MenuList>
      <MenuItem onClick={() => handleSwitchChain(sepolia)}>
        Switch to Sepolia
      </MenuItem>
      <MenuItem onClick={() => handleSwitchChain(mainnet)}>
        Switch to Mainnet
      </MenuItem>
    </MenuList>
  );
};
