// src/app/login/page.tsx
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <form action={login} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full" />
        <input name="password" type="password" required placeholder="Password" className="w-full" />
        <button className="w-full">Log in</button>
      </form>
    </div>
  )
}