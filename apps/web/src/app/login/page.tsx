'use client'

import AuthModeToggle, { type AuthMode } from '@/components/features/login/auth-mode-toggle'
import LoginForm from '@/components/features/login/login-form'
import RegisterForm from '@/components/features/login/register-form'
import { useState } from 'react'

const LoginPage = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const isLogin = mode === 'login'

  return (
    <div className="flex-center flex-col lg:flex-row bg-primary/20 h-screen w-screen lg:gap-10">
      <div className="flex-center flex-col gap-2">
        <p className="h1-bold">
          {isLogin ? 'Willkommen zurück 👋' : 'Erstelle dein Pulse-Konto ✨'}
        </p>
        <p className="text-center text-muted-foreground max-w-md mt-4 tracking-tight px-2 sm:px-0">
          {isLogin
            ? 'Melde dich an, um an Studien teilzunehmen, Fortschritte zu sehen und deine Daten sicher zu verwalten.'
            : 'Registriere dich in wenigen Sekunden und starte mit wissenschaftlich fundierten Studien im Alltag.'}
        </p>
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium border border-primary/20 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Sicher, modern und für Forschung optimiert
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/80 shadow-xl shadow-primary/10 p-6 md:p-8 mt-10 mx-2 sm:mx-0">
          <AuthModeToggle mode={mode} onChange={setMode} />
          <div className="flex flex-col gap-4 text-start">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setMode('register')} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setMode('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
