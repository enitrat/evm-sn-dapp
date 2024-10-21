import React from 'react';
import { sepolia, mainnet } from "@starknet-react/chains";
import { MenuItem, MenuList } from '@chakra-ui/react';
import { useWallet } from './hooks/useWallet';

export const ChainSwitcher: React.FC = () => {
  const { handleChainSwitch } = useWallet();

  return (
    <MenuList>
      <MenuItem onClick={() => handleChainSwitch(sepolia)}>Switch to Sepolia</MenuItem>
      <MenuItem onClick={() => handleChainSwitch(mainnet)}>Switch to Mainnet</MenuItem>
    </MenuList>
  );
};
