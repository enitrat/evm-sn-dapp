import React, { useEffect } from "react";
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import { MenuItem, MenuList } from "@chakra-ui/react";
import { useAccount, useNetwork, useSwitchChain } from "@starknet-react/core";
import { useChain } from "@/context/ChainContext";

export const ChainSwitcher: React.FC = () => {
  const { defaultChain, setDefaultChain } = useChain();
  const { isConnected } = useAccount();

  const { switchChain: switchStarknetChain, isSuccess: isSnSwitchSuccess } =
    useSwitchChain({
      params: {
        chainId: `0x${defaultChain.id.toString(16)}`,
      },
    });

  const { chain: currentChain } = useNetwork();

  const handleSwitchChain = (newChain: Chain) => {
    if (currentChain?.id === newChain.id) {
      return;
    }
    if (isConnected) {
      console.log("chain", newChain);
      switchStarknetChain({ chainId: newChain.id.toString(16) });
    } else {
      console.log("chain", newChain);
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
