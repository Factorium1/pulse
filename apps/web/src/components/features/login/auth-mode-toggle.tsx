'use client'

export type AuthMode = 'login' | 'register'

type AuthModeToggleProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

const AuthModeToggle = ({ mode, onChange }: AuthModeToggleProps) => {
  const isLogin = mode === 'login'

  return (
    <div className="flex items-center rounded-full bg-muted/60 p-1 mb-6 border border-border/60">
      <button
        type="button"
        onClick={() => onChange('login')}
        className={`flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-full ${
          isLogin
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground cursor-pointer'
        }`}
      >
        Anmelden
      </button>
      <button
        type="button"
        onClick={() => onChange('register')}
        className={`flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-full ${
          !isLogin
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground cursor-pointer'
        }`}
      >
        Registrieren
      </button>
    </div>
  )
}

export default AuthModeToggle
