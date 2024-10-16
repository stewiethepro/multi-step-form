import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { Quicksand } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

const quicksand = Quicksand({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Multi Step Form',
  description: 'Multi Step Form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='antialiased'>
      <body className={quicksand.className}>{children}</body>
    </html>
  )
}
