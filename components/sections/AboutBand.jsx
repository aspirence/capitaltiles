import Link from 'next/link'
import s from './AboutBand.module.css'

/* Wide claim band: a fixed (parallax) plate under a heavy wash, an oversized
   headline with its call to action, and a ticked list on the right with one
   row picked out on a translucent bar. */

const POINTS = [
  'Free measure & quote across Canberra',
  'Australia’s most trusted brands in stock',
  'Skilled installers, start to finish',
  'Local knowledge of Canberra’s climate',
]

/* the row the reference highlights */
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

          <Link href="/about" className={'cta ctaLight ' + s.btn}>
            <span>Know More</span>
          </Link>
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
