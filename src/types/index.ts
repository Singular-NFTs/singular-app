export type DeploymentValue = `0x${string}`;

export interface Deployments {
    [contractName: string]: {
        [networkId: string]: DeploymentValue;
    };
}

export interface TokenItem {
    id: string;
    name: string;
    ticker: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    marketCap: string;
} 