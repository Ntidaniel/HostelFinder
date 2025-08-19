import { Suspense } from 'react'
import HostelCard from '@/components/hostel-card'
import SearchBar from '@/components/search-bar'
import PaginationControls from '@/components/pagination-controls'
import { listHostels } from '@/lib/actions/hostels'

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const query = searchParams.q ?? ''
  const page = Number(searchParams.page ?? 1)
  const { hostels, count } = await listHostels(query, page)

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find a hostel</h1>
      <SearchBar defaultValue={query} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {hostels.map((h) => (
          <HostelCard key={h.id} hostel={h} />
        ))}
      </div>
      <PaginationControls count={count} current={page} />
    </main>
  )
}