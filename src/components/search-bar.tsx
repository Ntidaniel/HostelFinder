// src/components/search-bar.tsx
import { Input } from '@/components/ui/input'

export default function SearchBar({ placeholder = 'Search hostels by location...' }: { placeholder?: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-md border border-slate-300 bg-white"
    />
  )
}