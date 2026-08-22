import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import FloatingActions from '@/components/FloatingActions'

export const metadata = {
  title: 'Capital Tiles — Premium Tiles, Bathware & Surfaces',
  description:
    'Capital Tiles crafts premium vitrified tiles, bathware and surfaces for modern Indian homes. Explore collections, visualise your space and find a showroom near you.',
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
