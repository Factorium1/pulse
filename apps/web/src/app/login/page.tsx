'use client'

import { useState } from 'react'

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
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
          <div className="flex items-center rounded-full bg-muted/60 p-1 mb-6 border border-border/60">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-full ${
                isLogin
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Anmelden
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-full ${
                !isLogin
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Registrieren
            </button>
          </div>
          <div className="flex flex-col gap-4 text-start">
            {isLogin && (
              <>
                <p className="h3-bold">Melde dich bei Pulse an</p>
                <form className="flex flex-col gap-4">
                  <div className="">
                    <label htmlFor="email" className="font-semibold text-muted-foreground text-sm">
                      E-Mail
                      <input
                        id="email"
                        type="email"
                        placeholder="max@mustermann.de"
                        className="input w-full bg-muted rounded-xl p-3 shadow-sm text-xs md:text-sm"
                      />
                    </label>
                  </div>
                  <div className="">
                    <label
                      htmlFor="password"
                      className="font-semibold text-muted-foreground text-sm"
                    >
                      Passwort
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="input w-full bg-muted rounded-xl p-3 shadow-sm text-xs md:text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex-between flex-row">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border border-border bg-background text-primary focus-visible:ring-ring cursor-pointer"
                      />
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Eingeloggt bleiben
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-xs md:text-sm font-medium text-primary hover:text-primary/90 cursor-pointer"
                    >
                      Passwort vergessen?
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90`}
                  >
                    Anmelden
                  </button>
                  <div className="flex-center flex-row">
                    <span className="text-xs text-muted-foreground">
                      Noch kein Konto?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('register')}
                        className="text-primary font-medium hover:text-primary/90 cursor-pointer"
                      >
                        Registrieren
                      </button>
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
