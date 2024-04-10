'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface NavItem {
    name: string;
    href: string;
}

const navigation: NavItem[] = [
    { name: "About", href: '/about' },
    { name: 'Collection', href: '/collection' },
    { name: 'Proposals', href: '/proposals' },
    { name: 'Docs', href: '/docs' }
];

interface NavLinkProps extends NavItem {
    className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ name, href, className = '' }) => {
    const pathname = usePathname();
    const current = pathname === href;

    return (
        <Link href={href} className={`${className} ${current ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2`} passHref>
            {name}
        </Link>
    );
};

interface NavigationMenuProps {
    className?: string;
    linkClassName?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className = '', linkClassName = '' }) => (
    <div className={className}>
        {navigation.map((item) => (
            <NavLink key={item.name} {...item} className={linkClassName} />
        ))}
    </div>
);

export default NavigationMenu;