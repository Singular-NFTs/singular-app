import Link from "next/link";

export default function About() {
    return (
        <div className="mx-auto max-w-2xl space-y-6 py-6">
            <div className="text-2xl font-semibold">Earthmind has one goal...</div>
            <div className="text-lg font-bold">to build and power truly autonomous, intelligent systems.</div>
            <div>Earthmind is a protocol for decentralized governance, and is designed to make all decisions for its consumer protocols.</div>
            <div>Earthmind is the first friendly “fork” of Bittensor. It will be bootstrapped as a subnet of Bittensor, and validators and miners of the subnet will be tasked with operating the new Earthmind network. This allows Earthmind to inherit Bittensor security during its bootstrapping phase, while also rewarding Bittensor network participants.</div>
            <div>Bittensor has created an extremely impressive network, community, technology stack, and budding economic powerhouse. As much of Earthmind is inspired by Bittensor, we believe the best way to launch Earthmind is to contribute back to Bittensor.</div>
            <div>Several of Earthmind’s first products will aim to increase the utility of Bittensor:</div>
            <ul className="list-disc pl-6 space-y-1">
                <li>Trustless Bittensor Bridge</li>
                <li>TAO and subnet token lending market, powered by Earthmind’s first subnet</li>
                <li>TAO and subnet tokens DEX</li>
            </ul>
            <div>We will share more about each of these very soon.</div>

            <div className="pt-4 flex flex-row space-x-4">
                <Link href="/collection" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                    Explore Collection
                </Link>

                <Link href="/proposals/create" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                    Make a Proposal
                </Link>
            </div>
        </div>
    )
}