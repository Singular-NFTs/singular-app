'use client'

import { useEffect, useState } from 'react';

import { useReadContract } from 'wagmi'

import { DeploymentValue, TokenItem } from '@app/types';

import { ABI } from '@app/web3/abis/TokenFactory'
import ADDRESS from '@app/web3/deployments/84532/TokenFactory.json'

import TokenItemCard from './TokenItemCard';

export default function TokenList() {
    const [tokenItems, setTokenItems] = useState<TokenItem[]>([]);

    const { data, isLoading, isPending } = useReadContract({
        abi: ABI,
        address: ADDRESS.address as DeploymentValue,
        functionName: 'getTokensCreated',
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            const newTokenItems = (data as []).map((token: any) => ({
                id: token.tokenAddress,
                name: token.name,
                ticker: token.ticker,
                imageUrl: token.image,
                createdBy: token.creator,
                marketCap: "$3k",
                description: token.description,
            }));
            setTokenItems(newTokenItems);

            console.log(newTokenItems);
        }
    }, [data, isLoading, isPending]);

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading && <li>Loading...</li>}

            {!isLoading && tokenItems && tokenItems.map((token, index) => (
                <TokenItemCard
                    key={index}
                    info={token}
                />
            ))}
        </ul>
    )
}