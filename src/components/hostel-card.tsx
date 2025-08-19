// src/components/hostel-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface Hostel {
  id: string
  name: string
  location: string
  price_semester: number
  images: string[]
}

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  return (
    <Card className="overflow-hidden">
      {hostel.images[0] ? (
        <Image
          src={hostel.images[0]}
          alt={hostel.name}
          width={400}
          height={250}
          className="object-cover w-full h-48"
          unoptimized
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold">{hostel.name}</h2>
        <p className="text-sm text-slate-600">{hostel.location}</p>
        <p className="font-bold">${hostel.price_semester} / semester</p>
        <Link href={`/hostel/${hostel.id}`} className="text-sm underline">
          View details →
        </Link>
      </CardContent>
    </Card>
  )
}