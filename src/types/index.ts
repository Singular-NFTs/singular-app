export type DeploymentValue = `0x${string}`;

export interface Deployments {
    [contractName: string]: {
        [networkId: string]: DeploymentValue;
    };
}

export interface NFTInfo {
    id: string;
    name: string;
    ticker: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    marketCap: string;
}

export interface ProposalInfo {
    id: string;
    name: string;
    ticker: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    marketCap: string;
}