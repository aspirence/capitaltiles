import Link from 'next/link'
import SearchBox from '@/components/SearchBox'
import { NAV } from '@/components/navData'
import { SHOWROOM } from '@/components/siteData'

/* No robots directive here: Next already emits noindex alongside the 404
   status for this page, and a second tag only argues with the first. */
export const metadata = {
  title: 'Page Not Found | Capital Tiles',
}

/* The three catalogue sections, read off the header taxonomy rather than typed
   again — they are the entries that carry a submenu. Someone who lands here has
   almost always come looking for a range inside one of them. */
const SECTIONS = NAV.filter((item) => item.type)

/* Layout only. This page has no stylesheet of its own, so the three boxes it
   needs are declared here rather than adding a module for a dozen lines.

   sectionPad covers the bottom, but the top has to clear the fixed header the
   way every other page's first section does, and the minimum height stops so
   short a page from leaving the footer halfway up the screen. */
const SECTION = {
  minHeight: '68svh',
  background: 'var(--grey-bg)',
  paddingTop: 'calc(var(--header-h) + clamp(3rem, 5vw, 5rem))',
}
const STACK = { display: 'grid', justifyItems: 'start', gap: '1.6rem', maxWidth: '62ch' }
const ROW = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }

export default function NotFound() {
  return (
    <section className="sectionPad" style={SECTION}>
      <div className="container">
        <div style={STACK}>
          <p className="eyebrow">Error 404</p>
          <h1 className="title">This page isn’t here</h1>
          <p className="lede">
            The address you followed does not match anything on the site — a range may have been
            renamed, or a link mistyped. Three ways to pick the thread back up.
          </p>

          <div style={ROW}>
            {SECTIONS.map((section) => (
              <Link key={section.href} href={section.href} className="cta">
                <span>All {section.label}</span>
              </Link>
            ))}
          </div>

          <div style={ROW}>
            <span className="eyebrow">Or search</span>
            <SearchBox placeholder="Tiles, flooring, carpet…" />
          </div>

          <div style={ROW}>
            <a className="linkUnder" href={SHOWROOM.phoneHref}>
              Call the showroom on {SHOWROOM.phone}
            </a>
            <span className="eyebrow">{SHOWROOM.hours}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
