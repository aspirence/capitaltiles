'use client'

import { useCallback, useEffect, useState } from 'react'
import s from './AboutBanner.module.css'

/* Page title bar, built to the supplied reference: a dimmed room photo, a
   small eyebrow over an oversized uppercase headline, and flush arrows on
   either edge stepping through the slides. */

const SLIDES = [
  {
    eyebrow: 'Welcome to Capital Tiles',
    title: ['Perfect surfaces', 'for every room'],
    img: '/img/about/banner-1.jpg',
  },
  {
    eyebrow: 'Supply & Installation',
    title: ['Canberra’s first', 'choice since 1977'],
    img: '/img/about/banner-2.jpg',
  },
]

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  )
}

export default function AboutBanner() {
  const [index, setIndex] = useState(0)
  const go = useCallback((next) => {
    setIndex((i) => (next + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setTimeout(() => go(index + 1), 7000)
    return () => clearTimeout(t)
  }, [index, go])

  return (
    <section className={s.banner} data-hero="" aria-label="About Capital Tiles">
      {SLIDES.map((slide, i) => {
        const on = i === index
        /* Only the visible slide carries the h1 — one page, one page title. */
        const Title = on ? 'h1' : 'div'
        return (
          <div key={slide.img} className={on ? s.slide + ' ' + s.slideOn : s.slide} aria-hidden={!on}>
            <img src={slide.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
            <span className={s.shade} aria-hidden="true" />
            <div className={'container ' + s.copy}>
              <p className={s.eyebrow}>{slide.eyebrow}</p>
              <Title className={s.title}>
                {slide.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </Title>
            </div>
          </div>
        )
      })}

      <button type="button" className={s.arrow + ' ' + s.prev} aria-label="Previous"
        onClick={() => go(index - 1)}>
        <Chevron dir="prev" />
      </button>
      <button type="button" className={s.arrow + ' ' + s.next} aria-label="Next"
        onClick={() => go(index + 1)}>
        <Chevron dir="next" />
      </button>
    </section>
  )
}
