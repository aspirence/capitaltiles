'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Collections.module.css'

/* The flooring range as an editorial index: hovering a name cross-fades the
   plate on the right, so the whole section reads as one moving object rather
   than a row of cards. Touch users get the same result on tap-through. */

const ITEMS = [
  {
    name: 'Hybrid Flooring',
    tag: 'Waterproof · Rigid Core',
    copy: 'Rigid-core planks that shrug off spills, so one floor can run from the kitchen through to the living room.',
    href: '/flooring/hybrid-flooring',
    img: '/img/flooring/hybrid-flooring.jpg',
    swatch: '/img/flooring/hybrid-flooring.jpg',
  },
  {
    name: 'Engineered Timber',
    tag: 'Real Timber · Stable Core',
    copy: 'A genuine timber wear layer over a stable core, so you get real grain that copes with Canberra winters.',
    href: '/flooring/engineered-timber',
    img: '/img/flooring/engineered-timber.jpg',
    swatch: '/img/flooring/engineered-timber.jpg',
  },
  {
    name: 'Laminate Flooring',
    tag: 'Hard Wearing · Value',
    copy: 'The timber look at a friendlier price, with a tough wear layer built for kids, pets and hallway traffic.',
    href: '/flooring/laminate-flooring',
    img: '/img/flooring/laminate-flooring.jpg',
    swatch: '/img/flooring/laminate-flooring.jpg',
  },
  {
    name: 'Vinyl Flooring',
    tag: 'Quiet · Warm Underfoot',
    copy: 'Softer and quieter than a hard surface, and forgiving over a subfloor that is not perfectly level.',
    href: '/flooring/vinyl',
    img: '/img/flooring/vinyl.jpg',
    swatch: '/img/flooring/vinyl.jpg',
  },
]

export default function Collections() {
  const [active, setActive] = useState(0)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>The flooring range</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Hybrid, Laminate, Timber and Vinyl
            </h2>
          </div>
          <Link href="/flooring" className={'linkUnder ' + s.viewAll} data-reveal>
            View all flooring
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
                <img src={item.img} alt={item.name} loading="lazy" />
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
