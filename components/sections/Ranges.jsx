import Link from 'next/link'
import s from './Ranges.module.css'

/* The four-card rack: the four things we supply and lay — tiles, flooring,
   carpet, and the installation that ties them together. */

const RANGES = [
  {
    name: 'Tiles',
    line: 'Floor · Wall · Outdoor',
    href: '/tiles/wall',
    img: '/img/brands/range-tiles.jpg',
  },
  {
    name: 'Flooring',
    line: 'Hybrid · Laminate · Timber',
    href: '/flooring/hybrid-flooring',
    img: '/img/flooring/engineered-timber.jpg',
  },
  {
    name: 'Carpet',
    line: 'Triexta · Wool · Nylon',
    href: '/tiles/triexta',
    img: '/img/spaces/staircase.jpg',
  },
  {
    name: 'Installation',
    line: 'Free measure · Lay · Seal',
    href: '/installation',
    img: '/img/about/craft.jpg',
  },
]

export default function Ranges() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <p className="eyebrow" data-reveal>Supplied and installed in Canberra</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Explore what we do
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
