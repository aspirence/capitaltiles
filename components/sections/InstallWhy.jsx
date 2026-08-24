'use client'

import { useEffect, useRef, useState } from 'react'
import s from './Installation.module.css'

/* The four service marks. On desktop this is a plain grid and nothing here
   runs; below 700px it becomes a one-card-at-a-time scroll-snap slider that
   advances on its own. The list is rendered twice on mobile so the wrap from
   the last card back to the first happens at a snap boundary and is invisible. */

const INTERVAL = 3400
const MOBILE = '(max-width: 700px)'

export default function InstallWhy({ reasons }) {
  const trackRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    setIsMobile(mq.matches)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!isMobile) return undefined
    const track = trackRef.current
    if (!track) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    /* Hands off while a finger is down, so the timer never fights a swipe. */
    let held = false
    const hold = () => { held = true }
    const release = () => { held = false }
    track.addEventListener('pointerdown', hold)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)

    const stride = () => {
      const first = track.firstElementChild
      if (!first) return 0
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      return first.getBoundingClientRect().width + gap
    }

    const id = setInterval(() => {
      if (held || document.hidden) return
      const step = stride()
      if (!step) return
      const loop = step * reasons.length
      /* Sitting on the first cloned card: rewind a whole set with no animation.
         The card under the viewport is identical, so nothing moves on screen. */
      if (track.scrollLeft >= loop - 2) track.scrollLeft -= loop
      track.scrollBy({ left: step, behavior: 'smooth' })
    }, INTERVAL)

    return () => {
      clearInterval(id)
      track.removeEventListener('pointerdown', hold)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [isMobile, reasons.length])

  const items = isMobile ? [...reasons, ...reasons] : reasons

  return (
    <ul
      className={s.whyGrid}
      ref={trackRef}
      /* Cards parked off to the right are clipped by the track, so they never
         intersect the viewport on their own — the scope reveals them together. */
      data-reveal-scope={isMobile ? '' : undefined}
    >
      {items.map((r, i) => {
        const clone = i >= reasons.length
        return (
          <li
            key={r.title + (clone ? '-clone' : '')}
            aria-hidden={clone || undefined}
            data-reveal
            style={{ '--reveal-delay': (i % reasons.length) * 80 + 'ms' }}
          >
            <span className={s.whyIcon}>
              <img src={r.icon} alt="" loading="lazy" />
            </span>
            <h3 className={s.whyTitle}>{r.title}</h3>
            <p className={s.whyCopy}>{r.copy}</p>
          </li>
        )
      })}
    </ul>
  )
}
