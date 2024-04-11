import { Fragment, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/16/solid';

import { changeFileExtension, isValidFileType } from '@app/utils';

interface ProposalDialogProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}

export default function ProposalDialog({ isOpen, setOpen }: ProposalDialogProps) {
    const [imageError, setImageError] = useState<string | null>(null); // TODO: Como manejar errores de imagen
    const [file, setFile] = useState<File | undefined>(undefined); // Realmente no se usa, asi que podria ser eliminado
    const [cid, setCid] = useState(""); // esto tampoco lo uso, puede ser eliminado
    const [uploading, setUploading] = useState(false); // TODO: Set image loading

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

        setFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };

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
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <button
                                                    type="button"
                                                    disabled={uploading}
                                                    onClick={() => inputFile.current && inputFile.current.click()}
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 hover:text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                                >
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
                                    </div>

                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => setOpen(false)}
                                    >
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