'use client'

import AuthSubmitButton from '@/components/features/login/auth-submit-button'
import AuthSwitchHint from '@/components/features/login/auth-switch-hint'
import InputField from '@/components/features/login/input-field'

type LoginFormProps = {
  onSwitchToRegister: () => void
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="h3-bold">Melde dich bei Pulse an</p>
      <form className="flex flex-col gap-4">
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
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-border bg-background text-primary focus-visible:ring-ring cursor-pointer"
            />
            <span className="text-xs md:text-sm text-muted-foreground">Eingeloggt bleiben</span>
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
    </div>
  )
}

export default LoginForm
