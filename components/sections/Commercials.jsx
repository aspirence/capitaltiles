'use client'

import { useState } from 'react'
import Carousel from '../Carousel'
import s from './Commercials.module.css'

/* Film rail. One entry per branch of the main nav — Tiles (indoor, outdoor),
   Flooring, Carpet and Installation — so the section answers the questions
   customers arrive with rather than running brand advertising.

   Covers are frames pulled straight out of each film, so the still on the card
   is the first thing you see when the player opens. Only the clicked film is
   mounted — the rail never loads six videos at once. */

const FILMS = [
  {
    title: 'Wall or floor: choosing your bathroom tile',
    len: '0:10',
    img: '/img/films/bathroom.jpg',
    src: '/bathroom.mp4',
  },
  {
    title: 'Why hybrid flooring is 100% waterproof',
    len: '0:10',
    img: '/img/films/hybrid-flooring.jpg',
    src: '/hybrid-flooring.mp4',
  },
  {
    title: 'Inside a Capital Tiles installation',
    len: '0:10',
    img: '/img/films/capital-tiles.jpg',
    src: '/capital-tiles.mp4',
  },
  {
    title: 'Pool tiles and pavers through a Canberra winter',
    len: '0:10',
    img: '/img/films/pool-tiles.jpg',
    src: '/pool-tiles.mp4',
  },
  {
    title: 'Laminate, engineered or natural timber?',
    len: '0:10',
    img: '/img/films/laminate-engineered.jpg',
    src: '/laminate-engineered.mp4',
  },
  {
    title: 'Carpet or hard floor in the bedroom?',
    len: '0:08',
    img: '/img/films/bedroom.jpg',
    src: '/bedroom.mp4',
  },
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
          label="Product films"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>Watch &amp; learn</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Product Films &amp; How-To Guides
                </h2>
                <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
                  Short films on choosing tiles, flooring and carpet — and what our installers do
                  once the boxes land on site.
                </p>
              </div>
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
            {/* keyed so switching films remounts the player instead of
                keeping the previous file's playback position */}
            <video
              key={FILMS[open].src}
              src={FILMS[open].src}
              poster={FILMS[open].img}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
            <figcaption>
              {FILMS[open].title}
              <span>Want to see it in person? Drop into the Mitchell showroom.</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
