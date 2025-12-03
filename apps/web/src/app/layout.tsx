import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.css'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          pauseOnHover
          theme="light" //TODO: make dynamic based on dark/light mode
        />
      </body>
    </html>
  )
}
