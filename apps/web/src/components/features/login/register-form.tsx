'use client'

import AuthSubmitButton from '@/components/features/login/auth-submit-button'
import AuthSwitchHint from '@/components/features/login/auth-switch-hint'
import InputField from '@/components/features/login/input-field'

type RegisterFormProps = {
  onSwitchToLogin: () => void
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="h3-bold">Erstelle dein Pulse-Konto</p>
      <form className="flex flex-col gap-4">
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
    </div>
  )
}

export default RegisterForm
