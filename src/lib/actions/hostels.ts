'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 1. LIST with search & pagination
export async function listHostels(
  search = '',
  page = 1,
  pageSize = 12
) {
  const supabase = await createClient()          // ← await
  const from = (page - 1) * pageSize
  const to   = from + pageSize - 1

  let query = supabase
    .from('hostels')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search.trim()) {
    query = query.textSearch('name', `'${search}'`)
  }

  const { data, count, error } = await query
  if (error) throw error
  return { hostels: data ?? [], count: count ?? 0 }
}

// 2. CREATE
export async function createHostel(values: {
  name: string
  location: string
  price_semester: number
  description: string
  images: string[]
}) {
  const supabase = await createClient()          // ← await
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('hostels')
    .insert({ ...values, owner_id: user.user.id })
  if (error) throw error

  revalidatePath('/')
  redirect('/admin')
}

// 3. UPDATE
export async function updateHostel(
  id: string,
  values: Partial<{
    name: string
    location: string
    price_semester: number
    description: string
    images: string[]
  }>
) {
  const supabase = await createClient()          // ← await
  const { error } = await supabase
    .from('hostels')
    .update(values)
    .eq('id', id)
  if (error) throw error

  revalidatePath('/')
  redirect('/admin')
}

// 4. DELETE
export async function deleteHostel(id: string) {
  const supabase = await createClient()          // ← await
  const { error } = await supabase.from('hostels').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
}

// 5. READ single
export async function getHostel(id: string) {
  const supabase = await createClient()          // ← await
  const { data, error } = await supabase
    .from('hostels')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}