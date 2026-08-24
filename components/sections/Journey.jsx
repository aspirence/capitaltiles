import Link from 'next/link'
import s from './Journey.module.css'

/* Four-up closing band: the next step for a Canberra project — quote, showroom,
   tiles, flooring. Each card is a full-bleed plate whose label slides up and
   reveals a rule on hover. */

const CARDS = [
  { label: 'Free Measure & Quote', copy: 'Book a time that suits you', href: '/contact-us', img: '/img/collections/basaltino.jpg' },
  { label: 'Visit the Showroom', copy: '3 Pelle Street, Mitchell', href: '/about', img: '/img/about/showroom.jpg' },
  { label: 'Browse the Tiles', copy: 'Indoor, outdoor and pavers', href: '/tiles', img: '/img/collections/alchimia.jpg' },
  { label: 'Explore Flooring', copy: 'Talk to us about hybrid and timber', href: '/flooring/hybrid-flooring', img: '/img/flooring/hybrid-flooring.jpg' },
]

export default function Journey() {
  return (
    <section className={s.section}>
      <div className="container">
        <h2 className={'title ' + s.title} data-reveal>
          Start your tile &amp; flooring project with Capital Tiles
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
