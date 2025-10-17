import Link from 'next/link'
import { FaBars } from 'react-icons/fa'

const Header = () => {
  return (
    <div className="min-w-[300px] fixed left-1/2 top-5 z-10 -translate-x-1/2 flex-between backdrop-blur-sm bg-opacity-30 bg-white/30 border border-gray-300 md:w-lg px-5 py-3 rounded-full">
      <Link href="#home">
        <h1 className="text-2xl font-bold">Pulse</h1>
      </Link>
      <button className="md:hidden p-2 rounded-full hover:bg-gray-200 transition">
        <FaBars />
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
  )
}

export default Header
