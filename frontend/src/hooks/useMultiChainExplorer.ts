import { useExplorer as useStarknetExplorer } from '@starknet-react/core';
import { useChains, useChainId } from 'wagmi';
import { kakarotSepolia } from '../wagmi_config';

export function useMultiChainExplorer(walletType: 'starknet' | 'evm' | null) {
  const starknetExplorer = useStarknetExplorer();
  const currentChain = useChainId();
  const chains = useChains();

  const evmExplorer = chains.find((chain) => chain.id === currentChain)?.blockExplorers.default;


  const getTransactionUrl = (txHash: string) => {
    if (walletType === 'starknet') {
      return starknetExplorer.transaction(txHash);
    } else if (walletType === 'evm') {
      return evmExplorer?.url + '/tx/' + txHash;
    }
  };

  return {
    getTransactionUrl,
  };
}
