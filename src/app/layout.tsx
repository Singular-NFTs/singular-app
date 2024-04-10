import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@rainbow-me/rainbowkit/styles.css';
import './globals.css'

import Web3Provider from '@app/web3/provider';
import Main from '@app/components/Main';
import NavBar from '@app/components/NavBar';
import { APP_NAME, APP_DESCRIPTION } from '@app/constants';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Web3Provider>
          <NavBar />
          <Main>
            {children}
          </Main>
        </Web3Provider>
      </body>
    </html>
  )
}