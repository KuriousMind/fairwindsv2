import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-between p-4 bg-blue-900">
          <div className="flex items-center">
            <Image 
              src="/rvpirate.png"
              alt="RV Pirate Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="ml-2 text-xl font-bold text-white">Fairwinds</span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}