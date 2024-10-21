import { useConnect as useStarknetConnect, useDisconnect as useStarknetDisconnect, useAccount as useStarknetAccount, Connector as StarknetConnector, braavos, argent, useSwitchChain as useStarknetSwitchChain } from '@starknet-react/core'
import { useConnect as useEVMConnect, useDisconnect as useEVMDisconnect, useAccount as useEVMAccount, Connector as EVMConnector, useSwitchChain as useEVMSwitchChain } from "wagmi"
import { useState, useCallback, useMemo, useEffect } from 'react'
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import { kakarotSepolia } from '../wagmi_config';
import { useChain } from '../ChainContext';

export type WalletType = 'starknet' | 'evm';

export type ExtendedConnector = (StarknetConnector | EVMConnector) & {
  type: WalletType;
  name: string;
  id: string;
  icon?: string;
};

export function useWallet() {
  const { connect: connectStarknet, connectors: starknetConnectors } = useStarknetConnect()
  const { disconnect: disconnectStarknet } = useStarknetDisconnect()
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount()

  const { connect: connectEVM, connectors: evmConnectors } = useEVMConnect()
  const { disconnect: disconnectEVM } = useEVMDisconnect()
  const { address: evmAddress, isConnected: isEVMConnected } = useEVMAccount()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { defaultChain, setDefaultChain } = useChain();
  const { switchChain: switchStarknetChain } = useStarknetSwitchChain({
    params: {
      chainId: `0x${defaultChain.id.toString(16)}`
    }
  });
  const { switchChain: switchEVMChain } = useEVMSwitchChain();

  const handleConnect = useCallback((connector: ExtendedConnector) => {
    if (connector.type === 'starknet') {
      const starknetConnector = connector.id === 'argentX' ? argent() : braavos();
      connectStarknet({ connector: starknetConnector });
    } else if (connector.type === 'evm') {
      connectEVM({ connector: connector as EVMConnector });
    }
    setIsModalOpen(false);
  }, [connectStarknet, connectEVM]);

  const handleDisconnect = useCallback(() => {
    if (starknetAddress) {
      disconnectStarknet();
    } else if (evmAddress) {
      disconnectEVM();
    }
  }, [starknetAddress, evmAddress, disconnectStarknet, disconnectEVM]);

  const allConnectors: ExtendedConnector[] = useMemo(() => [
    ...starknetConnectors.map(c => ({ ...c, type: 'starknet' as WalletType, name: c.name, id: c.id, icon: c.icon })),
    ...evmConnectors.map(c => ({ ...c, type: 'evm' as WalletType, name: c.name, id: c.id }))
  ] as ExtendedConnector[], [starknetConnectors, evmConnectors]);

  const connectedAddress = starknetAddress || evmAddress;
  const isConnected = isStarknetConnected || isEVMConnected;
  const walletType: WalletType | null = isStarknetConnected ? 'starknet' : isEVMConnected ? 'evm' : null;

  const handleChainSwitch = useCallback((newChain: Chain) => {
    console.log('handling connection')
    setDefaultChain(newChain);
    if (walletType === 'starknet') {
      switchStarknetChain({ chainId: `0x${newChain.id.toString(16)}` });
    } else if (walletType === 'evm') {
      if (newChain.id === sepolia.id) {
        console.log(newChain.id, sepolia.id)
        switchEVMChain({ chainId: kakarotSepolia.id });
      } else if (newChain.id === mainnet.id) {
        switchEVMChain({ chainId: 1 });
      }
    }
  }, [isConnected, walletType]);

  useEffect(() => {
    if (isConnected && defaultChain) {
      handleChainSwitch(defaultChain);
    }
  }, [isConnected, defaultChain, handleChainSwitch]);

  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);

  return {
    isConnected,
    connectedAddress,
    walletType,
    allConnectors,
    handleConnect,
    handleDisconnect,
    isModalOpen,
    setIsModalOpen,
    handleChainSwitch,
  };
}
