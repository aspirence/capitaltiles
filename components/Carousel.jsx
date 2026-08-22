'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import s from './Carousel.module.css'

/* ---------------------------------------------------------------------------
   A dependency-free carousel built on native scroll-snap: the track is a real
   overflow container, so touch, trackpad and keyboard all work for free and
   the arrows just call scrollBy(). Cards size themselves through the
   `--cols` custom property that callers pass in.
   ------------------------------------------------------------------------- */
export default function Carousel({
  children,
  cols = 4,
  colsTablet = 2.4,
  colsMobile = 1.15,
  gap = '1.5rem',
  label = 'Carousel',
  className = '',
  arrows = 'edge', // 'edge' | 'head' | 'none'
  headSlot = null,
}) {
  const track = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return undefined
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const nudge = (dir) => {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const btns = (
    <div className={s.btns}>
      <button type="button" aria-label="Previous" disabled={atStart} onClick={() => nudge(-1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button type="button" aria-label="Next" disabled={atEnd} onClick={() => nudge(1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )

  const style = {
    '--cols': cols,
    '--cols-tablet': colsTablet,
    '--cols-mobile': colsMobile,
    '--gap': gap,
  }

  return (
    <div className={s.wrap + (className ? ' ' + className : '')} style={style}>
      {(headSlot || arrows === 'head') && (
        <div className={s.head}>
          <div className={s.headSlot}>{headSlot}</div>
          {arrows === 'head' && btns}
        </div>
      )}

      {/* data-reveal-scope: cards parked outside the track are clipped by it and
          would never intersect the viewport on their own. */}
      <div className={s.viewport} data-reveal-scope>
        <ul className={s.track} ref={track} role="list" aria-label={label} tabIndex={0}>
          {children}
        </ul>

        {arrows === 'edge' && <div className={s.edgeBtns}>{btns}</div>}
      </div>
    </div>
  )
}
