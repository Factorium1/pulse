'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SidebarMenuButton } from './sidebar'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <SidebarMenuButton asChild>
      <div
        className="cursor-pointer"
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
        <span>Toggle Theme</span>
      </div>
    </SidebarMenuButton>
  )
}
