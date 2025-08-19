// src/app/login/page.tsx
import Link from 'next/link'
import { login } from './actions'

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error
  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Log in</h1>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{decodeURIComponent(error)}</p>
      )}
      <form action={login} className="space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full" />
        <input name="password" type="password" required placeholder="Password" className="w-full" />
        <button className="w-full">Log in</button>
      </form>
      <p className="text-sm text-slate-600">
        Don&apos;t have an account? <Link className="underline" href="/register">Register</Link>
      </p>
    </div>
  )
}