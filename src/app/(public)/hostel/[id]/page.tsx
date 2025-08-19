// src/app/(public)/hostel/[id]/page.tsx
import Image from 'next/image'
import { getHostel } from '@/lib/actions/hostels'
import { notFound } from 'next/navigation'

interface Hostel {
  id: string
  name: string
  location: string
  price_semester: number
  description: string
  images: string[]
}

export default async function HostelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params                 // ← await the params
  const hostel: Hostel | null = await getHostel(id).catch(() => null)
  if (!hostel) notFound()

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{hostel.name}</h1>
      <p className="text-lg text-slate-600">{hostel.location}</p>
      <p className="text-2xl font-semibold">${hostel.price_semester} per semester</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {hostel.images.map((img) => (
          <Image
            key={img}
            src={img}
            alt="Hostel image"
            width={400}
            height={300}
            className="rounded"
          />
        ))}
      </div>

      <article className="prose">{hostel.description}</article>
    </main>
  )
}