// src/components/hostel-card.tsx
import Link from 'next/link'

interface Props {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  status: 'Active' | 'Pending'; // Update the status type to the union type
}

export default function HostelCard({ id, name, location, price, rating, status }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
      <p className="text-sm text-slate-600">{location}</p>
      <p className="text-sm mt-1">
        Status: <span className="font-medium">{status}</span>
      </p>
      <p className="text-primary font-bold mt-2">★ {rating} · ${price}/night</p>
      <Link
        href={`/admin/${id}/edit`}
        className="mt-3 inline-block bg-secondary text-white px-3 py-1 rounded text-sm"
      >
        Edit
      </Link>
    </div>
  )
}