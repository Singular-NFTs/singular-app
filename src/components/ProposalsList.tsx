'use client'

import { useEffect, useState } from 'react';

import { useReadContract } from 'wagmi'

import { DeploymentValue, ProposalInfo } from '@app/types';

import { ABI } from '@app/web3/abis/TokenFactory'
import ADDRESS from '@app/web3/deployments/84532/TokenFactory.json'

import ProposalCard from './ProposalCard';

export default function ProposalsList() {
    const [proposals, setProposals] = useState<ProposalInfo[]>([]);

    const { data, isLoading, isPending } = useReadContract({
        abi: ABI,
        address: ADDRESS.address as DeploymentValue,
        functionName: 'getTokensCreated',
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            const newProposals = (data as []).map((token: any) => ({
                id: token.tokenAddress,
                name: token.name,
                ticker: token.ticker,
                imageUrl: token.image,
                createdBy: token.creator,
                marketCap: "$3k",
                description: token.description,
            }));
            setProposals(newProposals);
        }
    }, [data, isLoading, isPending]);

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading && <li>Loading...</li>}

            {!isLoading && proposals && proposals.map((proposal, index) => (
                <ProposalCard
                    key={index}
                    info={proposal}
                />
            ))}
        </ul>
    )
}