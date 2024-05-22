import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/16/solid';

import { changeFileExtension, isValidFileType } from '@app/utils';

interface ProposalDialogProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || '';

export default function ProposalDialog({ isOpen, setOpen }: ProposalDialogProps) {
    const [imageError, setImageError] = useState<string | null>(null);
    const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);

    const inputFile = useRef<HTMLInputElement>(null);

    const uploadFile = async (fileToUpload: File) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload, fileToUpload.name);
            const res = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const ipfsHash = await res.text();
            setCid(ipfsHash);
            setUploading(false);
            setImageError(null);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
            setImageError('error uploading file');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageError(null);
        setUploading(true);

        if (e.target.files === null) return;

        if (e.target.files[0] == undefined)
            return

        const file = e.target.files[0];

        if (!isValidFileType(file)) {
            let fileExtension = changeFileExtension(file.type.split('/')[1]);
            setImageError(`${fileExtension} files are not supported`);
            setUploading(false);
            return;
        }

        uploadFile(e.target.files[0]);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!isOpen) {
            timeoutId = setTimeout(() => {
                setCid("");
                setImageError(null);
                setUploading(false);
            }, 300);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isOpen]);

    const handleCreate = () => {
        console.log('Create proposal');
    }

    const containerClasses = "mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2 h-64 w-full";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Create a Proposal
                                    </Dialog.Title>
                                    <div className={containerClasses}>
                                        {uploading && <Spinner />}
                                        {!uploading && cid && (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${GATEWAY_URL}/ipfs/${cid}`}
                                                    alt="Uploaded Image"
                                                    className="object-contain h-48 w-full"
                                                />
                                                <button
                                                    onClick={() => setCid('')}
                                                    className="mt-2 text-sm text-red-500 hover:text-red-600">
                                                    Replace Image
                                                </button>
                                            </div>

                                        )}
                                        {!uploading && !cid && (
                                            <UploadImageControl uploading={uploading} inputFile={inputFile} handleFileChange={handleFileChange} />
                                        )}
                                        {imageError && (
                                            <div className="absolute bottom-0 text-red-500 text-xs font-semibold">{imageError}</div>
                                        )}
                                    </div>

                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        disabled={uploading || !cid}
                                        className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-indigo-400 hover:bg-indigo-500 bg-indigo-600 text-white"
                                        onClick={handleCreate}>
                                        Create
                                    </button>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const Spinner = () => (
    <div className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="px-2 visually-hidden"> Uploading...</span>
    </div>
);

interface UploadImageControlProps {
    uploading: boolean;
    inputFile: React.RefObject<HTMLInputElement>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageControl = ({ uploading, inputFile, handleFileChange }: UploadImageControlProps) => {
    return (
        <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <button
                    type="button"
                    disabled={uploading}
                    onClick={() => inputFile.current && inputFile.current.click()}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus:outline-none hover:text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
                    {uploading ? 'Uploading...' : 'Upload a file'}
                </button>
                <input
                    type="file"
                    id="file-upload"
                    ref={inputFile}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
    )
}

{/* <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
</button> */}