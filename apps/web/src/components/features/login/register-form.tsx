'use client'

import AuthSubmitButton from '@/components/features/login/auth-submit-button'
import AuthSwitchHint from '@/components/features/login/auth-switch-hint'
import InputField from '@/components/features/login/input-field'
import { authClient } from '../../../../../../auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type RegisterFormProps = {
  onSwitchToLogin: () => void
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const email = form.get('email') as string
    const password = form.get('password') as string
    const confirmPassword = form.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/dashboard',
      },
      {
        onSuccess() {
          router.push('/dashboard')
        },
      },
    )

    if (error) {
      setError(error?.message ?? null)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="h3-bold">Erstelle dein Pulse-Konto</p>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <InputField
          label="Name"
          name="name"
          type="text"
          placeholder="Max Mustermann"
          required={true}
        />
        <InputField
          label="E-Mail"
          name="email"
          type="email"
          placeholder="max@mustermann.de"
          required={true}
        />
        <InputField
          label="Passwort"
          name="password"
          type="password"
          placeholder="••••••••"
          required={true}
        />
        <InputField
          label="Passwort bestätigen"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required={true}
        />
        <AuthSubmitButton label="Konto erstellen" />
      </form>
      <AuthSwitchHint
        message="Bereits ein Konto?"
        actionLabel="Anmelden"
        onAction={onSwitchToLogin}
      />
      {error && (
        <p className="text-xs font-semibold text-center bg-red-400/40 text-red-600 px-5 py-2 rounded-full mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

export default RegisterForm
