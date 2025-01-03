import { useState, useEffect } from "react";
import { useContract, useReadContract } from "@starknet-react/core";
import { CairoCustomEnum } from "starknet";
import { ABI } from "../abis/abi";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
} from "@chakra-ui/react";
import {
  FiAlertCircle,
  FiHash,
  FiUsers,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import { useColorModeValue } from "@chakra-ui/react";

const CONTRACT_ADDRESS =
  "0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d";

const DataItem = ({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.800", "white");

  return (
    <Box p={4} bg={bgColor} borderRadius="lg">
      <Flex alignItems="center" gap={4}>
        <Icon as={icon} boxSize={6} color="brand.500" />
        <Box>
          <Text fontSize="sm" fontWeight="medium" color={textColor}>
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={valueColor}>
            {value}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default function CounterData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { contract } = useContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
  });
  const { data: counterData, refetch: refetchCounter } = useReadContract({
    abi: contract?.abi,
    address: contract?.address,
    functionName: "get_counter",
    args: [],
    watch: true,
  });

  const { data: lastCallerData, refetch: refetchLastCaller } = useReadContract({
    abi: contract?.abi,
    address: contract?.address,
    functionName: "get_last_caller",
    args: [],
    watch: true,
  });

  const { data: starknetCallersData, refetch: refetchStarknetCallers } =
    useReadContract({
      abi: contract?.abi,
      address: contract?.address,
      functionName: "get_n_callers_by_type",
      args: [new CairoCustomEnum({ Starknet: {} })],
      watch: true,
    });

  const { data: kakarotCallersData, refetch: refetchKakarotCallers } =
    useReadContract({
      abi: contract?.abi,
      address: contract?.address,
      functionName: "get_n_callers_by_type",
      args: [new CairoCustomEnum({ Kakarot: {} })],
      watch: true,
    });

  const refetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([
        refetchCounter(),
        refetchLastCaller(),
        refetchStarknetCallers(),
        refetchKakarotCallers(),
      ]);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchAll();
  }, []);

  return (
    <Card maxW="2xl" mx="auto">
      <CardHeader>
        <Heading size="md">Counter Smart Contract Data</Heading>
        <Text>Live data from the counter contract</Text>
      </CardHeader>
      <CardBody>
        <Flex direction="column" gap={6}>
          {error && (
            <Alert status="error">
              <AlertIcon as={FiAlertCircle} />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            {isLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} height="96px" />
                ))}
              </>
            ) : (
              <>
                <DataItem
                  icon={FiHash}
                  title="Current Count"
                  value={
                    counterData !== undefined ? counterData.toString() : "N/A"
                  }
                />
                <DataItem
                  icon={FiUser}
                  title="Last Caller"
                  value={
                    lastCallerData !== undefined
                      ? `0x${lastCallerData.toString(16).slice(0, 6)}...`
                      : "N/A"
                  }
                />
                <DataItem
                  icon={FiUsers}
                  title="Starknet Callers"
                  value={
                    starknetCallersData !== undefined
                      ? starknetCallersData.toString()
                      : "N/A"
                  }
                />
                <DataItem
                  icon={FiUsers}
                  title="Kakarot Callers"
                  value={
                    kakarotCallersData !== undefined
                      ? kakarotCallersData.toString()
                      : "N/A"
                  }
                />
              </>
            )}
          </Grid>
          <Flex justify="center" mt={6}>
            <Button
              onClick={refetchAll}
              isDisabled={isLoading}
              leftIcon={
                <Icon
                  as={FiRefreshCw}
                  className={isLoading ? "animate-spin" : ""}
                />
              }
            >
              Refresh Data
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
