// src/app/admin/page.tsx
import { createClient } from '@/lib/supabase/server'
import { listHostels } from '@/lib/actions/hostels'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'   // ← import redirect

export default async function AdminPage() {  // ← make async
  const supabase = await createClient()      // ← await
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) redirect('/login')         // ← redirect used correctly

  const { hostels } = await listHostels()
  const myHostels = hostels.filter((h) => h.owner_id === user.user!.id)

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My hostels</h1>
        <Button asChild>
          <Link href="/admin/new">Add new hostel</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {myHostels.map((h) => (
          <div key={h.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{h.name}</h2>
            <Link href={`/admin/${h.id}/edit`} className="text-sm underline">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}