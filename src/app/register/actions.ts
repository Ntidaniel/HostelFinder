// src/app/register/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: authData } = await supabase.auth.signUp(data)
  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  // Check if email confirmation is required
  if (authData.user && !authData.user.email_confirmed_at) {
    redirect('/register?success=Please check your email to confirm your account before logging in.')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}