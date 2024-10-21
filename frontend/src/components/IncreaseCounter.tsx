'use client'

import { useWallet } from '../hooks/useWallet'
import { useTransaction } from '../hooks/useTransaction'
import { useMultiChainExplorer } from '../hooks/useMultiChainExplorer'
import { WalletConnectButton } from './WalletConnectButton'
import { useCallback, useMemo } from 'react'
import { Call } from 'starknet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react"

const CONTRACT_ADDRESS = '0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d'
const EVM_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000075003'

export function IncreaseCounter() {
  const { isConnected, connectedAddress, walletType } = useWallet();
  const { sendTransaction, transactionStatus } = useTransaction(walletType);
  const { getTransactionUrl } = useMultiChainExplorer(walletType);

  const calls: Call[] = useMemo(() => [{
    contractAddress: CONTRACT_ADDRESS,
    entrypoint: 'increase_counter',
    calldata: [1, walletType === 'evm' ? 1 : 0],
  }], [walletType]);

  const handleIncreaseCounter = useCallback(() => {
    if (connectedAddress) {
      sendTransaction(
        calls,
        EVM_CONTRACT_ADDRESS as `0x${string}`,
        connectedAddress as `0x${string}`
      );
    }
  }, [sendTransaction, calls, connectedAddress]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Increase Counter</CardTitle>
        <CardDescription>Increment the counter on the smart contract</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <Button
              onClick={handleIncreaseCounter}
              disabled={transactionStatus.isPending}
              className="w-full"
            >
              {transactionStatus.isPending ? (
                <>
                  <PlusCircle className="mr-2 h-4 w-4 animate-spin" />
                  Increasing Counter...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Increase Counter
                </>
              )}
            </Button>
            {transactionStatus && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Transaction Status:</h3>
                {transactionStatus.isPending && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Processing</AlertTitle>
                    <AlertDescription>
                      Your transaction is being processed...
                    </AlertDescription>
                  </Alert>
                )}
                {transactionStatus.isError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {transactionStatus.error || "An error occurred while processing your transaction."}
                    </AlertDescription>
                  </Alert>
                )}
                {!transactionStatus.isPending && !transactionStatus.isError && transactionStatus.tx_hash && (
                  <Alert variant="default">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      <a href={getTransactionUrl(transactionStatus.tx_hash.toString())} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">View Transaction</a>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">Connect your wallet to increase the counter</p>
            <WalletConnectButton />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
