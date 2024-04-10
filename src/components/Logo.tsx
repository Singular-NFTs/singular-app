import Image from 'next/image'

export default function Logo() {
    return (
        <div className="flex flex-shrink-0 items-center">
            <Image
                src="/meme-logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="block h-8 w-auto lg:hidden"
            />
            <Image
                src="/meme-logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="hidden h-8 w-auto lg:block"
            />
        </div>
    )
}