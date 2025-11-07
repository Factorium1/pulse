'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SidebarMenuButton } from './sidebar'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <SidebarMenuButton asChild>
      <div
        className="cursor-pointer"
        onClick={() => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        }}
      >
        {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
        <span>Toggle Theme</span>
      </div>
    </SidebarMenuButton>
  )
}
