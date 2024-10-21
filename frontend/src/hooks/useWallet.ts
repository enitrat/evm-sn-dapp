import { useConnect as useStarknetConnect, useDisconnect as useStarknetDisconnect, useAccount as useStarknetAccount, Connector as StarknetConnector, braavos, argent } from '@starknet-react/core'
import { useConnect as useEVMConnect, useDisconnect as useEVMDisconnect, useAccount as useEVMAccount, Connector as EVMConnector } from "wagmi"
import { useState, useCallback, useMemo, useEffect } from 'react'

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
  };
}
