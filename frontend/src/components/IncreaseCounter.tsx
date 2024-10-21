import { useWallet } from "../hooks/useWallet";
import { useTransaction } from "../hooks/useTransaction";
import { useMultiChainExplorer } from "../hooks/useMultiChainExplorer";
import { WalletConnectButton } from "./WalletConnectButton";
import { useCallback, useMemo } from "react";
import { Call } from "starknet";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";

const CONTRACT_ADDRESS =
  "0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d";
const EVM_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000075003";

export function IncreaseCounter() {
  const { isConnected, connectedAddress, walletType } = useWallet();
  const { sendTransaction, transactionStatus } = useTransaction(walletType);
  const { getTransactionUrl } = useMultiChainExplorer(walletType);

  const calls: Call[] = useMemo(
    () => [
      {
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: "increase_counter",
        calldata: [1, walletType === "evm" ? 1 : 0],
      },
    ],
    [walletType],
  );

  const handleIncreaseCounter = useCallback(() => {
    if (connectedAddress) {
      sendTransaction(
        calls,
        EVM_CONTRACT_ADDRESS as `0x${string}`,
        connectedAddress as `0x${string}`,
      );
    }
  }, [sendTransaction, calls, connectedAddress]);

  return (
    <Card maxW="md" mx="auto">
      <CardHeader>
        <Heading size="md">Increase Counter</Heading>
        <Text>Increment the counter on the smart contract</Text>
      </CardHeader>
      <CardBody>
        {isConnected ? (
          <VStack spacing={4}>
            <Button
              onClick={handleIncreaseCounter}
              isDisabled={transactionStatus.isPending}
              width="full"
              leftIcon={<PlusCircle />}
            >
              {transactionStatus.isPending
                ? "Increasing Counter..."
                : "Increase Counter"}
            </Button>
            {transactionStatus && (
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Transaction Status:
                </Text>
                {transactionStatus.isPending && (
                  <Alert status="info">
                    <AlertIcon as={AlertCircle} />
                    <AlertTitle>Processing</AlertTitle>
                    <AlertDescription>
                      Your transaction is being processed...
                    </AlertDescription>
                  </Alert>
                )}
                {transactionStatus.isError && (
                  <Alert status="error">
                    <AlertIcon as={AlertCircle} />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {transactionStatus.error ||
                        "An error occurred while processing your transaction."}
                    </AlertDescription>
                  </Alert>
                )}
                {!transactionStatus.isPending &&
                  !transactionStatus.isError &&
                  transactionStatus.tx_hash && (
                    <Alert status="success">
                      <AlertIcon as={CheckCircle2} />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        <Link
                          href={getTransactionUrl(
                            transactionStatus.tx_hash.toString(),
                          )}
                          isExternal
                          color="blue.500"
                          _hover={{ color: "blue.700" }}
                        >
                          View Transaction
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
              </Box>
            )}
          </VStack>
        ) : (
          <Box textAlign="center">
            <Text mb={4}>Connect your wallet to increase the counter</Text>
            <WalletConnectButton />
          </Box>
        )}
      </CardBody>
    </Card>
  );
}
