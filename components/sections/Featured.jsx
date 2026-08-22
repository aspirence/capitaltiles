'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Featured.module.css'

/* Built to the supplied reference: one full-bleed plate behind four equal
   columns. Hovering a column swaps the plate to that column's image and
   expands it from a compact label into a dark detail card. */

const ITEMS = [
  {
    sub: 'Indoor Tiles',
    title: 'Living & Dining',
    copy: 'Large-format porcelain and stone-look floors that run wall to wall with minimal grout lines.',
    href: '/tiles/living-room',
    img: '/img/featured/feat-1.jpg',
  },
  {
    sub: 'Bathroom Tiles',
    title: 'Bathrooms & Ensuites',
    copy: 'Wall and floor tiles rated for wet areas, matched with basins, mixers and slip-safe finishes.',
    href: '/tiles/bathroom',
    img: '/img/featured/feat-2.jpg',
  },
  {
    sub: 'Outdoor & Pool',
    title: 'Alfresco & Pools',
    copy: 'R11 grip, frost resistance and 20mm pavers built for Canberra decks, drives and poolsides.',
    href: '/tiles/outdoor',
    img: '/img/featured/feat-3.jpg',
  },
  {
    sub: 'Commercial',
    title: 'Retail & Fitout',
    copy: 'Hard-wearing specification for shops, offices and hospitality, supplied and installed to program.',
    href: '/professional/institutional',
    img: '/img/featured/feat-4.jpg',
  },
]

export default function Featured() {
  const [active, setActive] = useState(0)

  return (
    <section className={s.section} aria-label="Featured ranges">
      {/* stacked plates — only the active one is opaque */}
      {ITEMS.map((item, i) => (
        <div
          key={item.img}
          className={i === active ? s.plate + ' ' + s.plateOn : s.plate}
          style={{ backgroundImage: `url(${item.img})` }}
          aria-hidden="true"
        />
      ))}
      <span className={s.wash} aria-hidden="true" />

      {/* column dividers */}
      {[1, 2, 3].map((n) => (
        <span key={n} className={s.divider} style={{ left: n * 25 + '%' }} aria-hidden="true" />
      ))}

      {/* white notch tab */}
      <div className={s.tab}>
        <h2>Featured In</h2>
      </div>

      <div className={s.cols}>
        {ITEMS.map((item, i) => {
          const on = i === active
          return (
            <div
              key={item.title}
              className={on ? s.col + ' ' + s.colOn : s.col}
              /* Below 640px every card is open, so each column paints its own
                 image instead of sharing the single hover-swapped plate. */
              style={{ '--img': `url(${item.img})` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {/* compact state */}
              <div className={s.compact}>
                <p className={s.sub}>{item.sub}</p>
                <h3 className={s.title}>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
              </div>

              {/* expanded card */}
              <div className={s.card}>
                <span className={s.dot} aria-hidden="true" />
                <p className={s.sub}>{item.sub}</p>
                <h3 className={s.cardTitle}>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className={s.copy}>{item.copy}</p>
                <Link href={item.href} className={s.btn} tabIndex={on ? 0 : -1}>
                  View More
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
