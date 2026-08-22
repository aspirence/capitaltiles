import Link from 'next/link'
import s from './Journey.module.css'

/* Simpolo's four-up "start your journey" band. Each card is a full-bleed
   plate whose label slides up and reveals a rule on hover. */

const CARDS = [
  { label: 'Catalogues', copy: 'Download the full range', href: '/downloads/catalogues', img: '/img/collections/basaltino.jpg' },
  { label: 'About Us', copy: 'Five decades of surface', href: '/about', img: '/img/about/showroom.jpg' },
  { label: 'Locate a Dealer', copy: '200+ stores across India', href: '/where-to-buy', img: '/img/cta/dealer.jpg' },
  { label: 'Visit a Showroom', copy: 'See it at real scale', href: '/experience-centre', img: '/img/collections/alchimia.jpg' },
]

export default function Journey() {
  return (
    <section className={s.section}>
      <div className="container">
        <h2 className={'title ' + s.title} data-reveal>
          Start your premium tiles &amp; bathware journey with Capital
        </h2>
      </div>

      <ul className={s.grid}>
        {CARDS.map((c, i) => (
          <li key={c.label} data-reveal="scale" style={{ '--reveal-delay': i * 90 + 'ms' }}>
            <Link href={c.href} className={s.card}>
              <img src={c.img} alt="" loading="lazy" />
              <span className={s.shade} aria-hidden="true" />
              <span className={s.body}>
                <span className={s.label}>{c.label}</span>
                <span className={s.copy}>{c.copy}</span>
                <span className={s.rule} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
