export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <main className="flex-1 wrapper">{children}</main>
    </div>
  )
}
