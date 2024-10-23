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
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { useColorModeValue } from "@chakra-ui/react";

const CONTRACT_ADDRESS =
  "0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d";

export function IncreaseCounter() {
  const { address, isConnected } = useAccount();
  const calls = [
    {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "increase_counter",
      //TODO: restore starknet / evm diff
      calldata: [1, 0],
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
                      href={data.transaction_hash}
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
