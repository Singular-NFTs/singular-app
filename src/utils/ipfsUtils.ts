interface IpfsImageSrcRegexMatch {
    fullIpfsPath: string;
    cid: string;
    innerIpfsPath?: string;
}

// TODO: Fix this url, where is coming from?
const buildPhIpfsUrl = (matchGroups: IpfsImageSrcRegexMatch) =>
    `https://ipfs.backend.prop.house/ipfs/${matchGroups.fullIpfsPath}`;

export const buildIpfsPath = (ipfsHash: string) =>
    buildPhIpfsUrl({ cid: ipfsHash, fullIpfsPath: ipfsHash });

