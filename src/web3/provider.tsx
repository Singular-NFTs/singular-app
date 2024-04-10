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

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";
const APP_NAME = "MemeCoiner";

const { wallets } = getDefaultWallets();

const localChainId = process.env.NEXT_PUBLIC_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) : 1337;
const localhostConfigured = { ...localhost, ...{ id: localChainId } };

const config = getDefaultConfig({
    appName: APP_NAME,
    projectId: PROJECT_ID,
    chains: [mainnet, base, mode, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia, baseSepolia, modeTestnet, localhostConfigured] : [])],
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
        [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/JmXSjhNebn2v_jTEgLoqKyf4q_H8EwIn`),
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