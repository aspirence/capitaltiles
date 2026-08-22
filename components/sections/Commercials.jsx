'use client'

import { useState } from 'react'
import Link from 'next/link'
import Carousel from '../Carousel'
import s from './Commercials.module.css'

/* Simpolo's TV-commercial rail. Thumbnails are local stills; the play button
   swaps in a lightweight lightbox rather than embedding five players. */

const FILMS = [
  { title: 'Built for the way India lives', len: '0:45', img: '/img/hero/hero-1.jpg' },
  { title: 'Alchimia — the film', len: '1:02', img: '/img/collections/alchimia.jpg' },
  { title: 'Inside a Capital experience centre', len: '2:18', img: '/img/about/showroom.jpg' },
  { title: 'Bathware, reconsidered', len: '0:38', img: '/img/spaces/bathroom-wide.jpg' },
  { title: 'Surfaces that outlive trends', len: '1:24', img: '/img/hero/hero-3.jpg' },
]

export default function Commercials() {
  const [open, setOpen] = useState(null)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <Carousel
          cols={3}
          colsTablet={1.8}
          colsMobile={1.1}
          arrows="head"
          label="Brand films"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>On screen</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Brand Films &amp; Commercials
                </h2>
                <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
                  The art of captivating storytelling, through the lens of television advertising.
                </p>
              </div>
              <Link href="/gallery" className={'linkUnder ' + s.viewAll}>View all</Link>
            </div>
          }
        >
          {FILMS.map((f, i) => (
            <li key={f.title} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
              <button type="button" className={s.card} onClick={() => setOpen(i)}>
                <span className={'zoomFrame ' + s.frame}>
                  <img src={f.img} alt="" loading="lazy" />
                  <span className={s.play} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                  <span className={s.len}>{f.len}</span>
                </span>
                <span className={s.cardTitle}>{f.title}</span>
              </button>
            </li>
          ))}
        </Carousel>
      </div>

      {open !== null && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={FILMS[open].title}
          onClick={() => setOpen(null)}
        >
          <button type="button" className={s.close} aria-label="Close">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={FILMS[open].img} alt={FILMS[open].title} />
            <figcaption>
              {FILMS[open].title}
              <span>The full film plays on the campaign page.</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
