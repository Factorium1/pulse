'use client'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { useState, useRef, useLayoutEffect } from 'react'
import { FaX } from 'react-icons/fa6'
import gsap from 'gsap'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const tl = useRef(gsap.timeline({ paused: true }))

  useLayoutEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    gsap.set(containerRef.current, { height: 0, overflow: 'hidden' })
    gsap.set(wrapperRef.current, { borderRadius: 20, opacity: 1 })

    tl.current = gsap
      .timeline({ paused: true })
      .to(wrapperRef.current, { borderRadius: 16, duration: 0.3, ease: 'power1.inOut' }, 0)
      .fromTo(
        containerRef.current,
        { height: 0 },
        { height: 'auto', duration: 0.3, ease: 'power1.inOut' },
        0,
      )
  }, [])

  useLayoutEffect(() => {
    if (!tl.current) return
    isMenuOpen ? tl.current.play() : tl.current.reverse()
  }, [isMenuOpen])

  return (
    <div
      ref={wrapperRef}
      className={`w-[90%] fixed left-1/2 top-5 z-10 -translate-x-1/2 flex-center flex-col backdrop-blur-sm bg-opacity-30 bg-white/30 border border-gray-300 md:w-lg px-5 py-3 opacity-0`}
    >
      <div className="flex-between w-full">
        <Link href="#home">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            Pulse
          </h1>
        </Link>
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? <FaBars className="cursor-pointer" /> : <FaX className="cursor-pointer" />}
        </button>
        <nav className="hidden md:flex md:flex-center space-x-4 text-md">
          <Link href="#features" className="font-semibold">
            Funktionen
          </Link>
          <Link href="#price" className="font-semibold">
            Preise
          </Link>
          <Link href="#download" className="font-semibold">
            Download
          </Link>
          <Link href="#login" className="font-bold">
            Login
          </Link>
        </nav>
      </div>
      <nav ref={containerRef} className="flex-center md:hidden overflow-hidden height-0">
        <div className="flex-center flex-col gap-4 px-6 pt-8 pb-4 w-[90%] max-w-xs text-center rounded-0">
          <Link href="#features" className="font-semibold" onClick={() => setIsMenuOpen(false)}>
            Funktionen
          </Link>
          <Link href="#price" className="font-semibold" onClick={() => setIsMenuOpen(false)}>
            Preise
          </Link>
          <Link href="#download" className="font-semibold" onClick={() => setIsMenuOpen(false)}>
            Download
          </Link>
          <Link href="#login" className="font-bold" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header
