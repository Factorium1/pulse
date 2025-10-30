'use client'

import { useTheme } from 'next-themes'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function ThemeAnimation() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const prevThemeRef = useRef<string | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => setMounted(true), [])
  useEffect(
    () => () => {
      tlRef.current?.kill()
      tlRef.current = null
    },
    [],
  )

  useEffect(() => {
    if (!mounted || !overlayRef.current || !resolvedTheme) return

    if (prevThemeRef.current == null) {
      prevThemeRef.current = resolvedTheme
      return
    }

    const overlay = overlayRef.current
    const prev = prevThemeRef.current
    const fromColor = prev === 'dark' ? 'hsl(222 47% 11%)' : 'hsl(210 40% 98%)'

    gsap.set(overlay, {
      opacity: 1,
      backgroundColor: fromColor,
      willChange: 'opacity',
    })

    tlRef.current?.kill()
    tlRef.current = gsap.timeline().to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.out' })

    prevThemeRef.current = resolvedTheme
  }, [mounted, resolvedTheme])

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0"
      aria-hidden
    />
  )
}
