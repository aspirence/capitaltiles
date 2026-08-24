'use client'

import { useState } from 'react'
import Link from 'next/link'
import Carousel from '../Carousel'
import s from './Explore.module.css'

/* The range browser: one tab rail over a carousel of cards, mirroring the top
   menu — Tiles (indoor, outdoor, by type), Flooring and Carpet. */

const TABS = [
  {
    label: 'Tiles',
    items: [
      { label: 'Floor Tiles', href: '/tiles/floor-tiles', img: '/img/spaces/livingroom.jpg' },
      { label: 'Wall Tiles', href: '/tiles/wall', img: '/img/spaces/bathroom.jpg' },
      { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/pool/altto-glass-pool-mosaics.jpg' },
      { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/spaces/outdoor.jpg' },
      { label: 'Pavers', href: '/tiles/outdoor', img: '/img/outdoor/chiswick-paver-collection.jpg' },
      { label: 'Mosaic Tiles', href: '/tiles/mosaic', img: '/img/wall/kit-kat-mosaic.jpg' },
      { label: 'Mega Slab', href: '/tiles/mega-slab', img: '/img/spaces/commercial.jpg' },
      { label: 'Subway Tiles', href: '/tiles/subway', img: '/img/wall/aroma-collection.jpg' },
    ],
  },
  {
    label: 'Flooring',
    items: [
      { label: 'Hybrid Flooring', href: '/flooring/hybrid-flooring', img: '/img/flooring/hybrid-flooring.jpg' },
      { label: 'Laminate Flooring', href: '/flooring/laminate-flooring', img: '/img/flooring/laminate-flooring.jpg' },
      { label: 'Engineered Timber', href: '/flooring/engineered-timber', img: '/img/flooring/engineered-timber.jpg' },
      { label: 'Natural Timber', href: '/flooring/natural-timber', img: '/img/hybrid/spotted-gum.jpg' },
      { label: 'Vinyl Flooring', href: '/flooring/vinyl', img: '/img/flooring/vinyl.jpg' },
      { label: 'Flooring Installation', href: '/installation', img: '/img/hybrid/blackbutt.jpg' },
    ],
  },
  {
    label: 'Carpet',
    items: [
      { label: 'Bedrooms', href: '/carpet/wool', img: '/img/blogs/blog-2.jpg' },
      { label: 'Living Rooms', href: '/tiles/triexta', img: '/img/social/social-5.jpg' },
      { label: 'Family & Media Rooms', href: '/carpet/duratuft', img: '/img/social/social-4.jpg' },
      { label: "Guest & Kids' Rooms", href: '/carpet/polyester', img: '/img/spaces/bedroom.jpg' },
      { label: 'Offices & Shops', href: '/carpet/commercial', img: '/img/social/social-8.jpg' },
      { label: 'Cafes & Hospitality', href: '/carpet/polypropylene', img: '/img/featured/feat-4.jpg' },
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
          label="Product ranges"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>Browse the range</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Explore Tiles, Flooring and Carpet
                </h2>
              </div>

              <div className={s.tabs} role="tablist" aria-label="Browse by category">
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
                  <img src={item.img} alt={item.label} loading="lazy" />
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
