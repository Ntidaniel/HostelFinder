// src/components/pagination-controls.tsx
'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationControls({
  count,
  current,
}: {
  count: number
  current: number
}) {
  const pageSize = 12
  const totalPages = Math.ceil(count / pageSize)
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const go = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    router.replace(`/?${params.toString()}`)
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <Button
        size="icon"
        variant="outline"
        onClick={() => go(current - 1)}
        disabled={current <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="self-center text-sm">
        {current} / {totalPages}
      </span>
      <Button
        size="icon"
        variant="outline"
        onClick={() => go(current + 1)}
        disabled={current >= totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}