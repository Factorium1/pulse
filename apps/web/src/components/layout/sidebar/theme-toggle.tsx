'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <SidebarMenuButton asChild>
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer inline-flex items-center gap-2"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 hidden dark:inline" aria-hidden />
        <Moon className="h-4 w-4 inline dark:hidden" aria-hidden />
        <span>Toggle Theme</span>
      </button>
    </SidebarMenuButton>
  )
}
