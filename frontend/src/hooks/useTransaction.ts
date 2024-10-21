import { useMemo, useState } from 'react'
import { useSendTransaction as useStarknetSendTransaction } from '@starknet-react/core'
import { useSendTransaction as useEVMSendTransaction, usePrepareTransactionRequest } from 'wagmi'
import { Call } from 'starknet'
import { encodeAbiParameters, toHex } from 'viem'
import { hash } from 'starknet'
import { kakarotSepolia } from '../wagmi_config'

export function useTransaction(walletType: 'starknet' | 'evm' | null) {
  const [calls, setCalls] = useState<Call[]>([]);
  const memoizedCalls = useMemo(() => calls, [calls]);
  const starknetTransaction = useStarknetSendTransaction({
    calls: memoizedCalls,
  });
  const { sendTransaction: evmSendTransaction, data: evmData, isPending: evmIsPending, isError: evmIsError, error: evmError } = useEVMSendTransaction();
  const prepareTransactionRequest = usePrepareTransactionRequest({
    to: '0x0000000000000000000000000000000000075003', // Use the actual EVM contract address here
    chainId: kakarotSepolia.id,
  });

  const prepareTransactionData = useMemo(() => (calls: Call[]) => {
    const encodedCalls = calls.map((call) => {
      return encodeAbiParameters(
        [
          { type: "uint256", name: "contractAddress" },
          { type: "uint256", name: "selector" },
          { type: "uint256[]", name: "calldata" },
        ],
        [
          BigInt(call.contractAddress),
          BigInt(hash.getSelectorFromName(call.entrypoint)),
          (call.calldata as string[]).map((data: string) => BigInt(data)),
        ]
      );
    });

    const concatenatedCalls = encodedCalls.join("");
    const callCount = toHex(calls.length, { size: 32 });
    return callCount + concatenatedCalls.slice(2);
  }, []);

  const sendTransaction = useMemo(() => (
    calls: Call[],
    evmContractAddress: `0x${string}`,
    evmAddress: `0x${string}` | undefined
  ) => {
    if (walletType === 'starknet') {
      starknetTransaction.send(calls)
    } else if (walletType === 'evm' && evmAddress) {
      const preparedData = prepareTransactionData(calls);
      evmSendTransaction({
        ...prepareTransactionRequest,
        to: evmContractAddress,
        data: preparedData as `0x${string}`,
        account: evmAddress,
      });
    }
  }, [walletType, starknetTransaction, evmSendTransaction, prepareTransactionData, prepareTransactionRequest]);

  const transactionStatus = {
    tx_hash: walletType === 'starknet' ? starknetTransaction.data?.transaction_hash : evmData,
    data: walletType === 'starknet' ? starknetTransaction.data : evmData,
    isPending: walletType === 'starknet' ? starknetTransaction.isPending : evmIsPending,
    isError: walletType === 'starknet' ? starknetTransaction.isError : evmIsError,
    error: walletType === 'starknet' ? starknetTransaction.error?.message : evmError?.message,
  };

  console.log(transactionStatus)

  return { sendTransaction, transactionStatus };
}
