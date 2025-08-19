// src/app/register/page.tsx
import Link from 'next/link'
import { register } from './actions'

export default function RegisterPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error
  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Create an account</h1>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{decodeURIComponent(error)}</p>
      )}
      <form action={register} className="space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full" />
        <input name="password" type="password" required placeholder="Password" className="w-full" />
        <button className="w-full">Sign up</button>
      </form>
      <p className="text-sm text-slate-600">
        Already have an account? <Link className="underline" href="/login">Login</Link>
      </p>
    </div>
  )
}