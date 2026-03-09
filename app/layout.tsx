import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://v0-modern-art-gallery-tau.vercel.app'),
  title: 'Arca | Galeria Upcycling de Arte Sustentavel',
  description: 'Obras sustentaveis que se transformam com o ponto de vista. Galeria de arte contemporanea com pecas unicas para aluguel e venda.',
  generator: 'v0.app',
  keywords: ['galeria de arte', 'arte sustentavel', 'upcycling', 'obras de arte', 'aluguel de obras'],
  openGraph: {
    title: 'Arca | Galeria Upcycling de Arte Sustentavel',
    description: 'Obras sustentaveis que se transformam com o ponto de vista. Galeria de arte contemporanea com pecas unicas para aluguel e venda.',
    url: '/',
    siteName: 'Arca | Galeria Upcycling',
    type: 'website',
    images: [
      {
        url: '/images/arca-logo.jpg',
        width: 800,
        height: 418,
        alt: 'Logo da Arca - Galeria Upcycling de Arte Sustentavel',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
