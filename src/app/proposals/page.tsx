import ProposalButton from '@app/components/ProposalButton';
import ProposalsList from '@app/components/ProposalsList'
import { PROPOSALS_TITLE } from '@app/constants'

const SPACE_Y = 6;

export default function ProposalsPage() {
    return (
        <div className={`py-10 space-y-${SPACE_Y}`}>
            <div className='md:flex md:items-center md:justify-between'>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                    {PROPOSALS_TITLE}
                </h1>
                <ProposalButton />
            </div>
            <div className={`space-y-${SPACE_Y}`}>
                <ProposalsList />
            </div>
        </div>
    )
}