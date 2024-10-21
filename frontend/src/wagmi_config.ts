import { defineChain } from 'viem'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'


export const kakarotSepolia = /*#__PURE__*/ defineChain({
  id: 920637907288165,
  name: 'Kakarot Sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rpc.kakarot.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kakarot Scan',
      url: 'https://sepolia.kakarotscan.org',
    },
  },
  testnet: true,
})



export const config = createConfig({
  chains: [mainnet, kakarotSepolia],
  transports: {
    [mainnet.id]: http(),
    [kakarotSepolia.id]: http(),
  },
  ssr: true,
})
