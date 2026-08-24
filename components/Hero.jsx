'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import s from './Hero.module.css'

/* ---------------------------------------------------------------------------
   Full-bleed banner introducing what we do — tiles, flooring, carpet and
   installation: a slow cross-fade between slides, a Ken Burns push on
   whichever slide is active, copy that rises out of a blur, circular arrows
   and a progress bar that tracks the autoplay timer.
   ------------------------------------------------------------------------- */

const SLIDES = [
  {
    title: 'Tiles For Every Room',
    subtitle: 'Floor, wall and outdoor ranges, on display in Mitchell',
    href: '/tiles/wall',
    img: '/img/hero/hero-0.jpg',
    mob: '/img/hero/hero-m-0.jpg',
  },
  {
    title: 'Flooring That Wears Well',
    subtitle: 'Hybrid, laminate, engineered and natural timber, and vinyl',
    href: '/flooring/hybrid-flooring',
    img: '/img/hero/hero-1.jpg',
    mob: '/img/hero/hero-m-1.jpg',
  },
  {
    title: 'Supplied And Installed',
    subtitle: 'Old floor removal, subfloor prep, laying, grouting, sealing',
    href: '/installation',
    img: '/img/hero/hero-2.jpg',
    mob: '/img/hero/hero-m-2.jpg',
  },
  {
    title: 'Bedrooms And Living Rooms',
    subtitle: 'Carpet in wool, triexta, polyester and solution dyed nylon',
    href: '/tiles/triexta',
    img: '/img/hero/hero-3.jpg',
    mob: '/img/hero/hero-m-3.jpg',
  },
  {
    title: 'Free Measure & Quote',
    subtitle: 'Indoors or out, anywhere in Canberra and Queanbeyan',
    href: '/contact-us/enquiry',
    img: '/img/hero/hero-4.jpg',
    mob: '/img/hero/hero-m-4.jpg',
  },
]

const DURATION = 6500

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"
      style={dir === 'next' ? { transform: 'rotate(180deg)' } : undefined}>
      <path d="M9.23 16.83 16.95 24.55 16 25.5 6.67 16.17 16 6.83l.95.94-7.72 7.73H25.33v1.33H9.23Z" />
    </svg>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((next) => {
    setIndex((i) => (next + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    timer.current = setTimeout(() => go(index + 1), DURATION)
    return () => clearTimeout(timer.current)
  }, [index, paused, go])

  /* Keyboard support for the arrows without stealing focus from the page. */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(index - 1)
    if (e.key === 'ArrowRight') go(index + 1)
  }

  /* Swipe carries the carousel on touch devices: the arrows are hidden below
     900px, where they would otherwise sit under the floating action rail. */
  const touchX = useRef(null)
  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 45) return
    go(dx < 0 ? index + 1 : index - 1)
  }

  return (
    <section
      className={s.hero}
      data-hero=""
      aria-roledescription="carousel"
      aria-label="Tiles, flooring, carpet and installation"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={-1}
    >
      {/* Every slide carries a heading, so the page's single h1 lives here and
          the slide titles are h2s — five h1s would be five page titles. */}
      <h1 className={s.srOnly}>
        Capital Tiles &amp; Flooring — tiles, flooring, carpet and installation in Canberra
      </h1>

      <div className={s.viewport}>
        {SLIDES.map((slide, i) => {
          const on = i === index
          return (
            <article
              key={slide.title}
              className={on ? s.slide + ' ' + s.slideOn : s.slide}
              aria-hidden={!on}
            >
              <picture className={s.media}>
                <source media="(max-width: 640px)" srcSet={slide.mob} />
                <img
                  src={slide.img}
                  alt={slide.title}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding={i === 0 ? 'sync' : 'async'}
                />
              </picture>

              <div className={s.copy}>
                <div className="container">
                  <p className={s.eyebrow}>Capital Tiles &amp; Flooring</p>
                  <h2 className={s.title}>{slide.title}</h2>
                  <p className={s.subtitle}>{slide.subtitle}</p>
                  <Link className="cta ctaLight" href={slide.href} tabIndex={on ? 0 : -1}>
                    <span>Find Out More</span>
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <button
        type="button"
        className={s.arrow + ' ' + s.prev}
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        <Arrow dir="prev" />
      </button>
      <button
        type="button"
        className={s.arrow + ' ' + s.next}
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        <Arrow dir="next" />
      </button>

      {/* scroll cue — the slide indicator rule was removed by request; autoplay
          runs off its own timer, so the carousel is unaffected */}
      <div className={s.controls}>
        <div className="container">
          <div className={s.controlsInner}>
            <a className={s.scrollCue} href="#about">
              Scroll
              <span aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
