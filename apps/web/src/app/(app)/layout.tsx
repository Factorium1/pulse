import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Sidebar from '@/components/layout/app-sidebar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import ThemeAnimation from '@/components/ui/animation/theme-animation'
import { auth } from '../../../../../auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeAnimation />
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar />
        <SidebarTrigger className="cursor-pointer fixed m-5 md:hidden md:m-0" />
        <main className="flex-1 wrapper">{children}</main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
