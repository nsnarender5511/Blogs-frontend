import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { PageTransition } from '@/components/common/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RediGNN - Tech Blog Platform',
  description: 'Discover the latest in tech, development, and innovation',
  keywords: 'tech blog, development, programming, AI, web development',
  authors: [{ name: 'RediGNN' }],
  openGraph: {
    title: 'RediGNN - Tech Blog Platform',
    description: 'Discover the latest in tech, development, and innovation',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PageTransition>
              {children}
            </PageTransition>
          </ErrorBoundary>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
} 