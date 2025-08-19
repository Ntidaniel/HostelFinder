// src/app/register/page.tsx
import { register } from './actions'

export default function RegisterPage() {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>
      <form action={register} className="space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full"
        />
        <button className="w-full">Sign up</button>
      </form>
    </div>
  )
}