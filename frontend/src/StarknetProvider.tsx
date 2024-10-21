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

export function StarknetProvider({
  children,
  defaultChain,
}: {
  children: React.ReactNode;
  defaultChain: Chain;
}) {
  const chains = [sepolia, mainnet];
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

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
