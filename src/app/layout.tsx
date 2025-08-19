// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav' // <-- import

export const metadata: Metadata = {
  title: 'HostelFinder',
  description: 'Find and list student hostels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />   {/* <-- placed here */}
        {children}
      </body>
    </html>
  )
}