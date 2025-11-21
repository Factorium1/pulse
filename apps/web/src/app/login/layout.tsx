import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '../../../../../auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    redirect('/dashboard')
  }
  return <main className="flex-1 ">{children}</main>
}
