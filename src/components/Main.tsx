interface Props {
    children: React.ReactNode
}

export default function Main({ children }: Props) {
    return (
        <main className="container mt-16 lg:max-w-6xl lg:mx-auto">
            {children}
        </main>
    )
}