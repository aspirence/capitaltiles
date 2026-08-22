import Link from 'next/link'
import s from './Ranges.module.css'

/* Hindware's "Explore by Brands" rack, restated as Capital's four ranges. */

const RANGES = [
  {
    name: 'Capital Tiles',
    line: 'Vitrified · Wall · Slabs',
    href: '/tiles',
    img: '/img/brands/range-tiles.jpg',
  },
  {
    name: 'Capital Bathware',
    line: 'Sanitaryware · Basins',
    href: '/bathware',
    img: '/img/brands/range-bathware.jpg',
  },
  {
    name: 'Capital Surfaces',
    line: 'Quartz · Countertops',
    href: '/tiles/surfaces',
    img: '/img/brands/range-surfaces.jpg',
  },
  {
    name: 'Capital Projects',
    line: 'Institutional · Export',
    href: '/professional/institutional',
    img: '/img/brands/range-projects.jpg',
  },
]

export default function Ranges() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <p className="eyebrow" data-reveal>One house, four ranges</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Explore by Range
          </h2>
        </div>

        <ul className={s.grid}>
          {RANGES.map((r, i) => (
            <li key={r.name} data-reveal style={{ '--reveal-delay': i * 90 + 'ms' }}>
              <Link href={r.href} className={s.card}>
                <span className={s.cardMedia}>
                  <img src={r.img} alt="" loading="lazy" />
                </span>
                <span className={s.cardBody}>
                  <span className={s.cardName}>{r.name}</span>
                  <span className={s.cardLine}>{r.line}</span>
                </span>
                <span className={s.cardArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
