// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'HostelFinder',
  description: 'Find and list student hostels',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}