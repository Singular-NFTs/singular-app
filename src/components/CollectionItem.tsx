import Image from 'next/image';

import { NFTInfo } from '@app/types';

interface NFTInfoProps {
    info: NFTInfo;
}

export default function CollectionItem({ info }: NFTInfoProps) {
    return (
        <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="p-8 text-center">
                <h3 className="text-lg font-bold text-gray-900">{info.name} - {info.ticker}</h3>
            </div>

            <Image
                className="mx-auto flex-shrink-0 rounded-full"
                src={info.imageUrl}
                alt={`${info.name} logo`}
                width={128}
                height={128}
                priority={true}
            />

            <div className="flex-1 p-8">
                <dl>
                    <dt className="sr-only">Created By</dt>
                    <dd className="text-sm text-gray-500">Created by: {info.createdBy}</dd>
                    <dt className="sr-only">Market Cap</dt>
                    <dd className="mt-2 text-sm text-gray-500">Market Cap: ${info.marketCap ? info.marketCap.toLocaleString() : 'N/A'}</dd>
                </dl>
            </div>
        </li>
    );
}