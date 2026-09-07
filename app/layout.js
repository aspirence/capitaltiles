import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import FloatingActions from '@/components/FloatingActions'
import { SHOWROOM, SERVICE_AREA } from '@/components/siteData'

/* The production origin. Next needs it to resolve the relative canonicals every
   generateMetadata on the site returns, and to turn the Open Graph image path
   into the absolute URL a scraper can fetch. app/sitemap.js and app/robots.js
   spell it out again because a sitemap has to carry full URLs. */
const SITE_URL = 'https://capitaltiles.com.au'

const DESCRIPTION =
  'Capital Tiles & Flooring supplies and installs tiles, flooring and carpet across Canberra. Visit our Mitchell showroom or book a free measure and quote.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Capital Tiles & Flooring — Canberra Tiles, Flooring & Carpet',
  description: DESCRIPTION,
  /* No title or description here on purpose: left out, Next fills og:title and
     og:description from each page's own metadata. Setting them once at the root
     would stamp the homepage's wording onto every share of every product. */
  openGraph: {
    type: 'website',
    siteName: 'Capital Tiles & Flooring',
    locale: 'en_AU',
    images: [
      {
        url: '/img/hero/hero-0.jpg',
        width: 1800,
        height: 1013,
        alt: 'Tiles, flooring and carpet from Capital Tiles & Flooring, Mitchell',
      },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#212121',
}

/* ---------------------------------------------------------------------------
   LocalBusiness structured data.

   Most of this showroom's customers arrive from a "tile shop near me" search,
   and Google can only put the address, hours and phone in that result if it is
   told them in a form it can read. Everything below is derived from siteData.js
   rather than restated, so the hours in a search result cannot drift away from
   the hours in the footer.
   ------------------------------------------------------------------------- */

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/* "Mon–Fri 9am–5pm" or "Sat 10am–3pm": an optional second day closing a range,
   then the two clock times. The dashes are en dashes in siteData.js, so the
   class accepts those alongside plain hyphens. */
const SPAN = /^([A-Za-z]{3})(?:\s*[–—-]\s*([A-Za-z]{3}))?\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[–—-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i

const clock = (hour, minute, meridiem) =>
  String((Number(hour) % 12) + (/pm/i.test(meridiem) ? 12 : 0)).padStart(2, '0') +
  ':' +
  (minute || '00')

/* SHOWROOM.hours is one human-readable line; schema.org wants a span per block
   of days. A block that does not parse is dropped rather than guessed at — a
   wrong opening time in a search result is worse than a missing one. */
function openingHours(hours) {
  return hours
    .split('·')
    .map((block) => {
      const m = SPAN.exec(block.trim())
      if (!m) return null
      const first = DAYS.findIndex((d) => d.startsWith(m[1]))
      const last = m[2] ? DAYS.findIndex((d) => d.startsWith(m[2])) : first
      if (first < 0 || last < first) return null
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS.slice(first, last + 1),
        opens: clock(m[3], m[4], m[5]),
        closes: clock(m[6], m[7], m[8]),
      }
    })
    .filter(Boolean)
}

/* "Mitchell ACT 2911, Canberra" carries the three fields a PostalAddress wants
   after the street. Undefined parts drop out of the JSON rather than emitting
   nulls, so a reworded suburb line degrades to a partial address. */
const [, locality, region, postcode] = /^(.+?)\s+([A-Z]{2,4})\s+(\d{4})/.exec(SHOWROOM.suburb) || []

const SHOWROOM_LD = {
  '@context': 'https://schema.org',
  /* A LocalBusiness subtype that describes the trade: this is a shop that also
     lays what it sells, not a pure retailer. */
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#showroom`,
  name: 'Capital Tiles & Flooring',
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: SHOWROOM.phoneHref.replace('tel:', ''),
  email: SHOWROOM.email,
  image: `${SITE_URL}/img/hero/hero-0.jpg`,
  logo: `${SITE_URL}/logo.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SHOWROOM.street,
    addressLocality: locality,
    addressRegion: region,
    postalCode: postcode,
    addressCountry: 'AU',
  },
  openingHoursSpecification: openingHours(SHOWROOM.hours),
  /* SERVICE_AREA is prose because that is how it reads on the page, but the
     places inside it are the only capitalised words in the sentence, and Google
     understands a list of places where it will not understand "out to Yass". */
  areaServed: (SERVICE_AREA.match(/[A-Z][a-z]+/g) || []).map((name) => ({ '@type': 'Place', name })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SHOWROOM_LD) }}
        />
      </body>
    </html>
  )
}
