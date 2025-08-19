// src/components/search-bar.tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) params.set('q', term)
    else params.delete('q')
    params.set('page', '1')
    router.replace(`/?${params.toString()}`)
  }, 300)

  return (
    <Input
      defaultValue={defaultValue}
      placeholder="Search name or location..."
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  )
}