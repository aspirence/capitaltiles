import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import s from './AboutBand.module.css'

/* Wide claim band: a fixed (parallax) plate under a heavy wash, an oversized
   headline with the page's two asks, and a ticked list on the right with one
   row picked out by a gold rule.

   The button used to read "Know More" and point at /about — the page it sits
   on. It carries the actual commercial goals now: the free measure and quote,
   and the showroom. */

const POINTS = [
  'Free measure & quote across Canberra',
  'Australia’s most trusted brands in stock',
  'Skilled installers, start to finish',
  'Local knowledge of Canberra’s climate',
]

/* the row the reference picks out */
const HIGHLIGHT = 1

export default function AboutBand() {
  return (
    <section className={s.band} aria-label="Why Capital Tiles">
      <span className={s.plate} aria-hidden="true" />
      <span className={s.wash} aria-hidden="true" />

      <div className={'container ' + s.inner}>
        <div className={s.left}>
          <h2 className={s.title}>
            <span>Leading Canberra&rsquo;s</span>
            <span>Tiles &amp; Flooring Market</span>
          </h2>

          <div className={s.actions}>
            <EnquireLink subject="Free measure & quote" className="cta ctaLight">
              <span>Book a free measure &amp; quote</span>
            </EnquireLink>
            <Link href="/contact-us" className="cta ctaGhost">
              <span>Visit the showroom</span>
            </Link>
          </div>
        </div>

        <ul className={s.points}>
          {POINTS.map((p, i) => (
            <li key={p} className={i === HIGHLIGHT ? s.on : undefined}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m4 12.5 5 5 11-11" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
