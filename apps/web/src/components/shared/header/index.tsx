import Link from 'next/link'
import { FaBars } from 'react-icons/fa'

const Header = () => {
  return (
    <div className="min-w-[300px] absolute left-1/2 top-10 z-10 transform -translate-x-1/2 flex-between backdrop-blur-sm bg-opacity-30 bg-white/30 border border-gray-300 md:w-lg px-5 py-3 rounded-full">
      <h1 className="text-2xl font-bold">Pulse</h1>
      <button className="md:hidden p-2 rounded-full hover:bg-gray-200 transition">
        <FaBars />
      </button>
      <nav className="hidden md:flex md:flex-center space-x-4 text-md">
        <Link href="/">Funktionen</Link>
        <Link href="/">Preise</Link>
        <Link href="/">Download</Link>
        <Link href="/" className="font-bold">
          Login
        </Link>
      </nav>
    </div>
  )
}

export default Header
