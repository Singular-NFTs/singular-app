'use client';

import React from 'react';
import { WagmiProvider, http } from 'wagmi';
import {
    mainnet,
    sepolia,
    base,
    baseSepolia,
    mode,
    modeTestnet,
    localhost
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

import {
    argentWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { RainbowKitProvider, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { APP_NAME } from '@app/constants';

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";

const { wallets } = getDefaultWallets();

const localChainId = process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID, 10) : 1337;  // Un valor predeterminado.
const localhostConfigured = { ...localhost, id: localChainId };

const activeNetworks = process.env.NEXT_PUBLIC_ACTIVE_NETWORKS ? process.env.NEXT_PUBLIC_ACTIVE_NETWORKS.split('|') : ['mainnet'];  // default to mainnet if not specified

interface NetworkConfigurations {
    [key: string]: any;  // Due to lack of proper type from Wagmi
}

const networkConfigurations: NetworkConfigurations = {
    mainnet: mainnet,
    base: base,
    mode: mode,
    sepolia: sepolia,
    baseSepolia: baseSepolia,
    modeTestnet: modeTestnet,
    localhost: localhostConfigured
};

const configuredChains = activeNetworks.map(network => {
    if (network in networkConfigurations) {
        return networkConfigurations[network];
    }
    throw new Error(`Network ${network} is not supported`);
}).filter(Boolean);

const config = getDefaultConfig({
    appName: APP_NAME,
    projectId: PROJECT_ID,
    chains: configuredChains as any, // Due to lack of proper type from Wagmi
    ssr: true,
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [argentWallet, ledgerWallet],
        },
    ],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""}`),
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""}`),
        [base.id]: http(`https://eth-base.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""}`),
        [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""}`),
    },
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
    children: React.ReactNode
}

export default function Web3Provider({ children }: Web3ProviderProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}