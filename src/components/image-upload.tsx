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
      console.log('Starting image upload...')
      const newUrls: string[] = []
      
      for (const file of Array.from(files)) {
        console.log('Processing file:', file.name, 'Size:', file.size)
        const fileExt = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        console.log('Generated filename:', fileName)
        
        // Check if bucket exists first
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
        console.log('Available buckets:', buckets)
        if (bucketError) {
          console.error('Bucket list error:', bucketError)
        }
        
        // Check if hostel_images bucket exists
        const hostelImagesBucket = buckets?.find(b => b.name === 'hostel_images')
        if (!hostelImagesBucket) {
          throw new Error('hostel_images bucket not found. Please create it in Supabase Storage.')
        }
        
        // Upload file
        console.log('Attempting upload to hostel_images bucket...')
        const { error: uploadError } = await supabase.storage
          .from('hostel_images')
          .upload(fileName, file)
        
        if (uploadError) {
          console.error('Upload error details:', uploadError)
          
          // Provide specific error messages
          if (uploadError.message.includes('not found')) {
            throw new Error('Storage bucket not found. Please create hostel_images bucket in Supabase.')
          } else if (uploadError.message.includes('permission')) {
            throw new Error('Permission denied. Please check storage policies in Supabase.')
          } else if (uploadError.message.includes('size')) {
            throw new Error('File too large. Please use a smaller image.')
          } else {
            throw new Error(`Upload failed: ${uploadError.message}`)
          }
        }
        
        console.log('Upload successful, getting public URL...')
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('hostel_images')
          .getPublicUrl(fileName)
        
        console.log('Generated public URL:', publicUrl)
        newUrls.push(publicUrl)
      }
      
      console.log('All uploads completed, calling onUploaded with:', newUrls)
      onUploaded([...existing, ...newUrls])
    } catch (error) {
      console.error('Image upload error:', error)
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
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