"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {PrivyProvider} from "@privy-io/react-auth";
// Make sure to import these from `@privy-io/wagmi`, not `wagmi`
import {WagmiProvider, createConfig} from "@privy-io/wagmi";

import {auroraTestnet, aurora, localhost, arbitrumSepolia} from "viem/chains";
import {http} from "wagmi";

import type {PrivyClientConfig} from "@privy-io/react-auth";
import {type Chain} from "viem";
export const prism = {
  id: 13331370345,
  name: "Prism",
  nativeCurrency: {name: "Ether", symbol: "ETH", decimals: 18},
  rpcUrls: {
    default: {http: ["http://localhost:8449"]},
  },
  blockExplorers: {
    default: {name: "Prism Explorer", url: "http://localhost"},
  },
} as const satisfies Chain;

export const privyConfig: PrivyClientConfig = {
  defaultChain: prism,
  supportedChains: [prism, arbitrumSepolia],
};

export const config = createConfig({
  chains: [prism, arbitrumSepolia],
  transports: {
    [prism.id]: http("http://localhost:8449"),
    [arbitrumSepolia.id]: http(),
  },
});
const queryClient = new QueryClient();

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider appId="cm25zyohn01jrbegr4c6ndoap" config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
