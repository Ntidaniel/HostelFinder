import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export async function Nav() {
	const supabase = await createClient()
	const { data } = await supabase.auth.getUser()
	return (
		<nav className="p-4 border-b flex justify-between items-center">
			<Link href="/">HostelFinder</Link>
			{data.user ? (
				<div className="flex items-center gap-4">
					<Link href="/admin" className="text-sm underline">Admin</Link>
					<form action="/auth/signout" method="post">
						<Button size="sm" variant="ghost">Sign out</Button>
					</form>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link href="/login" className="text-sm underline">Login</Link>
					<Link href="/register" className="text-sm underline">Register</Link>
				</div>
			)}
		</nav>
	)
}