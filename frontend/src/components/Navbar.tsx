import { WalletConnectButton } from './WalletConnectButton'
// import { ModeToggle } from './ModeToggle'
import { Box, Flex, Button, HStack, Container, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Calculator, Home, Link, ChevronDown } from "lucide-react"
import { useChain } from '../context/ChainContext'
import { sepolia, mainnet } from "@starknet-react/chains"
import { ChainSwitcher } from './ChainSwitcher'

export function Navbar() {
  const { defaultChain, setDefaultChain } = useChain();

  return (
    <Box as="nav" borderBottomWidth="1px">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Button variant="ghost" fontSize="lg" fontWeight="semibold" leftIcon={<Calculator />}>
              Kakounter
            </Button>
          </Flex>
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button variant="ghost" leftIcon={<Home />}>
              Home
            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDown />}>
                {defaultChain.name}
              </MenuButton>
              <ChainSwitcher />
            </Menu>
          </HStack>
          <HStack spacing={4}>
            {/* <ModeToggle /> */}
            <WalletConnectButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
