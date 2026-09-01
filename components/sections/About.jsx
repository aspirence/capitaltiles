'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SERVICE_AREA } from '../siteData'
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
  { value: 3, suffix: '', label: 'Product categories' },
  { value: 5, suffix: '', label: 'Flooring ranges' },
  { value: 7, suffix: '', label: 'Carpet ranges' },
  { value: 9, suffix: '+', label: 'Areas we service' },
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
              <img src="/img/about/showroom.jpg" alt="A living room floored in patterned tiles" loading="lazy" />
            </div>
          </div>
          <div className={s.mediaInset} data-reveal="scale" style={{ '--reveal-delay': '220ms' }}>
            <div className="zoomFrame">
              <img src="/img/about/craft.jpg" alt="Timber-look plank tiles laid close up" loading="lazy" />
            </div>
          </div>
          <div className={s.badge} data-reveal="scale" style={{ '--reveal-delay': '420ms' }}>
            <strong>Mitchell</strong>
            <span>Showroom</span>
          </div>
        </div>

        <div className={s.copy}>
          <p className="eyebrow" data-reveal>Our showroom</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '90ms' }}>
            A Canberra showroom where you see the full sheet before you buy
          </h2>
          <p className={'lede ' + s.body} data-reveal style={{ '--reveal-delay': '170ms' }}>
            Capital Tiles &amp; Flooring is a local supplier and installer at 3 Pelle Street,
            Mitchell. Full sheets are out on display, so you can judge the colour, the size and the
            finish at full scale rather than from a sample chip — tiles, flooring and carpet in the
            one room. Our own installers do the work, and every job starts with a free measure and
            quote.
          </p>

          <ul className={s.stats} data-reveal style={{ '--reveal-delay': '240ms' }}>
            {STATS.map((st) => (
              <Stat key={st.label} {...st} />
            ))}
          </ul>

          {/* The address, hours, phone and email were shown here for a while,
              carried over when WhyChoose was folded in. They came back out:
              the footer already carries the full set on every page, and a
              second copy mid-page earned its space only while WhyChoose was
              gone. components/siteData.js still holds them if they are ever
              wanted here again. */}
          <p className={s.areas} data-reveal style={{ '--reveal-delay': '300ms' }}>
            Free measure and quote across {SERVICE_AREA}
          </p>

          <div className={s.actions} data-reveal style={{ '--reveal-delay': '380ms' }}>
            <Link href="/contact-us/enquiry" className="cta">
              <span>Book a free measure &amp; quote</span>
            </Link>
            <Link href="/about" className={'linkUnder ' + s.secondary}>
              More about us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
