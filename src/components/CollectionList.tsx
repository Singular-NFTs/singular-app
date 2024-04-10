'use client'

import { useEffect, useState } from 'react';

import { useReadContract } from 'wagmi'

import { DeploymentValue, NFTInfo } from '@app/types';

import { ABI } from '@app/web3/abis/TokenFactory'
import ADDRESS from '@app/web3/deployments/84532/TokenFactory.json'

import CollectionItem from './CollectionItem';

export default function CollectionList() {
    const [nfts, setNFTs] = useState<NFTInfo[]>([]);

    const { data, isLoading, isPending } = useReadContract({
        abi: ABI,
        address: ADDRESS.address as DeploymentValue,
        functionName: 'getTokensCreated',
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            const newNFTs = (data as []).map((token: any) => ({
                id: token.tokenAddress,
                name: token.name,
                ticker: token.ticker,
                imageUrl: token.image,
                createdBy: token.creator,
                marketCap: "$3k",
                description: token.description,
            }));
            setNFTs(newNFTs);
        }
    }, [data, isLoading, isPending]);

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading && <li>Loading...</li>}

            {!isLoading && nfts && nfts.map((nft, index) => (
                <CollectionItem
                    key={index}
                    info={nft}
                />
            ))}
        </ul>
    )
}