import { Poppins } from 'next/font/google'
import { ReactNode, Suspense } from 'react'
import '../../styles/globals.css'
import { AuthContextProvider } from '@/context/auth'
import Loading from './loading'
import { Header } from '@/components/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-[url('https://images.pexels.com/photos/7130496/pexels-photo-7130496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1">
        <Suspense fallback={<Loading />}>
          <AuthContextProvider>
            <Header />
            {children}
          </AuthContextProvider>
        </Suspense>
      </body>
    </html>
  )
}
