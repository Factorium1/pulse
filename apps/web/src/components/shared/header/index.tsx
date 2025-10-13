import Link from 'next/link'

const Header = () => {
  return (
    <div className="backdrop-blur-sm bg-opacity-30 bg-white/30 border border-gray-300 flex-between md:w-lg mx-auto mt-5 px-5 py-3 position-sticky rounded-full top-4 z-10">
      <h1 className="text-2xl font-bold">Pulse</h1>
      <nav className="flex-center space-x-4 text-md">
        <Link href="/">Funktionen</Link>
        <Link href="/">Preise</Link>
        <Link href="/">Download</Link>
        <Link href="/">Login</Link>
      </nav>
    </div>
  )
}

export default Header
