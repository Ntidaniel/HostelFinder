'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, UploadCloud } from 'lucide-react'

interface Props {
  onUploaded: (urls: string[]) => void
  existing?: string[]
}

export default function ImageUpload({ onUploaded, existing = [] }: Props) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const handleFiles = async (files: FileList) => {
    setUploading(true)
    try {
      const newUrls: string[] = []
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const { error } = await supabase.storage
          .from('hostel_images')
          .upload(fileName, file)
        if (error) throw error
        const {
          data: { publicUrl },
        } = supabase.storage.from('hostel_images').getPublicUrl(fileName)
        newUrls.push(publicUrl)
      }
      onUploaded([...existing, ...newUrls])
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
        id="image-input"
      />
      <Button
        type="button"
        variant="outline"
        disabled={uploading}
        onClick={() => document.getElementById('image-input')?.click()}
      >
        {uploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        Upload images
      </Button>
    </div>
  )
}