import {
  useConnect,
  useDisconnect,
  useAccount,
  Connector,
  InjectedConnector,
} from "@starknet-react/core";
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Wallet, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

function ConnectorModal({
  connectors,
  onConnect,
  onClose,
}: {
  connectors: Connector[];
  onConnect: (connector: Connector) => void;
  onClose: () => void;
}) {
  const modalBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.200", "blue.600");
  const groupBg = useColorModeValue("blue.50", "blue.900");
  const titleColor = useColorModeValue("blue.700", "blue.200");
  const buttonBg = useColorModeValue("white", "gray.700");
  const buttonHoverBg = useColorModeValue("blue.100", "blue.700");
  const buttonBorderColor = useColorModeValue("blue.300", "blue.500");
  const textColor = useColorModeValue("gray.800", "gray.200");

  //TODO: make KakarotConnector a public class.
  const starknetConnectors = connectors.filter(
    (connector) => connector instanceof InjectedConnector,
  );
  const kakarotConnectors = connectors.filter(
    (connector) =>
      !starknetConnectors.filter((c) => c.id === connector.id).length,
  );

  const ConnectorGroup = ({
    title,
    connectors,
  }: {
    title: string;
    connectors: Connector[];
  }) => (
    <Box
      borderWidth={1}
      borderRadius="md"
      p={4}
      mb={4}
      borderColor={borderColor}
      bg={groupBg}
    >
      <Text fontWeight="bold" mb={2} color={titleColor}>
        {title}
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {connectors.map((connector: Connector) => (
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
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            transition="background-color 0.2s"
            borderColor={buttonBorderColor}
          >
            <Box mb={2}>
              {connector.icon ? (
                <Image src={connector.icon} alt={connector.name} boxSize="10" />
              ) : (
                <Wallet size={40} />
              )}
            </Box>
            <Text
              fontSize="sm"
              fontWeight="medium"
              textAlign="center"
              color={textColor}
            >
              {connector.id}
            </Text>
          </Button>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ModalContent maxW="425px" bg={modalBg}>
      <ModalHeader color={textColor}>Connect Wallet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box maxH="400px" overflowY="auto" pr={4}>
          <ConnectorGroup
            title="Starknet Wallets"
            connectors={starknetConnectors}
          />
          <ConnectorGroup
            title="Kakarot Wallets"
            connectors={kakarotConnectors}
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
  onDisconnect,
}: {
  address: string;
  onDisconnect: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connector } = useAccount();
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const walletType =
    connector instanceof InjectedConnector ? "STARKNET" : "EVM";

  // Color mode values
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const addressBg = useColorModeValue("gray.100", "gray.700");
  const addressColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        bg={buttonBg}
        _hover={{ bg: buttonHoverBg }}
      >
        <Wallet size={16} style={{ marginRight: "8px" }} />
        <Text fontWeight="medium">{shortenAddress(address)}</Text>
        <Badge ml={2} colorScheme="blue">
          {walletType}
        </Badge>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="425px" bg={modalBg}>
          <ModalHeader fontSize="2xl" fontWeight="bold">
            Wallet Information
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor} mb={4}>
              Your connected wallet details
            </Text>
            <Box mb={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2} color={textColor}>
                Connected Address:
              </Text>
              <Flex alignItems="center" bg={addressBg} p={3} borderRadius="lg">
                <Wallet size={20} color="blue.500" />
                <Text
                  ml={2}
                  fontSize="sm"
                  fontFamily="mono"
                  wordBreak="break-all"
                  color={addressColor}
                >
                  {address}
                </Text>
              </Flex>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color={textColor}>
                Wallet Type:
              </Text>
              <Badge colorScheme="blue" fontSize="sm" fontWeight="medium">
                {walletType}
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
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  // Handle errors if trying to connect to a non-kakarot supported chain
  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [error, toast]);

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    setIsModalOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");

  const renderWalletButton = () => {
    if (isConnected && address) {
      return <WalletInfo address={address} onDisconnect={handleDisconnect} />;
    }
    return (
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        bg={buttonBg}
        _hover={{ bg: buttonHoverBg }}
      >
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
          connectors={connectors}
          onConnect={handleConnect}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
