import Link from 'next/link'
import s from './Bathware.module.css'

/* The dark installation block: our supply-and-install promise on the left, a
   finished-job spotlight, and the three floors our installers lay. */

const PRODUCTS = [
  { label: 'Tile & stone', sub: 'Floors, walls and wet areas', href: '/tiles/bathroom', img: '/img/spaces/bathroom-wide.jpg' },
  { label: 'Timber & hybrid', sub: 'Laminate and vinyl planks', href: '/flooring/hybrid-flooring', img: '/img/flooring/engineered-timber.jpg' },
  { label: 'Bedrooms & living areas', sub: 'Carpet supplied and laid', href: '/tiles/triexta', img: '/img/spaces/bedroom.jpg' },
]

export default function Bathware() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.grid}>
        <div className={s.copy}>
          <p className="eyebrow" data-reveal>Installation</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Supplied and installed by our own team
          </h2>
          <p className={'lede ' + s.body} data-reveal style={{ '--reveal-delay': '150ms' }}>
            Take your order away and arrange your own trades, or hand the whole job to our
            installers — measure, removal, preparation and finish, right across Canberra and the
            surrounding districts.
          </p>

          <ul className={s.points} data-reveal style={{ '--reveal-delay': '220ms' }}>
            <li>Old floor and tile removal, subfloor prep and levelling</li>
            <li>Laying, grouting, sealing and waterproofing checks</li>
            <li>One quoted price, with no hidden costs</li>
          </ul>

        </div>

        {/* A sibling of the copy rather than a child of it, so a phone can move
            it below the showcase instead of pushing the images past the fold. */}
        <div className={s.ctaWrap} data-reveal style={{ '--reveal-delay': '290ms' }}>
          <Link href="/contact-us" className="cta ctaLight">
            <span>Book a free measure and quote</span>
          </Link>
        </div>

        <div className={s.showcase}>
          <div className={s.hero} data-reveal="right">
            <div className="zoomFrame">
              <img src="/img/about/why-choose.jpg" alt="Living room floor and feature wall tiled by the Capital Tiles installation team" loading="lazy" />
            </div>
            <span className={s.heroTag}>Supply &amp; install · Canberra</span>
          </div>

          <ul className={s.tiles}>
            {PRODUCTS.map((p, i) => (
              <li key={p.label} data-reveal style={{ '--reveal-delay': 120 + i * 90 + 'ms' }}>
                <Link href={p.href}>
                  <span className={'zoomFrame ' + s.tileFrame}>
                    <img src={p.img} alt={p.label} loading="lazy" />
                  </span>
                  <span className={s.tileLabel}>{p.label}</span>
                  <span className={s.tileSub}>{p.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
