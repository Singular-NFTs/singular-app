import Image from 'next/image'

export default function DocsPage() {
    return (
        <div className={`py-10 flex items-center justify-center`}>
            <Image
                src="/under-construction.png"
                alt="Under Construction"
                width={450}
                height={450}
                objectFit="contain"
            />
        </div>
    )
}
