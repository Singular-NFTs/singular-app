'use client'

import { useState } from 'react';

import ProposalDialog from './ProposalDialog';

export default function ProposalButton() {
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <div>
            <button
                onClick={() => setOpenDialog(true)}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-4 py-3 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Create Proposal
            </button>
            <ProposalDialog isOpen={openDialog} setOpen={setOpenDialog} />
        </div>
    )
}