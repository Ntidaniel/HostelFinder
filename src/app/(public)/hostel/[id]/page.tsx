import Image from 'next/image'
import { getHostel } from '@/lib/actions/hostels'
import { notFound } from 'next/navigation'

export default async function HostelPage({ params }: { params: { id: string } }) {
  const hostel = await getHostel(params.id).catch(() => null)
  if (!hostel) notFound()

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{hostel.name}</h1>
      <p className="text-lg text-slate-600">{hostel.location}</p>
      <p className="text-2xl font-semibold">${hostel.price_semester} per semester</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {hostel.images.map((img: string) => (
          <Image
            key={img}
            src={img}
            alt={`Image`}
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