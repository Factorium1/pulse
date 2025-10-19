import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white with-full">
      <div className="flex-center flex-col gap-2 text-white/80">
        <Link href="/contact">Kontakt</Link>
        <Link href="/health">Status</Link>
        <Link href="/login">Login</Link>
      </div>
      <div className="flex-center flex-col gap-2 text-white/80">
        <Link href="/impressum">Impressum</Link>
        <Link href="/privacy">Datenschutz</Link>
        <Link href="/terms">AGB</Link>
      </div>
      <div className="flex-center flex-col gap-2 text-white/80">
        <p>© {new Date().getFullYear()} Pulse. Alle Rechte vorbehalten.</p>
        <p>Entwickelt mit ❤️ in Bavaria</p>
      </div>
    </footer>
  )
}

export default Footer
