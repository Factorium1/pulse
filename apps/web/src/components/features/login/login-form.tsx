'use client'

import AuthSubmitButton from '@/components/features/login/auth-submit-button'
import AuthSwitchHint from '@/components/features/login/auth-switch-hint'
import InputField from '@/components/features/login/input-field'
import { authClient } from '../../../../../../auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type LoginFormProps = {
  onSwitchToRegister: () => void
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  //TODO: Missing loading state and better error handling

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string
    const rememberMe = form.get('rememberMe') === 'on'

    const { error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
        rememberMe,
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
      <p className="h3-bold">Melde dich bei Pulse an</p>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
        <div className="flex-between flex-row">
          <label className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <input type="checkbox" name="rememberMe" className="h-3 w-3 md:h-4 md:w-4" />
            Eingeloggt bleiben
          </label>
          <button
            type="button"
            className="text-xs md:text-sm font-medium text-primary hover:text-primary/90 cursor-pointer"
          >
            Passwort vergessen?
          </button>
        </div>
        <AuthSubmitButton label="Anmelden" />
      </form>
      <AuthSwitchHint
        message="Noch kein Konto?"
        actionLabel="Registrieren"
        onAction={onSwitchToRegister}
      />
      {error && (
        <p className="text-xs font-semibold text-center bg-red-400/40 text-red-600 px-5 py-2 rounded-full mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

export default LoginForm
