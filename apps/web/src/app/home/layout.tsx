import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Sidebar from '@/components/shared/app-sidebar'
import { ThemeProvider } from '@/components/ui/theme-provider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar />
        <SidebarTrigger />
        <main className="flex-1 wrapper">{children}</main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
