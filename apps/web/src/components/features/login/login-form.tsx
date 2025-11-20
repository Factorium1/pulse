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
    </div>
  )
}

export default LoginForm
