import { useWallet, ExtendedConnector } from "../hooks/useWallet";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  Box,
  Text,
  Image,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { Wallet, X, ChevronRight, LogOut } from "lucide-react";

function ConnectorModal({
  connectors,
  onConnect,
  onClose,
}: {
  connectors: ExtendedConnector[];
  onConnect: (connector: ExtendedConnector) => void;
  onClose: () => void;
}) {
  const starknetConnectors = connectors.filter((c) => c.type === "starknet");
  const evmConnectors = connectors.filter((c) => c.type === "evm");

  const ConnectorGroup = ({ title, connectors, colorScheme }) => (
    <Box
      borderWidth={1}
      borderRadius="md"
      p={4}
      mb={4}
      borderColor={`${colorScheme}.200`}
      bg={`${colorScheme}.50`}
    >
      <Text fontWeight="bold" mb={2} color={`${colorScheme}.700`}>
        {title}
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            onClick={() => onConnect(connector)}
            variant="outline"
            height="32"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
            _hover={{ bg: `${colorScheme}.100` }}
            transition="background-color 0.2s"
            borderColor={`${colorScheme}.300`}
          >
            <Box mb={2}>
              {connector.icon ? (
                <Image src={connector.icon} alt={connector.name} boxSize="10" />
              ) : (
                <Wallet size={40} />
              )}
            </Box>
            <Text fontSize="sm" fontWeight="medium" textAlign="center">
              {connector.type === "starknet" ? connector.id : connector.name}
            </Text>
          </Button>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ModalContent maxW="425px">
      <ModalHeader>Connect Wallet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box maxH="400px" overflowY="auto" pr={4}>
          <ConnectorGroup
            title="Starknet Wallets"
            connectors={starknetConnectors}
            colorScheme="blue"
          />
          <ConnectorGroup
            title="EVM Wallets"
            connectors={evmConnectors}
            colorScheme="green"
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} width="full">
          <X size={14} style={{ marginRight: "8px" }} />
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

function WalletInfo({
  address,
  resolvedStarknetAddress,
  onDisconnect,
  walletType,
}: {
  address: string;
  resolvedStarknetAddress: string;
  onDisconnect: () => void;
  walletType: "starknet" | "evm";
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        bg="gray.100"
        _hover={{ bg: "gray.200" }}
      >
        <Wallet size={16} style={{ marginRight: "8px" }} />
        <Text fontWeight="medium">{shortenAddress(address)}</Text>
        <Badge ml={2} colorScheme="blue">
          {walletType.toUpperCase()}
        </Badge>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="425px">
          <ModalHeader fontSize="2xl" fontWeight="bold">
            Wallet Information
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="gray.600" mb={4}>
              Your connected wallet details
            </Text>
            <Box mb={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Connected Address:
              </Text>
              <Flex alignItems="center" bg="gray.100" p={3} borderRadius="lg">
                <Wallet size={20} color="blue.500" />
                <Text
                  ml={2}
                  fontSize="sm"
                  fontFamily="mono"
                  wordBreak="break-all"
                >
                  {address}
                </Text>
              </Flex>
            </Box>

            {address !== resolvedStarknetAddress && (
              <Box mb={4}>
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                  Associated Starknet Address:
                </Text>
                <Flex alignItems="center" bg="gray.100" p={3} borderRadius="lg">
                  <Wallet size={20} color="blue.500" />
                  <Text
                    ml={2}
                    fontSize="sm"
                    fontFamily="mono"
                    wordBreak="break-all"
                  >
                    {resolvedStarknetAddress}
                  </Text>
                </Flex>
              </Box>
            )}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Wallet Type:
              </Text>
              <Badge colorScheme="blue" fontSize="sm" fontWeight="medium">
                {walletType.toUpperCase()}
              </Badge>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDisconnect}>
              <LogOut size={16} style={{ marginRight: "8px" }} />
              Disconnect
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function WalletConnectButton(): JSX.Element {
  const {
    isConnected,
    connectedAddress,
    resolvedStarknetAddress,
    walletType,
    allConnectors,
    handleConnect,
    handleDisconnect,
    isModalOpen,
    setIsModalOpen,
  } = useWallet();

  const renderWalletButton = () => {
    if (isConnected && connectedAddress && walletType) {
      return (
        <WalletInfo
          address={connectedAddress}
          resolvedStarknetAddress={resolvedStarknetAddress}
          onDisconnect={handleDisconnect}
          walletType={walletType}
        />
      );
    }
    return (
      <Button onClick={() => setIsModalOpen(true)} variant="outline">
        <Wallet size={16} style={{ marginRight: "8px" }} />
        Connect Wallet
      </Button>
    );
  };

  return (
    <>
      {renderWalletButton()}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ConnectorModal
          connectors={allConnectors}
          onConnect={handleConnect}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
