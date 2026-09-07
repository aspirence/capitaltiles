'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import s from './Installation.module.css'

/* The four service marks. On desktop this is a plain grid and nothing here
   runs; below 700px it becomes a one-card-at-a-time scroll-snap slider that
   advances on its own. The list is rendered twice on mobile so the wrap from
   the last card back to the first happens at a snap boundary and is invisible.

   The dot row under the rail is the other half of that: the scrollbar is hidden
   site-wide, so with one card of four on screen there was nothing to say how
   many there were or which one you were on — and nothing to stop the timer
   sliding a reader off the middle of a sentence. */

const INTERVAL = 3400
const MOBILE = '(max-width: 700px)'

export default function InstallWhy({ reasons }) {
  const trackRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState(0)
  /* Autoplay is a courtesy for a reader who has not touched the rail. Once one
     has — a swipe, a dot, a tab into the track — it stands down for good. */
  const [taken, setTaken] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    setIsMobile(mq.matches)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /* One card plus the gap. Every scroll position on the rail is a multiple of
     it, which is what makes the index and the dot targets exact. */
  const stride = useCallback(() => {
    const track = trackRef.current
    const first = track && track.firstElementChild
    if (!first) return 0
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    return first.getBoundingClientRect().width + gap
  }, [])

  useEffect(() => {
    if (!isMobile) return undefined
    const track = trackRef.current
    if (!track) return undefined

    /* Read on the frame, not on every scroll event — a smooth scroll fires
       these by the dozen. */
    let frame = 0
    const read = () => {
      frame = 0
      const step = stride()
      if (step) setActive(Math.round(track.scrollLeft / step) % reasons.length)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }

    track.addEventListener('scroll', onScroll, { passive: true })
    read()
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isMobile, reasons.length, stride])

  useEffect(() => {
    if (!isMobile || taken) return undefined
    const track = trackRef.current
    if (!track) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const stop = () => setTaken(true)
    track.addEventListener('pointerdown', stop)
    track.addEventListener('focusin', stop)

    const id = setInterval(() => {
      if (document.hidden) return
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
      track.removeEventListener('pointerdown', stop)
      track.removeEventListener('focusin', stop)
    }
  }, [isMobile, taken, reasons.length, stride])

  const goTo = (i) => {
    setTaken(true)
    const track = trackRef.current
    const step = stride()
    if (!track || !step) return
    /* Move within whichever copy of the list is on screen. Sending it to the
       first set instead would scroll the rail four cards backwards to make a
       one-card move. */
    const at = Math.round(track.scrollLeft / step)
    const base = Math.floor(at / reasons.length) * reasons.length
    track.scrollTo({ left: (base + i) * step, behavior: 'smooth' })
  }

  const items = isMobile ? [...reasons, ...reasons] : reasons

  return (
    <>
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

      {isMobile && (
        <div className={s.dots}>
          {reasons.map((r, i) => (
            <button
              key={r.title}
              type="button"
              className={i === active ? s.dot + ' ' + s.dotOn : s.dot}
              aria-label={r.title}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => goTo(i)}
            >
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
