import Image from 'next/image'

const SIZE = 80

export default function Logo() {
    return (
        <div className="flex flex-shrink-0 items-center">
            <Image
                src="/earthmind-logo.png"
                alt="Logo"
                width={SIZE}
                height={SIZE}
                className="block h-8 w-auto lg:hidden"
            />
            <Image
                src="/earthmind-logo.png"
                alt="Logo"
                width={SIZE}
                height={SIZE}
                className="hidden h-8 w-auto lg:block"
            />
        </div>
    )
}