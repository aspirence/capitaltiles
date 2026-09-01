'use client'

import { useState } from 'react'
import Link from 'next/link'
import Carousel from '../Carousel'
import { POSTS } from '../blogData'
import s from './Advice.module.css'

/* One advice rail, where a card is either a film or an article.

   This was two sections. A film rail sold six 8-to-10 second clips as "Product
   Films & How-To Guides", and two sections below it a blog rail covered the
   same ground in writing — "Laminate, engineered or natural timber?" against
   "Hybrid or laminate: choosing the right floor for your home"; "Carpet or hard
   floor in the bedroom?" against the carpet fibre piece. Neither the films nor
   the articles were the problem; running them as two near-identical carousels
   was. The films keep the promise the heading makes now that real guides sit
   beside them.

   The articles read from components/blogData.js, the same source the /blogs
   index and every article page use, so a card can never advertise a title the
   article no longer has. Only the clicked film is mounted — the rail never
   loads six videos at once. Dates are deliberately absent: they belong on
   /blogs, where a journal is honest, not on a homepage rail that would stamp
   the business's newest public statement a year old by next winter. */

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

/* Alternating rather than films-then-articles: two blocks in one rail reads as
   the two sections this replaced. */
const ITEMS = (() => {
  const out = []
  for (let i = 0; i < Math.max(FILMS.length, POSTS.length); i += 1) {
    if (FILMS[i]) out.push({ kind: 'film', key: 'film-' + i, filmIndex: i, ...FILMS[i] })
    if (POSTS[i]) out.push({ kind: 'post', key: 'post-' + POSTS[i].slug, ...POSTS[i] })
  }
  return out
})()

export default function Advice() {
  const [open, setOpen] = useState(null)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <Carousel
          cols={3}
          colsTablet={1.9}
          colsMobile={1.1}
          arrows="head"
          label="Advice, films and guides"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>Before you choose</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Advice and How-To Guides
                </h2>
                <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
                  Short films and longer reads on choosing tiles, flooring and carpet — and what
                  our installers do once the boxes land on site.
                </p>
              </div>
              <Link href="/blogs" className={'linkUnder ' + s.viewAll}>View all</Link>
            </div>
          }
        >
          {ITEMS.map((item, i) => (
            <li key={item.key} data-reveal style={{ '--reveal-delay': i * 60 + 'ms' }}>
              {item.kind === 'film' ? (
                <button type="button" className={s.card} onClick={() => setOpen(item.filmIndex)}>
                  <span className={'zoomFrame ' + s.frame + ' ' + s.frameFilm}>
                    <img src={item.img} alt="" loading="lazy" />
                    <span className={s.play} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                      </svg>
                    </span>
                    <span className={s.len}>{item.len}</span>
                    <span className={s.cat}>Film</span>
                  </span>
                  <span className={s.cardTitle}>{item.title}</span>
                  <span className={s.more}>
                    Watch
                    <i aria-hidden="true">+</i>
                  </span>
                </button>
              ) : (
                <Link href={`/blogs/${item.slug}`} className={s.card}>
                  <span className={'zoomFrame ' + s.frame}>
                    <img src={item.img} alt="" loading="lazy" />
                    <span className={s.cat}>{item.cat}</span>
                  </span>
                  <span className={s.cardTitle}>{item.title}</span>
                  <span className={s.more}>
                    Read more
                    <i aria-hidden="true">+</i>
                  </span>
                </Link>
              )}
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
              {/* A real destination: this used to be dead text at the warmest
                  moment on the page. */}
              <Link href="/contact-us" onClick={() => setOpen(null)}>
                Want to see it in person? Drop into the Mitchell showroom.
              </Link>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
