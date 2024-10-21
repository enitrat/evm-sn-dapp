import { WalletConnectButton } from './WalletConnectButton'
// import { ModeToggle } from './ModeToggle'
import { Button } from "./ui/button"
import { Calculator, Home, Link } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
              <Button variant="ghost" className="text-lg font-semibold">
                <Calculator className="mr-2 h-5 w-5" />
                Kakounter
              </Button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                <Button variant="ghost">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
