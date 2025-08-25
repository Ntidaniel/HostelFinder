// src/components/hostel-grid.tsx
import HostelCard from '@/components/hostel-card'

const hostels = [
  { id: 1, name: 'The Wanderer Hostel', location: 'London, UK', price: 25, rating: 4.8, status: 'Active' },
  { id: 2, name: 'Riverside Retreat', location: 'Amsterdam, NL', price: 30, rating: 4.5, status: 'Active' },
  { id: 3, name: 'Urban Explorer Pad', location: 'Berlin, DE', price: 28, rating: 4.7, status: 'Pending' },
];

export default function HostelGrid() {
  return (
    <section className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((h) => (
          <HostelCard key={h.id} {...h} status={h.status as 'Active' | 'Pending'} />  // <-- Pass props correctly
        ))}
      </div>
    </section>
  )
}