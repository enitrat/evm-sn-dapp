import { WalletConnectButton } from "./WalletConnectButton";
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
import {
  InjectedConnector,
  useAccount,
  useSendTransaction,
} from "@starknet-react/core";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useExplorer } from "@starknet-react/core";

const CONTRACT_ADDRESS =
  "0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d";

export function IncreaseCounter() {
  const { address, isConnected, connector } = useAccount();
  const explorer = useExplorer();
  const kakarotScanTxUrl = "https://sepolia.kakarotscan.org/tx/";

  // Simple heuristic to determine if the wallets is a starknet wallet or an evm wallet
  let walletType;
  if (connector instanceof InjectedConnector) {
    walletType = 0;
  } else {
    walletType = 1;
  }
  const calls = [
    {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "increase_counter",
      //TODO: restore starknet / evm diff
      calldata: [1, walletType],
    },
  ];
  const {
    send: sendTransaction,
    data,
    isPending,
    isError,
    error,
  } = useSendTransaction({ calls });
  // const { getTransactionUrl } = useMultiChainExplorer(walletType);
  const handleIncreaseCounter = () => {
    if (address) {
      sendTransaction();
    }
  };

  const [txUrl, setTxUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!data) return;
    if (walletType === 0) {
      setTxUrl(explorer.transaction(data!.transaction_hash));
    } else {
      setTxUrl(kakarotScanTxUrl + data!.transaction_hash);
    }
  }, [data]);

  const cardBgColor = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      maxW="2xl"
      mx="auto"
      bg={cardBgColor}
      borderColor={cardBorderColor}
      borderWidth={1}
    >
      <CardHeader>
        <Heading size="md">Increase Counter</Heading>
        <Text>Increment the counter on the smart contract</Text>
      </CardHeader>
      <CardBody>
        {isConnected ? (
          <VStack spacing={4}>
            <Button
              onClick={handleIncreaseCounter}
              isDisabled={isPending}
              width="full"
              leftIcon={<PlusCircle />}
            >
              {isPending ? "Increasing Counter..." : "Increase Counter"}
            </Button>
            <Box>
              <Text fontWeight="medium" mb={2}>
                Transaction Status:
              </Text>
              {isPending && (
                <Alert status="info">
                  <AlertIcon as={AlertCircle} />
                  <AlertTitle>Processing</AlertTitle>
                  <AlertDescription>
                    Your transaction is being processed...
                  </AlertDescription>
                </Alert>
              )}
              {isError && (
                <Alert status="error">
                  <AlertIcon as={AlertCircle} />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error?.message ||
                      "An error occurred while processing your transaction."}
                  </AlertDescription>
                </Alert>
              )}
              {!isPending && !isError && data && (
                <Alert status="success">
                  <AlertIcon as={CheckCircle2} />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    <Link
                      href={txUrl}
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
