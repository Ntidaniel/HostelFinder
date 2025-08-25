import SearchBar from '@/components/search-bar'
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-8 md:p-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold">HostelFinder</h1>
      <p className="text-lg mt-2">The Cozy Corner Hostel</p>
      <div className="mt-6 max-w-md mx-auto">
        <SearchBar placeholder="Search hostels by location..." />
      </div>
    </section>
  )
}