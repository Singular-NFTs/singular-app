import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';

export default function NavBar() {
    return (
        <div className="min-h-full">
            <nav className="border-b border-gray-200 bg-white flex justify-between items-center px-4 py-4 sm:px-6 lg:max-w-6xl lg:mx-auto">

                {/* Logo and NavigationMenu together on the left */}
                <div className="flex items-center">
                    <Logo />
                    <NavigationMenu className="ml-6 hidden sm:flex sm:space-x-8" />
                </div>

                {/* ConnectButton on the right */}
                <ConnectButton />

                {/* Mobile menu (if you have a toggle button for it, place it here) */}
                <div className="sm:hidden" id="mobile-menu">
                    {/* Mobile NavigationMenu (if you're implementing a collapsible menu, you might toggle its visibility here) */}
                    <NavigationMenu
                        className="space-y-1 pb-3 pt-2"
                        linkClassName="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    />
                </div>
            </nav>
        </div>
    );
}
