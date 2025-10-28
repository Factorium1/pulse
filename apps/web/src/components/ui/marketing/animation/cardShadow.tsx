'use client'
import gsap from 'gsap'
import { useRef, useLayoutEffect, useState } from 'react'

const CardShadow = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.set(el, { boxShadow: '0 4px 30px rgba(0,0,0,0.10)' })

    tweenRef.current = gsap.to(el, {
      boxShadow: '0 8px 60px rgba(0,0,0,0.20)',
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
      overwrite: 'auto',
    })

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    if (!tweenRef.current) return
    if (isHovered) tweenRef.current.play()
    else tweenRef.current.reverse()
  }, [isHovered])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="h-full rounded-lg will-change-[box-shadow] shadow-[0_4px_30px_rgba(0,0,0,0.10)]"
    >
      {children}
    </div>
  )
}

export default CardShadow
