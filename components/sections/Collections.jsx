'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Collections.module.css'

/* "Latest Collection" as an editorial index: hovering a name cross-fades the
   plate on the right, so the whole section reads as one moving object rather
   than a row of cards. Touch users get the same result on tap-through. */

const ITEMS = [
  {
    name: 'Alchimia',
    tag: 'Metallic · Graphite',
    copy: 'Alchemy in surface form — deep graphite with a slow metallic shimmer.',
    href: '/tiles/collection/alchimia',
    img: '/img/collections/alchimia.jpg',
    swatch: '/img/collections/alchimia.jpg',
  },
  {
    name: 'Sparko',
    tag: 'Sparkle Matt · Cream',
    copy: 'A cream body flecked with light, built to make a room look expensive.',
    href: '/tiles/collection/sparko',
    img: '/img/collections/sparko.jpg',
    swatch: '/img/collections/sparko.jpg',
  },
  {
    name: 'Venitto',
    tag: 'Terrazzo · Mud',
    copy: 'Terrazzo reimagined at slab scale, with aggregate that never repeats.',
    href: '/tiles/collection/venitto',
    img: '/img/collections/venitto.jpg',
    swatch: '/img/collections/venitto.jpg',
  },
  {
    name: 'Glyphstone',
    tag: 'Stone · Carved',
    copy: 'Petroglyph-inspired relief, cut into a full-body stone surface.',
    href: '/tiles/collection/glyphstone',
    img: '/img/collections/glyphstone.jpg',
    swatch: '/img/collections/glyphstone.jpg',
  },
  {
    name: 'Basaltino',
    tag: 'Concrete · White',
    copy: 'The quiet one — basalt grain in a soft, buildable white.',
    href: '/tiles/collection/basaltino',
    img: '/img/collections/basaltino.jpg',
    swatch: '/img/collections/basaltino.jpg',
  },
]

export default function Collections() {
  const [active, setActive] = useState(0)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>New this season</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Latest Vitrified Tiles Collection
            </h2>
          </div>
          <Link href="/tiles" className={'linkUnder ' + s.viewAll} data-reveal>
            View all collections
          </Link>
        </div>

        <div className={s.body}>
          {/* plates */}
          <div className={s.plates} data-reveal="scale">
            {ITEMS.map((item, i) => (
              <figure
                key={item.name}
                className={i === active ? s.plate + ' ' + s.plateOn : s.plate}
                aria-hidden={i !== active}
              >
                <img src={item.img} alt={item.name + ' collection'} loading="lazy" />
                <figcaption>
                  <span className={s.plateName}>{item.name}</span>
                  <span className={s.plateTag}>{item.tag}</span>
                </figcaption>
              </figure>
            ))}
            <span className={s.plateCount} aria-hidden="true">
              {String(active + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
            </span>
          </div>

          {/* index */}
          <ol className={s.index}>
            {ITEMS.map((item, i) => (
              <li
                key={item.name}
                className={i === active ? s.row + ' ' + s.rowOn : s.row}
                data-reveal="left"
                style={{ '--reveal-delay': i * 80 + 'ms' }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Link href={item.href} onClick={() => setActive(i)}>
                  <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.rowMain}>
                    <span className={s.rowName}>{item.name}</span>
                    <span className={s.rowCopy}>{item.copy}</span>
                  </span>
                  <span className={s.rowSwatch} aria-hidden="true">
                    <img src={item.swatch} alt="" loading="lazy" />
                  </span>
                  <span className={s.rowArrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* marquee strip */}
      <div className={s.marquee} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {[0, 1].map((dup) => (
            <span key={dup}>
              {ITEMS.map((item) => (
                <em key={item.name}>
                  {item.name}
                  <i />
                </em>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
