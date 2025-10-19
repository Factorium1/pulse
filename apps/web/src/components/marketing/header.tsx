'use client'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { FaX } from 'react-icons/fa6'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="w-[90%] fixed left-1/2 top-5 z-10 -translate-x-1/2 flex-between backdrop-blur-sm bg-opacity-30 bg-white/30 border border-gray-300 md:w-lg px-5 py-3 rounded-full">
        <Link href="#home">
          <h1 className="text-2xl font-bold cursor-pointer">Pulse</h1>
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
      {isMenuOpen && (
        <nav className="fixed inset-0 flex-center md:hidden">
          <div className="flex-center flex-col gap-4 px-6 py-8 rounded-2xl backdrop-blur-sm bg-white/60 border border-gray-200 w-[90%] max-w-xs text-center">
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
      )}
    </>
  )
}

export default Header
