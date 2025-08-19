// src/app/admin/[id]/edit/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getHostel, updateHostel } from '@/lib/actions/hostels'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/image-upload'

interface Hostel {
  id: string
  name: string
  location: string
  price_semester: number
  description: string
  images: string[]
}

export default function EditHostelPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [hostel, setHostel] = useState<Hostel | null>(null)
  const [pending, setPending] = useState(false)

  // Load existing hostel
  useEffect(() => {
    getHostel(id).then(setHostel).catch(() => router.replace('/admin'))
  }, [id, router])

  if (!hostel) return <p className="p-8">Loading…</p>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name') as string,
      location: fd.get('location') as string,
      price_semester: Number(fd.get('price')),
      description: fd.get('description') as string,
      images: hostel!.images,
    }
    await updateHostel(id, payload)
    router.push('/admin')
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit hostel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          defaultValue={hostel.name}
          placeholder="Name"
          required
        />
        <Input
          name="location"
          defaultValue={hostel.location}
          placeholder="Location"
          required
        />
        <Input
          name="price"
          type="number"
          defaultValue={hostel.price_semester}
          placeholder="Price per semester"
          required
        />
        <Textarea
          name="description"
          defaultValue={hostel.description}
          placeholder="Description"
          rows={6}
          required
        />

        <ImageUpload
          onUploaded={(urls) =>
            setHostel((h) => (h ? { ...h, images: urls } : null))
          }
          existing={hostel.images}
        />

        <Button disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </main>
  )
}
