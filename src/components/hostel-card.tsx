// src/components/hostel-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default function HostelCard({ hostel }: { hostel: any }) {
  return (
    <Card className="overflow-hidden">
      {hostel.images?.[0] && (
        <Image
          src={hostel.images[0]}
          alt={hostel.name}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
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