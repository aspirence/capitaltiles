'use client'

import { useState } from 'react'
import Link from 'next/link'
import Carousel from '../Carousel'
import s from './Explore.module.css'

/* The Simpolo "Explore Premium Tiles Collection" block: one tab rail over a
   carousel of space / finish / colour cards. */

const TABS = [
  {
    label: 'Locations',
    items: [
      { label: 'Living Room', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
      { label: 'Bathroom', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
      { label: 'Triexta Tiles', href: '/tiles/triexta', img: '/img/spaces/bedroom.jpg' },
      { label: 'Kitchen', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
      { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/spaces/balcony.jpg' },
      { label: 'Outdoor', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
      { label: 'Wall Tiles', href: '/tiles/wall', img: '/img/spaces/staircase.jpg' },
      { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/spaces/commercial.jpg' },
    ],
  },
  {
    label: 'Effects',
    items: [
      { label: 'Marble', href: '/tiles/marble', img: '/img/collections/venitto.jpg' },
      { label: 'Stone', href: '/tiles/stone', img: '/img/collections/glyphstone.jpg' },
      { label: 'Concrete', href: '/tiles/concrete', img: '/img/collections/basaltino.jpg' },
      { label: 'Metallic', href: '/tiles/metallic', img: '/img/collections/alchimia.jpg' },
      { label: 'Rustic', href: '/tiles/rustic', img: '/img/collections/sparko.jpg' },
      { label: 'Decor', href: '/tiles/decor', img: '/img/spaces/elevation.jpg' },
    ],
  },
  {
    label: 'Colours',
    items: [
      { label: 'White', href: '/tiles/white', img: '/img/collections/basaltino.jpg' },
      { label: 'Black', href: '/tiles/black', img: '/img/collections/alchimia.jpg' },
      { label: 'Grey', href: '/tiles/grey', img: '/img/collections/glyphstone.jpg' },
      { label: 'Cream', href: '/tiles/cream', img: '/img/collections/sparko.jpg' },
      { label: 'Brown', href: '/tiles/brown', img: '/img/collections/venitto.jpg' },
      { label: 'Beige', href: '/tiles/beige', img: '/img/spaces/bedroom.jpg' },
    ],
  },
]

export default function Explore() {
  const [tab, setTab] = useState(0)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <Carousel
          key={tab} /* remount resets scroll position when the tab changes */
          cols={4}
          colsTablet={2.4}
          colsMobile={1.3}
          arrows="head"
          label="Tile categories"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>Browse the range</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Explore Premium Tiles Collection
                </h2>
              </div>

              <div className={s.tabs} role="tablist" aria-label="Browse tiles by">
                {TABS.map((t, i) => (
                  <button
                    key={t.label}
                    type="button"
                    role="tab"
                    aria-selected={i === tab}
                    className={i === tab ? s.tabOn : undefined}
                    onClick={() => setTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          }
        >
          {TABS[tab].items.map((item, i) => (
            <li key={item.label} data-reveal style={{ '--reveal-delay': i * 70 + 'ms' }}>
              <Link href={item.href} className={s.card}>
                <span className={'zoomFrame ' + s.frame}>
                  <img src={item.img} alt={item.label + ' tiles'} loading="lazy" />
                  <span className={s.veil} aria-hidden="true" />
                  <span className={s.plus} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </span>
                <span className={s.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
