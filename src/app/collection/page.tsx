import CollectionList from '@app/components/CollectionList'

import { COLLECTION_TITLE } from '@app/constants'

const SPACE_Y = 6;

export default function CollectionPage() {
    return (
        <div className={`py-10 space-y-${SPACE_Y}`}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {COLLECTION_TITLE}
            </h1>
            <div className={`space-y-${SPACE_Y}`}>
                <CollectionList />
            </div>
        </div>
    )
}