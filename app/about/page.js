import AboutBanner from '@/components/sections/AboutBanner'
import AboutIntro from '@/components/sections/AboutIntro'
/* The showroom band still lives in sections/Featured.jsx — the file kept its
   name when its contents were replaced. */
import AboutShowroom from '@/components/sections/Featured'
import AboutBand from '@/components/sections/AboutBand'
import AboutFaq from '@/components/sections/AboutFaq'

export const metadata = {
  title: 'About — Capital Tiles & Flooring',
  description:
    'Capital Tiles & Flooring supplies and installs premium tiles, timber, hybrid and carpet across Canberra, with a free measure and quote service.',
}

export default function AboutPage() {
  return (
    <>
      <AboutBanner />
      <AboutIntro />
      <AboutShowroom />
      <AboutFaq />
      <AboutBand />
    </>
  )
}
