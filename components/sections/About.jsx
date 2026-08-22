'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import s from './About.module.css'

/* Counts up once, the first time the block scrolls into view. */
function useCountUp(target, ms = 1600) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setValue(target)
      return undefined
    }

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / ms)
          // ease-out-cubic keeps the last digits from crawling
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, ms])

  return [ref, value]
}

const STATS = [
  { value: 49, suffix: '+', label: 'Years of craft' },
  { value: 200, suffix: '+', label: 'Exclusive showrooms' },
  { value: 8, suffix: '', label: 'Production lines' },
  { value: 26, suffix: '+', label: 'Countries served' },
]

function Stat({ value, suffix, label }) {
  const [ref, n] = useCountUp(value)
  return (
    <li ref={ref}>
      <span className={s.statValue}>
        {n}
        <em>{suffix}</em>
      </span>
      <span className={s.statLabel}>{label}</span>
    </li>
  )
}

export default function About() {
  return (
    <section className={'sectionPad ' + s.section} id="about">
      <div className={'container ' + s.grid}>
        <div className={s.media}>
          <div className={s.mediaMain} data-reveal="mask">
            <div className="zoomFrame">
              <img src="/img/about/showroom.jpg" alt="A Capital Tiles experience centre" loading="lazy" />
            </div>
          </div>
          <div className={s.mediaInset} data-reveal="scale" style={{ '--reveal-delay': '220ms' }}>
            <div className="zoomFrame">
              <img src="/img/about/craft.jpg" alt="A Capital Tiles surface, close up" loading="lazy" />
            </div>
          </div>
          <div className={s.badge} data-reveal="scale" style={{ '--reveal-delay': '420ms' }}>
            <strong>1977</strong>
            <span>Since</span>
          </div>
        </div>

        <div className={s.copy}>
          <p className="eyebrow" data-reveal>Our legacy</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '90ms' }}>
            A leading vitrified tiles company, building India&rsquo;s surfaces since 1977
          </h2>
          <p className={'lede ' + s.body} data-reveal style={{ '--reveal-delay': '170ms' }}>
            Capital Tiles curates collections that bring together beauty, innovation and strength.
            What began with a single red brick, and grew into bathware in 1991, is today a complete
            tiles and bathware solution brand — from timeless classics to bold, contemporary
            statements, so every space finds its perfect fit.
          </p>

          <ul className={s.stats} data-reveal style={{ '--reveal-delay': '240ms' }}>
            {STATS.map((st) => (
              <Stat key={st.label} {...st} />
            ))}
          </ul>

          <div data-reveal style={{ '--reveal-delay': '320ms' }}>
            <Link href="/about" className="cta">
              <span>Know More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
