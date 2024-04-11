import Image from 'next/image'

export default function DocsPage() {
    return (
        <div className={`py-10 flex items-center justify-center`}>
            <Image
                src="/under-construction.png" // Ensure the image path is correct
                alt="Under Construction"
                width={450} // Set your desired width
                height={450} // Set your desired height
                objectFit="contain" // Adjusts the size of the image within its container
            />
        </div>
    )
}
