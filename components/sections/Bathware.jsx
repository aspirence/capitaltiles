import Link from 'next/link'
import s from './Bathware.module.css'

/* Simpolo's dark bathware block: a stated promise on the left, a spotlight
   plate, and three product tiles that lift on hover. */

const PRODUCTS = [
  { label: 'Spotlight', sub: 'Signature suites', href: '/bathware/suites', img: '/img/bathware/spotlight.jpg' },
  { label: 'Basins', sub: 'Counter & wall hung', href: '/bathware/basins', img: '/img/bathware/basin.webp' },
  { label: 'EWC & Pans', sub: 'Rimless flush', href: '/bathware/ewc', img: '/img/bathware/ewc.png' },
]

export default function Bathware() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.grid}>
        <div className={s.copy}>
          <p className="eyebrow" data-reveal>Capital Bathware</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Premium Bathware &amp; Sanitaryware
          </h2>
          <p className={'lede ' + s.body} data-reveal style={{ '--reveal-delay': '150ms' }}>
            We build stylish, hard-wearing bathware around how a bath space is actually used —
            rimless flushing, soft-close everywhere, and glazes that stay white after a decade of
            hard water.
          </p>

          <ul className={s.points} data-reveal style={{ '--reveal-delay': '220ms' }}>
            <li>Rimless flush technology</li>
            <li>Anti-bacterial glaze</li>
            <li>10-year surface warranty</li>
          </ul>

          <div data-reveal style={{ '--reveal-delay': '290ms' }}>
            <Link href="/bathware" className="cta ctaLight">
              <span>Discover Bathware</span>
            </Link>
          </div>
        </div>

        <div className={s.showcase}>
          <div className={s.hero} data-reveal="right">
            <div className="zoomFrame">
              <img src="/img/bathware/choose.jpg" alt="Capital Bathware sanitaryware suite" loading="lazy" />
            </div>
            <span className={s.heroTag}>New · Crona Suite</span>
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
