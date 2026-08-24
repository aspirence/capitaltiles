import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import FloatingActions from '@/components/FloatingActions'

export const metadata = {
  title: 'Capital Tiles & Flooring — Canberra Tiles, Flooring & Carpet',
  description:
    'Capital Tiles & Flooring supplies and installs tiles, flooring and carpet across Canberra. Visit our Mitchell showroom or book a free measure and quote.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#212121',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        {/* Single IntersectionObserver that drives every [data-reveal]. */}
        <Reveal />
      </body>
    </html>
  )
}
