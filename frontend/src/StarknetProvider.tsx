import {
  StarknetConfig,
  useInjectedConnectors,
  argent,
  braavos,
  publicProvider,
  voyager,
} from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";
import { Chain } from "@starknet-react/chains";
import { kakarotConnectors } from "@starknet-react/kakarot";

export function StarknetProvider({
  children,
  defaultChain,
}: {
  children: React.ReactNode;
  defaultChain: Chain;
}) {
  const chains = [sepolia, mainnet];
  const provider = publicProvider();
  console.log("provider", provider);
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos(), ...kakarotConnectors(provider)],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "always",
    // Randomize the order of the connectors.
    order: "alphabetical",
  });
  console.log("connectors", connectors);

  return (
    <StarknetConfig
      chains={chains}
      connectors={connectors}
      provider={publicProvider()}
      explorer={voyager}
      defaultChainId={defaultChain.id}
    >
      {children}
    </StarknetConfig>
  );
}
