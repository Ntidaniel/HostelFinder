import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export async function Nav() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return (
    <nav className="p-4 border-b flex justify-between">
      <Link href="/">HostelFinder</Link>
      {data.user ? (
        <form action="/auth/signout" method="post">
          <Button size="sm" variant="ghost">Sign out</Button>
        </form>
      ) : (
        <Link href="/login" className="text-sm underline">Login</Link>
      )}
    </nav>
  )
}