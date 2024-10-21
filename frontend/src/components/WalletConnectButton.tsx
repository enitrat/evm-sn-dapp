import { useWallet, ExtendedConnector } from '../hooks/useWallet'
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { Wallet, X, ChevronRight, LogOut } from "lucide-react"

function ConnectorModal({ connectors, onConnect, onClose }: { connectors: ExtendedConnector[], onConnect: (connector: ExtendedConnector) => void, onClose: () => void }) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Connect Wallet</DialogTitle>
        <DialogDescription>
          Choose a wallet to connect to this application.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 gap-4">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => onConnect(connector)}
              variant="outline"
              className="flex flex-col items-center justify-center p-4 h-32 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="mb-2">
                {connector.icon ? (
                  <img src={connector.icon} alt={connector.name} className="h-12 w-12" />
                ) : (
                  <Wallet className="h-12 w-12" />
                )}
              </div>
              <span className="text-sm font-medium text-center">
                {connector.type === 'starknet' ? connector.id : connector.name}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button variant="outline" onClick={onClose} className="w-full mt-4">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

function WalletInfo({ address, onDisconnect, walletType }: { address: string, onDisconnect: () => void, walletType: 'starknet' | 'evm' }) {
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-accent hover:bg-accent/80 transition-colors">
          <Wallet className="mr-2 h-4 w-4" />
          <span className="font-medium">{shortenAddress(address)}</span>
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {walletType.toUpperCase()}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Wallet Information</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your connected wallet details
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Connected Address:</h4>
            <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
              <p className="text-sm font-mono break-all">{address}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Wallet Type:</h4>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {walletType.toUpperCase()}
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="destructive"
            onClick={onDisconnect}
            className="w-full sm:w-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function WalletConnectButton(): JSX.Element {
  const {
    isConnected,
    connectedAddress,
    walletType,
    allConnectors,
    handleConnect,
    handleDisconnect,
    isModalOpen,
    setIsModalOpen
  } = useWallet();

  const renderWalletButton = () => {
    if (isConnected && connectedAddress && walletType) {
      return <WalletInfo address={connectedAddress} onDisconnect={handleDisconnect} walletType={walletType} />;
    }
    return (
      <Button onClick={() => setIsModalOpen(true)} variant="outline">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  };

  return (
    <>
      {renderWalletButton()}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ConnectorModal
          connectors={allConnectors}
          onConnect={handleConnect}
          onClose={() => setIsModalOpen(false)}
        />
      </Dialog>
    </>
  );
}
