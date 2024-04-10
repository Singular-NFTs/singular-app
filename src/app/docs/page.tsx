import { UNDER_CONSTRUCTION } from '@app/constants'

const SPACE_Y = 6;

export default function DocsPage() {
    return (
        <div className={`py-10 space-y-${SPACE_Y}`}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {UNDER_CONSTRUCTION}
            </h1>
        </div>
    )
}