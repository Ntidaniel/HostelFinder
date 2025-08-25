// src/app/page.tsx
import HeroSection from '@/components/hero-section'
import DashboardStats from '@/components/dashboard-stats'
import HostelGrid from '@/components/hostel-grid'
import GuestReviews from '@/components/guest-reviews'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <HeroSection />
      <DashboardStats />
      <HostelGrid />
      <GuestReviews />
    </main>
  )
}