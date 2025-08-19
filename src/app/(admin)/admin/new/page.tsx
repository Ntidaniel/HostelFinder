'use client'
import { useState } from 'react'
import { createHostel } from '@/lib/actions/hostels'
import { Button } from '@/components/ui/button'

import ImageUpload from '@/components/image-upload'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewHostelPage() {
  
  const [images, setImages] = useState<string[]>([])
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name') as string,
      location: fd.get('location') as string,
      price_semester: Number(fd.get('price')),
      description: fd.get('description') as string,
      images,
    }
    await createHostel(payload)
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add new hostel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Name" required />
        <Input name="location" placeholder="Location" required />
        <Input
          name="price"
          type="number"
          placeholder="Price per semester"
          required
        />
        <Textarea name="description" placeholder="Description" required />
        <ImageUpload onUploaded={setImages} existing={images} />
        <Button disabled={pending}>Create</Button>
      </form>
    </main>
  )
}