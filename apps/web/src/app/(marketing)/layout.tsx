import Header from '@/components/marketing/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  )
}
